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


// //----------------------------------------- Evento para el combo-box ---------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var comboBox = document.querySelector('.combo-box select');

    comboBox.addEventListener('change', function () {
        comboBox.parentNode.classList.add('select-active');
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
        xhr.open("GET", "conexionMeinMenu.php?accion=poblar", true);
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
                  <td>${row.id_servicio}</td>
                  <td>${row.tipo_equipo.toUpperCase()}</td>
                  <td>${row.estado_servicio.toUpperCase()}</td>
                  <td>${row.createTime_servicio}</td>
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

        xhr.open("GET", "conexionMeinMenu.php?" + queryString, true);
        
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
        
        var inp = document.getElementById('estadoS').value;
        var inptwo = document.getElementById('servicio').value;

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
// ************************************ BORRAR INFORMACION*********************************************
// ****************************************************************************************************
  
document.addEventListener("DOMContentLoaded", function() {

    // Función para realizar la solicitud AJAX
    function fetchData() {
        

        var xhr = new XMLHttpRequest();
        var form = document.getElementById("miFormulario"); // Cambia "miFormulario" al ID de tu formulario
        var formData = new FormData(form);
        // var queryString = new URLSearchParams(formData).toString();
        // queryString += "&accion=borrar";

        xhr.open("POST", "conexionMeinMenu.php?accion=borrar", true);
        
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
        var inp = document.getElementById('servicioE').value;
        if (inp !== '') {
            event.preventDefault();    
            // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
            fetchData(); 
        }else{
            alert('¡Favor ingresaer un ID!')
        }
        
    });
});

function abrirVentana() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentana() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "./MeinMenu.html";
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



// ****************************************************************************************************
// ************************************** FUNCION EXPORTAR INF ****************************************
// ****************************************************************************************************



document.getElementById('export-btn').addEventListener('click', function() {
    // Llamar a la API PHP para obtener los datos
    fetch('conexionMeinMenu.php?accion=poblar')
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
            XLSX.writeFile(wb, 'Datos_servicios.xlsx');
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
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
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        } 
    }  

    // Función para realizar la solicitud AJAX
    function fetchData(filterType) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'ConexionMeinMenu.php?accion=poblar', true);
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
    document.getElementById("columnone").addEventListener("click", function() {
        handleFilterButtonClick("id_servicio");
    });
    document.getElementById("columntwo").addEventListener("click", function() {
        handleFilterButtonClick("tipo_equipo");
    });
    document.getElementById("columnthree").addEventListener("click", function() {
        handleFilterButtonClick("estado_servicio");
    });
    document.getElementById("columnfour").addEventListener("click", function() {
        handleFilterButtonClick("createTime_servicio");
    });
});



