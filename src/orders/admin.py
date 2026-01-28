from django.contrib import admin
from django.db.models import Sum
from .models import Order, OrderItem
from django.db.models.functions import TruncDate


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
        response = super().changelist_view(request, extra_context)

        try:
            qs = (
                Order.objects
                .filter(status='approved')
                .annotate(date=TruncDate('created_at'))
                .values('date')
                .annotate(total=Sum('total_price'))
                .order_by('date')
            )

            dates = [q['date'].strftime('%d/%m') for q in qs]
            totals = [float(q['total']) for q in qs]

            response.context_data['chart_labels'] = dates
            response.context_data['chart_values'] = totals

        except Exception:
            pass

        return response
