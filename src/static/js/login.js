
function initLogin(){
    let contLogin = document.getElementById("container-login");
    // MOSTRAR CONTENEDOR
    let contSign = document.querySelector(`#container-login > #cont-${contLogin.dataset.login}`)
    contSign.style.display = "grid";
    // VERIFICAR DATASET DEL CONTENEDOR PADRE
    switch(contLogin.dataset.login){
        case "signup": cheekUserSignUp();
                       cheekPasswordSignUp();
                       sendFormSingUp();
        break;
        case "signin": sendFormSingIn();
        break;
        case "informacioncuenta": viewInformationAccount();
        break;
    }
    viewPassword();
    btnsNavLogin();
};



// BUTTONS LOGIN OPTIONS
function btnsNavLogin(){
    let contLogin = document.getElementById("container-login");
    
    function addStyleListNav(color){
        let button = document.querySelector(`#container-login > #container-nav-login > #list-nav > li > #${contLogin.dataset.login}`);
        button.style.color = color;

        let contListNav = document.querySelector("#container-login > #container-nav-login > #list-nav");
        let background = window.getComputedStyle(button).backgroundColor;
        contListNav.style.borderBottomColor = background;
    }
    function dectectClick(){
        let buttonArray = document.querySelectorAll("#container-login > #container-nav-login > #list-nav li button");
        for(let button of buttonArray){
            button.onclick = (e)=>{
                addStyleListNav("rgba(250, 250, 250, 0.7)");

                let contOptLogin = document.querySelector(`#container-login > #cont-${contLogin.dataset.login}`);
                contOptLogin.style.display = "none";
                contLogin.dataset.login = `${e.target.id}`;
                initLogin();
            }
        };
    }
    function backHome(){
        let contHome = document.querySelector("#container-login > #container-nav-login > #cont-btn-home");
        contHome.onclick = ()=>{
            location.href = "/";
        }
    }
    dectectClick();
    addStyleListNav("#fff");
    backHome();
}




// ALERTAS
function contAlert(condicional, input, login, mensaje){
    let color = ["rgb(248, 248, 248)", "rgb(221, 20, 87)"];
    let cont_alert = document.querySelector(`#container-login > #cont-${login} > div > form > #cont-alert`);
    if(condicional){
        input.setCustomValidity("");
        cont_alert.innerHTML = "";
        cont_alert.style.background = color[0];
    }else{
        input.setCustomValidity(mensaje);
        cont_alert.innerHTML = mensaje;
        cont_alert.style.background = color[1];
        setTimeout(()=>{
            cont_alert.innerHTML = "";
            cont_alert.style.background = color[0];
        }, 5000);
    }
};


// LOOK PASSWORD
function viewPassword(){
    let cont_view_password = document.querySelectorAll(".view-password");
    for(let btn_view of cont_view_password){
        btn_view.onclick = (e)=>{
            let dataset = e.currentTarget.dataset;
            let div = e.currentTarget;
            let input = div.previousElementSibling;
            if(dataset.view === "true"){
                input.type = "text";
                dataset.view = "false";
                div.innerHTML = `<svg viewBox="0 0 491 235" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M81 0L29 21C29 31.4 48.3333 54.6667 58 65L0 152L52 185L112 92L157 109V235H218V122C234 128.4 270 124.667 286 122V235H346V114L390 99L439 185L491 152L439 65C463.8 38.6 469.333 24.6667 469 21L416 0C327 106 107 55 81 0Z"/></svg>`;
            }else{
                input.type = "password";
                dataset.view = "true";
                div.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" class="svg-inline--fa fa-eye fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>`
            }
        }
    }
};


// INFORMATION CUENTA
function viewInformationAccount(){
    let contInf = document.querySelector("#container-login > #cont-informacioncuenta > #container-inf > #inf");
    contInf.innerHTML = `
            <label><strong>Usuario :</strong><p>${localStorage.getItem("user")}</p></label>
            <label><strong>Contraseña :</strong><p>${localStorage.getItem("password")}</p></label>
            <label><strong>Correo :</strong><p>${localStorage.getItem("email")}</p></label>
            <label><strong>Pais :</strong><p>${localStorage.getItem("country")}</p></label>
            <label><strong>Direccion :</strong><p>${localStorage.getItem("direction")}</p></label>
            <label><strong>Dinero :</strong><p>$${localStorage.getItem("money")}</p></label>
    `;

    let listNavLogin = document.querySelector("#container-login > #container-nav-login > #list-nav");
    let addElement = listNavLogin.dataset.addelement;
    if(addElement === "true"){
        let li = document.createElement("li");
        li.innerHTML = `<button id="informacioncuenta">Mi cuenta</button>`;
        listNavLogin.appendChild(li);
        listNavLogin.dataset.addelement = "false"
    }
}


// SIGN IN
function sendFormSingIn(){
    let btnSendForm = document.querySelector(`#container-login > #cont-signin > div > form > #btns button`);
    btnSendForm.onclick = async function(e){
        e.preventDefault();
        let form = document.querySelector("#container-login > #cont-signin > div > form");
        let user = document.querySelector("#container-login > #cont-signin > div > form #user");
        let password = document.querySelector("#container-login > #cont-signin > div > form #password");
        // COMPROBAR LA INFORMACION
        let response = await fetch("/login/signin/cheek-data", {
            method: "POST",
            body: `user=${user.value}&password=${password.value}`
        });
        let json = await response.json();
        try{
            if(json !== undefined){
                for(let prop in json){
                    localStorage.setItem(prop, json[prop]);
                }
                form.submit();
            }
            location.href = "/";
        }
        catch (e){
            contAlert(false, user, "signin", text);
        }
    }
}


// SIGN UP
function cheekUserSignUp(){
    let inputUser = document.querySelector("#cont-signup > div > form > #cont-inputs #input-user");
    inputUser.oninput = async function(element){
        let response = await fetch("/login/signup/cheek-user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: `{"user": "${element.target.value}"}`
        });
        let text = await response.text();
        contAlert((text === "ok"), inputUser, "signup", text);
    }
};
function cheekPasswordSignUp(){
    let password1 = document.querySelector("#cont-signup > div > form > #cont-inputs #input-password1");
    let password2 = document.querySelector("#cont-signup > div > form > #cont-inputs #input-password2");
    password2.oninput = (e)=>{
        let mensaje = "Las contraseñas ingresadas no coinciden entre si";
        contAlert(password1.value === password2.value, password1, "signup", mensaje);
        contAlert(password1.value === password2.value, password2, "signup", mensaje);
    }
};
function sendFormSingUp(){
    let form = document.querySelector("#container-login > #cont-signup > div > form");
    let btn = document.querySelector("#container-login > #cont-signup > div > form > #btns button");
    btn.onclick = async function(e){
        
        if(form.checkValidity()){
            let formdata = new FormData(form);
            let response = await fetch("http://localhost:3000/login/signup/create-user", {    
                method: "POST",
                body: formdata
            });
            let text = await response.text();
            if(text !== "err"){
                let json = JSON.parse(text);
                if(json !== undefined){
                    for(let prop in json){
                        localStorage.setItem(prop, json[prop]);
                    }
                    location.href = "http://localhost:3000/";
                }
            }
        }

        e.preventDefault();
        
    }
}

window.addEventListener("DOMContentLoaded",initLogin)