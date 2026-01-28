document.addEventListener('DOMContentLoaded', function () {

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value
        || document.querySelector('meta[name="csrf-token"]')?.content;

    // UPDATE QUANTITY
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = this.dataset.id;
            const action = this.dataset.action;

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
        });
    });

    // REMOVE ITEM
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = this.dataset.id;

            fetch(`/remove-from-cart/${productId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    location.reload();
                }
            });
        });
    });

});
