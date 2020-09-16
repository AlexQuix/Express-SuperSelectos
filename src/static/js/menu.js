function initMenu(){
    informationAcoout();
    let btnHome = document.querySelector("#cont-menu > #home");
    btnHome.onclick = ()=>{
        location.href = "http://localhost:3000/";
    }
    serchKeyWord();
    visibleOptMenuBtn()
}


// ACTIVE OR DESACTIVE THE OPTION THE NAVIGATION
function visibleOptMenuBtn(){
    let body = document.querySelector("body");
    let contOptMenu = document.querySelector("#container-opt-menu");
    let btnClose = document.querySelector("#container-opt-menu > #btn-close");
    let btnOptMenu = document.querySelector("#cont-menu > #menu");
    btnOptMenu.onclick = ()=>{
        if(btnOptMenu.dataset.opt === "true"){
            body.style.overflowY = "hidden";
            contOptMenu.style.display = "grid";
            btnOptMenu.dataset.opt = "false";
        }
        btnClose.onclick = ()=>{
            body.style.overflowY = "visible";
            contOptMenu.style.display = "none";
            btnOptMenu.dataset.opt = "true";
        }
    }
}


// ADD KEY WORD THE CONTENT
function addContKeyWord(json){
    let contKeyWord = document.querySelector("#cont-menu > #buscar > #search-result");
    contKeyWord.innerHTML += `
        <a href="/product/clasification/search?id=${json["_id"]}">${json["name"]}</a>
    `;
}

// SEARCH KEY WORD
function serchKeyWord(){
    let input = document.querySelector("#cont-menu > #buscar > #buscar-search > input")
    input.oninput = async function(e){
        let contKeyWord = document.querySelector("#cont-menu > #buscar > #search-result");
        contKeyWord.innerHTML = "";
        let btnSerch = document.querySelector("#cont-menu > #buscar > #buscar-search > #btn-serch");
        
        /* BUSCAR KEYWORD */
        let serchWord = e.target.value;
        if(serchWord !== ""){
            let response = await fetch("/products/search-keyword/",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: `{"word":"${serchWord}"}`
            });
            let json = await response.json();
            btnSerch.href = `/product/clasification/search?id=${json[0]["_id"]}`;
            for(let element of json){
                addContKeyWord(element);
            }
        }
    }
}


// URL FOR CREATE ACCOUNT
function urlCreateAccount(){
    let btn = document.querySelector("#cont-menu > #user");
    btn.onclick = (e)=>{
        location.href = "http://localhost:3000/login/signup"
    }
}

// DETERMINE IF EXIST ONE ACCOUNT
function informationAcoout(){
    let btn = document.querySelector("#cont-menu > #user");
    if(localStorage.getItem("user")){
        btn.onclick = (e)=>{
            if(localStorage.getItem("user")){
                location.replace("http://localhost:3000/login/informacioncuenta");
            }else{
                urlCreateAccount();
            }
        }
    }else{
        urlCreateAccount();
    }
}

// MESSAGE ADD PRODUCT
let totalMsgAddProduct = 0;
function addMessageMenu(name){
    let contIndex = document.querySelector("#cont-menu > #container-message > #contador-index");
    if(indexMsg > 0){
        contIndex.innerHTML = `${totalMsgAddProduct}`;
    }else{
        contIndex.innerHTML = "";
    }

    let contMessage = document.querySelector("#cont-menu > #container-message");
    contMessage.innerHTML += `<span id="m${indexMsg++}">Has agregado un producto a tu carrito</span>`;
    totalMsgAddProduct += 1;
    setTimeout(()=>{
        let span = document.querySelector(`#cont-menu > #container-message > #m${--indexMsg}`);
        span.remove();
        if(indexMsg == 0){
            totalMsgAddProduct = 0;
            contIndex.innerHTML = "";
        }
    }, 2000);
}
window.onload = initMenu();