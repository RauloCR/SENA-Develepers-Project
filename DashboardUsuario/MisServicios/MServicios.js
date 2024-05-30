//------------------------------------------------SCRIP NOTIFICACION------------------------------------------------
function mostrarNotificacion(mensaje, tiempo) {
    var notificacion = document.createElement("div");
    notificacion.className = "notificacion";
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(function () {
        document.body.removeChild(notificacion);
    }, tiempo);
}
 
 
 
 //---------------------------------------SCRIP DE LOS COMBO-BOX PLACEHOLDER---------------------------------------

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

//----------------------------------------SCRIP DE LA FECHA PLACEHOLDER------------------------------------------

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

//-----------------------------------EVENTO PARA LOS BOTONES -CIRCLE- ------------------------------------------------

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


//--------------------------------------VALORACION ESTRELLAS--------------------------------------------

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
  




// ----------------------POBLAR TABLA CON DATOS DEL LOCAL STORAGE---------------------


document.addEventListener("DOMContentLoaded", function() {
            
    // var nombreTitular = localStorage.getItem('nombreClienteLogueado');
    var tabla = document.querySelector("table tbody");
    cargarDatosGuardados();

    function cargarDatosGuardados() {
        // Obtener los datos almacenados en localStorage
        var solicitarServicios = JSON.parse(localStorage.getItem('solicitarServicios')) || [];

        // Agregar las filas a la tabla
        solicitarServicios.forEach(function (dato) {
            var nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <th>${dato.titular}</th>
                <th>${dato.email}</th>
                <th>${dato.equipo}</th>
                <th>${dato.lugar}</th>
                <th>${dato.fecha}</th>
                <th>${'ACTIVO'}</th>
            `;
            tabla.appendChild(nuevaFila);
        });


//-------------------------------------COPIAR AL PORTAPAPELES-------------------------------------------------

        document.getElementById("copiarExcel").addEventListener("click", function () {
            copiarTablaAlPortapapeles();
        });

        function copiarTablaAlPortapapeles() {
            var tablaHtml = tabla.outerHTML;
            var tablaTexto = tabla.innerText;

            // Crear un elemento de textarea para copiar el texto
            var textarea = document.createElement("textarea");
            textarea.value = tablaTexto;
            document.body.appendChild(textarea);
            textarea.select();

            // Copiar al portapapeles
            document.execCommand('copy');
            
            // Eliminar el elemento de textarea
            document.body.removeChild(textarea);
            mostrarNotificacion("Los datos se han copiado al portapapeles. Ahora puedes pegarlos en Excel.", 3000);
        }
    
    }



//------------------------------------- FILTRAR POR *** -------------------------------------------------
    
document.getElementById("filtro").addEventListener("click", function () {
    var equipoSeleccionado = document.getElementById("equipoFiltrado");
    var textoSeleccionado = equipoSeleccionado.options[equipoSeleccionado.selectedIndex].text;

    // Verificar si se ha seleccionado un equipo
    if (textoSeleccionado.trim() === "Seleccione...") {
        alert("¡Debes seleccionar un equipo!");
        return;
    } else {
        filtrarRegistrosPorEquipo(textoSeleccionado);
    }

    filtrarRegistrosPorEquipo(textoSeleccionado);

    
});

// ...

function filtrarRegistrosPorEquipo(textoSeleccionado) {
    
    // Limpiar la tabla antes de aplicar el filtro
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
    }

    // Obtener los datos almacenados en localStorage
    var solicitarServicios = JSON.parse(localStorage.getItem('solicitarServicios')) || [];

    // Filtrar y agregar las filas a la tabla
    solicitarServicios.forEach(function (dato) {
        if (dato.equipo.toLowerCase() === textoSeleccionado.toLowerCase()) {
            var nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <th>${dato.titular}</th>
                <th>${dato.email}</th>
                <th>${dato.equipo}</th>
                <th>${dato.lugar}</th>
                <th>${dato.fecha}</th>
                <th>${'ACTIVO'}</th>
            `;
            tabla.appendChild(nuevaFila);
        }
    });
}




    // document.getElementById("filtro").addEventListener("click", function () {
    //     // Obtener el equipo seleccionado por el usuario
    //     var equipoSeleccionado = document.getElementById("equipoFiltrado").value;

    //     // Verificar si se ha seleccionado un equipo
    //     if (equipoSeleccionado.trim() === "") {
    //         alert("¡Debes seleccionar un equipo!");
    //     } else {
    //         filtrarRegistrosPorEquipo(equipoSeleccionado);
    //     }
    // });

    // // ...

    // function filtrarRegistrosPorEquipo(equipoFiltrado) {
    //     // Limpiar la tabla antes de aplicar el filtro
    //     while (tabla.firstChild) {
    //         tabla.removeChild(tabla.firstChild);
    //     }

    //     // Obtener los datos almacenados en localStorage
    //     var solicitarServicios = JSON.parse(localStorage.getItem('solicitarServicios')) || [];

//     // Filtrar y agregar las filas a la tabla

//     alert("HOLA!");
   

//         solicitarServicios.forEach(function (dato) {
//             if (dato.equipo.toLowerCase() === equipoFiltrado.toLowerCase()) {
//                 var nuevaFila = document.createElement("tr");
//                 nuevaFila.innerHTML = `
//                     <th>${dato.titular}</th>
//                     <th>${dato.email}</th>
//                     <th>${dato.equipo}</th>
//                     <th>${dato.lugar}</th>
//                     <th>${dato.fecha}</th>
//                     <th>${'ACTIVO'}</th>
//                 `;
//                 tabla.appendChild(nuevaFila);
//             }

//     });
// }




});


