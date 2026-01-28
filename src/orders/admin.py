from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    can_delete = False
    readonly_fields = ('product', 'price', 'quantity')

    def has_add_permission(self, request, obj):
        return False

    def has_change_permission(self, request, obj=None):
        if obj and obj.status != 'pending':
            return False
        return True



@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    list_editable = ('status',)
    search_fields = ('user__username',)
    date_hierarchy = 'created_at'
    inlines = [OrderItemInline]
    readonly_fields = ('user', 'total_price', 'created_at')

    def get_readonly_fields(self, request, obj=None):
        if obj and obj.status != 'pending':
            return self.readonly_fields + ('status',)
        return self.readonly_fields

    def save_model(self, request, obj, form, change):
        old_status = None
        if obj.pk:
            old_status = Order.objects.get(pk=obj.pk).status

        super().save_model(request, obj, form, change)

        if old_status == 'pending' and obj.status == 'approved':
            obj.deduct_stock()

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'price', 'quantity')
