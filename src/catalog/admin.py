from django.contrib import admin
from .models import Category, Product

#Đăng ký Category vào Admin
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'created_at')
    list_filter = ('is_active',) #lọc theo trạng thái
    search_fields = ('name',)
    ordering = ('name',)

#Đăng ký Product vào Admin
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'is_active', 'created_at')
    list_filter = ('category', 'is_active') #lọc theo danh mục và trạng thái
    search_fields = ('name',)
    list_editable = ('price', 'stock', 'is_active') #cho phép chỉnh giá, tồn kho, trạng thái ngay trên list
    ordering = ('-created_at',) #sản phẩm mới tạo --> lên đầu
