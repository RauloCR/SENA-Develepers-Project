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
            tr.innerHTML = `<td colspan="6">${data.error}</td>`;
            tableBody.appendChild(tr);
        }else{
            data.forEach(function(row) {

                var tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${row.id_servicio}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.estado_servicio.toUpperCase()}</td>
                    <td>${row.tipo_servicio.toUpperCase()}</td>
                    <td>${row.id_tecnico}</td>
                    <td>N/A</td>
                    <td>${row.createTime_servicio.toUpperCase()}</td>
                `;
                tableBody.appendChild(tr);
            });
        }
    }   

    // Función para realizar la solicitud AJAX
    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'conexionAServicio.php?accion=poblar', true);
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


