function updateQty(productId, action, csrfToken) {
    fetch(`/cart/update/${productId}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=${action}`
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function removeFromCart(productId, csrfToken) {
    fetch(`/remove-from-cart/${productId}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}
