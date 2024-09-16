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
                    <td>${row.id_servicio.toUpperCase()}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.nombre_completo.toUpperCase()}</td>
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
      xhr.open("GET", 'GenerarDTS.php?accion=poblar', true);
      
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
                    <td>${row.nombre_completo.toUpperCase()}</td>
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

        xhr.open('POST', 'GenerarDTS.php?accion=poblar', true);
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
    document.getElementById("filtro5").addEventListener("click", function() {
        handleFilterButtonClick("nombre_completo");
    });
    document.getElementById("filtro6").addEventListener("click", function() {
        handleFilterButtonClick("createTime_servicio");
    });
    document.getElementById("filtro7").addEventListener("click", function() {
        handleFilterButtonClick("estado_servicio");
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
            tr.innerHTML = `<td colspan="7">${data.error}</td>`;
            tableBody.appendChild(tr);
        }else{
            
            
            data.forEach(function(row) {

                var tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${row.id_servicio}</td>
                    <td>${row.tipo_equipo.toUpperCase()}</td>
                    <td>${row.nombre_completo.toUpperCase()}</td>
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

        xhr.open("GET", "GenerarDTS.php?" + queryString, true);
        
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
        var inp = document.getElementById('id_servicio').value;
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

  



// ####################################################################################################
// ################################### ENVIAR DATOS GT A PHP ##########################################
// ####################################################################################################


document.addEventListener('DOMContentLoaded', function() {
    const idservicioInput = document.getElementById('idservicio');

    const tecnicoInput = document.getElementById('tecnico');
    const idtecnicoInput = document.getElementById('idtecnico');
    const lugarInput = document.getElementById('lugar');
    const clienteInput = document.getElementById('cliente');
    const cedulaInput = document.getElementById('cedula');

    idservicioInput.addEventListener('input', function() {
        const idsericio = idservicioInput.value;

        // Verifica que el input no esté vacío
        if (idsericio.length > 0) {
            fetch('consultaDTS.php?idservicio=' + encodeURIComponent(idsericio))
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
                        tecnicoInput.value = data.nombre_tecnico || '';
                        idtecnicoInput.value = data.id_tecnico || '';
                        lugarInput.value = data.destino_servicio || '';
                        clienteInput.value = data.nombre_cliente || '';
                        cedulaInput.value = data.cedula_cliente || '';
                    } else {
                        // Si el cliente no es encontrado, muestra un mensaje en los campos

                        tecnicoInput.value = 'Cliente no existe';
                        idtecnicoInput.value = 'Cliente no existe';
                        lugarInput.value = 'Cliente no existe';
                        clienteInput.value = 'Cliente no existe';
                        cedulaInput.value = 'Cliente no existe';
                    }
                })
                .catch(error => {
                    // Maneja errores de red o errores JSON
                    console.error('Error:', error);
                });
        } else {
            // Limpia los campos si el input está vacío
            tecnicoInput.value = '';
            idtecnicoInput.value = '';
            lugarInput.value = '';
            clienteInput.value = '';
            cedulaInput.value = '';
        }
    });
});

// ####################################################################################################
// ################################### GENERAR DTS GT DE PHP ##########################################
// ####################################################################################################

document.getElementById('generatePDF').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const form = document.getElementById('miFormulario');
    const formData = new FormData(form);
    const idServicio = form.querySelector('input[name="idservicio"]').value;

    // Validar si se ha ingresado un id_servicio
    if (!idServicio) {
        document.getElementById('resultado').innerHTML = `Error, seleccionar ID de servicio`;
        abrirVentana();
        return; // Salir si no hay un ID de servicio
    }

    // Función para realizar una solicitud AJAX
    const ajaxRequest = (url, method, data, callback, errorCallback) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                callback(xhr.responseText);
            } else {
                errorCallback(xhr.status, xhr.statusText);
            }
        };

        xhr.onerror = function () {
            errorCallback(xhr.status, xhr.statusText);
        };

        if (method === 'POST') {
            xhr.send(data);
        } else {
            xhr.send();
        }
    };

    // Enviar el formulario mediante AJAX
    ajaxRequest(form.action, 'POST', formData, (responseText) => {
        // Obtener datos del servicio mediante otra solicitud AJAX
        ajaxRequest('DetalleDTS.php', 'GET', null, (responseText) => {
            try {
                const serviceData = JSON.parse(responseText);

                // Crear un nuevo documento PDF
                const doc = new jsPDF();

                // Cargar y agregar el logo
                const logoUrl = '../../images/logoPNG.png'; // Cambia esta URL a la ubicación de tu logo
                const img = new Image();
                img.src = logoUrl;

                img.onload = () => {
                    doc.addImage(img, 'PNG', 10, 10, 40, 40);

                    // Información de la empresa
                    doc.setFontSize(16);
                    doc.setFont('helvetica', 'bold');
                    doc.text('COMPANY DEVELOPER`S', 105, 20, { align: 'center' });
                    doc.setFontSize(12);
                    doc.text('Dirección de la Empresa', 105, 26, { align: 'center' });
                    doc.text('Teléfono: (123) 456-7890', 105, 32, { align: 'center' });
                    doc.text('Correo: oficina.central@developers.com', 105, 38, { align: 'center' });
                    doc.text('www.developers.lovestoblog.com', 105, 44, { align: 'center' });

                    // Línea de separación
                    doc.setFontSize(16);
                    doc.text('-----------------------------------------------', 105, 50, { align: 'center' });

                    // Información del recibo
                    doc.setFontSize(14);
                    doc.text(`Recibo No. ${serviceData.id_servicio}`, 105, 55, { align: 'center' });
                    doc.text(`Fecha: ${serviceData.createTime_servicio}`, 105, 61, { align: 'center' });

                    // Línea de separación
                    doc.setFontSize(16);
                    doc.text('-----------------------------------------------', 105, 67, { align: 'center' });

                    // Información del cliente en un cuadro
                    doc.setFontSize(12);
                    const boxX = 10; // Posición X del cuadro
                    const boxY = 75; // Posición Y del cuadro
                    const boxWidth = 190; // Ancho del cuadro
                    const boxHeight = 36; // Alto del cuadro (ajustado para caber en la página)

                    // Dibujar el cuadro
                    doc.setDrawColor(0); // Color del borde (negro)
                    doc.setFillColor(255, 255, 255); // Color de fondo (blanco)
                    doc.rect(boxX, boxY, boxWidth, boxHeight, 'F'); // 'F' para relleno
                    doc.rect(boxX, boxY, boxWidth, boxHeight); // Dibuja el borde del cuadro

                    // Añadir texto dentro del cuadro
                    doc.setFontSize(12);
                    doc.setTextColor(0); // Color del texto (negro)
                    doc.text('Cliente', boxX + 90, boxY + 7);
                    doc.text(`Nombre: ${serviceData.id_cliente}`, boxX + 5, boxY + 20);
                    doc.text(`Dirección: ${serviceData.destino_servicio}`, boxX + 100, boxY + 20);
                    doc.text(`Teléfono: ${serviceData.telefono_servicio}`, boxX + 5, boxY + 32);
                    doc.text(`Correo: ${serviceData.correo_servicio}`, boxX + 100, boxY + 32);

                    // Dibujar líneas dentro del cuadro
                    doc.setDrawColor(0); // Color de la línea (negro)
                    doc.setLineWidth(0.2); // Grosor de la línea

                    // Línea horizontal debajo de "Cliente:"
                    doc.line(boxX, boxY + 12, boxX + boxWidth, boxY + 12);

                    // Línea horizontal debajo de los detalles del cliente
                    doc.line(boxX, boxY + 24, boxX + boxWidth, boxY + 24);

                    // Línea vertical en el cuadro
                    doc.line(boxX + 95, boxY + 12, boxX + 95, boxY + boxHeight);

                    // Información del servicio
                    doc.text('Servicio:', 10, 119);
                    doc.text(`Descripción: ${serviceData.comentario}`, 10, 125);
                    doc.text(`Número de Orden: ${serviceData.id_servicio}`, 10, 131);
                    doc.text(`Fecha del Servicio: ${serviceData.createTime_servicio}`, 10, 137);
                    doc.text(`Duración: ${serviceData.createTime_servicio}`, 10, 143);

                    // Línea de separación
                    doc.text('-----------------------------------------------', 10, 152);

                    // Forma de pago
                    doc.text('Forma de Pago: Efectivo', 10, 162);
                    doc.text(`Método: N/A`, 10, 168);
                    doc.text(`Número de Transacción: N/A`, 10, 174);

                    // Línea de separación
                    doc.text('-----------------------------------------------', 10, 184);

                    // Garantía
                    doc.text('Garantía:', 10, 194);
                    doc.setFontSize(11);
                    doc.text('• Garantía de Reparación: 6 meses de garantía sobre el servicio de reparación realizado.', 10, 200);
                    doc.text('• Garantía de Repuestos: 12 meses sobre los repuestos utilizados, cubriendo defectos de fabricación.', 10, 206);
                    doc.text('• Exclusiones: No cubre daños causados por mal uso, accidentes o modificaciones no autorizadas.', 10, 212);

                    // Política de Devolución
                    doc.text('Política de Devolución:', 10, 222);
                    doc.setFontSize(11);
                    doc.text('• Servicios: En caso de insatisfacción, se ofrece una revisión gratuita dentro de los primeros 3 días.', 10, 228);
                    doc.text('• Repuestos: Los repuestos pueden ser devueltos dentro de los 15 días posteriores a la compra.', 10, 234);
                    doc.text('• Reembolsos: Los reembolsos se procesarán en un plazo de 7 a 10 días hábiles.', 10, 240);

                    // Firmas
                    doc.text('Firma del Técnico: _________________________     Firma del Cliente: _________________________', 10, 260);

                    // Número de registro fiscal
                    doc.text(`Número de Registro Fiscal: ${serviceData.id_servicio}`, 10, 285);

                    // Guardar el PDF
                    doc.save('Detalle_servicio.pdf');
                };

                img.onerror = () => {
                    throw new Error('Error al cargar la imagen del logo');
                };
            } catch (error) {
                document.getElementById('resultado').innerHTML = `Error, seleccionar ID de servicio`;
                abrirVentana();
            }
        });
    });
});


// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentana() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentana() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "./GenerarDTS.html";
}



// ****************************************************************************************************
// ************************************** FUNCION EXPORTAR INF ****************************************
// ****************************************************************************************************



document.getElementById('export-btn').addEventListener('click', function() {
    // Llamar a la API PHP para obtener los datos
    fetch('GenerarDTS.php?accion=poblar')
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
            XLSX.writeFile(wb, 'Datos_DTS.xlsx');
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});

