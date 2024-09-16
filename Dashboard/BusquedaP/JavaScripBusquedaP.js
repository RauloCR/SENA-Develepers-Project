


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
            //   console.log(xhr.responseText)
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
        
    event.preventDefault();    
    // Llamar a fetchData para actualizar los datos al hacer clic en el botón de filtrado
    fetchData(); 
        
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
    function fetchData(filterType) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'conexionBusquedaP.php?accion=poblar', true);
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
        handleFilterButtonClick("id_usuario");
    });
    document.getElementById("filtro2").addEventListener("click", function() {
        handleFilterButtonClick("tipo_rol");
    });
    document.getElementById("filtro3").addEventListener("click", function() {
        handleFilterButtonClick("nombre_usuario");
    });
    document.getElementById("filtro4").addEventListener("click", function() {
        handleFilterButtonClick("correo_usuario");
    });
    document.getElementById("filtro5").addEventListener("click", function() {
        handleFilterButtonClick("createTime_usuario");
    });
    document.getElementById("filtro6").addEventListener("click", function() {
        handleFilterButtonClick("estado_usuario");
    });
});



// ****************************************************************************************************
// ************************************** FUNCION EXPORTAR INF ****************************************
// ****************************************************************************************************



document.getElementById('export-btn').addEventListener('click', function() {
    // Llamar a la API PHP para obtener los datos
    fetch('conexionBusquedaP.php?accion=poblar')
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
            XLSX.writeFile(wb, 'Datos_usuarios.xlsx');
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});



// //----------------------------------------- Evento para el combo-box ---------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var comboBox = document.querySelector('.combo-box select');

    comboBox.addEventListener('change', function () {
        comboBox.parentNode.classList.add('select-active');
    });
});


