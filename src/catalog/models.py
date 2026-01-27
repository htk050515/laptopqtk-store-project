from django.db import models

#Kích hoạt quản lý danh mục sản phẩm
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True) #tránh trùng danh mục
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True) #ẩn/hiện khi bán
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories" #Admin hiển thị đẹp
        ordering = ['name']     #Sắp xếp theo tên danh mục --> danh mục luôn gọn gàng

    def __str__(self):
        return self.name

#Mô hình sản phẩm
class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products' #category.products.all()
    )
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=12, decimal_places=2)    
    stock = models.PositiveIntegerField(default=0)      #không âm
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True) #ảnh sản phẩm
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
