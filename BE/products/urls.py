from django.urls import path
from .views import ( ProductListAPIView, ProductDetailAPIView, RelatedProductListAPIView )

urlpatterns = [
    path("", ProductListAPIView.as_view(), name="product-list"),
    path("<slug:slug>/", ProductDetailAPIView.as_view(), name="product-detail"),
    path("<slug:slug>/related/", RelatedProductListAPIView.as_view(), name="product-related"),
]
