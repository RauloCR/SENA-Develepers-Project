


// ---------------------------------Evento para el combo-box---------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var comboBoxes = document.querySelectorAll('.combo-box-two select');


    comboBoxes.forEach(function (comboBox) {
        comboBox.addEventListener('change', function () {
            comboBox.parentNode.classList.add('select-active');
        });
    });

});

document.addEventListener('DOMContentLoaded', function () {
    var comboBoxes = document.querySelectorAll('.combo-box select');


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


// ############################################################################################################
// ############################################################################################################
// ############################################################################################################


//----------------------------------- SCRIP - GUARDAR DATOS EN BD -----------------------------------


var formEnviado = false; // Bandera para controlar si el formulario ya se ha enviado
var resultadoElement = document.getElementById('RegistroUser');

if (resultadoElement) {
    resultadoElement.addEventListener("click", function(){

        if (!formEnviado) {
            var tipoCedula = document.getElementById('tipoSelect').value;
            var cedulaUsuario = document.getElementById('cedulaUsuario').value;
            var nombreUsuario = document.getElementById('nombreUsuario').value;
            var apellidoUsuario = document.getElementById('apellidoUsuario').value;
            var telefonoUsuario = document.getElementById('telefonoUsuario').value;
            var correoUsuario = document.getElementById('correoUsuario').value;
            var direccionUsuario = document.getElementById('direccionUsuario').value;
            var contrasenaUsuario = document.getElementById('contrasenaUsuario').value;
        
            if (tipoCedula !== '' && cedulaUsuario !== '' && nombreUsuario !== '' && apellidoUsuario !== '' && telefonoUsuario !== '' && correoUsuario !== '' && direccionUsuario !== '' && contrasenaUsuario !== '') {
                formEnviado = true; // Marcar el formulario como enviado
    
                document.getElementById('registroUsuario').addEventListener("submit", function(event){
                    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario     
                    
                    var formData = new FormData(this);
                    
                        // Crear objeto XMLHttpRequest
                        var xhr = new XMLHttpRequest();
                    
                        // Configurar la solicitud
                        xhr.open('POST', 'conexionRegistro.php', true);
                
                        // Configurar la función de devolución de llamada
                        xhr.onload = function() {
                            if (xhr.status >= 200 && xhr.status < 400) {
                                // Éxito
                                document.getElementById('resultado').innerHTML = xhr.responseText;
                            } else {
                                // Error
                                console.error('Error al procesar la solicitud.');
                            }
                        };  
                        // Enviar la solicitud
                        xhr.send(formData);
                })
                abrirVentanaI()
            }   
        }
    })
}


// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentanaI() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentanaI() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "../Index.html";
}



// *************************************************************************************************
// *************************************** INICIO DE sesion ****************************************
// *************************************************************************************************

var resultadoElement = document.getElementById('inicioUsuario');

if (resultadoElement) {
    resultadoElement.addEventListener("click", function(){
        
        document.getElementById('ingresoClientes').addEventListener('submit', function(event) {
    
            event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        
            var formData = new FormData(this);
        
            // Crear objeto XMLHttpRequest
            var xhr = new XMLHttpRequest();
        
            // Configurar la solicitud
            xhr.open('POST', 'IngresoUsuario.php', true);
        
            
            // Configurar la función de devolución de llamada
            xhr.onload = function() {
        
                // alert("Código de estado del servidor: " + xhr.status);
        
                if (xhr.status >= 200 && xhr.status < 400) {
                    // Éxito
                    document.getElementById('resultadoTwo').innerHTML = xhr.responseText;
                    
                    if (xhr.responseText.trim() === '¡Datos validados cliente!') {
                        // Redirigir al usuario al archivo HTML para cliente
                        window.location.href = '../DashboardUsuario/MisServicios/Mservicios.html'; // Cambia al archivo HTML deseado
        
                    }else if(xhr.responseText.trim() === '¡Datos validados Admin!') {
                        // Redirigir al usuario al archivo HTML para admin
                        window.location.href = '../Dashboard/MeinMenu.html';
                    }else{
                        abrirVentana()
                    }
                }
        
            };
        
            // Enviar la solicitud
            xhr.send(formData);
        });
    })        
}



// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentana() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentana() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "LoginC.html";
}

  

// *************************************************************************************************
// ************************************ RESTABLECER CONTRASEÑA *************************************
// *************************************************************************************************


var resultadoThreeElement = document.getElementById('restablecerContrasena');

if (resultadoThreeElement) {
    
    resultadoThreeElement.addEventListener("click", function(){
        
        document.getElementById('restablecerC').addEventListener('submit', function(event) {
            // Evitar el comportamiento predeterminado del formulario
            event.preventDefault(); 
        
            var formData = new FormData(this);
        
            // Crear objeto XMLHttpRequest
            var xhr = new XMLHttpRequest();
        
            // Configurar la solicitud
            xhr.open('POST', 'conexionRestableC.php', true);
        
            
            // Configurar la función de devolución de llamada
            xhr.onload = function() {
        
                // alert("Código de estado del servidor: " + xhr.status);
        
                if (xhr.status >= 200 && xhr.status < 400) {
                    
                    // Éxito
                    document.getElementById('resultado').innerHTML = xhr.responseText;
                    
                    if (xhr.responseText.trim() === "¡Datos validados cliente!") {
                        // Cambia al archivo HTML RestablecerC
                        window.location.href = './NuevaPassword.html'; 
    
                    }else{ 
                        if (xhr.responseText.trim() === "¡Datos validados Administrador!"){
                            // Cambia al archivo HTML RestablecerC
                            window.location.href = './NuevaPassword.html'; 
                        }else{
                            abrirVentanaII()
                        }
                        
                    }
                }
            };
            // Enviar la solicitud
            xhr.send(formData);
        });
    })
 
}



// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentanaII() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentanaII() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "RestableC.html";
}



// *************************************************************************************************
// ************************************** NUEVA CONTRASEÑA *****************************************
// *************************************************************************************************

var resultadoFourElement = document.getElementById('nuevaContrasenaC');

if (resultadoFourElement) {
 
    resultadoFourElement.addEventListener("click", function(){
        
        document.getElementById('nuevaContrasenaCC').addEventListener('submit', function(event) {

            event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        
            var formData = new FormData(this);
        
            // Crear objeto XMLHttpRequest
            var xhr = new XMLHttpRequest();
        
            // Configurar la solicitud
            xhr.open('POST', 'conexionNuevaPasswordd.php', true);
        
            // Configurar la función de devolución de llamada
            xhr.onload = function() {
        
                // alert("Código de estado del servidor: " + xhr.status);
        
                if (xhr.status >= 200 && xhr.status < 400) {
                    
                    // Éxito
                    document.getElementById('resultado').innerHTML = xhr.responseText;
    
                    
                    if (xhr.responseText.trim() === "Contraseña cambiada exitosamente.") {
                        alert("Contraseña cambiada exitosamente.")
                        window.location.href = "../Index.html";
                    }else{ 
                        abrirVentanaIII()
                    }
                }
            };
            // Enviar la solicitud
            xhr.send(formData);
        });
    })
    
}


// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentanaIII() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentanaIII() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "./NuevaPassword.html";
}



