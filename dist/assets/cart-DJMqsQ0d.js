import{g,l as f}from"./utils-HZzjEkL-.js";f();function $(t){let e=JSON.parse(localStorage.getItem("so-cart"))||[];e.push(t),localStorage.setItem("so-cart",JSON.stringify(e)),console.log("Added to cart:",t.Name),document.querySelector(".product-list")&&d()}function d(){const t=g("so-cart")||[],e=document.querySelector(".product-list"),a=document.querySelector(".list-footer"),o=document.querySelector(".cart-summary");if(console.log("Cart items count:",t.length),t.length===0){e&&(e.innerHTML=`
        <div class="empty-cart">
          <p>Your cart is empty.</p>
          <a href="/product_listing/?category=tents" class="btn">Start Shopping</a>
        </div>
      `),a&&a.classList.add("hide"),o&&o.classList.add("hide");return}o&&o.classList.remove("hide");const m=t.map((l,r)=>y(l,r));e&&(e.innerHTML=m.join(""));const i=t.reduce((l,r)=>l+(r.FinalPrice||r.price),0),c=i,s=document.getElementById("cart-subtotal"),n=document.getElementById("cart-total");s&&(s.textContent=`$${i.toFixed(2)}`),n&&(n.textContent=`$${c.toFixed(2)}`);const u=document.querySelector(".list-total");u&&(u.textContent=`Total: $${c.toFixed(2)}`),a&&a.classList.remove("hide"),document.querySelectorAll(".remove-item").forEach(l=>{l.addEventListener("click",r=>{const p=parseInt(r.target.dataset.index);S(p)})})}function y(t,e){var c,s,n;const a=((c=t.Images)==null?void 0:c.PrimaryMedium)||t.Image||t.image||"",o=t.Name||t.name,m=t.FinalPrice||t.price,i=((n=(s=t.Colors)==null?void 0:s[0])==null?void 0:n.ColorName)||t.color||"N/A";return`<li class="cart-card divider">
    <img src="${a}" alt="${o}" class="cart-card__image">
    <h2 class="card__name">${o}</h2>
    <p class="cart-card__color">${i}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${m.toFixed(2)}</p>
    <button class="remove-item" data-index="${e}">Remove</button>
  </li>`}function S(t){const e=g("so-cart")||[];e.splice(t,1),localStorage.setItem("so-cart",JSON.stringify(e)),d()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d();export{$ as addToCart};
