//----------------------------------------SCRIP PARA EL PLACEHOLDER DE FECHA----------------------------------------

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

  

//---------------------------------POBLAR TABLA CON DATOS DEL LOCAL STORAGE-------------------------------------


// document.addEventListener("DOMContentLoaded", function() {
            
//     // var nombreTitular = localStorage.getItem('nombreClienteLogueado');
//     var tabla = document.querySelector("table tbody");
//     cargarDatosGuardados();

//     function cargarDatosGuardados() {
//         // Obtener los datos almacenados en localStorage
//         var solicitarServicios = JSON.parse(localStorage.getItem('solicitarServicios')) || [];

//         // Agregar las filas a la tabla
//         solicitarServicios.forEach(function (dato) {
//             var nuevaFila = document.createElement("tr");
//             nuevaFila.innerHTML = `
//                 <th>${dato.idServicio}</th>
//                 <th>${dato.equipo}</th>
//                 <th>${'PENDIENTE'}</th>
//                 <th>${dato.fecha}</th>
//             `;
//             tabla.appendChild(nuevaFila);
//         });


// ------------------------------------SCRIP COPIAR AL PORTAPAPELES------------------------------------------

    //     document.getElementById("copiarExcel").addEventListener("click", function () {
    //         copiarTablaAlPortapapeles();
    //     });

    //     function copiarTablaAlPortapapeles() {
    //         var tablaHtml = tabla.outerHTML;
    //         var tablaTexto = tabla.innerText;

    //         // Crear un elemento de textarea para copiar el texto
    //         var textarea = document.createElement("textarea");
    //         textarea.value = tablaTexto;
    //         document.body.appendChild(textarea);
    //         textarea.select();

    //         // Copiar al portapapeles
    //         document.execCommand('copy');
            
    //         // Eliminar el elemento de textarea
    //         document.body.removeChild(textarea);
    //         mostrarNotificacion("Los datos se han copiado al portapapeles. Ahora puedes pegarlos en Excel.", 3000);
    //     }
    
    // }

// ------------------------------------FILTRAR POR ***------------------------------------------

    
// document.getElementById("filtro").addEventListener("click", function () {
//     var equipoSeleccionado = document.getElementById("equipoFiltrado");
//     var textoSeleccionado = equipoSeleccionado.options[equipoSeleccionado.selectedIndex].text;

//     // Verificar si se ha seleccionado un equipo
//     if (textoSeleccionado.trim() === "Seleccione...") {
//         alert("¡Debes seleccionar un equipo!");
//         return;
//     } else {
//         filtrarRegistrosPorEquipo(textoSeleccionado);
//     }

//     filtrarRegistrosPorEquipo(textoSeleccionado);

    
// });

// ...

// function filtrarRegistrosPorEquipo(textoSeleccionado) {
    
//     // Limpiar la tabla antes de aplicar el filtro
//     while (tabla.firstChild) {
//         tabla.removeChild(tabla.firstChild);
//     }

//     // Obtener los datos almacenados en localStorage
//     var solicitarServicios = JSON.parse(localStorage.getItem('solicitarServicios')) || [];

//     // Filtrar y agregar las filas a la tabla
//     solicitarServicios.forEach(function (dato) {
//         if (dato.equipo.toLowerCase() === textoSeleccionado.toLowerCase()) {
//             var nuevaFila = document.createElement("tr");
//             nuevaFila.innerHTML = `
//                 <th>${dato.titular}</th>
//                 <th>${dato.email}</th>
//                 <th>${dato.equipo}</th>
//                 <th>${dato.lugar}</th>
//                 <th>${dato.fecha}</th>
//                 <th>${'ACTIVO'}</th>
//             `;
//             tabla.appendChild(nuevaFila);
//         }
//     });
// }




    // document.getElementById("filtro").addEventListener("click", function () {
    //     // Obtener el equipo seleccionado por el usuario
    //     var equipoSeleccionado = document.getElementById("equipoFiltrado").value;

    //     // Verificar si se ha seleccionado un equipo
    //     if (equipoSeleccionado.trim() === "") {
    //         alert("¡Debes seleccionar un equipo!");
    //     } else {
    //         filtrarRegistrosPorEquipo(equipoSeleccionado);
    //     }
    // });

    // // ...

    // function filtrarRegistrosPorEquipo(equipoFiltrado) {
    //     // Limpiar la tabla antes de aplicar el filtro
    //     while (tabla.firstChild) {
    //         tabla.removeChild(tabla.firstChild);
    //     }

    //     // Obtener los datos almacenados en localStorage
    //     var solicitarServicios = JSON.parse(localStorage.getItem('solicitarServicios')) || [];

//     // Filtrar y agregar las filas a la tabla

//     alert("HOLA!");
   

//         solicitarServicios.forEach(function (dato) {
//             if (dato.equipo.toLowerCase() === equipoFiltrado.toLowerCase()) {
//                 var nuevaFila = document.createElement("tr");
//                 nuevaFila.innerHTML = `
//                     <th>${dato.titular}</th>
//                     <th>${dato.email}</th>
//                     <th>${dato.equipo}</th>
//                     <th>${dato.lugar}</th>
//                     <th>${dato.fecha}</th>
//                     <th>${'ACTIVO'}</th>
//                 `;
//                 tabla.appendChild(nuevaFila);
//             }

//     });
// }




// });





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
                    <td>${row.id_servicio.toUpperCase()}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        }
    }

    // Función para realizar la solicitud AJAX
    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "conexionMeinMenu.php", true);
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


// var formEnviado = false; // Bandera para controlar si el formulario ya se ha enviado
// var resultadoElement = document.getElementById('enviarFormulario');

// if (resultadoElement) {
//     resultadoElement.addEventListener("click", function(event){

//         event.preventDefault()
        
//         if (!formEnviado) {
//             var equipo = document.getElementById('equipo').value;
//             var direccion = document.getElementById('direccion').value;
//             var mantenimiento = document.getElementById('mantenimiento').value;
//             var celular = document.getElementById('celular').value;
//             var lugar = document.getElementById('lugar').value;
//             var email = document.getElementById('email').value;
        
//             if (equipo !== '' && direccion !== '' && mantenimiento !== '' && celular !== '' && lugar !== '' && email !== '') {
//                 formEnviado = true; // Marcar el formulario como enviado

//                 var f = document.getElementById('miFormulario')
                        
                        
//                         var formData = new FormData(f);
                        
//                             // Crear objeto XMLHttpRequest
//                             var xhr = new XMLHttpRequest();
                        
//                             // Configurar la solicitud
//                             xhr.open('POST', 'conexionSServicio.php', true);
                    
//                             // Configurar la función de devolución de llamada
//                             xhr.onload = function() {
//                                 if (xhr.status >= 200 && xhr.status < 400) {
//                                     // Éxito
//                                     document.getElementById('resultado').innerHTML = xhr.responseText;
//                                 } else {
//                                     // Error
//                                     console.error('Error al procesar la solicitud.');
//                                 }
//                             };  
//                             // Enviar la solicitud
//                             xhr.send(formData);
//                             abrirVentana()
//             } else{
//                 alert("Favor completar todos los campos")
//             } 

            
//         }
//     })
// }


// // -------------------------------------VENTANA FLOTANTE-----------------------------------------

// function abrirVentana() {
//     document.getElementById("popup").style.display = "block";
// }

// function cerrarVentana() {
//     document.getElementById("popup").style.display = "none";
//     window.location.href = "./SServicio.html";
// }

