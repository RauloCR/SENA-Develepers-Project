


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
      xhr.open("GET", 'conexionBusquedaP.php?accion=poblar', true);
      
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


// var formEnviado = false; // Bandera para controlar si el formulario ya se ha enviado
// var resultadoElementOne = document.getElementById('enviarFormulario');

// if (resultadoElementOne) {
  
//     resultadoElementOne.addEventListener("click", function(event){
//         event.preventDefault()
        
//         if (!formEnviado) {
//             var nombre = document.getElementById('nombreUsuario').value;
//             var nombre = document.getElementById('apellidoUsuario').value;
//             var telefono = document.getElementById('telefonoUsuario').value;
//             var direccion = document.getElementById('direccionUsuario').value;
//             var correo = document.getElementById('correoUsuario').value;

//             var rol = document.getElementById('rolUsuario').value;
//             var cedula = document.getElementById('cedulaUsuario').value;
//             var fechaInicial = document.getElementById('fechaInicial').value;
//             var idUsuario = document.getElementById('idUsuario').value;
            
        
//             if (nombre !== '' && telefono !== '' && direccion !== '' && correo !== '' && cedula !== '' && contrasena !== '' && apellido !== '' && rol !== '') {
//                 formEnviado = true; // Marcar el formulario como enviado

//                 var f = document.getElementById('miFormulario')
                          
                        
//                         var formData = new FormData(f);
                        
//                             // Crear objeto XMLHttpRequest
//                             var xhr = new XMLHttpRequest();
                        
//                             // Configurar la solicitud
//                             xhr.open('POST', 'conexionRgUsuario.php?accion=enviar', true);
                    
//                             // Configurar la función de devolución de llamada
//                             xhr.onload = function() {
//                                 if (xhr.status >= 200 && xhr.status < 400) {

//                                   console.log(xhr.responseText)
                                  
//                                   // if (xhr.responseText.trim() === 'Datos almacenados correctamente.') {
//                                   //     alert("hola")
//                                   //     // Éxito
//                                   //   
//                                   // }
                                   
//                                   if (xhr.responseText.indexOf('Datos almacenados correctamente.') !== -1) {
//                                       // La respuesta contiene el texto esperado
//                                       document.getElementById('resultado').innerHTML = 'Datos almacenados correctamente.';
//                                   } else {
//                                       // La respuesta no contiene el texto esperado
//                                       alert("Error: " + xhr.responseText);
//                                   }

//                                 } else {
//                                     // Error
//                                     alert('Error al procesar la solicitud.');
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
                  <td>${row.id_usuario}</td>
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

        xhr.open("GET", "conexionBusquedaP.php?" + queryString, true);
        
        xhr.onreadystatechange = function() {
            
            if (xhr.readyState == 4 && xhr.status == 200) {
                
                console.log(xhr.responseText)
                var data = JSON.parse(xhr.responseText);
                updateTable(data);
            }
        };
        xhr.send();
    }

    // Manejar el evento click del botón de buscar
    document.getElementById("buscarDatos").addEventListener("click", function(event) {

        // var nombre = document.getElementById('nombreUsuario').value;
        // var apellido = document.getElementById('apellidoUsuario').value;
        // var telefono = document.getElementById('telefonoUsuario').value;
        // var direccion = document.getElementById('direccionUsuario').value;
        // var correo = document.getElementById('correoUsuario').value;

        // var rol = document.getElementById('rolUsuario').value;
        // var cedula = document.getElementById('cedulaUsuario').value;
        // // var fechaInicial = document.getElementById('fechaInicial').value;
        // var idUsuario = document.getElementById('idUsuario').value;

        // if (nombre !== '' && apellido !== '' && telefono !== '' && direccion !== '' && correo !== '' && rol !== '' && cedula !== '' && idUsuario !== '' ) {
        //     event.preventDefault();    
        //     // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
        //     fetchData(); 
        // }else{
        //     alert('¡Favor ingresar toda la informacion!')
        // }


        

        
            event.preventDefault();    
            // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
            fetchData(); 
        
        
    });
});

