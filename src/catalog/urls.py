from django.urls import path
from . import views

urlpatterns = [
    path('add-to-cart/<int:product_id>/', views.add_to_cart_ajax, name='add_to_cart_ajax'),
    path('', views.home, name='home'),
    path('category/<int:category_id>/', views.product_by_category, name='product_by_category'),
    path('product/<int:product_id>/', views.product_detail, name='product_detail'),
    path('cart/', views.cart_detail, name='cart_detail'),
    path('remove-from-cart/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    
]


