from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render, get_object_or_404, redirect
from .models import Order

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
