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
            tr.innerHTML = `<td colspan="7">${data.error}</td>`;
            tableBody.appendChild(tr);
        }else{
            data.forEach(function(row) {

                var tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${row.id_servicio}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                    <td>${row.tiempo_alarma}</td>
                `;
                tableBody.appendChild(tr);
            });
        }
    }      

    // Función para realizar la solicitud AJAX
    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'GenerarA.php?accion=poblar', true);
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
    //  
});




// ###############################################################################################
// ####################################### ORDENAR DATOS #########################################
// ###############################################################################################

document.addEventListener("DOMContentLoaded", function() {
    // Función para actualizar la tabla con los datos obtenidos
    function updateTable(data, filterType) {
        var tableBody = document.querySelector("#tablaDatos tbody");
        tableBody.innerHTML = "";  

        if (data.error) {
            // Si hay un error, mostrar un mensaje en la tabla
            var tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="4">${data.error}</td>`;
            tableBody.appendChild(tr);
        } else {
            console.log("Datos antes de ordenar:", data);

            // Ordenar los datos por el campo correspondiente
            data.sort((a, b) => {
                const valueA = a[filterType];
                const valueB = b[filterType];

                if (valueA === null && valueB !== null) return -1;
                if (valueA !== null && valueB === null) return 1;
                if (valueA === null && valueB === null) return 0;

                // Determinar si los datos son numéricos
                const isNumeric = !isNaN(parseFloat(valueA)) && isFinite(valueA);

                if (isNumeric) {
                    // Comparar numéricamente
                    return parseFloat(valueA) - parseFloat(valueB);
                } else {
                    // Comparar alfabéticamente (texto)
                    const firstLetterA = valueA || "";
                    const firstLetterB = valueB || "";
                    return firstLetterA.localeCompare(firstLetterB);
                }
            });

            console.log("Datos después de ordenar:", data);

            data.forEach(function(row) {
                var tr = document.createElement("tr");

                tr.innerHTML = ` 
                    <td>${row.id_servicio}</td>
                    <td>${row.tipo_equipo}</td>
                    <td>${row.estado_servicio}</td>
                    <td>${row.tiempo_alarma}</td>
                `;
                tableBody.appendChild(tr);
            });
        } 
    }  

    // Función para realizar la solicitud AJAX
    function fetchData(filterType) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'GenerarA.php?accion=poblar', true);
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
    document.getElementById("filtro1").addEventListener("click", function() {
        handleFilterButtonClick("id_servicio");
    });
    document.getElementById("filtro2").addEventListener("click", function() {
        handleFilterButtonClick("tipo_equipo");
    });
    document.getElementById("filtro3").addEventListener("click", function() {
        handleFilterButtonClick("estado_servicio");
    });
    document.getElementById("filtro4").addEventListener("click", function() {
        handleFilterButtonClick("tiempo_alarma");
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
            tr.innerHTML = `<td colspan="4">${data.error}</td>`;
            tableBody.appendChild(tr);
        }else{
            
            
            data.forEach(function(row) {

                var tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${row.id_servicio}</td>
                    <td>${row.tipo_equipo}</td>
                    <td>${row.estado_servicio}</td>
                    <td>${row.tiempo_alarma}</td>
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

        xhr.open("GET", "GenerarA.php?" + queryString, true);
        
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
        var inp = document.getElementById('idservicio2').value;
        var inptwo = document.getElementById('estado').value;
        if (inp !== '' || inptwo !== '') {
            event.preventDefault();    
            // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
            fetchData(); 
        }else{
            alert('¡Favor complete la información!')
        }
        
    });
});





// ****************************************************************************************************
// ************************************** FUNCION EXPORTAR INF ****************************************
// ****************************************************************************************************



document.getElementById('export-btn').addEventListener('click', function() {
    // Llamar a la API PHP para obtener los datos
    fetch('GenerarA.php?accion=poblar')
        .then(response => response.json())
        .then(data => {
            // Verificar si la respuesta contiene datos o un error
            if (data.error) {
                alert(data.error);
                return;
            }

            // Crear una hoja de cálculo
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Datos");

            // Generar el archivo Excel
            XLSX.writeFile(wb, 'Datos_alarma.xlsx');
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
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
            var id_serv = document.getElementById('idservicio').value;
            var fecha = document.getElementById('fecha').value;
            
        
            if (id_serv !== '' && fecha !== '' ) {
                formEnviado = true; // Marcar el formulario como enviado

                var f = document.getElementById('miFormulario')
                          
                        
                        var formData = new FormData(f);
                        
                            // Crear objeto XMLHttpRequest
                            var xhr = new XMLHttpRequest();
                        
                            // Configurar la solicitud
                            xhr.open('POST', 'GenerarA.php?accion=enviar', true);
                    
                            // Configurar la función de devolución de llamada
                            xhr.onload = function() {
                                if (xhr.status >= 200 && xhr.status < 400) {

                                  console.log(xhr.responseText)
                                   
                                  if (xhr.responseText.indexOf('Datos guardados correctamente.') !== -1) {
                                      // La respuesta contiene el texto esperado
                                      document.getElementById('resultado').innerHTML = 'Datos guardados correctamente.';
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
  window.location.href = "./GenerarA.html";
}

