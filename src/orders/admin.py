from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'price', 'quantity')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    list_editable = ('status',)  # QUAN TRỌNG cho phép chỉnh sửa trạng thái trực tiếp
    search_fields = ('user__username',)
    date_hierarchy = 'created_at'
    inlines = [OrderItemInline]

    def save_model(self, request, obj, form, change):
        """
        Hook khi admin thay đổi Order
        """
        super().save_model(request, obj, form, change)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'price', 'quantity')
