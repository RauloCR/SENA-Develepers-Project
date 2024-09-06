// JS PARA LOS COMBOBOX

document.addEventListener('DOMContentLoaded', function () {
    var comboBoxes = document.querySelectorAll('.combo-box select');
    var comboBoxesTwo = document.querySelectorAll('.combo-box-two select');
    var comboBoxesThree = document.querySelectorAll('.combo-box-tree select');

    function addSelectActiveClass(comboBoxes) {
        comboBoxes.forEach(function (comboBox) {
            comboBox.addEventListener('change', function () {
                comboBox.parentNode.classList.add('select-active');
            });
        });
    }  

    addSelectActiveClass(comboBoxes);
    addSelectActiveClass(comboBoxesTwo);
    addSelectActiveClass(comboBoxesThree);
});

  


// ####################################################################################################
// ################################### CARGAR INFORMACION #############################################
// ####################################################################################################

document.addEventListener("DOMContentLoaded", function() {
    // Función para actualizar la tabla con los datos obtenidos
    function updateTable(data) {
        var tableBody = document.querySelector("#tablaDatos tbody");
        tableBody.innerHTML = "";

        if (data.error) {
            // Si hay un error, mostrar un mensaje en la tabla
            var tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="6">${data.error}</td>`;
            tableBody.appendChild(tr);
        }else{
            data.forEach(function(row) {

                var tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${row.id_usuario}</td>
                    <td>N/A</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.destino_servicio.toUpperCase()}</td>
                    <td>${row.direccion_servicio.toUpperCase()}</td>
                    <td>${row.telefono_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        }
    }   

    // Función para realizar la solicitud AJAX
    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'conexionRServicio.php?accion=poblar', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                updateTable(data);
            }
        };
        xhr.send();
    }
    // Llamar a la función fetchData al cargar la página
    fetchData();

    // Actualizar los datos cada 5 segundos (5000 ms)
    setInterval(fetchData, 5000);
});





// ####################################################################################################
// ################################### ENVIAR DATOS A PHP #############################################
// ####################################################################################################


var formEnviado = false; // Bandera para controlar si el formulario ya se ha enviado
var resultadoElement = document.getElementById('enviarFormulario');

if (resultadoElement) {
    resultadoElement.addEventListener("click", function(event){

        event.preventDefault()
        
        if (!formEnviado) {
            var nombre = document.getElementById('nombre').value;
            var apellido = document.getElementById('apellido').value;
            var direccion = document.getElementById('direccion').value;
            var cedula = document.getElementById('cedula').value;
            var lugar = document.getElementById('lugar').value;
            var equipo = document.getElementById('equipo').value;
            var celular = document.getElementById('celular').value;
            var mantenimiento = document.getElementById('mantenimiento').value;
            var correo = document.getElementById('correo').value;
            

            
        
            if (nombre !== '' && apellido !== '' && direccion !== '' && cedula !== '' && lugar !== '' && equipo !== '' && celular !== '' && mantenimiento !== '' && correo !== '') {
                formEnviado = true; // Marcar el formulario como enviado

                var f = document.getElementById('miFormulario')
                        
                        
                        var formData = new FormData(f);
                        
                            // Crear objeto XMLHttpRequest
                            var xhr = new XMLHttpRequest();
                        
                            // Configurar la solicitud
                            xhr.open('POST', 'conexionRServicio.php?accion=enviar', true);
                    
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
                            abrirVentana()
            } else{
                alert("Favor completar todos los campos")
            } 

            
        }
    })
}


// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentana() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentana() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "./RServicio.html";
}


