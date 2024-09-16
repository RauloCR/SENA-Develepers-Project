


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
        tr.innerHTML = `<td colspan="8">${data.error}</td>`;
        tableBody.appendChild(tr);
    }else{
        data.forEach(function(row) {

            var tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${row.id_servicio.toUpperCase()}</td>
                <td>${row.nombreC_cliente.toUpperCase()}</td>
                <td>${row.tipo_equipo.toUpperCase()}</td>
                <td>${row.nombreC_tecnico.toUpperCase()}</td>
                <td>${row.destino_servicio.toUpperCase()}</td>
                <td>${row.direccion_servicio.toUpperCase()}</td>
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
    xhr.open("GET", "conexionMenuC.php?accion=poblar", true);
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


});


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
        tr.innerHTML = `<td colspan="8">${data.error}</td>`;
        tableBody.appendChild(tr);
    }else{
        
        
        data.forEach(function(row) {

            var tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.id_servicio.toUpperCase()}</td>
                <td>${row.nombreC_cliente.toUpperCase()}</td>
                <td>${row.tipo_equipo.toUpperCase()}</td>
                <td>${row.nombreC_tecnico.toUpperCase()}</td>
                <td>${row.destino_servicio.toUpperCase()}</td>
                <td>${row.direccion_servicio.toUpperCase()}</td>
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
    queryString += "&accion=buscar";

    // xhr.open("GET", "buscarRgUsuario.php?" + queryString, true);

    xhr.open("GET", "ConexionMenuC.php?" + queryString, true);
    
    xhr.onreadystatechange = function() {
        
        if (xhr.readyState == 4 && xhr.status == 200) {

            // console.log(xhr.responseText)
        
            var data = JSON.parse(xhr.responseText);
            updateTable(data);
        }
    };
    xhr.send();
}

// Manejar el evento click del botón de buscar
document.getElementById("buscarDatos").addEventListener("click", function(event) {    
    
    var inp = document.getElementById('idServicio').value;
    var inptwo = document.getElementById('estadoB').value;

    if (inp !== '' || inptwo !== '') {
        event.preventDefault();    
        // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
        fetchData(); 
        limpiarFormulario()
    }else{
        alert('¡Favor ingresaer un ID!')
    }
    
});
});





// ****************************************************************************************************
// ********************************** SCRIP PARA EL PLACEHOLDER DE FECHA ******************************
// ****************************************************************************************************

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


// //----------------------------------------- Evento para el combo-box ---------------------------------------

document.addEventListener('DOMContentLoaded', function () {
var comboBox = document.querySelector('.combo-box select');

comboBox.addEventListener('change', function () {
    comboBox.parentNode.classList.add('select-active');
});
});




// ****************************************************************************************************
// ******************************** SCRIP ENVIAR DATOS A PHP ******************************************
// ****************************************************************************************************


document.getElementById('enviarFormulario').addEventListener('click', function(event) {
    event.preventDefault();

    var formEnviado = false; // Bandera para controlar si el formulario ya se ha enviado

    if (!formEnviado) {
        // Crear FormData y añadir datos de ambos formularios
        var formData = new FormData();
        
        var miFormulario = document.getElementById('miFormulario');
        
        // Añadir datos del primer formulario
        Array.from(new FormData(miFormulario)).forEach(([key, value]) => {
            formData.append(key, value);
        });


        // Crear objeto XMLHttpRequest
        var xhr = new XMLHttpRequest();
        
        // Configurar la solicitud
        xhr.open('POST', 'ConexionMenuC.php?accion=actualizar', true);
        
        // Configurar la función de devolución de llamada
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 400) {
                console.log(xhr.responseText);
                
                if (xhr.responseText.indexOf('Datos actualizados correctamente') !== -1) {
                    // La respuesta contiene el texto esperado
                    document.getElementById('resultado').innerHTML = 'Datos actualizados correctamente.';
                    abrirVentana()
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

        // Marcar el formulario como enviado
        formEnviado = true;
    } else {
        alert("El formulario ya ha sido enviado.");
    }
});


// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentana() {
  document.getElementById("popup").style.display = "block";
}

function cerrarVentana() {
  document.getElementById("popup").style.display = "none";
  window.location.href = "./MenuC.html";
}


// ****************************************************************************************************
// ************************************** FUNCION FORMULARIO ******************************************
// ****************************************************************************************************


function limpiarFormulario() {
    // Obtiene el formulario por su ID
    var formulario = document.getElementById('miFormulario');
    // Limpia todos los campos del formulario
    formulario.reset();
}




// ####################################################################################################
// ###################################### CARGAR IMAGENES #############################################
// ####################################################################################################


document.getElementById('imageInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const files = event.target.files;
    const gallery = document.getElementById('imageGallery');
    
    // Limpiar la galería antes de añadir nuevas imágenes
    gallery.innerHTML = '';

    // Iterar sobre cada archivo seleccionado
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Verificar que el archivo sea una imagen
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                gallery.appendChild(img);
            };

            reader.readAsDataURL(file);
        } else {
            alert(`El archivo ${file.name} no es una imagen.`);
        }
    }
}


// ###############################################################################################
// ######################################## ORDENAR DATOS ########################################
// ###############################################################################################


document.addEventListener("DOMContentLoaded", function() {
    // Función para actualizar la tabla con los datos obtenidos
    function updateTable(data, filterType) {
        var tableBody = document.querySelector("#tablaDatos tbody");
        tableBody.innerHTML = "";  

        if (data.error) {
            // Si hay un error, mostrar un mensaje en la tabla
            var tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="8">${data.error}</td>`;
            tableBody.appendChild(tr);
        } else {
            console.log("Datos antes de ordenar:", data);

            // Ordenar los datos por el campo correspondiente
            data.sort((a, b) => {
                const valueA = a[filterType];
                const valueB = b[filterType];

                // Determinar si los datos son numéricos
                const isNumeric = !isNaN(parseFloat(valueA)) && isFinite(valueA);

                if (isNumeric) {
                    // Comparar numéricamente
                    return parseFloat(valueA) - parseFloat(valueB);
                } else {
                    // Comparar alfabéticamente (texto)
                    const firstLetterA = valueA.toUpperCase();
                    const firstLetterB = valueB.toUpperCase();
                    return firstLetterA.localeCompare(firstLetterB);
                }
            });

            console.log("Datos después de ordenar:", data);

            data.forEach(function(row) {
                var tr = document.createElement("tr");

                tr.innerHTML = ` 
                    <td>${row.id_servicio.toUpperCase()}</td>
                    <td>${row.nombreC_cliente.toUpperCase()}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.nombreC_tecnico.toUpperCase()}</td>
                    <td>${row.destino_servicio.toUpperCase()}</td>
                    <td>${row.direccion_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        } 
    }  

    // Función para realizar la solicitud AJAX
    function fetchData(filterType) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'ConexionMenuC.php?accion=poblar', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                updateTable(data, filterType);
            }
        };
        xhr.send();
    }

    // Función para manejar el clic en los botones de filtrado
    function handleFilterButtonClick(filterType) {
        fetchData(filterType);
    }

     // Asignar eventos a los botones de filtrado
     document.getElementById("filterButton").addEventListener("click", function() {
        handleFilterButtonClick("id_servicio");
    });
    document.getElementById("filterButtontwo").addEventListener("click", function() {
        handleFilterButtonClick("nombreC_cliente");
    });
    document.getElementById("filterButtonthree").addEventListener("click", function() {
        handleFilterButtonClick("tipo_equipo");
    });
    document.getElementById("filterButtonfour").addEventListener("click", function() {
        handleFilterButtonClick("nombreC_tecnico");
    });
    document.getElementById("filterButtonfive").addEventListener("click", function() {
        handleFilterButtonClick("destino_servicio");
    });
    document.getElementById("filterButtonsix").addEventListener("click", function() {
        handleFilterButtonClick("direccion_servicio");
    });
    document.getElementById("filterButtonseven").addEventListener("click", function() {
        handleFilterButtonClick("createTime_servicio");
    });
    document.getElementById("filterButtoneight").addEventListener("click", function() {
        handleFilterButtonClick("estado_servicio");
    });
});



