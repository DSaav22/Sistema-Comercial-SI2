import re
from datetime import datetime, date
from dateutil.relativedelta import relativedelta


def parse_prompt(prompt_text: str) -> dict:
    """
    Interpreta un prompt de texto y extrae información estructurada para generar reportes.
    
    Args:
        prompt_text: Texto del prompt del usuario
        
    Returns:
        dict con: format, start_date, end_date, group_by, columns
    """
    prompt_lower = prompt_text.lower()
    
    result = {
        'format': None,
        'start_date': None,
        'end_date': None,
        'group_by': None,
        'columns': []
    }
    
    # 1. Detectar formato (PDF o Excel)
    if re.search(r'\b(pdf|en pdf)\b', prompt_lower):
        result['format'] = 'pdf'
    elif re.search(r'\b(excel|xlsx|en excel)\b', prompt_lower):
        result['format'] = 'excel'
    else:
        result['format'] = 'pdf'  # Por defecto PDF
    
    # 2. Detectar agrupamiento
    if re.search(r'agrupado por producto|por producto', prompt_lower):
        result['group_by'] = 'producto'
    elif re.search(r'agrupado por cliente|por cliente', prompt_lower):
        result['group_by'] = 'cliente'
    
    # 3. Detectar fechas
    result['start_date'], result['end_date'] = parse_dates(prompt_lower)
    
    # 4. Detectar columnas solicitadas
    result['columns'] = parse_columns(prompt_lower)
    
    return result


def parse_dates(prompt_lower: str):
    """Extrae fechas de inicio y fin del prompt."""
    start_date = None
    end_date = None
    current_year = datetime.now().year
    
    # Patrón para fechas DD/MM/YYYY o DD-MM-YYYY
    date_pattern = r'(\d{1,2})[/-](\d{1,2})[/-](\d{4})'
    dates = re.findall(date_pattern, prompt_lower)
    
    if len(dates) >= 2:
        # Si hay dos fechas, la primera es inicio y la segunda es fin
        try:
            start_date = date(int(dates[0][2]), int(dates[0][1]), int(dates[0][0]))
            end_date = date(int(dates[1][2]), int(dates[1][1]), int(dates[1][0]))
        except ValueError:
            pass
    elif len(dates) == 1:
        # Si hay una fecha, buscar contexto
        try:
            single_date = date(int(dates[0][2]), int(dates[0][1]), int(dates[0][0]))
            if 'desde' in prompt_lower or 'del' in prompt_lower:
                start_date = single_date
                end_date = datetime.now().date()
            else:
                end_date = single_date
        except ValueError:
            pass
    
    # Detectar meses específicos
    meses = {
        'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6,
        'julio': 7, 'agosto': 8, 'septiembre': 9, 'setiembre': 9, 'octubre': 10, 
        'noviembre': 11, 'diciembre': 12
    }
    
    for mes_nombre, mes_num in meses.items():
        if mes_nombre in prompt_lower:
            # Detectar año si está especificado
            year_match = re.search(r'\b(20\d{2})\b', prompt_lower)
            year = int(year_match.group(1)) if year_match else current_year
            
            # Primer día del mes
            start_date = date(year, mes_num, 1)
            # Último día del mes
            if mes_num == 12:
                end_date = date(year, 12, 31)
            else:
                end_date = date(year, mes_num + 1, 1) - relativedelta(days=1)
            break
    
    # Detectar rangos relativos
    if 'ultima semana' in prompt_lower or 'última semana' in prompt_lower:
        end_date = datetime.now().date()
        start_date = end_date - relativedelta(weeks=1)
    elif 'ultimo mes' in prompt_lower or 'último mes' in prompt_lower:
        end_date = datetime.now().date()
        start_date = end_date - relativedelta(months=1)
    elif 'ultimos 30 dias' in prompt_lower or 'últimos 30 días' in prompt_lower:
        end_date = datetime.now().date()
        start_date = end_date - relativedelta(days=30)
    elif 'este mes' in prompt_lower:
        now = datetime.now()
        start_date = date(now.year, now.month, 1)
        end_date = now.date()
    
    return start_date, end_date


def parse_columns(prompt_lower: str):
    """Detecta qué columnas quiere el usuario en el reporte."""
    columns = []
    
    column_keywords = {
        'nombre_cliente': ['nombre del cliente', 'nombre cliente', 'cliente'],
        'cantidad_compras': ['cantidad de compras', 'numero de compras', 'cuantas compras'],
        'monto_total': ['monto total', 'total', 'ventas totales'],
        'fecha': ['fecha', 'fechas'],
        'producto': ['producto', 'productos'],
        'cantidad': ['cantidad', 'cantidades'],
        'precio': ['precio', 'precios'],
        'estado': ['estado', 'estados']
    }
    
    for column_name, keywords in column_keywords.items():
        for keyword in keywords:
            if keyword in prompt_lower:
                if column_name not in columns:
                    columns.append(column_name)
                break
    
    return columns
