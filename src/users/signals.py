from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.contrib.auth.signals import user_logged_in
from .models import UserProfile


# 1️ Tạo profile khi tạo user
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(
            user=instance,
            full_name=instance.username
        )


# 2 Merge cart khi user login
@receiver(user_logged_in)
def merge_cart_after_login(sender, request, user, **kwargs):
    old_cart = request.session.get('cart')

    if old_cart:
        request.session['cart'] = old_cart
        request.session.modified = True
