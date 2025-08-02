let cart = [
  {
    id: 1,
    name: "Item 1",
    qty: 4,
    price: 5.0, 
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/00e21be2-baa8-48bf-bc12-a7050ad5324f.png",
    deliveryDate: "Delivery 24th July",
  },
  {
    id: 2,
    name: "Item 2",
    qty: 2,
    price: 3.0,
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4e6c839a-8d71-40c7-9f81-0c61d279f8f6.png",
    deliveryDate: "Delivery 13th June",
  },
  {
    id: 3,
    name: "Item 3",
    qty: 1,
    price: 49.0,
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c8554758-e550-47d1-84f3-0094059c5880.png",
    deliveryDate: "Delivery 15th January",
  },
  {
    id: 4,
    name: "Item 4",
    qty: 5,
    price: 3.0,
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/74991ab7-c0fd-450a-b025-7bdc5dbeed42.png",
    deliveryDate: "Delivery 17th May",
  },
];

const SHIPPING_COST = 10.0;


const cartListEl = document.querySelector(".cart-list");
const totalsEl = document.querySelector(".totals");
const addItemForm = document.querySelector(".add-item-form");

function formatPrice(value) {
  return "$" + value.toFixed(2);
}

function reRenderUI() {
  cartListEl.innerHTML = "";

  if (cart.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.textContent = "Your cart is empty.";
    emptyMsg.style.padding = "24px 0";
    emptyMsg.style.textAlign = "center";
    emptyMsg.style.color = "#777";
    cartListEl.appendChild(emptyMsg);
    totalsEl.innerHTML = "";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.setAttribute("data-id", item.id);

    const imgDiv = document.createElement("div");
    imgDiv.className = "cart-item-img";
    const img = document.createElement("img");
    img.src =
      item.img ||
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/372c42f8-df35-4cfc-8f25-139f22fcbff2.png";
    img.alt = `Image of ${item.name} brown paper bag package`;
    img.onerror = function () {
      this.style.visibility = "hidden";
    };
    imgDiv.appendChild(img);


    const infoDiv = document.createElement("div");
    infoDiv.className = "cart-item-info";
    const title = document.createElement("p");
    title.className = "cart-item-title";
    title.textContent = item.name;
    const delivery = document.createElement("p");
    delivery.className = "cart-item-date";
    delivery.textContent = item.deliveryDate;
    infoDiv.appendChild(title);
    infoDiv.appendChild(delivery);

    const qtyControl = document.createElement("div");
    qtyControl.className = "quantity-control";
    const decBtn = document.createElement("button");
    decBtn.className = "control-btn";
    decBtn.type = "button";
    decBtn.textContent = "-";
    decBtn.disabled = item.qty <= 1;
    decBtn.addEventListener("click", () => {
      if (item.qty > 1) {
        item.qty--;
        reRenderUI();
      }
    });

    const qtyDisplay = document.createElement("div");
    qtyDisplay.className = "qty-display";
    qtyDisplay.textContent = item.qty;

    const incBtn = document.createElement("button");
    incBtn.className = "control-btn";
    incBtn.type = "button";
    incBtn.textContent = "+";
    incBtn.addEventListener("click", () => {
      item.qty++;
      reRenderUI();
    });

    qtyControl.appendChild(decBtn);
    qtyControl.appendChild(qtyDisplay);
    qtyControl.appendChild(incBtn);

    const priceDiv = document.createElement("div");
    priceDiv.className = "item-price";
    priceDiv.textContent = formatPrice(item.price * item.qty);

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.type = "button";
    removeBtn.title = `Remove ${item.name} from cart`;
    removeBtn.setAttribute("aria-label", `Remove ${item.name} from cart`);
    removeBtn.textContent = "x";
    removeBtn.addEventListener("click", () => {
      cart = cart.filter((i) => i.id !== item.id);
      reRenderUI();
    });

    li.appendChild(imgDiv);
    li.appendChild(infoDiv);
    li.appendChild(qtyControl);
    li.appendChild(priceDiv);
    li.appendChild(removeBtn);

    cartListEl.appendChild(li);
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = cart.length === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  totalsEl.innerHTML = "";
  const subtotalRow = document.createElement("div");
  subtotalRow.className = "totals-row subtotal";
  subtotalRow.innerHTML = `<span>Subtotal</span><span>${formatPrice(
    subtotal
  )}</span>`;

  const shippingRow = document.createElement("div");
  shippingRow.className = "totals-row shipping";
  shippingRow.innerHTML = `<span>Shipping</span><span>${formatPrice(
    shipping
  )}</span>`;

  const totalRow = document.createElement("div");
  totalRow.className = "totals-row total";
  totalRow.innerHTML = `<span>Total</span><span>${formatPrice(total)}</span>`;

  totalsEl.appendChild(subtotalRow);
  totalsEl.appendChild(shippingRow);
  totalsEl.appendChild(totalRow);
}

addItemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = addItemForm.itemName;
  const priceInput = addItemForm.itemPrice;
  const imgInput = addItemForm.itemImg;

  const nameVal = nameInput.value.trim();
  const priceVal = parseFloat(priceInput.value);
  let imgVal = imgInput.value.trim();

  if (!nameVal) {
    alert("Please provide the item name.");
    return;
  }
  if (isNaN(priceVal) || priceVal <= 0) {
    alert("Please provide a valid positive price.");
    return;
  }

  if (!imgVal) {
    imgVal =
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ae769932-3554-437c-a503-4d44b9f3c098.png";
  }

  const newId = cart.length > 0 ? Math.max(...cart.map((i) => i.id)) + 1 : 1;

  cart.push({
    id: newId,
    name: nameVal,
    qty: 1,
    price: priceVal,
    img: imgVal,
    deliveryDate: "Delivery 24th July",
  });

  addItemForm.reset();

  reRenderUI();
});

document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before checkout.");
    return;
  }
  let summary = "Checkout Summary:\n";
  cart.forEach((i) => {
    summary += `${i.name} x${i.qty}: ${formatPrice(i.price * i.qty)}\n`;
  });
  const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  summary += `Subtotal: ${formatPrice(subtotal)}\n`;
  summary += `Shipping: ${formatPrice(SHIPPING_COST)}\n`;
  summary += `Total: ${formatPrice(
    subtotal + SHIPPING_COST
  )}\n\nThank you for your purchase!`;
  alert(summary);
});

document.addEventListener("DOMContentLoaded", () => {
  reRenderUI();
});
