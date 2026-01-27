from django.contrib import admin
from .models import UserProfile

#Đăng ký UserProfile vào Admin  
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'phone')
    search_fields = ('user__username', 'full_name', 'phone')
