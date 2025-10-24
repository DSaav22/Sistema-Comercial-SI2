# Módulo de Reportes Dinámicos - SmartSales365

## 📊 Descripción

El Módulo de Reportes Dinámicos permite a los usuarios generar reportes personalizados de ventas utilizando **lenguaje natural** (texto o voz). Los usuarios pueden solicitar reportes en formato **PDF** o **Excel** sin necesidad de conocimientos técnicos.

## ✨ Características

- ✅ **Interpretación de Lenguaje Natural**: Parser inteligente que entiende prompts en español
- ✅ **Reconocimiento de Voz**: Integración con Web Speech API para dictado
- ✅ **Generación de PDF**: Reportes profesionales con ReportLab
- ✅ **Generación de Excel**: Archivos Excel editables con openpyxl
- ✅ **Filtros Dinámicos**: Por fechas, productos, clientes
- ✅ **Agrupamiento**: Por producto o cliente
- ✅ **Descarga Automática**: Los archivos se descargan directamente

---

## 🏗️ Arquitectura

### Backend (Django REST Framework)

```
Backend/
├── sales_reports/
│   ├── __init__.py
│   ├── parser.py           # Interpreta prompts de texto
│   ├── generators.py       # Genera PDF y Excel
│   ├── views.py            # API View para generar reportes
│   └── urls.py             # URLs del módulo
```

#### Componentes Clave:

1. **parser.py**: 
   - Función `parse_prompt()` que extrae información del prompt
   - Detecta formato (PDF/Excel)
   - Extrae fechas con regex
   - Identifica agrupamientos
   - Detecta columnas solicitadas

2. **generators.py**:
   - `generate_pdf_report()`: Crea PDFs con ReportLab
   - `generate_excel_report()`: Crea archivos Excel con openpyxl

3. **views.py**:
   - `GenerateReportView`: APIView que procesa las solicitudes
   - Construye QuerySets dinámicos basados en el prompt
   - Retorna archivos como HttpResponse

### Frontend (React)

```
Frontend/src/
├── views/pages/reports/
│   └── ReportsPage.jsx     # Página principal de reportes
├── router/
│   └── AppRouter.jsx       # Configuración de rutas
└── api/
    └── ecommerceApi.js     # Cliente Axios
```

#### Componentes Clave:

1. **ReportsPage.jsx**:
   - Textarea para escribir prompts
   - Botón de reconocimiento de voz
   - Ejemplos de prompts
   - Manejo de descarga de archivos con file-saver

---

## 🚀 Instalación

### Backend

1. Instalar dependencias:
```bash
cd Backend
pip install reportlab openpyxl python-dateutil
```

2. Agregar `'sales_reports'` a `INSTALLED_APPS` en `settings.py`

3. Configurar URLs en `parcial1/urls.py`:
```python
path('api/reports/', include('sales_reports.urls')),
```

### Frontend

1. Instalar dependencias:
```bash
cd Frontend
npm install file-saver
```

2. Importar y configurar la ruta en `AppRouter.jsx`

---

## 📖 Uso

### Ejemplos de Prompts

#### Ejemplo 1: Reporte mensual en PDF
```
Quiero un reporte de ventas del mes de septiembre, agrupado por producto, en PDF
```

**Resultado**: 
- Formato: PDF
- Fechas: 01/09/2025 - 30/09/2025
- Agrupado por: Producto
- Columnas: Nombre producto, cantidad vendida, monto total

#### Ejemplo 2: Reporte con rango de fechas en Excel
```
Reporte en Excel del 01/10/2024 al 31/10/2024 con nombre del cliente y monto total
```

**Resultado**:
- Formato: Excel
- Fechas: 01/10/2024 - 31/10/2024
- Columnas: Nombre cliente, monto total

#### Ejemplo 3: Reporte del último mes
```
Genera un reporte PDF de las ventas del último mes
```

**Resultado**:
- Formato: PDF
- Fechas: Últimos 30 días
- Vista detallada de pedidos

#### Ejemplo 4: Reporte agrupado por cliente
```
Necesito un reporte en Excel agrupado por cliente con la cantidad de compras
```

**Resultado**:
- Formato: Excel
- Agrupado por: Cliente
- Columnas: Nombre cliente, cantidad de compras, monto total

---

## 🔧 API Reference

### Endpoint: `POST /api/reports/generate/`

**Autenticación**: Requerida (JWT Token)

**Request Body**:
```json
{
  "prompt": "Quiero un reporte de ventas del mes de septiembre en PDF"
}
```

**Response**:
- Content-Type: `application/pdf` o `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- Content-Disposition: `attachment; filename="reporte_ventas.pdf"`
- Body: Archivo binario (PDF o Excel)

**Errores**:
```json
{
  "error": "Descripción del error"
}
```

---

## 🎯 Palabras Clave Reconocidas

### Formatos:
- `pdf`, `en pdf` → PDF
- `excel`, `xlsx`, `en excel` → Excel

### Fechas:
- `septiembre`, `octubre`, etc. → Mes específico
- `01/10/2024` → Fecha exacta (DD/MM/YYYY)
- `último mes`, `última semana` → Rangos relativos
- `este mes` → Mes actual

### Agrupamiento:
- `agrupado por producto`, `por producto` → Agrupa por producto
- `agrupado por cliente`, `por cliente` → Agrupa por cliente

### Columnas:
- `nombre del cliente`, `cliente` → Incluye nombre de cliente
- `cantidad de compras` → Incluye número de pedidos
- `monto total`, `total` → Incluye monto total
- `fecha`, `producto`, `estado`, etc.

---

## 🧪 Testing

### Probar el Parser

```python
from sales_reports.parser import parse_prompt

# Test 1
result = parse_prompt("Quiero un reporte de ventas del mes de septiembre, agrupado por producto, en PDF")
print(result)
# {'format': 'pdf', 'start_date': date(2025, 9, 1), 'end_date': date(2025, 9, 30), 'group_by': 'producto', 'columns': []}

# Test 2
result = parse_prompt("reporte en Excel del 01/10/2024 al 31/10/2024 con nombre del cliente y monto total")
print(result)
# {'format': 'excel', 'start_date': date(2024, 10, 1), 'end_date': date(2024, 10, 31), 'group_by': None, 'columns': ['nombre_cliente', 'monto_total']}
```

### Probar el Endpoint con cURL

```bash
curl -X POST http://localhost:8000/api/reports/generate/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Reporte PDF del último mes"}' \
  --output reporte.pdf
```

---

## 📝 Notas Técnicas

### QuerySet Dinámico

El módulo construye QuerySets dinámicamente usando:
- `F()` expressions para referencias a campos
- `.annotate()` para agregaciones (Sum, Count, Avg)
- `.values()` para selección de columnas
- `.filter()` para rangos de fechas

### Generación de PDFs

- Usa `ReportLab` con `SimpleDocTemplate`
- Tablas con estilos personalizados
- Headers y footers automáticos
- Generación en memoria (BytesIO)

### Generación de Excel

- Usa `openpyxl` con workbooks
- Estilos (fuentes, colores, bordes)
- Ajuste automático de columnas
- Múltiples hojas (si es necesario)

---

## 🐛 Troubleshooting

### Error: "El campo 'prompt' es requerido"
**Solución**: Asegúrate de enviar el campo `prompt` en el body de la petición POST.

### Error: No se descarga el archivo
**Solución**: Verifica que estés usando `responseType: 'blob'` en la configuración de Axios.

### Error: "Error al interpretar el prompt"
**Solución**: Revisa que el prompt esté en español y use palabras clave reconocidas.

### No se genera correctamente el PDF
**Solución**: Verifica que `reportlab` esté instalado correctamente con `pip list | grep reportlab`.

---

## 🔮 Mejoras Futuras

- [ ] Integración con NLP avanzado (spaCy, transformers)
- [ ] Gráficos en reportes (matplotlib, plotly)
- [ ] Envío por email automático
- [ ] Programación de reportes periódicos
- [ ] Más formatos (CSV, JSON, XML)
- [ ] Filtros avanzados (por estado, rango de precios, etc.)
- [ ] Múltiples idiomas
- [ ] Cache de reportes frecuentes

---

## 📄 Licencia

Este módulo es parte del proyecto SmartSales365.

---

## 👥 Contribuidores

- Backend: Django REST Framework + ReportLab + openpyxl
- Frontend: React + React Speech Recognition + file-saver

---

## 📞 Soporte

Para reportar bugs o solicitar features, contacta al equipo de desarrollo.
