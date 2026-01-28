from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'price', 'quantity')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'total_price', 'created_at')
    list_filter = ('status', 'created_at')
    date_hierarchy = 'created_at'
    inlines = [OrderItemInline]

    readonly_fields = (
        'user',
        'total_price',
        'created_at',
        'stock_deducted',
    )

    def has_add_permission(self, request):
        return False
