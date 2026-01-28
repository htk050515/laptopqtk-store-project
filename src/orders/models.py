from django.db import models
from django.contrib.auth.models import User
from catalog.models import Product


class Order(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_APPROVED = 'approved'
    STATUS_REJECTED = 'rejected'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_APPROVED, 'Approved'),
        (STATUS_REJECTED, 'Rejected'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='orders' # → user.orders.all() (dùng khi thống kê)
    )
    total_price = models.DecimalField(max_digits=12, decimal_places=2, default=0) #tính tự động từ OrderItem
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING #Đơn mới tạo luôn chờ duyệt
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def update_total_price(self):
        total = sum(
            item.price * item.quantity # tính tổng tiền từ các item
            for item in self.items.all() 
        )
        self.total_price = total
        self.save()


    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items' #→ order.items.all() (dùng khi tính tổng tiền)
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField(default=1) #Không cho số lượng âm
    price = models.DecimalField(max_digits=12, decimal_places=2) #Lưu giá tại thời điểm đặt hàng    

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


