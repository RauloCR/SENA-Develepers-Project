// //--------------------------------------SCRIP PARA MOSTRAR NOTIFICACION--------------------------------------

// function mostrarNotificacion(mensaje, tiempo) {
//     var notificacion = document.createElement("div");
//     notificacion.className = "notificacion";
//     notificacion.textContent = mensaje;
//     document.body.appendChild(notificacion);

//     setTimeout(function () {
//         document.body.removeChild(notificacion);
//     }, tiempo);
// }


// //----------------------------------------- Evento para el combo-box ---------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var comboBox = document.querySelector('.combo-box select');

    comboBox.addEventListener('change', function () {
        comboBox.parentNode.classList.add('select-active');
    });
});

// //---------------------------------------- Placeholder de fechas ------------------------------------------- 

document.addEventListener('DOMContentLoaded', function () {
    var dateInputs = document.querySelectorAll('input[type="date"]');

    dateInputs.forEach(function (input) {
        input.addEventListener('input', function () {
            // Cambiar el color del texto cuando se selecciona una fecha
            if (input.value) {
                input.style.color = 'black';
            } else {
                input.style.color = 'gray';
            }
        });
    });
});


// //------------------------------------- FUNCION PARA GENERAR UUID -------------------------------------

// var iduserx = generateUUID()
// function generateUUID() {
//     return 'xxxx'.replace(/[xy]/g, function (c) {
//         var r = (Math.random() * 16) | 0,
//             v = c === 'x' ? r : (r & 0x3) | 0x8;
//         return v.toString(16);
//     });
// }



//     // -----------------------------------------FILTRAR USUARIOS POR ID-------------------------------------------

//     document.getElementById("filtro").addEventListener("click", function () {
//         var usuarioSeleccionado = document.getElementById("usuarioFiltrado").value;

//         // Verificar si se ha seleccionado un ID
//         if (usuarioSeleccionado === '') {
//             alert("¡Debes seleccionar un ID!");
//             return;
//         } else {
//             filtrarRegistrosPorEquipo(usuarioSeleccionado);
//         }

//         filtrarRegistrosPorEquipo(usuarioSeleccionado);

//     });

//     // ...

//     function filtrarRegistrosPorEquipo(textoSeleccionado) {

//         // Limpiar la tabla antes de aplicar el filtro
//         while (tabla.firstChild) {
//             tabla.removeChild(tabla.firstChild);
//         }

//         // Obtener los datos almacenados en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Filtrar y agregar las filas a la tabla
//         tablaRegistro.forEach(function (dato) {
//             if (dato.idUser.toLowerCase() === textoSeleccionado.toLowerCase()) {
//                 var nuevaFila = document.createElement("tr");
//                 nuevaFila.innerHTML = `
//                 <th>${dato.idUser}</th>
//                 <th>${dato.rol}</th>
//                 <th>${dato.nombre}</th>
//                 <th>${dato.correo}</th>
//                 <th>${dato.fechaRegistro}</th>
//                 <th>${'ACTIVO'}</th>
//             `;
//                 tabla.appendChild(nuevaFila);
//             }
//         });
//     }



//     // -----------------------------------------------FILTRO POR FECHA--------------------------------------


//     let ordenAscendente = true; // Variable para rastrear el orden actual

//     document.getElementById("filtro_Fecha").addEventListener("click", function () {
//         filtrarRegistrosPorFechaRegistro();
//         cambiarOrdenFecha();
//     });

//     function filtrarRegistrosPorFechaRegistro() {
//         // Limpiar la tabla antes de aplicar el filtro
//         while (tabla.firstChild) {
//             tabla.removeChild(tabla.firstChild);
//         }

//         // Obtener los datos almacenados en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Ordenar el arreglo según el estado actual de la variable de orden
//         tablaRegistro.sort((a, b) => {
//             const convertirFecha = (fecha) => {
//                 const partes = fecha.split('/');
//                 return partes[2] + partes[1].padStart(2, '0') + partes[0].padStart(2, '0');
//             };

//             const fechaA = convertirFecha(a.fechaRegistro);
//             const fechaB = convertirFecha(b.fechaRegistro);

//             // Multiplicar por -1 si el orden es descendente para invertir el orden
//             const multiplicadorOrden = ordenAscendente ? 1 : -1;
//             return multiplicadorOrden * fechaA.localeCompare(fechaB);
//         });

//         // Agregar las filas ordenadas a la tabla
//         tablaRegistro.forEach(function (dato) {
//             var nuevaFila = document.createElement("tr");
//             nuevaFila.innerHTML = `
//             <th>${dato.idUser}</th>
//             <th>${dato.rol}</th>
//             <th>${dato.nombre + ' ' + dato.apellido}</th>
//             <th>${dato.correo}</th>
//             <th>${dato.fechaRegistro}</th>
//             <th>${'ACTIVO'}</th>
//         `;
//             tabla.appendChild(nuevaFila);
//         });
//     }

//     function cambiarOrdenFecha() {
//         // Cambiar el estado de la variable de orden en cada clic
//         ordenAscendente = !ordenAscendente;
//     }


//     // -----------------------------------------------FILTRO A - Z--------------------------------------

//     // Declarar la variable global ordenAscendente si no está declarada en otro lugar del código
//     var ordenAscendenter = true;

//     document.getElementById("filtro_nombre").addEventListener("click", function () {
//         filtrarRegistrosPorNombre();
//         cambiarOrdenAZ();
//     });

//     function filtrarRegistrosPorNombre() {
//         // Limpiar la tabla antes de aplicar el filtro
//         while (tabla.firstChild) {
//             tabla.removeChild(tabla.firstChild);
//         }

//         // Obtener los datos almacenados en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Ordenar el arreglo según el estado actual de la variable de orden
//         tablaRegistro.sort((a, b) => {
//             const nombreA = a.nombre.toUpperCase();
//             const nombreB = b.nombre.toUpperCase();

//             // Multiplicar por -1 si el orden es descendente para invertir el orden
//             const multiplicadorOrden = ordenAscendenter ? 1 : -1;
//             return multiplicadorOrden * nombreA.localeCompare(nombreB);
//         });

//         // Agregar las filas ordenadas a la tabla
//         tablaRegistro.forEach(function (dato) {
//             var nuevaFila = document.createElement("tr");
//             nuevaFila.innerHTML = `
//             <th>${dato.idUser}</th>
//             <th>${dato.rol}</th>
//             <th>${dato.nombre + ' ' + dato.apellido}</th>
//             <th>${dato.correo}</th>
//             <th>${dato.fechaRegistro}</th>
//             <th>${'ACTIVO'}</th>
//         `;
//             tabla.appendChild(nuevaFila);
//         });
//     }

//     function cambiarOrdenAZ() {
//         // Cambiar el estado de la variable de orden (ascendente a descendente o viceversa)
//         ordenAscendenter = !ordenAscendenter;
//     }



//     // ----------------------------------------------- FILTRO ROL --------------------------------------

//     let ordenAscendenteRol = true; // Variable para rastrear el orden actual

//     document.getElementById("filtro_Rol").addEventListener("click", function () {
//         cambiarOrdenRol();
//         filtrarRegistrosPorRol();
//     });

//     function filtrarRegistrosPorRol() {
//         // Limpiar la tabla antes de aplicar el filtro
//         while (tabla.firstChild) {
//             tabla.removeChild(tabla.firstChild);
//         }

//         // Obtener los datos almacenados en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Ordenar el arreglo según el estado actual de la variable de orden y el campo "rol"
//         tablaRegistro.sort((a, b) => {
//             const rolA = a.rol.toUpperCase();  // Convertir a mayúsculas para hacer la comparación sin distinción de mayúsculas/minúsculas
//             const rolB = b.rol.toUpperCase();

//             // Multiplicar por -1 si el orden es descendente para invertir el orden
//             const multiplicadorOrden = ordenAscendenteRol ? 1 : -1;
//             return multiplicadorOrden * rolA.localeCompare(rolB);
//         });

//         // Agregar las filas ordenadas a la tabla
//         tablaRegistro.forEach(function (dato) {
//             var nuevaFila = document.createElement("tr");
//             nuevaFila.innerHTML = `
//             <th>${dato.idUser}</th>
//             <th>${dato.rol}</th>
//             <th>${dato.nombre + ' ' + dato.apellido}</th>
//             <th>${dato.correo}</th>
//             <th>${dato.fechaRegistro}</th>
//             <th>${'ACTIVO'}</th>
//         `;
//             tabla.appendChild(nuevaFila);
//         });
//     }

//     function cambiarOrdenRol() {
//         // Cambiar el estado de la variable de orden en cada clic
//         ordenAscendenteRol = !ordenAscendenteRol;
//     }




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
                    <td>${row.id_usuario.toUpperCase()}</td>
                    <td>${row.tipo_rol.toUpperCase()}</td>
                    <td>${row.nombre_usuario.toUpperCase()}</td>
                    <td>${row.correo_usuario.toUpperCase()}</td>
                    <td>${row.createTime_usuario.toUpperCase()}</td>
                    <td>${row.estado_usuario.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        }
    }
  
    // Función para realizar la solicitud AJAX
    function fetchData() {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", 'conexionRgUsuario.php?accion=poblar', true);
      
      xhr.onreadystatechange = function() {
      
          // console.log("Estado del servidor:", xhr.status);
   
          if (xhr.readyState == 4 && xhr.status == 200) {
              // console.log(xhr.responseText)
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
  

// ****************************************************************************************************
// ******************************** SCRIP ENVIAR DATOS A PHP ******************************************
// ****************************************************************************************************


  var formEnviado = false; // Bandera para controlar si el formulario ya se ha enviado
  var resultadoElementOne = document.getElementById('enviarFormulario');
  
  if (resultadoElementOne) {
    
      resultadoElementOne.addEventListener("click", function(event){
          event.preventDefault()
          
          if (!formEnviado) {
              var nombre = document.getElementById('nombreUsuario').value;
              var telefono = document.getElementById('telefonoUsuario').value;
              var direccion = document.getElementById('direccionUsuario').value;
              var correo = document.getElementById('correoUsuario').value;
              var cedula = document.getElementById('cedulaUsuario').value;
              var contrasena = document.getElementById('contrasenaUsuario').value;
              var apellido = document.getElementById('apellidoUsuario').value;
              var rol = document.getElementById('rolSelect').value;
          
              if (nombre !== '' && telefono !== '' && direccion !== '' && correo !== '' && cedula !== '' && contrasena !== '' && apellido !== '' && rol !== '') {
                  formEnviado = true; // Marcar el formulario como enviado
  
                  var f = document.getElementById('miFormulario')
                            
                          
                          var formData = new FormData(f);
                          
                              // Crear objeto XMLHttpRequest
                              var xhr = new XMLHttpRequest();
                          
                              // Configurar la solicitud
                              xhr.open('POST', 'conexionRgUsuario.php?accion=enviar', true);
                      
                              // Configurar la función de devolución de llamada
                              xhr.onload = function() {
                                  if (xhr.status >= 200 && xhr.status < 400) {

                                    console.log(xhr.responseText)
                                    
                                    // if (xhr.responseText.trim() === 'Datos almacenados correctamente.') {
                                    //     alert("hola")
                                    //     // Éxito
                                    //   
                                    // }
                                     
                                    if (xhr.responseText.indexOf('Datos almacenados correctamente.') !== -1) {
                                        // La respuesta contiene el texto esperado
                                        document.getElementById('resultado').innerHTML = 'Datos almacenados correctamente.';
                                    } else {
                                        // La respuesta no contiene el texto esperado
                                        alert("Error: " + xhr.responseText);
                                    }

                                  } else {
                                      // Error
                                      alert('Error al procesar la solicitud.');
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
    window.location.href = "./RgUsuario.html";
}

// ####################################################################################################
// ################################### BUSCAR INFORMACION #############################################
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
                  <td>${row.id_usuario.toUpperCase()}</td>
                  <td>${row.tipo_rol.toUpperCase()}</td>
                  <td>${row.nombre_usuario.toUpperCase()}</td>
                  <td>${row.correo_usuario.toUpperCase()}</td>
                  <td>${row.createTime_usuario.toUpperCase()}</td>
                  <td>${row.estado_usuario.toUpperCase()}</td>
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
        queryString += "&accion=buscar";

        // xhr.open("GET", "buscarRgUsuario.php?" + queryString, true);

        xhr.open("GET", "conexionRgUsuario.php?" + queryString, true);
        
        xhr.onreadystatechange = function() {
            
            if (xhr.readyState == 4 && xhr.status == 200) {
            
                var data = JSON.parse(xhr.responseText);
                updateTable(data);
            }
        };
        xhr.send();
    }

    // Manejar el evento click del botón de buscar
    document.getElementById("buscarDatos").addEventListener("click", function(event) {
        var inp = document.getElementById('idUsuario').value;
        if (inp !== '') {
            event.preventDefault();    
            // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
            fetchData(); 
        }else{
            alert('¡Favor ingresaer un ID!')
        }
        
    });
});

  


// ****************************************************************************************************
// ************************************ BORRAR INFORMACION*********************************************
// ****************************************************************************************************
  
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
                  <td>${row.id_usuario.toUpperCase()}</td>
                  <td>${row.tipo_rol.toUpperCase()}</td>
                  <td>${row.nombre_usuario.toUpperCase()}</td>
                  <td>${row.correo_usuario.toUpperCase()}</td>
                  <td>${row.createTime_usuario.toUpperCase()}</td>
                  <td>${row.estado_usuario.toUpperCase()}</td>
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
        // var queryString = new URLSearchParams(formData).toString();
        // queryString += "&accion=borrar";

        xhr.open("POST", "conexionRgUsuario.php?accion=borrar", true);
        
        xhr.onreadystatechange = function() {
            
            if (xhr.readyState == 4 && xhr.status == 200) {
            
                // var data = JSON.parse(xhr.responseText);

                document.getElementById('resultado').innerHTML = xhr.responseText;
                // updateTable(data);
            }
        };
        xhr.send(formData);
        abrirVentana()
    }

    // Manejar el evento click del botón de buscar
    document.getElementById("borrarDatos").addEventListener("click", function(event) {
        var inp = document.getElementById('idUsuariob').value;
        if (inp !== '') {
            event.preventDefault();    
            // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
            fetchData(); 
        }else{
            alert('¡Favor ingresaer un ID!')
        }
        
    });
});

  
  

