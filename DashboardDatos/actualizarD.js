


// ###############################################################################################
// ##################################### CARGAR INFORMACION ######################################
// ###############################################################################################



document.addEventListener("DOMContentLoaded", function() {
    // Función para cargar los datos desde el servidor
    function loadUserData() {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'actualizarD.php?accion=poblar', true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                var data = JSON.parse(xhr.responseText);
                document.getElementById('tipoSelect').value = data.tipo_cedula;
                document.getElementById('nombreUsuario').value = data.nombre_tecnico;
                document.getElementById('apellidoUsuario').value = data.apellido_tecnico;
                document.getElementById('cedulaUsuario').value = data.cedula_tecnico;
                document.getElementById('telefonoUsuario').value = data.telefono_tecnico;
                document.getElementById('correoUsuario').value = data.correo_tecnico;
                document.getElementById('direccionUsuario').value = data.direccion_tecnico;
                document.getElementById('contrasenaUsuario').value = data.contrasena_tecnico;

            }
        };
        xhr.send();
    }

    // Carga los datos cuando la página se haya cargado completamente
    loadUserData();
});




// ############################################################################################################
// ########################################SCRIP - GUARDAR DATOS EN BD#########################################
// ############################################################################################################


var formEnviado = false; // Bandera para controlar si el formulario ya se ha enviado
var resultadoElement = document.getElementById('RegistroUser');

if (resultadoElement) {
    resultadoElement.addEventListener("click", function(){

        if (!formEnviado) {
        
                formEnviado = true; // Marcar el formulario como enviado
    
                document.getElementById('actualizarinformacion').addEventListener("submit", function(event){

                    document.getElementById('correoUsuario').disabled = false; // Deshabilitar el campo

                    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario     
                    
                    var formData = new FormData(this);
                    
                        // Crear objeto XMLHttpRequest
                        var xhr = new XMLHttpRequest();
                    
                        // Configurar la solicitud
                        xhr.open('POST', 'actualizarD.php?accion=actualizar', true);
                
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
    })
}
   

// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentanaI() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentanaI() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "../DashboardTecnico/MenuC.html";
}
