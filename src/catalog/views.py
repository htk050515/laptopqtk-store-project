from django.shortcuts import get_object_or_404, redirect
from .models import Product
from .cart import Cart
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.shortcuts import render
from .models import Category, Product
from django.contrib.auth.decorators import login_required
from orders.models import Order, OrderItem
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Sum
from django.db.models.functions import TruncDate
from django.core.paginator import Paginator




def add_to_cart(request, product_id): #Thêm sản phẩm vào giỏ hàng
    cart = Cart(request) #Lấy cart từ session hiện tại
    product = get_object_or_404(Product, id=product_id) #Lấy sản phẩm hoặc trả về 404 nếu không tồn tại

    cart.add(product_id=product.id, quantity=1)

    return redirect('cart_detail') #Chuyển hướng về trang chi tiết giỏ hàng

@require_POST #Bảo mật, không cho GET thêm giỏ hàng
def add_to_cart_ajax(request, product_id): #Thêm sản phẩm vào giỏ hàng qua AJAX
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
    products = Product.objects.filter(is_active=True)

    # Tìm kiếm theo tên
    keyword = request.GET.get('q')
    if keyword:
        products = products.filter(name__icontains=keyword)

    # Lọc theo danh mục
    category_id = request.GET.get('category')
    if category_id:
        products = products.filter(category_id=category_id)

    # Sắp xếp
    sort = request.GET.get('sort')
    if sort == 'price_asc':
        products = products.order_by('price')
    elif sort == 'price_desc':
        products = products.order_by('-price')
    else:
        products = products.order_by('-created_at')

    categories = Category.objects.filter(is_active=True)

    paginator = Paginator(products, 6)  # 6 sản phẩm / trang
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'page_obj': page_obj,
        'categories': categories,
    }

    return render(request, 'home.html', context)



def product_by_category(request, category_id): #Xem sản phẩm theo danh mục
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

def product_detail(request, product_id): #Xem chi tiết sản phẩm
    product = get_object_or_404(Product, id=product_id, is_active=True)

    context = {
        'product': product,
    }

    return render(request, 'product_detail.html', context)

def cart_detail(request):
    cart = request.session.get('cart', {})
    total_price = 0

    # Tính thành tiền cho từng item
    for item in cart.values():
        item['total'] = item['price'] * item['quantity']
        total_price += item['total']

    context = {
        'cart_items': cart,
        'total_price': total_price
    }

    return render(request, 'cart_detail.html', context)
    
@require_POST
def remove_from_cart(request, product_id):
    if request.method == 'POST':
        cart = request.session.get('cart', {})
        pid = str(product_id)

        if pid in cart:
            del cart[pid]
            request.session['cart'] = cart
            request.session.modified = True

        return JsonResponse({
            'success': True
        })

    return JsonResponse({'success': False}, status=400)


@login_required #Yêu cầu đăng nhập để tạo đơn hàng
def create_order(request): #Tạo đơn hàng từ giỏ hàng
    cart = Cart(request)

    if not cart.get_items():
        return redirect('cart_detail')

    # Tạo Order
    order = Order.objects.create(
        user=request.user,
        total_price=cart.get_total_price(),
        status='pending'
    )

    # Tạo OrderItem
    for product_id, item in cart.get_items().items():
        OrderItem.objects.create(
            order=order,
            product_id=product_id,
            price=item['price'],
            quantity=item['quantity']
        )

    # Xóa giỏ hàng sau khi đặt
    cart.clear()

    return render(request, 'order_success.html', {'order': order})

@login_required
def my_orders(request):#Xem danh sách đơn hàng của người dùng
    orders = Order.objects.filter(user=request.user).order_by('-created_at')

    context = {
        'orders': orders
    }

    return render(request, 'my_orders.html', context)

@login_required
def order_detail(request, order_id):
    order = get_object_or_404(
        Order,
        id=order_id,
        user=request.user
    )

    context = {
        'order': order,
        'items': order.items.all()
    }

    return render(request, 'order_detail.html', context)


@staff_member_required #Chỉ admin mới xem được thống kê đơn hàng
def order_statistics(request): #Thống kê số lượng đơn hàng theo trạng thái
    pending_count = Order.objects.filter(status='pending').count()
    approved_count = Order.objects.filter(status='approved').count()
    rejected_count = Order.objects.filter(status='rejected').count()

    context = {
        'pending': pending_count,
        'approved': approved_count,
        'rejected': rejected_count,
    }

    return render(request, 'order_statistics.html', context)


@staff_member_required
def revenue_statistics(request):
    data = (
        Order.objects
        .filter(status='approved')
        .annotate(date=TruncDate('created_at'))
        .values('date')
        .annotate(total=Sum('total_price'))
        .order_by('date')
    )

    labels = [item['date'].strftime('%d/%m/%Y') for item in data]
    values = [float(item['total']) for item in data]

    context = {
        'labels': labels,
        'values': values,
    }

    return render(request, 'revenue_statistics.html', context)

    def add_to_cart(request, product_id):
        product = get_object_or_404(Product, id=product_id)

        cart = request.session.get('cart', {})

        pid = str(product_id)

        if pid in cart:
            cart[pid]['quantity'] += 1
        else:
            cart[pid] = {
                'name': product.name,
                'price': float(product.price),
                'quantity': 1,
                'image': product.image.url if product.image else ''
            }

        request.session['cart'] = cart
        request.session.modified = True

    return JsonResponse({
        'success': True,
        'message': 'Đã thêm vào giỏ hàng'
    })

def cart_detail(request):
    cart = request.session.get('cart', {})

    total_price = 0
    for item in cart.values():
        total_price += item['price'] * item['quantity']

    context = {
        'cart': cart,
        'total_price': total_price
    }

    return render(request, 'cart_detail.html', context)
