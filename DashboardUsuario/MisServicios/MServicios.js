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


//-----------------------------------EVENTO PARA LOS BOTONES -CIRCLE- ------------------------------------------------

    // document.addEventListener('DOMContentLoaded', function () {
    //     // Obtén todos los elementos con la clase 'fa-circle'
    //     var circleIcons = document.querySelectorAll('.fa-regular.fa-circle');

    //     // Agrega un evento de clic a cada elemento
    //     circleIcons.forEach(function (circleIcon) {
    //         circleIcon.addEventListener('click', function () {
    //             // Cambia el icono de círculo a un chulito cuando se hace clic
    //             if (this.classList.contains('fa-circle')) {
    //                 this.classList.remove('fa-circle');
    //                 this.classList.add('fa-check-circle');
    //                 this.classList.add('fa-solid')
    //             } else {
    //                 // Si ya es un chulito, cambia de nuevo a círculo
    //                 this.classList.remove('fa-check-circle');
    //                 this.classList.remove('fa-solid')
    //                 this.classList.add('fa-circle');
    //             }
    //         });
    //     });
    // });


//--------------------------------------VALORACION ESTRELLAS--------------------------------------------

    // let selectedStars = 0;

    // function rateStar(star) {
    //   selectedStars = star;
    //   for (let i = 1; i <= 5; i++) {
    //     const starElement = document.querySelector(`#rating-stars .star:nth-child(${i})`);
    //     starElement.classList.toggle('active', i <= selectedStars);
    //   }
    // }

    let selectedStars = 0;

function rateStar(star) {
    selectedStars = star;
    document.getElementById('rating-value').value = star;
    for (let i = 1; i <= 5; i++) {
        const starElement = document.querySelector(`#rating-stars .star:nth-child(${i})`);
        starElement.classList.toggle('active', i <= selectedStars);
    }
}
  
    // function submitComment() {
    //   const commentText = document.getElementById('comment').value;
    //   if (selectedStars === 0 || commentText.trim() === '') {
    //     alert('Por favor, selecciona una valoración y escribe un comentario.');
    //   } else {
    //     // alert(`Valoración: ${selectedStars}`);
    //     document.getElementById('comment').value = ''; 
    //     // Limpiar el campo de comentarios
    //     // reiniciar las estrellas a su estado inicial.
    //     selectedStars = 0;
    //     rateStar(selectedStars);
    //   }
    // }
  



    



// ----------------------POBLAR TABLA CON DATOS DEL LOCAL STORAGE---------------------


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
//                 <th>${dato.titular}</th>
//                 <th>${dato.email}</th>
//                 <th>${dato.equipo}</th>
//                 <th>${dato.lugar}</th>
//                 <th>${dato.fecha}</th>
//                 <th>${'ACTIVO'}</th>
//             `;
//             tabla.appendChild(nuevaFila);
//         });


// //-------------------------------------COPIAR AL PORTAPAPELES-------------------------------------------------

//         document.getElementById("copiarExcel").addEventListener("click", function () {
//             copiarTablaAlPortapapeles();
//         });

//         function copiarTablaAlPortapapeles() {
//             var tablaHtml = tabla.outerHTML;
//             var tablaTexto = tabla.innerText;

//             // Crear un elemento de textarea para copiar el texto
//             var textarea = document.createElement("textarea");
//             textarea.value = tablaTexto;
//             document.body.appendChild(textarea);
//             textarea.select();

//             // Copiar al portapapeles
//             document.execCommand('copy');
            
//             // Eliminar el elemento de textarea
//             document.body.removeChild(textarea);
//             mostrarNotificacion("Los datos se han copiado al portapapeles. Ahora puedes pegarlos en Excel.", 3000);
//         }
    
//     }



// //------------------------------------- FILTRAR POR *** -------------------------------------------------
    
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

// // ...

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
// ####################################################################################################
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
                    <td>NAME</td>
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

    // Actualizar los datos cada 5 segundos (5000 ms)
    // setInterval(fetchData, 5000);
});


// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------



// -------------------------------------VALIDAR INFORMACION-----------------------------------------


// ####################################################################################################
// ####################################################################################################
// ####################################################################################################


    var resultadoElement = document.getElementById('submit-btn');
    
    resultadoElement.addEventListener("click", function(){

        document.getElementById('form').addEventListener('submit', function(event){

            event.preventDefault()

            const commentText = document.getElementById('comment').value;
          
            if (selectedStars === 0 || commentText.trim() === '') {
                
                alert('Por favor, selecciona una valoración y escribe un comentario.');
                location.reload();

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








    // ---------------------------------------------------------------------------------------------------------
    // --------------------- Función para ordenar los datos por el campo destination_place ---------------------
    // ---------------------------------------------------------------------------------------------------------


    
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
                        <td>NAME</td>
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
                    <td>NAME</td>
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
        }else{
            alert('¡Favor ingresar un EQUIPO!')
        }

    });
});


