from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Product
from .serializers import ProductSerializer
from django.db.models import Q
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True)

        brand = self.request.query_params.get('brand')
        category = self.request.query_params.get('category')

        if brand:
            qs = qs.filter(brand__iexact=brand)

        if category:
            qs = qs.filter(category=category)

        return qs



class ProductDetailAPIView(RetrieveAPIView):
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_object(self):
        return get_object_or_404(
            Product,
            slug=self.kwargs['slug'],
            is_active=True
        )

from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

class RelatedProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        slug = self.kwargs.get("slug")

        try:
            product = Product.objects.get(slug=slug)
        except Product.DoesNotExist:
            return Product.objects.none()

        return (
            Product.objects
            .filter(category=product.category, is_active=True)
            .exclude(id=product.id)
            [:4]
        )