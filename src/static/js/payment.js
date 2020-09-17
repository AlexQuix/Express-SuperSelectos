let $cardPay = {
    id: "",
    svg: "",
    cuscatlan: "#c7ab1e",
    paypal: "#1ca9a2",
    visa: "#096377",
    mastercard: "#D90D4A"
}

function initPayment(){
    let payment = localStorage.getItem("payment");
    if(payment === "true"){
        visibleBox();
    }else{
        location.href = "/";
    }
}


function visibleBox(){
    let containerPayment = document.querySelector("#container-payment");
    let section = containerPayment.dataset.section;
    let contVisible = document.querySelector(`#container-payment > #${section}`);
    contVisible.style.display = "flex";

    switch(section){
        case "cont-list-card": contListCard(section);
        break;
        case "container-inf-purchase": contInfPurchase();
        break;
    }
}

// CONTAIENR LIST CARD
function contListCard(idSection){
    let containerPayment = document.querySelector("#container-payment");
    let contSection = document.querySelector(`#container-payment > #${idSection}`);
    let liArray = document.querySelectorAll(`#container-payment > #${idSection} li`);

    for(let li of liArray){
        li.onclick = (e)=>{
            let liCurrent = e.currentTarget;
            $cardPay.id = liCurrent.id;
            $cardPay.svg = liCurrent.innerHTML;

            containerPayment.dataset.section = "container-inf-purchase";
            contSection.style.display = "none";
            visibleBox();
        }
    }
}

// CONTAINER INFORMATION PURCHASE PRODUCTS
function contInfPurchase(){
    let contUsedCard = document.querySelector("#container-payment > #container-inf-purchase > #used-card");
    contUsedCard.innerHTML = $cardPay.svg;

    let svg = document.querySelector("#container-payment > #container-inf-purchase > #used-card > svg");
    svg.style.fill = $cardPay[$cardPay.id];

    let carrito = localStorage.getItem("mi carrito");
    let json = JSON.parse(carrito);

    for(let product of json){
        if(product){
            searchProduct(product.id, product.clasificacion);
        }
    }

    // CONTENT TOTAL PRICE
    let contTotalPrice = document.querySelector("#container-payment > #container-inf-purchase > #cont-purchase-products > #total-price > p");
    contTotalPrice.innerHTML = `$${localStorage.getItem("total price")}`;

    //DELETE LOCALSTORAGE THE CARRITO
    localStorage.setItem("mi carrito", "[]");
    localStorage.setItem("total price", "0");
    localStorage.setItem("payment", "false");
}
function addContentInfPurchase(name, price){
    let contPurchaseProduct = document.querySelector("#container-payment > #container-inf-purchase > #cont-purchase-products > #cont-list-product");
    contPurchaseProduct.innerHTML += `<span><strong>${name}</strong><p>$${price}</p></span>`;
}


async function searchProduct(id){
    let response = await fetch("/products/search-product/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: `{"id": "${id}"}`
    });
    let product = await response.json();
    addContentInfPurchase(product.name, product.price);
}



window.onload = initPayment;