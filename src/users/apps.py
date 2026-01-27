from django.apps import AppConfig

#Tự động tạo UserProfile khi tạo User
class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        import users.signals
