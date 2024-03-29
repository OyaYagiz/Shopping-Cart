//!veriables
const cartBtn = document.querySelector(".cart-btn");
const clearCartBtn = document.querySelector(".btn-clear");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total-value");
const cartContent = document.querySelector(".cart-list");
const productsDOM = document.querySelector("#products-dom");

let cart = [];
let buttonsDOM = [];

class Products{
    async getProducts(){
        try{
            let result = await fetch("https://65d20d30987977636bfbe1ca.mockapi.io/products");
            let data = await result.json();
            let products = data;
            console.log(products);
            return products;
        }catch (error){
            console.log(error);
        }
    }
}

class UI{
    displayProducts(products){
        let result = "";
        products.forEach(item => {
            result += `
            <div class="col-lg-4 col-md-6">
            <div class="product">
                <div class="product-image">
                    <img src="${item.image}" alt="product">
                </div>
                <div class="product-hover">
                    <span class="product-title">${item.title}</span>
                    <span class="product-price">$ ${item.price}</span>
                    <button class="btn-add-to-cart" data-id=${item.id}>
                        <i class="fas fa-cart-shopping"></i>
                    </button>
                </div>
            </div>
        </div>
             `});
             productsDOM.innerHTML = result;
    }

    getBagButtons(){
        const buttons = [...document.querySelectorAll(".btn-add-to-cart")];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart){
                button.setAttribute("disabled", "disabled");
                button.opacity = ".3";
            }else{
                button.addEventListener("click", event =>{
                    event.target.disabled = true;
                })
            }
        })
    }
}

class Storage{

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    products.getProducts().then(products => {
        ui.displayProducts(products)
    }).then(()=>{
        ui.getBagButtons();
    })
});
