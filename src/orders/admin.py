from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username',) #tìm theo tên user
    list_editable = ('status',) #cho phép chỉnh trạng thái ngay trên list
    inlines = [OrderItemInline] #hiển thị chi tiết đơn hàng
    ordering = ('-created_at',)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price') #Vẫn cho quản lý riêng nếu cần
