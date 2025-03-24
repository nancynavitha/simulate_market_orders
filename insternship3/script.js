// script.js

let marketPrice = 100;
let orders = [];

// Function to update the market price randomly
function updateMarketPrice() {
  const priceChange = (Math.random() - 0.5) * 10; // Simulate a small change in price
  marketPrice = Math.max(50, marketPrice + priceChange); // Ensure price doesn't go below 50
  document.getElementById("market-price").innerText = marketPrice.toFixed(2);
  
  // Check if any limit orders can be filled
  checkOrders();
}

// Function to place an order
function placeOrder() {
  const orderType = document.getElementById("order-type").value;
  const orderPrice = parseFloat(document.getElementById("order-price").value);
  const orderAmount = parseInt(document.getElementById("order-amount").value);
  
  if (isNaN(orderPrice) || isNaN(orderAmount) || orderAmount <= 0) {
    alert("Please enter valid price and amount.");
    return;
  }

  const order = {
    type: orderType,
    price: orderPrice,
    amount: orderAmount,
    status: orderType === 'market' || marketPrice >= orderPrice ? 'filled' : 'unfilled',
  };

  // If it's a market order, automatically fill it
  if (order.status === 'filled') {
    alert("Market order filled at price: " + marketPrice.toFixed(2));
  }

  orders.push(order);
  updateOrderList();
  if (order.status === 'unfilled') {
    checkOrders();
  }
}

// Function to check and fill limit orders if the market price matches
function checkOrders() {
  orders.forEach(order => {
    if (order.type === 'limit' && order.status === 'unfilled') {
      if ((marketPrice >= order.price && order.amount > 0) || (marketPrice <= order.price && order.amount < 0)) {
        order.status = 'filled';
        alert("Limit order filled at price: " + marketPrice.toFixed(2));
      }
    }
  });
  updateOrderList();
}

// Function to update the order list in the UI
function updateOrderList() {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = ''; // Clear current list
  
  orders.forEach((order, index) => {
    const li = document.createElement("li");
    li.className = order.status;
    li.textContent = `Order ${index + 1}: ${order.type} - Price: ${order.price.toFixed(2)} - Amount: ${order.amount} - Status: ${order.status}`;
    orderList.appendChild(li);
  });
}
