from django.urls import path
from . import views

urlpatterns = [
    path('admin/orders/', views.admin_order_list, name='admin_order_list'),
    path(
        'admin/orders/<int:order_id>/<str:status>/',
        views.admin_update_order_status,
        name='admin_update_order_status'
    ),
]
