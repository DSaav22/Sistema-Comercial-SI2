# 🛍️ SmartSales365 - Sistema Comercial E-Commerce

Sistema integral de comercio electrónico con gestión de productos, inventarios, pedidos y generación de reportes dinámicos mediante lenguaje natural.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Django](https://img.shields.io/badge/Django-4.2.14-green.svg)
![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Módulos Implementados](#-módulos-implementados)
- [Usuarios y Permisos](#-usuarios-y-permisos)
- [API Endpoints](#-api-endpoints)
- [Comandos Útiles](#-comandos-útiles)
- [Documentación Adicional](#-documentación-adicional)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Características

### Gestión Comercial
- ✅ **Gestión de Productos**: CRUD completo con categorías, precios e imágenes
- ✅ **Gestión de Inventario**: Control de stock por sucursal
- ✅ **Carrito de Compras**: Con soporte de voz y texto
- ✅ **Procesamiento de Pedidos**: Estados (pendiente, confirmado, enviado, entregado, cancelado)
- ✅ **Integración de Pagos**: Stripe con webhooks
- ✅ **Múltiples Sucursales**: Gestión de inventario distribuido

### Módulo de Reportes Dinámicos 🆕
- ✅ **Generación por Voz o Texto**: Usa lenguaje natural para solicitar reportes
- ✅ **Múltiples Formatos**: PDF y Excel
- ✅ **Filtros Inteligentes**: Por fechas, productos, clientes
- ✅ **Agrupamiento Dinámico**: Por producto o cliente
- ✅ **Parser de Lenguaje Natural**: Interpreta prompts en español
- ✅ **Descarga Automática**: Archivos listos para usar

### Características Técnicas
- ✅ **Autenticación JWT**: Tokens con refresh y blacklist
- ✅ **CORS Configurado**: Comunicación backend-frontend
- ✅ **Soft Delete**: Eliminación lógica de registros
- ✅ **API RESTful**: Endpoints bien estructurados
- ✅ **Reconocimiento de Voz**: Web Speech API integrada
- ✅ **Responsive Design**: Bootstrap 5

---

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: Django 4.2.14
- **API**: Django REST Framework 3.16.0
- **Autenticación**: djangorestframework-simplejwt 5.5.0
- **Base de Datos**: PostgreSQL (psycopg2-binary 2.9.10)
- **Pagos**: Stripe 12.0.1
- **Reportes PDF**: ReportLab 4.4.4
- **Reportes Excel**: openpyxl 3.1.5
- **Datos Sintéticos**: Faker 37.8.0
- **CORS**: django-cors-headers 4.7.0

### Frontend
- **Framework**: React 19.0.0
- **Bundler**: Vite 6.2.5
- **Estado Global**: Redux Toolkit 2.6.1 + Redux Persist 6.0.0
- **Routing**: React Router DOM 7.5.0
- **HTTP Client**: Axios 1.8.4
- **Formularios**: Formik 2.4.6
- **Pagos**: @stripe/stripe-js 7.2.0
- **Mapas**: React Leaflet 5.0.0 + Leaflet 1.9.4
- **Voz**: react-speech-recognition 4.0.0
- **Notificaciones**: React Toastify 11.0.5 + SweetAlert2 11.19.1
- **Descarga de Archivos**: file-saver (latest)

### Base de Datos
- **PostgreSQL**: Base de datos principal
- **Gestión**: python-decouple 3.8 para variables de entorno

---

## 📁 Arquitectura del Proyecto

```
Sistema-Comercial-SI2/
├── Backend/
│   ├── parcial1/                    # Proyecto principal Django
│   │   ├── settings.py              # Configuración
│   │   ├── urls.py                  # URLs principales
│   │   └── wsgi.py
│   ├── quickstart/                  # App principal
│   │   ├── models.py                # Modelos (Usuario, Producto, Pedido, etc.)
│   │   ├── views.py                 # Vistas API
│   │   ├── serializers.py           # Serializers DRF
│   │   ├── admin.py
│   │   ├── management/              # Management commands
│   │   │   └── commands/
│   │   │       └── populate_db.py   # Script de población
│   │   └── migrations/
│   ├── sales_reports/               # Módulo de Reportes 🆕
│   │   ├── parser.py                # Parser de lenguaje natural
│   │   ├── generators.py            # Generadores PDF/Excel
│   │   ├── views.py                 # API de reportes
│   │   └── urls.py
│   ├── fixtures/                    # Datos iniciales
│   ├── media/                       # Archivos subidos
│   ├── .env                         # Variables de entorno
│   ├── manage.py
│   └── requirements.txt
│
├── Frontend/
│   ├── src/
│   │   ├── api/                     # Clientes API
│   │   │   ├── ecommerceApi.js
│   │   │   └── ecommerceApiOpen.js
│   │   ├── controllers/             # Hooks personalizados
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── product/
│   │   │   └── ...
│   │   ├── store/                   # Redux store
│   │   │   ├── store.js
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   └── ...
│   │   ├── views/
│   │   │   ├── pages/
│   │   │   │   ├── auth/
│   │   │   │   ├── cart/
│   │   │   │   ├── order/
│   │   │   │   ├── reports/         # Módulo de Reportes 🆕
│   │   │   │   │   └── ReportsPage.jsx
│   │   │   │   └── ...
│   │   │   ├── components/
│   │   │   └── ui/
│   │   ├── router/
│   │   │   └── AppRouter.jsx
│   │   ├── helpers/
│   │   │   └── SpeechRecognition.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── public/
│   ├── .env                         # Variables de entorno
│   ├── package.json
│   └── vite.config.js
│
├── REPORTS_MODULE_README.md         # Documentación de Reportes 🆕
├── DATABASE_SEEDING_README.md       # Documentación de Seeding 🆕
└── README.md                        # Este archivo
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Python 3.11+
- Node.js 16+
- PostgreSQL 12+
- npm o yarn

### 1. Clonar el Repositorio

```bash
git clone https://github.com/DSaav22/Sistema-Comercial-SI2.git
cd Sistema-Comercial-SI2
```

### 2. Configurar Backend

#### 2.1 Crear entorno virtual

```bash
cd Backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

#### 2.2 Instalar dependencias

```bash
pip install -r requirements.txt
```

#### 2.3 Configurar variables de entorno

Crear archivo `.env` en `Backend/`:

```env
# Base de datos PostgreSQL
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=sistema_comercial_db
DB_HOST=localhost
DB_PORT=5432

# Stripe (para pagos)
STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_aqui
STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica_aqui
```

#### 2.4 Configurar PostgreSQL

```sql
-- Conectarse a PostgreSQL
psql -U postgres

-- Crear la base de datos
CREATE DATABASE sistema_comercial_db;

-- Salir
\q
```

#### 2.5 Aplicar migraciones

```bash
python manage.py migrate
```

#### 2.6 Crear superusuario

```bash
python manage.py createsuperuser
```

#### 2.7 Poblar base de datos (Opcional pero recomendado)

```bash
python manage.py populate_db --pedidos=150 --clientes=25
```

Este comando crea:
- 25 clientes con credenciales `password123`
- 55 productos en 7 categorías
- 150 pedidos con fechas distribuidas en los últimos 12 meses
- 3 sucursales con inventario

#### 2.8 Ejecutar servidor

```bash
python manage.py runserver
```

Backend corriendo en: `http://127.0.0.1:8000/`

### 3. Configurar Frontend

#### 3.1 Instalar dependencias

```bash
cd Frontend
npm install
# o
yarn install
```

#### 3.2 Configurar variables de entorno

Crear archivo `.env` en `Frontend/`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

#### 3.3 Ejecutar servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

Frontend corriendo en: `http://localhost:5173/`

---

## 🎯 Módulos Implementados

### 1. Módulo de Gestión Comercial Básica

#### Gestión de Productos
- **Ubicación**: `/admin/product`
- **Funciones**: CRUD completo, categorización, precios, imágenes
- **Modelos**: `Producto`, `Categoria`

#### Gestión de Inventario
- **Ubicación**: `/admin/inventory`
- **Funciones**: Control de stock por sucursal
- **Modelo**: `Inventario`

#### Carrito de Compras
- **Ubicación**: `/admin/cart` (admin), carrito flotante (clientes)
- **Funciones**: Agregar/quitar productos por texto o voz
- **Modelos**: `Carrito`, `DetalleCarrito`

#### Procesamiento de Pedidos
- **Ubicación**: `/orders`
- **Funciones**: Ver histórico, estados, detalles
- **Modelos**: `Pedido`, `DetallePedido`

#### Integración de Pagos
- **Proveedor**: Stripe
- **Endpoints**: `/api/pagar/`, `/api/stripe/webhook/`
- **Estados**: pendiente → confirmado/cancelado

### 2. Módulo de Reportes Dinámicos 🆕

**El módulo más reciente e innovador del sistema.**

#### Características
- **Ubicación**: `/reports`
- **Entrada**: Texto o voz en lenguaje natural
- **Salida**: Archivos PDF o Excel descargables
- **Parser**: Interpreta fechas, formatos, agrupamientos

#### Ejemplos de Prompts

```
"Quiero un reporte de ventas del mes de septiembre, agrupado por producto, en PDF"
"Reporte en Excel del 01/10/2024 al 31/10/2024 con nombre del cliente"
"Genera un reporte PDF de las ventas del último mes"
"Necesito un reporte en Excel agrupado por cliente"
```

#### Componentes Técnicos
- **Backend**: `sales_reports/` app
- **Parser**: `parser.py` con regex y lógica de fechas
- **Generadores**: `generators.py` con ReportLab y openpyxl
- **API**: `POST /api/reports/generate/`
- **Frontend**: `ReportsPage.jsx` con reconocimiento de voz

#### Documentación Completa
Ver: `REPORTS_MODULE_README.md`

---

## 👥 Usuarios y Permisos

### Tipos de Usuario

#### 1. Superusuario (Admin)
**Acceso**: Panel de administración Django + todas las rutas

**Permisos**:
- ✅ Acceso al admin de Django (`/admin/`)
- ✅ CRUD completo de productos
- ✅ Gestión de inventarios
- ✅ Gestión de categorías
- ✅ Gestión de sucursales
- ✅ Ver todos los pedidos
- ✅ Gestión de usuarios
- ⚠️ **Limitación**: No puede generar reportes desde `/reports` (requiere autenticación de cliente)

**Cómo crear**:
```bash
python manage.py createsuperuser
```

#### 2. Cliente (Usuario Regular)
**Acceso**: Interfaz de usuario completa

**Permisos**:
- ✅ Ver catálogo de productos (`/products`)
- ✅ Carrito de compras con voz
- ✅ Realizar pedidos y pagos
- ✅ Ver sus propios pedidos (`/orders`)
- ✅ **Generar reportes** (`/reports`) 🆕
- ❌ No acceso al admin de Django
- ❌ No puede modificar productos

**Cómo crear**:
- **Opción 1**: Registro en `/auth/login` (botón "Crear cuenta")
- **Opción 2**: Script de población
  ```bash
  python manage.py populate_db --clientes=10
  ```
  Credenciales: `cliente_xxxxx` / `password123`

### Permisos del Módulo de Reportes

**Endpoint**: `POST /api/reports/generate/`

**Autenticación**: `IsAuthenticated` (JWT Token requerido)

**Acceso**:
- ✅ Clientes autenticados pueden generar reportes de sus propias ventas
- ⚠️ Administradores necesitan usar una cuenta de cliente para acceder a `/reports`
- 🔧 **Nota técnica**: El permiso `IsAuthenticated` requiere un token JWT válido, que se obtiene al hacer login como cliente

**Solución para Admins**:

Si eres admin y quieres generar reportes:

1. **Opción A**: Crea una cuenta de cliente adicional
   ```bash
   python manage.py shell
   >>> from django.contrib.auth.models import User
   >>> User.objects.create_user('admin_reports', 'admin@example.com', 'password123')
   ```

2. **Opción B**: Inicia sesión con una cuenta de cliente existente (creada por `populate_db`)

3. **Opción C** (Modificación): Cambiar el permiso en `sales_reports/views.py`:
   ```python
   # Cambiar de:
   permission_classes = [IsAuthenticated]
   
   # A:
   permission_classes = [IsAuthenticated, IsAdminUser]
   # o
   permission_classes = [AllowAny]  # Solo para desarrollo
   ```

### Credenciales de Prueba

Después de ejecutar `populate_db`:

```
Usuario: cliente_ninohugo_0 (o similar, revisa la salida del comando)
Contraseña: password123
```

O cualquier otro cliente generado con el mismo patrón.

---

## 🔌 API Endpoints

### Autenticación

```
POST   /api/register              # Registro de usuario
POST   /api/token                 # Login (obtener token JWT)
POST   /api/token/refresh         # Refrescar token
POST   /api/token/logout          # Logout (blacklist token)
```

### Productos y Categorías

```
GET    /api/productos/            # Listar productos
GET    /api/productos/{id}/       # Detalle de producto
POST   /api/productos/            # Crear producto (admin)
PUT    /api/productos/{id}/       # Actualizar producto (admin)
DELETE /api/productos/{id}/       # Eliminar producto (soft delete)

GET    /api/categorias/           # Listar categorías
POST   /api/categorias/           # Crear categoría (admin)
```

### Inventario y Sucursales

```
GET    /api/inventarios/          # Listar inventarios
GET    /api/sucursales/           # Listar sucursales
POST   /api/inventarios/          # Crear/actualizar inventario
```

### Carrito y Pedidos

```
GET    /api/carritos/             # Listar carritos
POST   /api/carritos/             # Crear carrito
GET    /api/detalles_carrito/     # Detalles del carrito
POST   /api/detalles_carrito/     # Agregar producto al carrito
DELETE /api/detalles_carrito/{id}/ # Quitar producto

GET    /api/ultimo_carrito/       # Obtener último carrito del usuario

GET    /api/pedidos/              # Listar pedidos del usuario
GET    /api/pedidos/{id}/         # Detalle de pedido
PATCH  /api/pedidos/{id}/         # Actualizar estado
GET    /api/pedidos/todos/        # Todos los pedidos (admin)
```

### Pagos (Stripe)

```
POST   /api/pagar/                # Iniciar checkout de Stripe
POST   /api/stripe/webhook/       # Webhook de Stripe (callback)
```

### Reportes 🆕

```
POST   /api/reports/generate/     # Generar reporte dinámico
```

**Request Body**:
```json
{
  "prompt": "Quiero un reporte de ventas del mes de septiembre en PDF"
}
```

**Response**: Archivo binario (PDF o Excel)

**Headers**:
- `Authorization: Bearer {token}`
- `Content-Type: application/json`

---

## 💻 Comandos Útiles

### Backend

```bash
# Migraciones
python manage.py makemigrations
python manage.py migrate

# Superusuario
python manage.py createsuperuser

# Poblar base de datos
python manage.py populate_db --pedidos=200 --clientes=30
python manage.py populate_db --limpiar  # Limpiar y repoblar

# Cargar fixtures
python manage.py loaddata fixtures/categorias.json
python manage.py loaddata fixtures/productos.json

# Servidor
python manage.py runserver
python manage.py runserver 0.0.0.0:8000  # Exponer en red local

# Shell
python manage.py shell

# Tests
python manage.py test
```

### Frontend

```bash
# Desarrollo
npm run dev
yarn dev

# Producción
npm run build
npm run preview

# Linting
npm run lint
```

---

## 📚 Documentación Adicional

### Documentos Incluidos

1. **`REPORTS_MODULE_README.md`** 🆕
   - Documentación completa del módulo de reportes
   - Ejemplos de prompts
   - Guía de personalización
   - API reference detallada

2. **`DATABASE_SEEDING_README.md`** 🆕
   - Guía del script `populate_db`
   - Opciones y parámetros
   - Casos de uso
   - Troubleshooting

### Recursos Externos

- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Stripe API](https://stripe.com/docs/api)
- [ReportLab User Guide](https://www.reportlab.com/docs/reportlab-userguide.pdf)

---

## 🐛 Troubleshooting

### Backend

#### Error: "No such table"
```bash
python manage.py migrate
```

#### Error: "Connection refused" (PostgreSQL)
- Verifica que PostgreSQL esté corriendo
- Revisa las credenciales en `.env`
- Comprueba que la base de datos existe

#### Error: Stripe webhooks fallan
- Verifica que `STRIPE_WEBHOOK_SECRET` esté configurado
- En desarrollo, usa Stripe CLI para testing

### Frontend

#### Error: "Network Error" al llamar API
- Verifica que el backend esté corriendo
- Comprueba que `VITE_API_URL` esté configurado en `.env`
- Reinicia el servidor frontend después de cambiar `.env`

#### Error: Reconocimiento de voz no funciona
- Usa HTTPS o localhost
- Permite permisos de micrófono en el navegador
- Compatible solo con Chrome/Edge

#### Error: No se descarga el reporte
- Verifica que estés autenticado (token válido)
- Comprueba la consola del navegador (F12)
- Asegúrate de que `responseType: 'blob'` esté configurado

### Módulo de Reportes

#### No hay datos en el reporte
```bash
# Poblar con más datos
python manage.py populate_db --pedidos=200
```

#### Error: "El campo 'prompt' es requerido"
- Verifica que estés enviando el campo `prompt` en el body

#### Error 403: Forbidden
- Verifica que estés autenticado como cliente (no admin)
- Obtén un nuevo token si ha expirado

---

## 🔐 Variables de Entorno

### Backend `.env`

```env
# Base de datos
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=sistema_comercial_db
DB_HOST=localhost
DB_PORT=5432

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx

# Django (opcional)
DEBUG=True
SECRET_KEY=tu-secret-key-aqui
```

### Frontend `.env`

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## 🧪 Testing

### Probar el Sistema Completo

1. **Poblar la base de datos**:
   ```bash
   python manage.py populate_db --pedidos=150 --clientes=25
   ```

2. **Iniciar backend**:
   ```bash
   python manage.py runserver
   ```

3. **Iniciar frontend**:
   ```bash
   cd Frontend
   npm run dev
   ```

4. **Iniciar sesión** en `http://localhost:5173/`
   - Usuario: `cliente_xxxxx` (revisa output de populate_db)
   - Contraseña: `password123`

5. **Probar funcionalidades**:
   - Ver productos: `/products`
   - Agregar al carrito (con voz)
   - Realizar pedido
   - Ver pedidos: `/orders`
   - **Generar reporte**: `/reports` 🆕
     - Prompt: "Reporte PDF de septiembre 2024 agrupado por producto"

---

## 📊 Estado del Proyecto

### Módulos Completados ✅

- ✅ Autenticación JWT
- ✅ Gestión de productos y categorías
- ✅ Gestión de inventario por sucursal
- ✅ Carrito de compras con reconocimiento de voz
- ✅ Procesamiento de pedidos
- ✅ Integración con Stripe
- ✅ **Módulo de Reportes Dinámicos** 🆕
- ✅ **Script de población de base de datos** 🆕

### Módulos Pendientes ⏳

- ⏳ Módulo de Dashboard con IA (predicciones)
- ⏳ Aplicación móvil Flutter
- ⏳ Documentación API con Swagger
- ⏳ Diagramas UML
- ⏳ Tests automatizados
- ⏳ Notificaciones push

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es parte de un trabajo académico para el curso de Sistemas de Información II.

---

## 👨‍💻 Autor

**Diego Saavedra**
- GitHub: [@DSaav22](https://github.com/DSaav22)
- Proyecto: Sistema-Comercial-SI2

---

## 📞 Soporte

Para reportar bugs, solicitar features o hacer preguntas:
1. Abre un [Issue](https://github.com/DSaav22/Sistema-Comercial-SI2/issues)
2. Revisa la documentación adicional en los archivos `*_README.md`
3. Consulta el código fuente con comentarios explicativos

---

## 🎓 Agradecimientos

- Profesor y equipo docente de SI2
- Comunidad de Django y React
- Librerías open source utilizadas

---

**Última actualización**: Octubre 2025

**Versión**: 1.0.0 - Módulo de Reportes Dinámicos implementado

---

## 🚀 Quick Start

```bash
# Backend
cd Backend
pip install -r requirements.txt
python manage.py migrate
python manage.py populate_db --pedidos=150 --clientes=25
python manage.py runserver

# Frontend (nueva terminal)
cd Frontend
npm install
npm run dev

# Acceder a:
# Frontend: http://localhost:5173
# Backend: http://127.0.0.1:8000
# Admin: http://127.0.0.1:8000/admin

# Login:
# Usuario: cliente_xxxxx (ver output de populate_db)
# Contraseña: password123
```

**¡Ya puedes generar reportes en `/reports`!** 📊