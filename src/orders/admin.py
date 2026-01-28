from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline): #Hiển thị OrderItem trong trang chi tiết Order
    model = OrderItem
    extra = 0


@admin.register(Order) #Đăng ký Order vào Admin
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('id', 'user__username') #Tìm kiếm theo ID đơn hàng và tên user
    inlines = [OrderItemInline] #Hiển thị các OrderItem liên quan trong trang chi tiết Order
    actions = ['approve_orders', 'reject_orders'] #Hành động hàng loạt để duyệt hoặc từ chối đơn hàng

    def approve_orders(self, request, queryset):
        queryset.update(status='approved')
    approve_orders.short_description = "Approve selected orders"

    def reject_orders(self, request, queryset):
        queryset.update(status='rejected')
    reject_orders.short_description = "Reject selected orders"
