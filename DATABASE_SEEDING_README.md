# Script de Población de Base de Datos (Database Seeding)

## 📝 Descripción

Management Command de Django que puebla la base de datos con datos sintéticos realistas para testing y desarrollo. Utiliza la librería **Faker** para generar datos en español.

## 🎯 Propósito

Este script es esencial para:
- ✅ **Probar el módulo de reportes** con datos históricos reales
- ✅ **Desarrollo y testing** sin datos de producción
- ✅ **Demos y presentaciones** con datos convincentes
- ✅ **Validar funcionalidades** con diferentes escenarios

---

## 🚀 Instalación

### Instalar Faker

```bash
cd Backend
pip install Faker
```

---

## 📖 Uso

### Comando Básico

```bash
python manage.py populate_db
```

Esto creará:
- 20 clientes (por defecto)
- 100 pedidos (por defecto)
- 7 categorías
- ~55 productos
- 3 sucursales
- Inventarios para cada producto

### Opciones Avanzadas

#### Especificar cantidad de pedidos y clientes

```bash
python manage.py populate_db --pedidos=150 --clientes=25
```

#### Limpiar datos existentes antes de poblar

```bash
python manage.py populate_db --limpiar
```

⚠️ **CUIDADO**: La opción `--limpiar` eliminará TODOS los datos de:
- Pedidos y detalles
- Productos e inventarios
- Categorías
- Clientes (excepto superusuarios)

#### Combinación de opciones

```bash
python manage.py populate_db --pedidos=200 --clientes=30 --limpiar
```

---

## 📊 Datos Generados

### 1. **Clientes (Usuarios)**
- Nombres y apellidos realistas en español
- Emails únicos
- Perfiles con direcciones en Bolivia
- Contraseña por defecto: `password123`

### 2. **Categorías**
- Electrónica
- Ropa
- Hogar
- Alimentos
- Juguetes
- Deportes
- Libros

### 3. **Productos** (~55 productos)
Incluye productos realistas como:
- **Electrónica**: Laptop HP, Mouse Inalámbrico, Smartphone Samsung, etc.
- **Ropa**: Camisetas, Pantalones, Zapatos, Chaquetas, etc.
- **Hogar**: Sábanas, Almohadas, Lámparas, Cortinas, etc.
- **Alimentos**: Café Premium, Chocolate, Cereales, etc.
- Y más...

### 4. **Sucursales**
- Sucursal Centro (Av. Principal 123)
- Sucursal Norte (Calle Norte 456)
- Sucursal Sur (Av. Sur 789)

### 5. **Inventarios**
- Cada producto tiene stock en las 3 sucursales
- Cantidades aleatorias entre 10 y 100 unidades

### 6. **Pedidos** ⭐ (Lo más importante)
- **Fechas distribuidas**: Últimos 12 meses (365 días)
- Estados variados: pendiente, confirmado, enviado, entregado
- Entre 1 y 5 productos por pedido
- Montos totales calculados automáticamente
- Coordenadas de entrega (latitud/longitud)
- Vinculados a clientes reales

---

## 🎯 Características Especiales

### Distribución Temporal de Pedidos

El script crea pedidos con fechas en los **últimos 12 meses**, lo que permite probar:

✅ **Reportes mensuales específicos**:
```
"Reporte PDF de ventas de septiembre 2024"
"Reporte Excel de octubre 2024"
```

✅ **Reportes de rangos de fechas**:
```
"Reporte del 01/01/2024 al 31/12/2024"
```

✅ **Reportes relativos**:
```
"Reporte del último mes"
"Ventas de la última semana"
```

### Datos Realistas

- Precios entre 10 Bs y 1000 Bs
- Nombres de productos en español
- Direcciones en Bolivia
- Estados de pedido variados

---

## 📁 Estructura del Código

```
Backend/quickstart/management/
├── __init__.py
└── commands/
    ├── __init__.py
    └── populate_db.py  # Script principal
```

---

## 🔍 Ejemplo de Salida

```bash
$ python manage.py populate_db --pedidos=150 --clientes=25

🚀 Iniciando población de la base de datos...
📍 Creando sucursales...
✅ 3 sucursales listas
👥 Creando clientes...
✅ 25 clientes creados
📦 Creando categorías...
✅ 7 categorías creadas
🛍️  Creando productos...
✅ 55 productos creados con inventario
🛒 Creando 150 pedidos con fechas distribuidas...
   📊 Progreso: 20/150 pedidos creados...
   📊 Progreso: 40/150 pedidos creados...
   ...
✅ 150 pedidos creados con fechas aleatorias

============================================================
🎉 ¡BASE DE DATOS POBLADA EXITOSAMENTE!
============================================================

📊 Resumen:
   • Clientes: 25
   • Categorías: 7
   • Productos: 55
   • Sucursales: 3
   • Pedidos: 150

🔑 Credenciales de acceso:
   • Usuario: cliente_juanperez_0
   • Contraseña: password123

💡 Sugerencias:
   • Prueba el módulo de reportes en /reports
   • Ejemplo: "Reporte PDF de ventas de septiembre 2024"
   • Ejemplo: "Reporte Excel del último mes agrupado por producto"
```

---

## 🧪 Casos de Uso

### 1. Testing del Módulo de Reportes

```bash
# Poblar con muchos pedidos para reportes significativos
python manage.py populate_db --pedidos=300 --clientes=50
```

Luego prueba:
- "Reporte PDF de septiembre 2024 agrupado por producto"
- "Reporte Excel del último mes con nombre del cliente"
- "Ventas del 01/01/2024 al 31/03/2024 en PDF"

### 2. Demo Rápido

```bash
# Crear datos mínimos para una demo
python manage.py populate_db --pedidos=50 --clientes=10
```

### 3. Resetear y Repoblar

```bash
# Limpiar todo y empezar de cero
python manage.py populate_db --limpiar --pedidos=100 --clientes=20
```

---

## 🔧 Personalización

### Modificar Categorías

Edita la lista `categorias_data` en `populate_db.py`:

```python
categorias_data = [
    {'nombre': 'Tu Categoría', 'descripcion': 'Descripción'},
    # ...
]
```

### Modificar Productos

Edita la lista `productos_nombres`:

```python
productos_nombres = [
    'Tu Producto 1',
    'Tu Producto 2',
    # ...
]
```

### Cambiar Rango de Fechas

Modifica la línea de generación de fechas:

```python
# Actualmente: últimos 365 días
dias_atras = random.randint(0, 365)

# Para solo los últimos 90 días:
dias_atras = random.randint(0, 90)

# Para los últimos 2 años:
dias_atras = random.randint(0, 730)
```

---

## ⚠️ Advertencias

### 1. No usar en Producción
Este script está diseñado SOLO para desarrollo y testing. Nunca ejecutes esto en una base de datos de producción.

### 2. Opción --limpiar
La opción `--limpiar` es destructiva. Elimina datos permanentemente. Úsala con precaución.

### 3. Rendimiento
Crear cientos de pedidos puede tomar varios segundos. Sé paciente.

---

## 🐛 Troubleshooting

### Error: "No module named 'Faker'"
**Solución**: Instala Faker
```bash
pip install Faker
```

### Error: "No such table: quickstart_categoria"
**Solución**: Ejecuta las migraciones
```bash
python manage.py migrate
```

### Error: Usuarios duplicados
**Solución**: Usa la opción `--limpiar` o reduce el número de clientes

---

## 💡 Tips

1. **Primero ejecuta sin --limpiar** para agregar más datos sin perder lo existente
2. **Usa --pedidos grande** (200+) para reportes más significativos
3. **Varía los clientes** para tener diferentes patrones de compra
4. **Ejecuta múltiples veces** para acumular más datos históricos

---

## 📚 Integración con Reportes

Este script está diseñado específicamente para trabajar con el **Módulo de Reportes Dinámicos**:

1. Puebla la base de datos:
   ```bash
   python manage.py populate_db --pedidos=200
   ```

2. Ve a `/reports` en el frontend

3. Prueba prompts como:
   - "Reporte PDF de septiembre 2024"
   - "Excel del último mes agrupado por producto"
   - "Ventas del 01/10/2024 al 31/10/2024"

Los datos generados cubrirán todos estos rangos de fechas.

---

## 🔄 Actualizaciones Futuras

Posibles mejoras:
- [ ] Generación de fotos de productos
- [ ] Reseñas y calificaciones
- [ ] Códigos de descuento
- [ ] Historial de stock
- [ ] Logs de actividad

---

## 📞 Soporte

Si encuentras problemas con el script, verifica:
1. Que Faker esté instalado
2. Que las migraciones estén aplicadas
3. Que tengas permisos de escritura en la BD
4. Los logs de Django para más detalles

---

## ✅ Checklist Post-Ejecución

Después de ejecutar el script, verifica:

- [ ] Clientes creados: `User.objects.filter(is_superuser=False).count()`
- [ ] Productos creados: `Producto.objects.filter(eliminado=False).count()`
- [ ] Pedidos creados: `Pedido.objects.all().count()`
- [ ] Fechas distribuidas: Verifica en el admin de Django
- [ ] Puedes iniciar sesión con las credenciales proporcionadas
- [ ] Los reportes funcionan correctamente

---

**¡Listo para poblar tu base de datos y probar todas las funcionalidades! 🚀**
