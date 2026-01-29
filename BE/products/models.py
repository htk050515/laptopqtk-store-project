from django.db import models


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('student-office', 'Student & Office'),
        ('gaming', 'Gaming'),
        ('business', 'Business'),
        ('design-engineering', 'Design & Engineering'),
        ('accessory', 'Accessory'),
    ]

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    brand = models.CharField(max_length=100, default='Unknown')
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default='student-office'
    )

    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField()
    stock = models.IntegerField(default=0)

    description = models.TextField()

    rating = models.FloatField(default=0)
    featured = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
