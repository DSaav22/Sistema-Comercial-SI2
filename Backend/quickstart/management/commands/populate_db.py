import random
from datetime import datetime, timedelta
from decimal import Decimal
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from faker import Faker

# Importar todos los modelos necesarios
from quickstart.models import Categoria, Producto, Pedido, DetallePedido, Inventario, Sucursal, UserProfile


class Command(BaseCommand):
    help = 'Puebla la base de datos con datos sintéticos para SmartSales365'

    def add_arguments(self, parser):
        parser.add_argument(
            '--pedidos',
            type=int,
            default=100,
            help='Número de pedidos a crear (default: 100)',
        )
        parser.add_argument(
            '--clientes',
            type=int,
            default=20,
            help='Número de clientes a crear (default: 20)',
        )
        parser.add_argument(
            '--limpiar',
            action='store_true',
            help='Limpiar datos existentes antes de poblar (¡CUIDADO!)',
        )

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🚀 Iniciando población de la base de datos...'))
        
        fake = Faker('es_ES')  # Usar Faker en español
        
        num_pedidos = options['pedidos']
        num_clientes = options['clientes']
        limpiar = options['limpiar']

        # Limpiar datos existentes si se especifica
        if limpiar:
            self.stdout.write(self.style.WARNING('⚠️  Limpiando datos existentes...'))
            DetallePedido.objects.all().delete()
            Pedido.objects.all().delete()
            Inventario.objects.all().delete()
            Producto.objects.filter(eliminado=False).update(eliminado=True)
            Categoria.objects.filter(eliminado=False).update(eliminado=True)
            UserProfile.objects.filter(user__is_superuser=False).delete()
            User.objects.filter(is_superuser=False).delete()
            self.stdout.write(self.style.SUCCESS('✅ Datos limpiados'))

        # --- 1. Crear o obtener Sucursales ---
        self.stdout.write('📍 Creando sucursales...')
        sucursales_data = [
            {'nombre': 'Sucursal Centro', 'direccion': 'Av. Principal 123'},
            {'nombre': 'Sucursal Norte', 'direccion': 'Calle Norte 456'},
            {'nombre': 'Sucursal Sur', 'direccion': 'Av. Sur 789'},
        ]
        sucursales_list = []
        for suc_data in sucursales_data:
            sucursal, created = Sucursal.objects.get_or_create(
                nombre=suc_data['nombre'],
                defaults={'direccion': suc_data['direccion'], 'eliminado': False}
            )
            if sucursal.eliminado:
                sucursal.eliminado = False
                sucursal.save()
            sucursales_list.append(sucursal)
        self.stdout.write(self.style.SUCCESS(f'✅ {len(sucursales_list)} sucursales listas'))

        # --- 2. Crear Clientes (Usuarios) ---
        self.stdout.write('👥 Creando clientes...')
        clientes_list = []
        direcciones_ejemplo = [
            'Calle Falsa 123, La Paz',
            'Av. 6 de Agosto 456, La Paz',
            'Zona Sur, Calle 21 #789',
            'Sopocachi, Calle Rosendo Gutiérrez',
            'Miraflores, Av. Busch 321'
        ]
        
        for i in range(num_clientes):
            username = f'cliente_{fake.user_name()}_{i}'
            email = fake.email()
            
            # Evitar duplicados
            if User.objects.filter(username=username).exists():
                continue
                
            user = User.objects.create_user(
                username=username,
                email=email,
                password='password123',
                first_name=fake.first_name(),
                last_name=fake.last_name()
            )
            
            # Crear UserProfile
            UserProfile.objects.get_or_create(
                user=user,
                defaults={'direccion': random.choice(direcciones_ejemplo)}
            )
            
            clientes_list.append(user)
        
        self.stdout.write(self.style.SUCCESS(f'✅ {len(clientes_list)} clientes creados'))

        # --- 3. Crear Categorías ---
        self.stdout.write('📦 Creando categorías...')
        categorias_data = [
            {'nombre': 'Electrónica', 'descripcion': 'Dispositivos y accesorios electrónicos'},
            {'nombre': 'Ropa', 'descripcion': 'Ropa y accesorios de moda'},
            {'nombre': 'Hogar', 'descripcion': 'Artículos para el hogar'},
            {'nombre': 'Alimentos', 'descripcion': 'Productos alimenticios'},
            {'nombre': 'Juguetes', 'descripcion': 'Juguetes y entretenimiento'},
            {'nombre': 'Deportes', 'descripcion': 'Artículos deportivos'},
            {'nombre': 'Libros', 'descripcion': 'Libros y revistas'},
        ]
        
        cat_objs = []
        for cat_data in categorias_data:
            cat, created = Categoria.objects.get_or_create(
                nombre=cat_data['nombre'],
                defaults={'descripcion': cat_data['descripcion'], 'eliminado': False}
            )
            if cat.eliminado:
                cat.eliminado = False
                cat.save()
            cat_objs.append(cat)
        
        self.stdout.write(self.style.SUCCESS(f'✅ {len(cat_objs)} categorías creadas'))

        # --- 4. Crear Productos ---
        self.stdout.write('🛍️  Creando productos...')
        productos_nombres = [
            # Electrónica
            'Laptop HP', 'Mouse Inalámbrico', 'Teclado Mecánico', 'Monitor LED', 'Auriculares Bluetooth',
            'Smartphone Samsung', 'Tablet iPad', 'Cargador USB-C', 'Cable HDMI', 'Webcam HD',
            # Ropa
            'Camiseta Básica', 'Pantalón Jeans', 'Zapatos Deportivos', 'Chaqueta', 'Gorra',
            'Vestido Casual', 'Camisa Formal', 'Zapatillas', 'Bufanda', 'Cinturón',
            # Hogar
            'Juego de Sábanas', 'Almohada', 'Lámpara de Mesa', 'Cortinas', 'Alfombra',
            'Set de Toallas', 'Espejo', 'Reloj de Pared', 'Cojines Decorativos', 'Florero',
            # Alimentos
            'Café Premium', 'Chocolate', 'Galletas', 'Cereales', 'Té Verde',
            'Mermelada', 'Miel', 'Aceite de Oliva', 'Pasta', 'Arroz',
            # Juguetes
            'Muñeca Barbie', 'Carro de Carreras', 'Lego Classic', 'Pelota de Fútbol', 'Rompecabezas',
            # Deportes
            'Bicicleta Montaña', 'Pesas', 'Colchoneta Yoga', 'Botella Deportiva', 'Cuerda para Saltar',
            # Libros
            'Novela Bestseller', 'Libro de Cocina', 'Enciclopedia', 'Cómic', 'Revista',
        ]
        
        productos_list = []
        for nombre in productos_nombres:
            # Determinar categoría basada en el nombre
            if any(word in nombre for word in ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Smartphone', 'Tablet', 'Auriculares', 'Cargador', 'Cable', 'Webcam']):
                categoria = next(c for c in cat_objs if c.nombre == 'Electrónica')
            elif any(word in nombre for word in ['Camiseta', 'Pantalón', 'Zapatos', 'Chaqueta', 'Gorra', 'Vestido', 'Camisa', 'Zapatillas', 'Bufanda', 'Cinturón']):
                categoria = next(c for c in cat_objs if c.nombre == 'Ropa')
            elif any(word in nombre for word in ['Sábanas', 'Almohada', 'Lámpara', 'Cortinas', 'Alfombra', 'Toallas', 'Espejo', 'Reloj', 'Cojines', 'Florero']):
                categoria = next(c for c in cat_objs if c.nombre == 'Hogar')
            elif any(word in nombre for word in ['Café', 'Chocolate', 'Galletas', 'Cereales', 'Té', 'Mermelada', 'Miel', 'Aceite', 'Pasta', 'Arroz']):
                categoria = next(c for c in cat_objs if c.nombre == 'Alimentos')
            elif any(word in nombre for word in ['Muñeca', 'Carro', 'Lego', 'Pelota', 'Rompecabezas']):
                categoria = next(c for c in cat_objs if c.nombre == 'Juguetes')
            elif any(word in nombre for word in ['Bicicleta', 'Pesas', 'Colchoneta', 'Botella', 'Cuerda']):
                categoria = next(c for c in cat_objs if c.nombre == 'Deportes')
            else:
                categoria = next((c for c in cat_objs if c.nombre == 'Libros'), random.choice(cat_objs))
            
            producto = Producto.objects.create(
                categoria=categoria,
                nombre=nombre,
                tipo=fake.word(),
                medidas=random.choice(['pequeño', 'mediano', 'grande', 'único']),
                precio=Decimal(str(round(random.uniform(10.0, 1000.0), 2))),
                eliminado=False
            )
            productos_list.append(producto)
            
            # Crear inventario para cada sucursal
            for sucursal in sucursales_list:
                Inventario.objects.create(
                    producto=producto,
                    sucursal=sucursal,
                    cantidad=random.randint(10, 100),
                    eliminado=False
                )
        
        self.stdout.write(self.style.SUCCESS(f'✅ {len(productos_list)} productos creados con inventario'))

        # --- 5. Crear Pedidos y Detalles (¡El núcleo!) ---
        if not clientes_list:
            self.stdout.write(self.style.WARNING('⚠️  No hay clientes. Creando uno por defecto...'))
            user = User.objects.create_user('cliente_prueba', 'test@test.com', 'password123')
            UserProfile.objects.get_or_create(user=user, defaults={'direccion': 'Dirección de prueba'})
            clientes_list.append(user)

        self.stdout.write(f'🛒 Creando {num_pedidos} pedidos con fechas distribuidas...')
        
        pedidos_creados = 0
        estados_pedido = ['pendiente', 'confirmado', 'enviado', 'entregado']
        
        for i in range(num_pedidos):
            # Seleccionar cliente aleatorio
            cliente = random.choice(clientes_list)
            
            # ¡Fechas aleatorias en los últimos 12 meses!
            # Esto es crucial para probar "septiembre", "octubre", "último mes"
            dias_atras = random.randint(0, 365)
            fecha_pedido = timezone.now() - timedelta(days=dias_atras)
            
            # Obtener perfil del usuario
            try:
                user_profile = cliente.profile
                direccion = user_profile.direccion
            except:
                direccion = 'Dirección no especificada'
            
            pedido = Pedido.objects.create(
                id_usuario=cliente,
                fecha_creacion=fecha_pedido,
                estado=random.choice(estados_pedido),
                monto_total=Decimal('0.00'),
                direccion_entrega=direccion,
                latitud=Decimal(str(round(random.uniform(-16.5, -16.4), 6))),
                longitud=Decimal(str(round(random.uniform(-68.2, -68.1), 6)))
            )
            
            # Crear detalles del pedido
            num_items = random.randint(1, 5)
            pedido_total = Decimal('0.00')
            
            productos_seleccionados = random.sample(productos_list, min(num_items, len(productos_list)))
            
            for producto in productos_seleccionados:
                cantidad = random.randint(1, 3)
                precio = producto.precio
                precio_total = precio * cantidad
                
                DetallePedido.objects.create(
                    id_pedido=pedido,
                    id_producto=producto,
                    cantidad=cantidad,
                    precio=precio,
                    precio_total=precio_total
                )
                
                pedido_total += precio_total
            
            # Actualizar el total del pedido
            pedido.monto_total = pedido_total
            pedido.save()
            pedidos_creados += 1
            
            # Mostrar progreso
            if (i + 1) % 20 == 0:
                self.stdout.write(f'   📊 Progreso: {i + 1}/{num_pedidos} pedidos creados...')

        self.stdout.write(self.style.SUCCESS(f'✅ {pedidos_creados} pedidos creados con fechas aleatorias'))
        
        # --- Resumen final ---
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('=' * 60))
        self.stdout.write(self.style.SUCCESS('🎉 ¡BASE DE DATOS POBLADA EXITOSAMENTE!'))
        self.stdout.write(self.style.SUCCESS('=' * 60))
        self.stdout.write('')
        self.stdout.write('📊 Resumen:')
        self.stdout.write(f'   • Clientes: {len(clientes_list)}')
        self.stdout.write(f'   • Categorías: {len(cat_objs)}')
        self.stdout.write(f'   • Productos: {len(productos_list)}')
        self.stdout.write(f'   • Sucursales: {len(sucursales_list)}')
        self.stdout.write(f'   • Pedidos: {pedidos_creados}')
        self.stdout.write('')
        self.stdout.write('🔑 Credenciales de acceso:')
        self.stdout.write(f'   • Usuario: {clientes_list[0].username}')
        self.stdout.write('   • Contraseña: password123')
        self.stdout.write('')
        self.stdout.write('💡 Sugerencias:')
        self.stdout.write('   • Prueba el módulo de reportes en /reports')
        self.stdout.write('   • Ejemplo: "Reporte PDF de ventas de septiembre 2024"')
        self.stdout.write('   • Ejemplo: "Reporte Excel del último mes agrupado por producto"')
        self.stdout.write('')
