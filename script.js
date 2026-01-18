let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
    document.getElementById("hamburger").classList.toggle("active");
}

function addToCart(name,price){
  let item = cart.find(i=>i.name===name);
  item ? item.qty++ : cart.push({name,price,qty:1});
  saveCart();
   // Add this line for alert
  alert(`${name} has been added to your cart. Price: ₦${price.toLocaleString()}`);

}

function increase(name){
  cart.find(i=>i.name===name).qty++;
  saveCart();
}

function decrease(name){
  let item = cart.find(i=>i.name===name);
  if(item.qty>1) item.qty--;
  saveCart();
}

function removeItem(name){
  cart = cart.filter(i=>i.name!==name);
  saveCart();
}

function saveCart(){
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCart();
}

function updateCart(){
  let count = cart.reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll("#cart-count").forEach(el=>el.innerText=count);

  let items = document.getElementById("cart-items");
  if(!items) return;

  items.innerHTML="";
  let total=0;

  cart.forEach(i=>{
    total += i.price*i.qty;
    items.innerHTML+=`
      <div class="cart-item">
        <span>${i.name}</span>
        <div class="qty">
          <button onclick="decrease('${i.name}')">-</button>
          ${i.qty}
          <button onclick="increase('${i.name}')">+</button>
        </div>
        <span>₦${i.price*i.qty}</span>
        <span class="remove" onclick="removeItem('${i.name}')">✖</span>
      </div>`;
  });

  document.getElementById("total").innerText="Total: ₦"+total;
}

function checkout(){
  if(cart.length===0) return alert("Cart is empty");
  let msg="Hello, I want to order:\n";
  cart.forEach(i=>{
    msg+=`${i.name} x${i.qty} = ₦${i.price*i.qty}\n`;
  });
  window.open(`https://wa.me/2348062672200?text=${encodeURIComponent(msg)}`,"_blank");
}

function scrollToShop(){
  document.getElementById("collection").scrollIntoView({behavior:"smooth"});
}

updateCart();

// Show/hide button on scroll
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

// Scroll smoothly to top
backToTop.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});

const whatsappBtn = document.querySelector('.floating-whatsapp');
const collectionSection = document.getElementById('collection');

window.addEventListener('scroll', () => {
  const collectionTop = collectionSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (collectionTop < windowHeight - 100) {
    // When "New Collection" is visible
    whatsappBtn.classList.add('show');
  } else {
    whatsappBtn.classList.remove('show');
  }
});
