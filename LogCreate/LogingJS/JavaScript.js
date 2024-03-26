const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    Links = document.querySelectorAll(".links");

//Función para mostrar/ocultar contraseña

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click",() =>{
        let pwShowHide = eyeIcon.parentElement.querySelectorAll(".password");
        pwShowHide.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        })
    })
})
 

// Función para mostrar el mensaje emergente
function mostrarMensaje() {
    alert("¡La contraseña se ha restablecido correctamente!");
  }
  
  // Obtén el botón por su ID
  let botonRestablecer = document.querySelector(".restablecerBtn");
  
  // Agrega un escuchador de eventos para el clic en el botón
  botonRestablecer.addEventListener("click", mostrarMensaje);



  // VALIDAR CREDENCIALES


function validarCredenciales(usuario, contrasena) {
    // Definir las credenciales permitidas
    var credenciales = {
        // Admi
        "wilmer": "001",
        "andres": "002",
        // Client
        "felipe": "011",
        "camilo": "022",
        "orlando": "033"
    };

    // Verificar si las credenciales son correctas
    return credenciales.hasOwnProperty(usuario) && credenciales[usuario] === contrasena;
}

function autenticar() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Validar las credenciales
    var validacionC = validarCredenciales(usuario, contrasena);

    if (validacionC) {
        // Redirigir según el usuario
        if (usuario === "wilmer" || usuario === "andres") {
            window.open("../Dashboard/MeinMenu.html");

        } else if (usuario === "orlando" || usuario === "camilo" || usuario === "felipe") {
            console.log("hola");
            window.open('../DashboardUsuario/MisServicios/MServicios.html');

        }
    } else {
        alert("¡FAVOR VALIDAR CAMPOS!");
    }
}


