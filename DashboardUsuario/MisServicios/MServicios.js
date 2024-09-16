//------------------------------------------------SCRIP NOTIFICACION------------------------------------------------
function mostrarNotificacion(mensaje, tiempo) {
    var notificacion = document.createElement("div");
    notificacion.className = "notificacion";
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(function () {
        document.body.removeChild(notificacion);
    }, tiempo);
}
 
 
 
 //---------------------------------------SCRIP DE LOS COMBO-BOX PLACEHOLDER---------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var comboBoxes = document.querySelectorAll('.combo-box select');

    comboBoxes.forEach(function (comboBox) {
        comboBox.addEventListener('change', function () {
            comboBox.parentNode.classList.add('select-active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var comboBoxesTwo = document.querySelectorAll('.combo-box-two select');

    comboBoxesTwo.forEach(function (comboBox) {
        comboBox.addEventListener('change', function () {
            comboBox.parentNode.classList.add('select-active');
        });
    });
});

//----------------------------------------SCRIP DE LA FECHA PLACEHOLDER------------------------------------------

    document.addEventListener('DOMContentLoaded', function() {
        var dateInputs = document.querySelectorAll('input[type="date"]');

        dateInputs.forEach(function(input) {
            input.addEventListener('input', function() {
                // Cambiar el color del texto cuando se selecciona una fecha
                if (input.value) {
                    input.style.color = 'black';
                } else {
                    input.style.color = 'gray';
                }
            });

            // Restaurar el color del texto cuando se recarga la página (si hay una fecha preseleccionada)
            if (input.value) {
                input.style.color = 'black';
            }
        });
    });



//--------------------------------------VALORACION ESTRELLAS--------------------------------------------

    let selectedStars = 0;

function rateStar(star) {
    selectedStars = star;
    document.getElementById('rating-value').value = star;
    for (let i = 1; i <= 5; i++) {
        const starElement = document.querySelector(`#rating-stars .star:nth-child(${i})`);
        starElement.classList.toggle('active', i <= selectedStars);
    }
}
  

// ####################################################################################################
// ######################################### POBLAR TABLA #############################################
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
                    <td>${row.id_servicio}</td>
                    <td>${row.correo_servicio.toUpperCase()}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.destino_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        }
    }

    // Función para realizar la solicitud AJAX
    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "getConexionMServicios.php", true);
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

    // ************************************************************************************
    // ***********************************+BOTON REFRESC+**********************************
    // ************************************************************************************

    // Configurar el botón de actualización
    document.getElementById("refreshButton").addEventListener("click", function() {
        // Añadir la clase para la animación
        var button = document.getElementById("refreshButton");
        button.classList.add("spin");

        // Mostrar el mensaje de actualización
        var message = document.getElementById("updateMessage");
        message.style.display = "block";

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            message.style.display = "none";
        }, 1000);

        // Eliminar la clase de animación después de que la animación termine
        setTimeout(function() {
            button.classList.remove("spin");
        }, 1000);

        // Llamar a fetchData para actualizar la tabla al hacer clic en el botón
        fetchData();
    });

    // Actualizar los datos cada 5 segundos (5000 ms)
    // setInterval(fetchData, 5000);
});




// -------------------------------------VALIDAR INFORMACION-----------------------------------------


// ####################################################################################################
// #####################################CALIFICAR SERVICIO#############################################
// ####################################################################################################


    var resultadoElement = document.getElementById('submit-btn');
    
    resultadoElement.addEventListener("click", function(){
        
        document.getElementById('form').addEventListener('submit', function(event){
            event.preventDefault()

            const commentText = document.getElementById('comment').value;
            const idservicioText = document.getElementById('idservicio').value;
          
            if (selectedStars === 0 || commentText.trim() === '' || idservicioText === 0) {
                
                alert('Por favor, selecciona una valoración y escribe un comentario.');
                location.reload()

            } else {
                
                const formData = new FormData(document.getElementById('form'));
        
                const xhr = new XMLHttpRequest();
        
                xhr.open('POST', 'conexionMservicio.php', true);

                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        document.getElementById('resultado').innerHTML = xhr.responseText;
                        if (xhr.responseText.trim() === "Servicio calificado correctamente.") {
                            abrirVentana()                
                        }
                        abrirVentana()
                    }
                };
                
                xhr.send(formData);
 
            }
        })
    })
    
// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentana() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentana() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "./MServicios.html";
}




// ###############################################################################################
// #################################### BUSCAR SERVICIO ##########################################
// ###############################################################################################

// ------------------------------------- BUSCAR SERVICIO -----------------------------------------

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
                    <td>${row.id_servicio}</td>
                    <td>${row.correo_servicio.toUpperCase()}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.destino_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        } 
        
    }

    // Función para realizar la solicitud AJAX
    function fetchData() {

        var xhr = new XMLHttpRequest();
        var form = document.getElementById("miFormulario"); // Cambia "miFormulario" al ID de tu formulario
        var formData = new FormData(form);
        var queryString = new URLSearchParams(formData).toString();
        
        xhr.open("GET", "conexionBuscar.php?" + queryString, true);

        xhr.onreadystatechange = function() {
            
            if (xhr.readyState == 4 && xhr.status == 200) {
                // console.log(xhr.responseText)
                if (xhr.responseText !== 'No se encontraron resultados') {
                    //ver el array que manda PHP
                    // console.log(xhr.responseText)

                    var data = JSON.parse(xhr.responseText);
                    updateTable(data);
                }
                
            }else{

            }
        };
        xhr.send();
    }

    // Manejar el evento click del botón de filtrado
    document.getElementById("filtroB").addEventListener("click", function(event) {
        var input = document.getElementById('equipoFiltrado').value;

        if (input !=='') {
            event.preventDefault();
            fetchData(); // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
            limpiarFormulario()
        }else{
            alert('¡Favor ingresar un EQUIPO!')
        }

    });
});



// ###############################################################################################
// #################################### ORDENAR DATOS CORREO ######################################
// ###############################################################################################

    
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
            // Ordenar los datos por nombre de forma ascendente
            data.sort((a, b) => a.correo_servicio.localeCompare(b.correo_servicio)); 
            
            data.forEach(function(row) {

                var tr = document.createElement("tr");

                tr.innerHTML = ` 
                    <td>${row.id_servicio}</td>
                    <td>${row.correo_servicio.toUpperCase()}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.destino_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        } 
        
    }  

    // Función para realizar la solicitud AJAX
    function fetchData() {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "getConexionMServicios.php", true);

        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                updateTable(data);
            }
        };
        xhr.send();
    }

    // Manejar el evento click del botón de filtrado
    document.getElementById("filterButton").addEventListener("click", function() {

        fetchData(); // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
    });
});


// ###############################################################################################
// #################################### ORDENAR DATOS EQUIPO ######################################
// ###############################################################################################

    
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
        } else {
            console.log("Datos antes de ordenar:", data);

            // Ordenar los datos por la primera letra del tipo_equipo
            data.sort((a, b) => {
                const firstLetterA = a.tipo_equipo[0].toUpperCase();
                const firstLetterB = b.tipo_equipo[0].toUpperCase();
                return firstLetterA.localeCompare(firstLetterB);
            });

            console.log("Datos después de ordenar:", data);

            data.forEach(function(row) {
                var tr = document.createElement("tr");

                tr.innerHTML = ` 
                    <td>${row.id_servicio}</td>
                    <td>${row.correo_servicio.toUpperCase()}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.destino_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        } 
    }  

    // Función para realizar la solicitud AJAX
    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "getConexionMServicios.php", true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                updateTable(data);
            }
        };
        xhr.send();
    }

    // Manejar el evento click del botón de filtrado
    document.getElementById("filterButtontwo").addEventListener("click", function() {
        fetchData(); // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
    });
});



// ###############################################################################################
// #################################### ORDENAR DATOS LUGAR ######################################
// ###############################################################################################

    
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
            // Ordenar los datos por nombre de forma ascendente
            data.sort((a, b) => a.destino_servicio.localeCompare(b.destino_servicio)); 
            
            data.forEach(function(row) {

                var tr = document.createElement("tr");

                tr.innerHTML = ` 
                    <td>${row.id_servicio}</td>
                    <td>${row.correo_servicio.toUpperCase()}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.destino_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        } 
        
    }  

    // Función para realizar la solicitud AJAX
    function fetchData() {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "getConexionMServicios.php", true);

        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                updateTable(data);
            }
        };
        xhr.send();
    }

    // Manejar el evento click del botón de filtrado
    document.getElementById("filterButtonthree").addEventListener("click", function() {

        fetchData(); // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
    });
});


// ###############################################################################################
// #################################### ORDENAR DATOS FECHA ######################################
// ###############################################################################################

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
        } else {
            // Ordenar los datos por fecha de menor a mayor
            data.sort((a, b) => {
                // Convertir las fechas a objetos Date para comparación
                const dateA = new Date(a.createTime_servicio);
                const dateB = new Date(b.createTime_servicio);
                return dateA - dateB;
            });

            data.forEach(function(row) {
                var tr = document.createElement("tr");

                tr.innerHTML = ` 
                    <td>${row.id_servicio}</td>
                    <td>${row.correo_servicio.toUpperCase()}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.destino_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        } 
    }  

    // Función para realizar la solicitud AJAX
    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "getConexionMServicios.php", true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                updateTable(data);
            }
        };
        xhr.send();
    }

    // Manejar el evento click del botón de filtrado
    document.getElementById("filterButtonfour").addEventListener("click", function() {
        fetchData(); // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
    });
});



// ###############################################################################################
// #################################### ORDENAR DATOS ESTADO ######################################
// ###############################################################################################

    
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
            // Ordenar los datos por nombre de forma ascendente
            data.sort((a, b) => a.estado_servicio.localeCompare(b.estado_servicio)); 
            
            data.forEach(function(row) {

                var tr = document.createElement("tr");

                tr.innerHTML = ` 
                    <td>${row.id_servicio}</td>
                    <td>${row.correo_servicio.toUpperCase()}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.destino_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        } 
        
    }  

    // Función para realizar la solicitud AJAX
    function fetchData() {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "getConexionMServicios.php", true);

        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                updateTable(data);
            }
        };
        xhr.send();
    }

    // Manejar el evento click del botón de filtrado
    document.getElementById("filterButtonfive").addEventListener("click", function() {

        fetchData(); // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
    });
});



// ****************************************************************************************************
// ************************************** FUNCION FORMULARIO ******************************************
// ****************************************************************************************************


function limpiarFormulario() {
    // Obtiene el formulario por su ID
    var formulario = document.getElementById('miFormulario');
    // Limpia todos los campos del formulario
    formulario.reset();
}