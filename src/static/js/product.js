let arrayProductAnimations = [];
// MOVE SCROLL
class MoveScroll{
    constructor(element, limit){
        this.element = element;
        this.limit = limit;
        this.index = 0;
        this.revert = true;
        this.stop = false;
    }
    startScroll(){
        if(!this.stop){
            if(this.revert){
                this.index = 0;
                this.element.style.left = `${this.index}px`;
                this.revert = false;
            }else{
                this.index = this.limit - this.element.offsetWidth;
                this.element.style.left = `${this.index}px`;
                this.revert = true;
            }
            setTimeout(()=>{
                this.startScroll();
            }, 3000);
        }else{
            this.element.style.left = `${0}px`;
        }
    }
}


class Product{

    static async requestProduct(uri, iteration){
        let containerProduct = document.querySelector("#container-product #list-product");
        let response = await fetch(`/products/search-${uri}`, {method: "POST"});
        let text = await response.text();
        this.json= JSON.parse(text);
        if(iteration){
            for(let element of this.json){
                let product = Product.createContentProduct(element);
                containerProduct.innerHTML += product;
            }
        }else{
            let product = Product.createContentProduct(this.json);
            containerProduct.innerHTML += product;
        }

        let list_product = document.querySelector("#container-product > #list-product");
        switch(list_product.dataset.showas){
            case "column": showAsProductColumn();       
            break;
            case "mosaic": showAsProductMosaic();       
            break;
        }
        btnAddCarrito();
    }
    
    static createContentProduct(json){
        return `
            <article class="product" id="${json["_id"]}" data-classification="${json["classification"]}">
                <article>
                    <div id="cont-img">
                        <img src="/img/product/${json["file"]["name"]}">
                    </div>
                    <div id="cont-text">
                        <header><h1>${json["name"]}</h1></header>
                        <p>${json["description"]}</p>
                        <span><strong>Precio:</strong>  $${json["price"]}</span>
                    </div>
                </article>
                <div class="btns" id="${json["_id"]}">
                    <svg width="476" height="409" viewBox="0 0 476 409" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M42.9024 235.994L4.49308 73.0877C1.72002 61.3256 10.9947 50.125 23.508 50.125H342.643L350.091 15.0297C351.947 6.28207 359.932 0 369.195 0H452.5C463.27 0 472 8.41552 472 18.7969V31.3281C472 41.7095 463.27 50.125 452.5 50.125H395.72L338.644 319.104C352.298 326.674 361.5 340.867 361.5 357.141C361.5 381.364 341.129 401 316 401C290.871 401 270.5 381.364 270.5 357.141C270.5 344.865 275.738 333.774 284.169 325.812H113.831C122.262 333.774 127.5 344.865 127.5 357.141C127.5 381.364 107.129 401 81.9999 401C56.8709 401 36.4999 381.364 36.4999 357.141C36.4999 339.775 46.9714 324.769 62.1579 317.663L57.6753 298.65C54.9022 286.888 64.1769 275.688 76.6902 275.688H294.78L300.098 250.625H61.9173C52.8125 250.625 44.9198 244.552 42.9024 235.994Z" fill="black"/><path d="M343.133 50.2288L343.049 50.625H342.643H23.508C11.2934 50.625 2.28604 61.5476 4.97974 72.973L43.3891 235.879C45.3506 244.2 53.0326 250.125 61.9173 250.125H300.098H300.715L300.587 250.729L295.269 275.791L295.185 276.188H294.78H76.6902C64.4756 276.188 55.4683 287.11 58.162 298.535L62.6445 317.549L62.7377 317.944L62.3698 318.116C47.3453 325.146 36.9999 339.984 36.9999 357.141C36.9999 381.07 57.1296 400.5 81.9999 400.5C106.87 400.5 127 381.07 127 357.141C127 345.011 121.825 334.049 113.488 326.176L112.574 325.312H113.831H284.169H285.427L284.513 326.176C276.175 334.049 271 345.011 271 357.141C271 381.07 291.13 400.5 316 400.5C340.87 400.5 361 381.07 361 357.141C361 341.063 351.91 327.03 338.401 319.542L338.078 319.362L338.154 319.001L395.231 50.0212L395.315 49.625H395.72H452.5C463.011 49.625 471.5 41.4162 471.5 31.3281V18.7969C471.5 8.70881 463.011 0.5 452.5 0.5H369.195C360.156 0.5 352.384 6.62873 350.58 15.1334L350.091 15.0297L350.58 15.1335L343.133 50.2288Z" stroke="black"/></g><defs><filter id="filter0_d" x="0" y="0" width="476" height="409" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg> 
                    <span>Agregar al carrito</span>
                </div>
            </article>`;
    }

    static stopLoader(){
        let contLoader = document.getElementById("container-loader");
        contLoader.style.display = "none"
    }

    static continueLoader(){
        let contLoader = document.getElementById("container-loader");
        contLoader.style.display = "block"
    }
}

let index = 0;
function startProduct(){
    let listProduct = document.querySelector("#container-product > #list-product");
    let clasification = listProduct.dataset.clasification;

    let id = location.search.match(/((([a-zA-Z0-9])*)$)/i);
    if(clasification === "search"){
        Product.requestProduct(("query/search?id=" + id[0]), false);
        setTimeout(Product.stopLoader, 1000);
    }else if(id){
        if(clasification !== "general"){
            Product.requestProduct(("clasification/" + clasification), true);
            setTimeout(Product.stopLoader, 1000);
        }else{
            callProduct();
        }
    }
    showAsProduct();
}
function callProduct(){
    Product.requestProduct("general/", true);
    if(index >= 2){
        Product.stopLoader();
    }else{
        setTimeout(()=>{
            ++index;
            callProduct();
        }, 3000);
    };
}
function btnAddCarrito(){
    let btnProduct = document.querySelectorAll("#container-product > #list-product .product > .btns");
    btnProduct.forEach(btn=>{
        btn.onclick = async function(e){
            let product = btn.parentNode; 
            Carrito.addIdCarritoDB(product);
            await addMessageMenu();
        }
    });
}



// CONTAINER SHOW AS PRODUCT
function showAsProduct(){
    // CONTAINERS PRODUCT
    let list_product = document.querySelector("#container-product > #list-product");

    // BUTTON SHOW AS PRODUCT
    // MOSAIC
    let btn_mosaic = document.querySelector("#container-product > #container-opt-show-product > form > #show-as-product > #mosaico");
    let svgMosaic = btn_mosaic.childNodes[1];
    svgMosaic.style.fill = "#759126";
    btn_mosaic.onclick = showAsProductMosaic
    // COLUMN
    let btn_column = document.querySelector("#container-product > #container-opt-show-product > form > #show-as-product > #column");
    btn_column.onclick = showAsProductColumn;



    // BUTTON SEARCH
    let btnSearch = document.querySelector("#container-product > #container-opt-show-product > form > #btn-search > button");
    btnSearch.onclick = async function(e){
        e.preventDefault();
        list_product.innerHTML = "";

        let input = document.querySelector("#container-product > #container-opt-show-product > form > #clasification-product > select");
        if(!(input.value === "general")){
            await Product.requestProduct(("clasification/" + input.value), true);
        }else{
            await Product.requestProduct("general/", true);
        }
        switch(list_product.dataset.showas){
            case "column": showAsProductColumn();
            break;
            case "mosaic": showAsProductMosaic();
            break;
        }
    }
}
function showAsProductMosaic(){
    let btn_column = document.querySelector("#container-product > #container-opt-show-product > form > #show-as-product > #column");
    let btn_mosaic = document.querySelector("#container-product > #container-opt-show-product > form > #show-as-product > #mosaico");
    // ANIMATIONS PRODUCT BUTTON SHOWS AS
    let svgColumn = btn_column.childNodes[1];
    svgColumn.style.fill = "#000";
    let svgMosaic = btn_mosaic.childNodes[1];
    svgMosaic.style.fill = "#759126";

    // CONTAINER LIST STYLE
    let list_product = document.querySelector("#container-product > #list-product");
    list_product.style.display = "flex";
    list_product.style.flexWrap = "wrap";
    list_product.dataset.showas = "mosaic";

    let array_product = document.querySelectorAll("#container-product > #list-product .product");
    for(let product of array_product){
        // STYLES PRODUCT
        product.style.width = "270px";
        product.style.height = "200px";
        product.style.margin = "10px";
        product.style.display = "flex";
        product.style.flexDirection = "row";

        // STYLES PRODUCT ARTICLES
        let article = product.childNodes[1];
        article.style.width = "100%"
        article.style.height = "100%";
        article.style.flexDirection = "column";
        article.style.boxSizing = "border-box";

            // STYLES PRODUCT ARTICLES IMG
            let article_img = article.childNodes[1].style;
            article_img.width = "100%";
            article_img.marginRight = "100%";
            article_img.borderRadius = "0px";
            article_img.position = "absolute";
            article_img.display = "grid";
            article_img.placeItems = "center";

            // STYLES PRODUCT ARTICLES TEXTO
            let article_text = article.childNodes[3].style;
            article_text.width = "100%";
            article_text.height = "150px";
            article_text.padding = "0px 0.5em 0.5em";
            article_text.background = "rgb(255, 255, 255)";
            article_text.borderRadius = "5px 5px 0px 0px";
            article_text.position = "absolute";
            article_text.bottom = "-110px";
            article_text.left = "0px";
            article_text.zIndex = "100";
            article_text.boxSizing = "border-box";

        // STYLES PRODUCT BUTTON
        let divBtn = product.childNodes[3].style;
        divBtn.width = "100%";
        divBtn.padding = "10px";
        divBtn.borderLeft = "none";
        divBtn.position = "absolute";
        divBtn.bottom = "-50px";
        divBtn.left = "0px";
        divBtn.flexDirection = "row";
        

        // STYLES PRODUCT ANIMATIONS
        product.onmousemove = ()=>{
            divBtn.bottom = "0px";
            article_text.bottom = "50px";
        }
        product.onmouseleave = ()=>{
            divBtn.bottom = "-50px";
            article_text.bottom = "-110px";
        }
    }
    showAsProductStartAnimation();
}
function showAsProductColumn(){
    let btn_column = document.querySelector("#container-product > #container-opt-show-product > form > #show-as-product > #column");
    let btn_mosaic = document.querySelector("#container-product > #container-opt-show-product > form > #show-as-product > #mosaico");
    let svgColumn = btn_column.childNodes[1];
    svgColumn.style.fill = "#759126";
    let svgMosaic = btn_mosaic.childNodes[1];
    svgMosaic.style.fill = "#000";

    let list_product = document.querySelector("#container-product > #list-product");
    list_product.style.display = "block";
    list_product.style.flexWrap = "none";
    list_product.dataset.showas = "column";

    let array_product = document.querySelectorAll("#container-product > #list-product .product");
    for(let product of array_product){

        product.style.width = "100%";
        product.style.height = "170px";
        product.style.marginBottom = "10px";
        product.style.display = "flex";
        product.style.flexDirection = "row";

        let article = product.childNodes[1];
        article.style.width = "90%"
        article.style.height = "100%";
        article.style.padding = "0.8em 3em"
        article.style.flexDirection = "row";

            let article_img = article.childNodes[1].style;
            article_img.width = "200px";
            article_img.marginRight = "20px";
            article_img.borderRadius = "5px";
            article_img.position = "relative";
            article_img.display = "grid";
            article_img.placeItems = "center";

            let article_text = article.childNodes[3].style;
            article_text.width = "80%";
            article_text.height = "auto";
            article_text.padding = "0px 1em";
            article_text.background = "rgb(255, 255, 255)";
            article_text.borderRadius = "5px 5px 0px 0px";
            article_text.position = "relative";
            article_text.bottom = "0px";
            article_text.left = "auto";
            article_text.zIndex = "auto";
            article_text.boxSizing = "border-box";

        let divBtn = product.childNodes[3].style;
        divBtn.width = "10%";
        divBtn.padding = "0px";
        divBtn.borderLeft = "5px solid var(--color2)";
        divBtn.position = "relative";
        divBtn.bottom = "0px";
        divBtn.right = "0px";
        divBtn.flexDirection = "column";

        product.onmousemove = undefined;
        product.onmouseleave = undefined;
    }
    showAsProductStopAnimation();
}
// START ANIMATION PRODUCTS H1
function showAsProductStartAnimation(){
    showAsProductStopAnimation();
    setTimeout(()=>{
        let arrayH1 = document.querySelectorAll(" #container-product > #list-product .product > article > #cont-text > header > h1");
        for(let elemH1 of arrayH1){
            if(elemH1.scrollWidth > 250 || elemH1.style.width > 250 ){
                // STYLES PRODUCT ARTICLES H1
                elemH1.style.position = "relative";
                elemH1.style.width = `${elemH1.scrollWidth}px`;
                elemH1.style.transition = "1s";
    
                let animation = new MoveScroll(elemH1, 250);
                animation.startScroll();
                arrayProductAnimations.push(animation);
            }
        }
    }, 1000);
}
// STOP ANIMATION PRODUCTS H1
function showAsProductStopAnimation(){
    while(arrayProductAnimations[0]){
        let animation = arrayProductAnimations.pop();
        animation.stop = true;
        animation.element.style.width = "100%";
        animation.element.style.left = "0px";
    }
}


window.onload = startProduct;