from django.contrib import admin
from django.db.models import Sum
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'price', 'quantity')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'total_price',
        'status',
        'created_at'
    )

    list_filter = ('status', 'created_at')
    search_fields = ('user__username',)
    date_hierarchy = 'created_at'

    readonly_fields = ('total_price', 'created_at')
    inlines = [OrderItemInline]

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}

        total_revenue = (
            Order.objects
            .filter(status=Order.STATUS_APPROVED)
            .aggregate(total=Sum('total_price'))
            .get('total') or 0
        )

        extra_context['total_revenue'] = total_revenue
        return super().changelist_view(request, extra_context=extra_context)
