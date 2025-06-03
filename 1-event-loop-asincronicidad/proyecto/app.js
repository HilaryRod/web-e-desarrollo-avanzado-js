const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1; // Para identificar los pedidos numeros

addOrderBtn.addEventListener('click', () => {
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order);
    processOrder(order);
});

function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    orderList.appendChild(listItem);
}

function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `Pedido #${order.id}: ${status}`;
    }
}

async function processOrder(order) {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(); // La promesa se resuelve después de 1m que es lo que tardan en servir un cafe
        }, 10000);
    });

    // Actualizar el estado del pedido
    updateOrderStatus(order, 'Completado');
    //Eliminar un pedido cuando se complete porque si ya esta completado no lo necesitamos
    setTimeout(() => {
        const listItem = document.getElementById(`order-${order.id}`);
        if (listItem) {
            listItem.remove();
        }
    },5000);
}

