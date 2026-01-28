from django.shortcuts import get_object_or_404, redirect
from .models import Product
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
from django.contrib import messages
from django.db import transaction



@require_POST
def add_to_cart(request, product_id):
    cart = request.session.get('cart', {})
    product = get_object_or_404(Product, id=product_id)
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
        'cart_count': sum(item['quantity'] for item in cart.values())
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


@login_required
@transaction.atomic #Tránh tạo Order không có Item
def create_order(request):
    cart = request.session.get('cart', {})

    # 1. Không cho đặt nếu giỏ trống
    if not cart:
        messages.error(request, 'Giỏ hàng trống, không thể đặt hàng')
        return redirect('cart_detail')

    # 2. Tính tổng tiền từ snapshot cart
    total_price = 0
    for item in cart.values():
        total_price += item['price'] * item['quantity']

    # 3. Tạo Order
    order = Order.objects.create(
        user=request.user,
        total_price=total_price,
        status='pending'
    )

    # 4. Tạo OrderItem (snapshot)
    for product_id, item in cart.items():
        OrderItem.objects.create(
            order=order,
            product_id=product_id,
            price=item['price'],
            quantity=item['quantity']
        )

    # 5. Clear cart sau khi đặt
    request.session['cart'] = {}
    request.session.modified = True

    return render(request, 'order_success.html', {
        'order': order
    })
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

def cart_detail(request):
    cart = request.session.get('cart', {})

    print  ('🧾 CART IN cart_detail =', cart)

    total_price = 0
    for item in cart.values():
        item['total'] = item['price'] * item['quantity']
        total_price += item['total']

    return render(request, 'cart_detail.html', {
        'cart_items': cart,
        'total_price': total_price
    })

@require_POST
def update_cart_quantity(request, product_id):
    cart = request.session.get('cart', {})
    pid = str(product_id)
    action = request.POST.get('action')

    if pid not in cart:
        return JsonResponse({'success': False})

    if action == 'increase':
        cart[pid]['quantity'] += 1
    elif action == 'decrease':
        cart[pid]['quantity'] -= 1
        if cart[pid]['quantity'] <= 0:
            del cart[pid]

    request.session['cart'] = cart
    request.session.modified = True

    item_total = 0
    cart_total = 0

    for k, item in cart.items():
        item_total = item['price'] * item['quantity'] if k == pid else item_total
        cart_total += item['price'] * item['quantity']

    return JsonResponse({
        'success': True,
        'quantity': cart.get(pid, {}).get('quantity', 0),
        'item_total': item_total,
        'cart_total': cart_total
    })

@staff_member_required
def admin_order_list(request):
    orders = Order.objects.all().order_by('-created_at')
    return render(request, 'admin/orders/order_list.html', {
        'orders': orders
    })


@staff_member_required
def admin_update_order_status(request, order_id, status):
    order = get_object_or_404(Order, id=order_id)

    if status in ['approved', 'rejected']:
        order.status = status
        order.save()

    return redirect('admin_order_list')
