from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import F, Sum, Count, Q, Avg
from django.db.models.functions import TruncDate
from .parser import parse_prompt
from .generators import generate_pdf_report, generate_excel_report
from quickstart.models import Pedido, DetallePedido


class GenerateReportView(APIView):
    """
    Vista para generar reportes dinámicos basados en prompts de texto.
    Endpoint: POST /api/reports/generate/
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        # 1. Obtener el prompt
        prompt = request.data.get('prompt', '')
        
        if not prompt:
            return Response(
                {'error': 'El campo "prompt" es requerido.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # 2. Parsear el prompt
        try:
            parsed_data = parse_prompt(prompt)
        except Exception as e:
            return Response(
                {'error': f'Error al interpretar el prompt: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # 3. Construir el QuerySet dinámicamente
        try:
            queryset = self.build_queryset(parsed_data)
        except Exception as e:
            return Response(
                {'error': f'Error al construir la consulta: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Convertir queryset a lista de diccionarios
        data = list(queryset)
        
        # 4. Generar el archivo según el formato
        try:
            if parsed_data['format'] == 'pdf':
                return generate_pdf_report(data, parsed_data)
            elif parsed_data['format'] == 'excel':
                return generate_excel_report(data, parsed_data)
            else:
                return Response(
                    {'error': 'Formato no reconocido. Use "pdf" o "excel".'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {'error': f'Error al generar el reporte: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def build_queryset(self, parsed_data):
        """
        Construye un QuerySet dinámico basado en los parámetros parseados.
        """
        # Comenzar con todos los pedidos
        queryset = Pedido.objects.all()
        
        # Filtrar por fechas
        if parsed_data.get('start_date'):
            queryset = queryset.filter(fecha_creacion__date__gte=parsed_data['start_date'])
        
        if parsed_data.get('end_date'):
            queryset = queryset.filter(fecha_creacion__date__lte=parsed_data['end_date'])
        
        # Agrupar según lo solicitado
        group_by = parsed_data.get('group_by')
        columns = parsed_data.get('columns', [])
        
        if group_by == 'producto':
            # Agrupar por producto
            queryset = DetallePedido.objects.filter(
                id_pedido__in=queryset
            ).values(
                nombre_producto=F('id_producto__nombre')
            ).annotate(
                cantidad_vendida=Sum('cantidad'),
                monto_total=Sum('precio_total'),
                numero_pedidos=Count('id_pedido', distinct=True)
            ).order_by('-monto_total')
            
        elif group_by == 'cliente':
            # Agrupar por cliente
            queryset = queryset.values(
                nombre_cliente=F('id_usuario__username'),
                email_cliente=F('id_usuario__email')
            ).annotate(
                cantidad_compras=Count('id'),
                monto_total=Sum('monto_total')
            ).order_by('-monto_total')
            
        else:
            # Sin agrupamiento, reporte detallado de pedidos
            if columns:
                # Si se especificaron columnas, seleccionarlas
                queryset = self.select_columns(queryset, columns)
            else:
                # Columnas por defecto
                queryset = queryset.values(
                    pedido_id=F('id'),
                    cliente=F('id_usuario__username'),
                    fecha=TruncDate('fecha_creacion'),
                    monto_total=F('monto_total'),
                    estado=F('estado'),
                    direccion=F('direccion_entrega')
                ).order_by('-fecha_creacion')
        
        return queryset
    
    def select_columns(self, queryset, columns):
        """
        Selecciona columnas específicas basadas en las palabras clave detectadas.
        """
        selected_fields = {}
        
        if 'nombre_cliente' in columns or 'cliente' in columns:
            selected_fields['cliente'] = F('id_usuario__username')
        
        if 'cantidad_compras' in columns:
            # Esto requiere agrupamiento
            return queryset.values(
                cliente=F('id_usuario__username')
            ).annotate(
                cantidad_compras=Count('id'),
                monto_total=Sum('monto_total')
            )
        
        if 'monto_total' in columns or 'total' in columns:
            selected_fields['monto_total'] = F('monto_total')
        
        if 'fecha' in columns:
            selected_fields['fecha'] = TruncDate('fecha_creacion')
        
        if 'estado' in columns:
            selected_fields['estado'] = F('estado')
        
        if 'producto' in columns:
            # Para incluir productos, necesitamos ir a DetallePedido
            return DetallePedido.objects.filter(
                id_pedido__in=queryset
            ).values(
                producto=F('id_producto__nombre'),
                cantidad=F('cantidad'),
                precio=F('precio'),
                precio_total=F('precio_total')
            )
        
        # Si no hay campos específicos, usar los predeterminados
        if not selected_fields:
            selected_fields = {
                'pedido_id': F('id'),
                'cliente': F('id_usuario__username'),
                'monto_total': F('monto_total'),
                'estado': F('estado')
            }
        
        return queryset.values(**selected_fields).order_by('-fecha_creacion')

