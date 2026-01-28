from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render, get_object_or_404, redirect
from .models import Order
from django.db.models import Sum
from django.db.models.functions import TruncDate
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
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

    labels = [d['date'].strftime('%d/%m/%Y') for d in data]
    values = [float(d['total']) for d in data]

    return render(request, 'orders/revenue_statistics.html', {
        'labels': labels,
        'values': values
    })
