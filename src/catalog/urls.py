from django.urls import path
from . import views

urlpatterns = [
    path('add-to-cart/<int:product_id>/', views.add_to_cart_ajax, name='add_to_cart_ajax'),
    path('', views.home, name='home'),
    path('category/<int:category_id>/', views.product_by_category, name='product_by_category'),
    path('product/<int:product_id>/', views.product_detail, name='product_detail'),
    path('cart/', views.cart_detail, name='cart_detail'),
    path('remove-from-cart/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('order/create/', views.create_order, name='create_order'),
    path('my-orders/', views.my_orders, name='my_orders'),
    path('my-orders/<int:order_id>/', views.order_detail, name='order_detail'),
    path('statistics/', views.order_statistics, name='order_statistics'),
    path('statistics/revenue/', views.revenue_statistics, name='revenue_statistics'),
    path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),

    
]


