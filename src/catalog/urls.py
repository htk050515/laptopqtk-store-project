from django.urls import path
from . import views

urlpatterns = [
    path('add-to-cart/<int:product_id>/', views.add_to_cart_ajax, name='add_to_cart_ajax'),
    path('', views.home, name='home'),
    path('category/<int:category_id>/', views.product_by_category, name='product_by_category'),

]


