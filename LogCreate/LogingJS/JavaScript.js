// Evento para el combo-box---------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var comboBoxes = document.querySelectorAll('.combo-box-two select');


    comboBoxes.forEach(function (comboBox) {
        comboBox.addEventListener('change', function () {
            comboBox.parentNode.classList.add('select-active');
        });
    });

});


const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    Links = document.querySelectorAll(".links");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwShowHide = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        pwShowHide.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        })
    })
})




//-------------------------------------VALIDAR CREDENCIALES-------------------------------------

// var nombreClienteLogueado = "";

// function validarCredenciales(usuario, contrasena) {
//     // Definir las credenciales permitidas
//     var credenciales = {
//         // Admi
//         "wilmer": "001",
//         "andres": "002",
//         // Client
//         "felipe": "011",
//         "camilo": "022",
//         "orlando": "033"
//     };

//     // Verificar si las credenciales son correctas
//     return credenciales.hasOwnProperty(usuario) && credenciales[usuario] === contrasena;
// }


// function autenticar() {
//     var usuario = document.getElementById("usuario").value;
//     var contrasena = document.getElementById("contrasena").value;

//     // Validar las credenciales
//     var validacionC = validarCredenciales(usuario, contrasena);

//     if (validacionC) {
//         // Redirigir según el usuario
//         if (usuario === "wilmer" || usuario === "andres") {
//             window.open("../Dashboard/MeinMenu.html");
//             window.close();

//         } else if (usuario === "orlando" || usuario === "camilo" || usuario === "felipe") {
//             window.open('../DashboardUsuario/MisServicios/MServicios.html');
//             window.close();

//         }
//     } else {
//         alert("¡FAVOR VALIDAR CAMPOS!");
//     }
// }


// function borrarLocalStorage() {
//     localStorage.removeItem('nombreClienteLogueado')
// }



// function validarCredenciales(usuario, contrasena) {
//     // Obtener los datos existentes en localStorage
//     var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//     // Buscar el usuario por correo en los datos almacenados
//     var usuarioEncontrado = tablaRegistro.find(function (usuarioData) {
//         return usuarioData.correo === usuario;
//     });

//     // Verificar si se encontró el usuario y la contraseña es correcta
//     if (usuarioEncontrado) {
//         if (usuarioEncontrado.contraseña === contrasena) {
//             // La contraseña es correcta
//             return true;
//         } else {
//             // La contraseña es incorrecta
//             alert("¡La contraseña es incorrecta!");
//             return false;
//         }
//     } else {
//         // El correo no existe en la base de datos
//         alert("¡El correo no existe en la base de datos!");
//         return false;
//     }

//     // Verificar si se encontró el usuario y la contraseña es correcta
//     //return usuarioEncontrado && usuarioEncontrado.contraseña === contrasena;
// }



// function autenticar() {
//     borrarLocalStorage();
//     var usuario = document.getElementById("usuario").value;
//     var contrasena = document.getElementById("contrasena").value;

//     // Validar las credenciales utilizando la función actualizada
//     var validacionC = validarCredenciales(usuario, contrasena);

//     if (validacionC) {
//         // Obtener los datos existentes en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Buscar el usuario por correo en los datos almacenados
//         var usuarioEncontrado = tablaRegistro.find(function (usuarioData) {
//             return usuarioData.correo === usuario;
//         });

//         if (usuarioEncontrado.rol === "ADMINISTRADOR") {
//             // ¡Inicio de sesión como Administrador!
//             window.open("../Dashboard/MeinMenu.html");

//         } else if (usuarioEncontrado.rol === "CLIENTE") {
//             if (usuarioEncontrado) {
//                 // Almacena el nombre del cliente en localStorage
//                 localStorage.setItem('nombreClienteLogueado', usuarioEncontrado.nombre + ' ' + usuarioEncontrado.apellido);
//             }
//             // ¡Inicio de sesión como cliente!
//             // Ajusta la ruta de redirección para clientes
//             window.open('../DashboardUsuario/MisServicios/MServicios.html');
//         } else {
//             alert("¡Tipo de usuario no reconocido!");
//         }
//     }
// }





//------------------------------------- SCRIP - RESTABLECER CONTRASEÑA -------------------------------------------

// Obtén el botón por su ID
let botonRestablecer = document.querySelector(".restablecerBtn");


if (botonRestablecer) {
    // Agrega un escuchador de eventos para el clic en el botón
    botonRestablecer.addEventListener("click", mostrarMensaje);
}

// Función para mostrar el mensaje emergente
function mostrarMensaje() {
    alert("¡La contraseña se ha restablecido correctamente!");
}




//------------------------------------ SCRIP - GUARDAR DATOS EN LOCAL STORAGE--------------------------------------

// document.addEventListener("DOMContentLoaded", function () {

//     // SCRIP - ALMACENA DATOS REGISTRO ----------------------------------------

//     // Obtener los datos existentes en localStorage
//     var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//     var botonCrearCuenta = document.querySelector('.create-button');

//     botonCrearCuenta.addEventListener("click", function () {

//         var tipo = document.getElementById("tipoSelect");
//         var rol = document.getElementById("rolSelect");
//         var nombre = document.getElementById("nombreInput");
//         var apellido = document.getElementById("apellidoInput");
//         var telefono = document.getElementById("telefonoInput");
//         var correo = document.getElementById("correoInput");
//         var direccion = document.getElementById("direccionInput");
//         var contraseña = document.getElementById("contraseñaInput");

//         if (esCampoVacio(tipo) || esCampoVacio(rol) || esCampoVacio(nombre) || esCampoVacio(apellido) || esCampoVacio(telefono) || esCampoVacio(correo) || esCampoVacio(direccion) || esCampoVacio(contraseña)) {

//             alert("Todos los campos deben ser llenados.");
//             return;
//         }


//         var nuevoDato = {
//             tipo: getSelectedText(tipo).toUpperCase(),
//             rol: getSelectedText(rol).toUpperCase(),
//             nombre: nombre.value.toUpperCase(),
//             apellido: apellido.value.toUpperCase(),
//             telefono: telefono.value.toUpperCase(),
//             correo: correo.value,
//             direccion: direccion.value.toUpperCase(),
//             contraseña: contraseña.value.toUpperCase(),
//             fechaRegistro: new Date().toLocaleDateString()
//         };
//         // Agregar los nuevos datos al array
//         tablaRegistro.push(nuevoDato);

//         // Guardar el array actualizado en localStorage
//         // Convertir el objeto a cadena JSON y almacenarlo en localStorage
//         localStorage.setItem('tablaRegistro', JSON.stringify(tablaRegistro));

//         tipo.value = "";
//         rol.value = "";
//         nombre.value = "";
//         apellido.value = "";
//         telefono.value = "";
//         correo.value = "";
//         direccion.value = "";
//         contraseña.value = "";

//         // MENSAJE CONFIRMACION

//         alert("¡Cuenta creada correctamente!")
//         window.open('../Index.html');
//         window.close();
//     });



//     function getSelectedText(selectElement) {
//         var selectedIndex = selectElement.selectedIndex;
//         return selectElement.options[selectedIndex].text;
//     }

//     // Funcion valida si es vacio el campo
//     function esCampoVacio(elemento) {
//         return elemento.value.trim() === "";
//     }

// });


 

//----------------------------------- SCRIP - VENTANA FLOTANTE GUARDAR DATOS EN BD -----------------------------------

