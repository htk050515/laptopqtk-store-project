from django.shortcuts import get_object_or_404, redirect
from .models import Product
from .cart import Cart
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.shortcuts import render
from .models import Category, Product

def add_to_cart(request, product_id):
    cart = Cart(request) #Lấy cart từ session hiện tại
    product = get_object_or_404(Product, id=product_id) #Lấy sản phẩm hoặc trả về 404 nếu không tồn tại

    cart.add(product_id=product.id, quantity=1)

    return redirect('cart_detail') #Chuyển hướng về trang chi tiết giỏ hàng

@require_POST #Bảo mật, không cho GET thêm giỏ hàng
def add_to_cart_ajax(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)

    cart.add(product_id=product.id, quantity=1)

    return JsonResponse({
        'success': True,
        'message': 'Đã thêm sản phẩm vào giỏ hàng',
        'cart_total': cart.get_total_price(),
        'cart_count': sum(item['quantity'] for item in cart.get_items().values()) #Dùng để update icon giỏ hàng trên header
    })


def home(request):
    categories = Category.objects.filter(is_active=True) #Chỉ hiển thị dữ liệu đang bán
    products = Product.objects.filter(is_active=True)

    context = {
        'categories': categories,
        'products': products,
    }

    return render(request, 'home.html', context)


def product_by_category(request, category_id):
    category = get_object_or_404(Category, id=category_id, is_active=True) #Tránh truy cập danh mục không tồn tại
    products = Product.objects.filter(
        category=category,
        is_active=True
    )

    context = {
        'category': category, #để hiển thị tên danh mục
        'products': products, #danh sách sản phẩm thuộc danh mục
    }

    return render(request, 'product_by_category.html', context)