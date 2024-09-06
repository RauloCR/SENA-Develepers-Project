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
  
    //------------------------------------- FUNCION PARA GENERAR UUID -------------------------------------


    

// function generateUUID() {
//     var solicitarServicios = JSON.parse(localStorage.getItem('solicitarServicios')) || [];

//     while (true) {
//         var newUUID = 'xxxx'.replace(/[xy]/g, function(c) {
//             var r = (Math.random() * 16) | 0,
//                 v = c === 'x' ? r : (r & 0x3) | 0x8;
//             return v.toString(16);
//         });

//         // Verificar si el nuevo ID ya existe en la lista de servicios
//         var idExists = solicitarServicios.some(function(servicio) {
//             return servicio.idServicio === newUUID;
//         });

//         // Si no existe, devolver el nuevo ID; de lo contrario, repetir el proceso
//         if (!idExists) {
//             return newUUID;
//         }
//     }
// }

// var iduserN = ""



//     // --------------------------------------------POBLAR TABLA----------------------------------------------
        
//     //     var nombreTitular = "Jose Jose Perez Perez";

//     //     document.addEventListener("DOMContentLoaded", function() {
//     //         // Obtener referencias a los elementos de entrada
//     //         var equipoSelect = document.getElementById("equipo");
//     //         var direccionInput = document.getElementById("direccion");
//     //         var mantenimientoSelect = document.getElementById("mantenimiento");
//     //         var celularInput = document.getElementById("celular");
//     //         var lugarSelect = document.getElementById("lugar");
//     //         var emailInput = document.getElementById("email");
    
//     //         // Obtener referencia al botón de guardar
//     //         var guardarIcon = document.querySelector(".button-agg");
    
//     //         // Obtener referencia a la tabla
//     //         var tabla = document.querySelector("table tbody");
    
//     //         // Agregar un manejador de eventos al botón de guardar
//     //         guardarIcon.addEventListener("click", function() {

//     //             // Verificar si algún campo está vacío
//     //             if (esCampoVacio(equipoSelect) || esCampoVacio(direccionInput) || esCampoVacio(mantenimientoSelect) || esCampoVacio(celularInput) || esCampoVacio(lugarSelect) || esCampoVacio(emailInput)) {
//     //                 alert("Todos los campos deben ser llenados.");
//     //                 return; // No continuar si hay campos vacíos
//     //             }

//     //             // Recopilar valores de los campos de entrada
//     //             var equipo = getSelectedText(equipoSelect).toUpperCase();
//     //             var direccion = direccionInput.value.toUpperCase();
//     //             var mantenimiento = getSelectedText(mantenimientoSelect).toUpperCase();
//     //             var celular = celularInput.value.toUpperCase();
//     //             var lugar = getSelectedText(lugarSelect).toUpperCase();
//     //             var email = emailInput.value.toUpperCase();
    
//     //             // Crear una nueva fila y agregar celdas con los valores recopilados
//     //             var nuevaFila = document.createElement("tr");
//     //             nuevaFila.innerHTML = `
//     //                 <th>${nombreTitular.toUpperCase()}</th>
//     //                 <th>${equipo}</th>
//     //                 <th>${lugar}</th>
//     //                 <th>${direccion}</th>
//     //                 <th>${celular}</th>
//     //                 <th>${new Date().toLocaleDateString()}</th>
//     //             `;
     
//     //             // Agregar la nueva fila a la tabla
//     //             tabla.appendChild(nuevaFila);

//     //             // Limpiar los campos después de guardar
//     //             equipoSelect.value = "";
//     //             direccionInput.value = "";
//     //             mantenimientoSelect.value = "";
//     //             celularInput.value = "";
//     //             lugarSelect.value = "";
//     //             emailInput.value = "";
//     //         });

//     //         // Función para obtener el texto seleccionado en un combobox
//     //         function getSelectedText(selectElement) {
//     //         var selectedIndex = selectElement.selectedIndex;
//     //         return selectElement.options[selectedIndex].text;
//     //         }

//     //         // Función para verificar si un campo está vacío
//     //         function esCampoVacio(elemento) {
//     //             return elemento.value.trim() === "";
//     //         }
//     //     });

    

// // ------------------------------------LOCAL STORAGE-------------------------------------


//         document.addEventListener("DOMContentLoaded", function() {
            
//             var nombreTitular = localStorage.getItem('nombreClienteLogueado');
//             var tabla = document.querySelector("table tbody");
//             cargarDatosGuardados();

            

//             document.querySelector(".button-agg").addEventListener("click", function() {
//                 iduserN = generateUUID();

//                 var equipoSelect = document.getElementById("equipo");
//                 var direccionInput = document.getElementById("direccion");
//                 var mantenimientoSelect = document.getElementById("mantenimiento");
//                 var celularInput = document.getElementById("celular");
//                 var lugarSelect = document.getElementById("lugar");
//                 var emailInput = document.getElementById("email");

//                 if (esCampoVacio(equipoSelect) || esCampoVacio(direccionInput) || esCampoVacio(mantenimientoSelect) || esCampoVacio(celularInput) || esCampoVacio(lugarSelect) || esCampoVacio(emailInput)) {
//                     alert("Todos los campos deben ser llenados.");
//                     return;
//                 }

//                 var equipo = getSelectedText(equipoSelect).toUpperCase();
//                 var direccion = direccionInput.value.toUpperCase();
//                 var mantenimiento = getSelectedText(mantenimientoSelect).toUpperCase();
//                 var celular = celularInput.value.toUpperCase();
//                 var lugar = getSelectedText(lugarSelect).toUpperCase();
//                 var email = emailInput.value.toUpperCase();

//                 var nuevaFila = document.createElement("tr");
//                 nuevaFila.innerHTML = `
//                     <th>${nombreTitular.toUpperCase()}</th>
//                     <th>${equipo}</th>
//                     <th>${lugar}</th>
//                     <th>${direccion}</th>
//                     <th>${celular}</th>
//                     <th>${new Date().toLocaleDateString()}</th>
//                 `;

                
//                 tabla.appendChild(nuevaFila);

//                 // Guardar datos en localStorage
//                 // guardarDatosEnLocalStorage();

//                 // equipoSelect.value = "";
//                 // direccionInput.value = "";
//                 // mantenimientoSelect.value = "";
//                 // celularInput.value = "";
//                 // lugarSelect.value = "";
//                 // emailInput.value = "";
//             });


            

//             function getSelectedText(selectElement) {
//                 var selectedIndex = selectElement.selectedIndex;
//                 return selectElement.options[selectedIndex].text;
//             }

//             function esCampoVacio(elemento) {
//                 return elemento.value.trim() === "";
//             }


            

//             function guardarDatosEnLocalStorage() {

//                 //validar campos
//                 if (esCampoVacio(equipo) || esCampoVacio(direccion) || esCampoVacio(mantenimiento) || esCampoVacio(celular) || esCampoVacio(lugar) || esCampoVacio(email)) {
//                     alert("Todos los campos deben ser llenados.");
//                     return;
//                 }
//                 // Obtener los datos existentes en localStorage
//                 var solicitarServicios = JSON.parse(localStorage.getItem('solicitarServicios')) || [];

//                 // Recopilar los nuevos datos
//                 var equipoSelect = document.getElementById("equipo");
//                 var direccionInput = document.getElementById("direccion");
//                 var mantenimientoSelect = document.getElementById("mantenimiento");
//                 var celularInput = document.getElementById("celular");
//                 var lugarSelect = document.getElementById("lugar");
//                 var emailInput = document.getElementById("email");

//                 var nuevoDato = {
//                     idServicio: iduserN.toUpperCase(),
//                     titular: nombreTitular,
//                     equipo: getSelectedText(equipoSelect).toUpperCase(),
//                     lugar: getSelectedText(lugarSelect).toUpperCase(),
//                     direccion: direccionInput.value.toUpperCase(),
//                     celular: celularInput.value.toUpperCase(),
//                     email: emailInput.value,
//                     fecha: new Date().toLocaleDateString()
//                 };

//                 // Agregar los nuevos datos al array
//                 solicitarServicios.push(nuevoDato);

//                 // Guardar el array actualizado en localStorage
//                 localStorage.setItem('solicitarServicios', JSON.stringify(solicitarServicios));

//                 equipoSelect.value = "";
//                 direccionInput.value = "";
//                 mantenimientoSelect.value = "";
//                 celularInput.value = "";
//                 lugarSelect.value = "";
//                 emailInput.value = "";
//                 emailInput.value = "";
//             }

//             document.getElementById("guardar-dt").addEventListener("click", function() {
//                 guardarDatosEnLocalStorage();
//             });

//             function cargarDatosGuardados() {
//                 // Obtener los datos almacenados en localStorage
//                 var solicitarServicios = JSON.parse(localStorage.getItem('solicitarServicios')) || [];

//                 // Agregar las filas a la tabla
//                 solicitarServicios.forEach(function (dato) {
//                     var nuevaFila = document.createElement("tr");
//                     nuevaFila.innerHTML = `
//                         <th>${dato.titular}</th>
//                         <th>${dato.equipo}</th>
//                         <th>${dato.lugar}</th>
//                         <th>${dato.direccion}</th>
//                         <th>${dato.celular}</th>
//                         <th>${dato.fecha}</th>
//                     `;
//                     tabla.appendChild(nuevaFila);
//                 });
//             }
//         });

// ------------------------------SCRIP ENVIAR DATOS A PHP --------------------------------------

// Se envian los datos del formulario a php para ser almacenados en base de datos

document.getElementById('enviarFormulario').addEventListener('click', function() {
    document.getElementById('miFormulario').submit();
});
        
