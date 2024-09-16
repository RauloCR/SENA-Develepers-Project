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




// EVENTO PARA LOS BOTONES - CIRCLE-

    document.addEventListener('DOMContentLoaded', function () {
        // Obtén todos los elementos con la clase 'fa-circle'
        var circleIcons = document.querySelectorAll('.fa-regular.fa-circle');

        // Agrega un evento de clic a cada elemento
        circleIcons.forEach(function (circleIcon) {
            circleIcon.addEventListener('click', function () {
                // Cambia el icono de círculo a un chulito cuando se hace clic
                if (this.classList.contains('fa-circle')) {
                    this.classList.remove('fa-circle');
                    this.classList.add('fa-check-circle');
                    this.classList.add('fa-solid')
                } else {
                    // Si ya es un chulito, cambia de nuevo a círculo
                    this.classList.remove('fa-check-circle');
                    this.classList.remove('fa-solid')
                    this.classList.add('fa-circle');
                }
            });
        });
    });


    // VALORACION ESTRELLAS

    let selectedStars = 0;

    function rateStar(star) {
      selectedStars = star;
      for (let i = 1; i <= 5; i++) {
        const starElement = document.querySelector(`#rating-stars .star:nth-child(${i})`);
        starElement.classList.toggle('active', i <= selectedStars);
      }
    }
  
    function submitComment() {
      const commentText = document.getElementById('comment').value;
      if (selectedStars === 0 || commentText.trim() === '') {
        alert('Por favor, selecciona una valoración y escribe un comentario.');
      } else {
        alert(`Valoración: ${selectedStars}`);
        document.getElementById('comment').value = ''; 
        // Limpiar el campo de comentarios
        // reiniciar las estrellas a su estado inicial.
        selectedStars = 0;
        rateStar(selectedStars);
      }
    }
  
  

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
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.destino_servicio.toUpperCase()}</td>
                    <td>${row.direccion_servicio.toUpperCase()}</td>
                    <td>${row.telefono_servicio}</td>
                    <td>${row.createTime_servicio}</td>
                `;
                tableBody.appendChild(tr);
            });
        }
    }   

    // Función para realizar la solicitud AJAX
    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "enviarSServicio.php", true);
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
    resultadoElement.addEventListener("click", function(event) {
        event.preventDefault();
        
        if (!formEnviado) {
            // Verifica y recoge datos del primer formulario
            // var equipo = document.getElementById('equipo').value;
            // var equipoS = document.getElementById('equipo-select').value;
            var direccion = document.getElementById('direccion').value;
            var mantenimiento = document.getElementById('mantenimiento').value;
            var celular = document.getElementById('celular').value;
            var lugar = document.getElementById('lugar').value;
            var email = document.getElementById('email').value;
        
            if (direccion !== '' && mantenimiento !== '' && celular !== '' && lugar !== '' && email !== '') {
                formEnviado = true; // Marcar el formulario como enviado

                // Crear FormData y añadir datos del primer formulario
                var formData = new FormData();
                var miFormulario = document.getElementById('miFormulario');
                var uploadForm = document.getElementById('uploadForm');
                
                // Añadir datos del primer formulario
                Array.from(new FormData(miFormulario)).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                // Añadir datos del formulario de carga de archivos
                Array.from(new FormData(uploadForm)).forEach(([key, value]) => {
                    formData.append(key, value);
                });
 
                // Crear objeto XMLHttpRequest
                var xhr = new XMLHttpRequest();
                
                // Configurar la solicitud
                xhr.open('POST', 'upload.php', true);
                
                // Configurar la función de devolución de llamada
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        // Éxito
                        document.getElementById('resultado').innerHTML = 'Datos almacenados correctamente';
                        abrirVentana()
                    } else {
                        // Error
                        console.error('Error al procesar la solicitud.');
                    }
                };  
                
                // Enviar la solicitud
                xhr.send(formData);
            } else {
                alert("Favor completar todos los campos");
            }
        }
    });
}



// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentana() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentana() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "./SServicio.html";
}


// ####################################################################################################
// ################################### COMBOBOX OTROS #############################################
// ####################################################################################################


function handleSelectChange() {
    var select = document.getElementById('equipo');
    var textInput = document.getElementById('equipo-select');
    
    if (select.value === 'OTRO') {
        select.style.display = 'none';
        textInput.style.display = 'block';
        textInput.focus();
    } else {
        textInput.style.display = 'none';
    }
}

function handleTextInput() {
    var textInput = document.getElementById('equipo-select');
    var select = document.getElementById('equipo');

    // Actualizar el valor del select según el input si necesario
    select.value = textInput.value;
}




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
                const firstLetterA = a[filterType][0].toUpperCase();
                const firstLetterB = b[filterType][0].toUpperCase();
                return firstLetterA.localeCompare(firstLetterB);
            });

            console.log("Datos después de ordenar:", data);

            data.forEach(function(row) {
                var tr = document.createElement("tr");

                tr.innerHTML = ` 
                    <td>${row.tipo_equipo.toUpperCase()}</td>
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

        xhr.open('POST', 'enviarSServicio.php', true);
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
    document.getElementById("columntwo").addEventListener("click", function() {
        handleFilterButtonClick("tipo_equipo");
    });
    document.getElementById("columnthree").addEventListener("click", function() {
        handleFilterButtonClick("destino_servicio");
    });
    document.getElementById("columnfour").addEventListener("click", function() {
        handleFilterButtonClick("direccion_servicio");
    });
    document.getElementById("columnfive").addEventListener("click", function() {
        handleFilterButtonClick("telefono_servicio");
    });
    document.getElementById("columnsix").addEventListener("click", function() {
        handleFilterButtonClick("createTime_servicio");
    });
});
