from django.contrib import admin
from django.db.models import Count, Sum
from .models import Order, OrderItem
from django.db.models.functions import TruncDate
from django.db.models import Sum, F
from django.db.models.functions import Coalesce
from catalog.models import Product
from .models import OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'price', 'quantity')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    date_hierarchy = 'created_at'

    def changelist_view(self, request, extra_context=None):
        top_products = (
            OrderItem.objects
            .filter(order__status='approved')
            .values(
                'product__id',
                'product__name'
                )
        .annotate(
            total_qty=Sum('quantity'),
            revenue=Sum(F('price') * F('quantity'))
        )
        .order_by('-total_qty')[:5]
)
        response.context_data.update({
    'top_products': top_products,
})
        response = super().changelist_view(request, extra_context)

        try:
            # ====== KPI ======
            total_orders = Order.objects.count()
            pending_orders = Order.objects.filter(status='pending').count()
            approved_orders = Order.objects.filter(status='approved').count()
            total_revenue = (
                Order.objects
                .filter(status='approved')
                .aggregate(total=Sum('total_price'))['total'] or 0
            )

            # ====== CHART ======
            qs = (
                Order.objects
                .filter(status='approved')
                .annotate(date=TruncDate('created_at'))
                .values('date')
                .annotate(total=Sum('total_price'))
                .order_by('date')
            )

            response.context_data.update({
                'total_orders': total_orders,
                'pending_orders': pending_orders,
                'approved_orders': approved_orders,
                'total_revenue': total_revenue,
                'chart_labels': [q['date'].strftime('%d/%m') for q in qs],
                'chart_values': [float(q['total']) for q in qs],
            })

        except Exception:
            pass

        return response
