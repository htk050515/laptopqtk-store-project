from django.apps import AppConfig


class OrdersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'orders'
#Kích hoạt signals
    def ready(self):
        import orders.signals
