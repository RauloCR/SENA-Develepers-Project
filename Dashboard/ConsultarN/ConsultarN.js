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
                    <td>${row.id_usuario}</td>
                    <td>${row.cedula_usuario}</td>
                    <td>${row.correo_usuario.toUpperCase()}</td>
                    <td>${row.createTime_usuario}</td>
                    <td>${row.estado_usuario}</td>
                `;
                tableBody.appendChild(tr);
            });
        }
    }      

    // Función para realizar la solicitud AJAX
    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'ConsultaN.php?accion=poblar', true);
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
                    <td>${row.id_usuario}</td>
                    <td>${row.cedula_usuario}</td>
                    <td>${row.correo_usuario.toUpperCase()}</td>
                    <td>${row.createTime_usuario}</td>
                    <td>${row.estado_usuario}</td>
                `;
                tableBody.appendChild(tr);
            });
        } 
    }  

    // Función para realizar la solicitud AJAX
    function fetchData(filterType) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'ConsultaN.php?accion=poblar', true);
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
        handleFilterButtonClick("cedula_usuario");
    });
    document.getElementById("filtro3").addEventListener("click", function() {
        handleFilterButtonClick("correo_usuario");
    });
    document.getElementById("filtro4").addEventListener("click", function() {
        handleFilterButtonClick("createTime_usuario");
    });
    document.getElementById("filtro5").addEventListener("click", function() {
        handleFilterButtonClick("estado_usuario");
    });
});







// ####################################################################################################
// ################################### ENVIAR DATOS GT A PHP ##########################################
// ####################################################################################################


document.addEventListener('DOMContentLoaded', function() {

    const cedula = document.getElementById('cedulab');

    const id = document.getElementById('id');
    const rol = document.getElementById('rol');
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const tipocc = document.getElementById('tipocc');
    const cc = document.getElementById('cc');
    const tl = document.getElementById('telefono');
    const direccion = document.getElementById('direccion');
    const correo = document.getElementById('correo');
    const estado = document.getElementById('estado');
    const contrasena = document.getElementById('contrasena');

    cedula.addEventListener('input', function() {
        const cedulav = cedula.value;

        // Verifica que el input no esté vacío
        if (cedulav.length > 0) {
            fetch('ConsultaNB.php?cedulab=' + encodeURIComponent(cedulav))
                .then(response => {
                    // Verifica si la respuesta es correcta
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    alert(response)
                    return response.json();
                    
                })
                .then(data => {
                    if (data.success) {
                        // Si el usuario es encontrado, actualiza los campos con la información del cliente
                        id.value = data.id_usuario || '';
                        rol.value = data.tipo_rol || '';
                        nombre.value = data.nombre_usuario || '';
                        apellido.value = data.apellido_usuario || '';
                        tipocc.value = data.tipo_cedula || '';
                        cc.value = data.cedula_usuario || '';
                        tl.value = data.telefono_usuario || '';
                        direccion.value = data.direccion_usuario || '';
                        correo.value = data.correo_usuario || '';
                        estado.value = data.estado_usuario || '';
                        contrasena.value = data.contrasena_usuario || '';
                    } else {
                        // Si el cliente no es encontrado, muestra un mensaje en los campos

                        id.value = 'Dato usuario no encontrado...';
                        rol.value = 'Dato usuario no encontrado...';
                        nombre.value = 'Dato usuario no encontrado...';
                        apellido.value = 'Dato usuario no encontrado...';
                        tipocc.value = 'Dato usuario no encontrado...';
                        cc.value = 'Dato usuario no encontrado...';
                        tl.value = 'Dato usuario no encontrado...';
                        direccion.value = 'Dato usuario no encontrado...';
                        correo.value = 'Dato usuario no encontrado...';
                        estado.value = 'Dato usuario no encontrado...';
                        contrasena.value = 'Dato usuario no encontrado...';

                    }
                })
                .catch(error => {
                    // Maneja errores de red o errores JSON

                    console.error('Error:', error);
                });
        } else {
            // Limpia los campos si el input está vacío

            id.value = '';
            rol.value = '';
            nombre.value = '';
            apellido.value = '';
            tipocc.value = '';
            cc.value = '';
            tl.value = '';
            direccion.value = '';
            correo.value = '';
            estado.value = '';
            contrasena.value = '';
        }
    });
});




// ############################################################################################################
// ########################################SCRIP - GUARDAR DATOS EN BD#########################################
// ############################################################################################################

var formEnviado = false; // Bandera para controlar si el formulario ya se ha enviado

// Obtener el botón que se encuentra fuera del formulario
var resultadoElement = document.getElementById('RegistroUser');

if (resultadoElement) {
    resultadoElement.addEventListener("click", function() {

        if (!formEnviado) {
            formEnviado = true; // Marcar el formulario como enviado

            // Obtener el formulario
            var formulario = document.getElementById('miFormulario');
            
            // Crear un nuevo objeto FormData con los datos del formulario
            var formData = new FormData(formulario);

            // Crear objeto XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // Configurar la solicitud
            xhr.open('POST', 'ConsultaN.php?accion=actualizar', true);

            // Configurar la función de devolución de llamada
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 400) {
                    // Éxito
                    // alert(xhr.responseText);
                    document.getElementById('resultado').innerHTML = xhr.responseText;
                } else {
                    // Error
                    console.error('Error al procesar la solicitud.');
                }
            };

            // Configurar la función de manejo de errores
            xhr.onerror = function() {
                console.error('Error en la solicitud.');
            };

            // Enviar la solicitud
            xhr.send(formData);
            
            // Opcional: abrir una ventana después del envío
            abrirVentana();
        }
    });
}



// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentana() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentana() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "./ConsultarN.html";
}




// ****************************************************************************************************
// ************************************** FUNCION EXPORTAR INF ****************************************
// ****************************************************************************************************



document.getElementById('export-btn').addEventListener('click', function() {
    // Llamar a la API PHP para obtener los datos
    fetch('ConsultaN.php?accion=poblar')
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
