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
            tr.innerHTML = `<td colspan="7">${data.error}</td>`;
            tableBody.appendChild(tr);
        }else{
            data.forEach(function(row) {

                var tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${row.id_cliente}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.nombre_completo.toUpperCase()}</td>
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
    // setInterval(fetchData, 5000);
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
            
            var direccion = document.getElementById('direccion').value;
            var cedula = document.getElementById('cedula').value;
            var lugar = document.getElementById('lugar').value;
            var equipo = document.getElementById('equipo').value;
            var celular = document.getElementById('celular').value;
            var mantenimiento = document.getElementById('mantenimiento').value;
            var correo = document.getElementById('correo').value;
            
            if (direccion !== '' && cedula !== '' && lugar !== '' && equipo !== '' && celular !== '' && mantenimiento !== '' && correo !== '') {
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


// ####################################################################################################
// ################################### ENVIAR DATOS CC A PHP ##########################################
// ####################################################################################################


document.addEventListener('DOMContentLoaded', function() {
    const cedulaInput = document.getElementById('cedula');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');

    cedulaInput.addEventListener('input', function() {
        const cedula = cedulaInput.value;

        // Verifica que el input no esté vacío
        if (cedula.length > 0) {
            fetch('consulta.php?cedula=' + encodeURIComponent(cedula))
                .then(response => {
                    // Verifica si la respuesta es correcta
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        // Si el cliente es encontrado, actualiza los campos con la información del cliente
                        nombreInput.value = data.nombre_cliente || '';
                        apellidoInput.value = data.apellido_cliente || '';
                    } else {
                        // Si el cliente no es encontrado, muestra un mensaje en los campos
                        nombreInput.value = 'Cliente no existe';
                        apellidoInput.value = 'Cliente no existe';
                    }
                })
                .catch(error => {
                    // Maneja errores de red o errores JSON
                    console.error('Error:', error);
                    nombreInput.value = 'Error en la consulta';
                    apellidoInput.value = 'Error en la consulta';
                });
        } else {
            // Limpia los campos si el input está vacío
            nombreInput.value = '';
            apellidoInput.value = '';
        }
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
                    <td>${row.id_cliente}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.nombre_completo.toUpperCase()}</td>
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
    function fetchData(filterType) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'conexionRServicio.php?accion=poblar', true);
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
        handleFilterButtonClick("id_cliente");
    });
    document.getElementById("filtro2").addEventListener("click", function() {
        handleFilterButtonClick("tipo_equipo");
    });
    document.getElementById("filtro3").addEventListener("click", function() {
        handleFilterButtonClick("nombre_completo");
    });
    document.getElementById("filtro4").addEventListener("click", function() {
        handleFilterButtonClick("destino_servicio");
    });
    document.getElementById("filtro5").addEventListener("click", function() {
        handleFilterButtonClick("direccion_servicio");
    });
    document.getElementById("filtro6").addEventListener("click", function() {
        handleFilterButtonClick("telefono_servicio");
    });
    document.getElementById("filtro7").addEventListener("click", function() {
        handleFilterButtonClick("createTime_servicio");
    });
});




// ****************************************************************************************************
// ************************************** FUNCION EXPORTAR INF ****************************************
// ****************************************************************************************************



document.getElementById('export-btn').addEventListener('click', function() {
    // Llamar a la API PHP para obtener los datos
    fetch('conexionRServicio.php?accion=poblar')
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


// //----------------------------------------- Evento para el combo-box ---------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var comboBox = document.querySelector('.combo-box select');

    comboBox.addEventListener('change', function () {
        comboBox.parentNode.classList.add('select-active');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    var comboBox = document.querySelector('.combo-box-five select');

    comboBox.addEventListener('change', function () {
        comboBox.parentNode.classList.add('select-active');
    });
});
