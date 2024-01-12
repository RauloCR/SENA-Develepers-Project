// Evento para el combo-box---------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var comboBox = document.querySelector('.combo-box select');

    comboBox.addEventListener('change', function () {
        comboBox.parentNode.classList.add('select-active');
    });

});

// Placeholder de fechas 

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
        // if (input.value) {
        //     input.style.color = 'black';
        // }
    });
});

// Poblar tabla

document.addEventListener("DOMContentLoaded", function() {
    var nombreTitular = "Jose Jose Perez Perez";
    var tabla = document.querySelector("table tbody");
    cargarDatosGuardados();


    document.querySelector(".agg-boton").addEventListener("click", function() {
        var nombre = document.getElementById("nombreInput");
        var celular = document.getElementById("celularInput");
        var direccion = document.getElementById("direccionInput");
        var email = document.getElementById("emailInput");
        var cedula = document.getElementById("cedulaInput");
        var rol = document.getElementById("rolSelect");

        // if (esCampoVacio(nombre) || esCampoVacio(celular) || esCampoVacio(direccion) || esCampoVacio(email) || esCampoVacio(cedula) || esCampoVacio(rol)) {
        //     alert("Todos los campos deben ser llenados.");
        //     return;
        // }

        var nombreText = nombre.value.toUpperCase();
        var celularText = celular.value.toUpperCase();
        var direccionText = direccion.value.toUpperCase();
        var emailText = email.value.toUpperCase();
        var cedulaText = cedula.value.toUpperCase();
        var rolSelect = getSelectedText(rol).toUpperCase();
        var nuevaFila = document.createElement("tr");
        nuevaFila.innerHTML = `
            <th>${'01'}</th>
            <th>${rolSelect}</th>
            <th>${nombreText.toUpperCase()}</th>
            <th>${emailText}</th>
            <th>${new Date().toLocaleDateString()}</th>
            <th>${'ACTIVO'}</th>
        `;

        tabla.appendChild(nuevaFila);

        // Guardar datos en localStorage
        // guardarDatosEnLocalStorage();

        // equipoSelect.value = "";
        // direccionInput.value = "";
        // mantenimientoSelect.value = "";
        // celularInput.value = "";
        // lugarSelect.value = "";
        // emailInput.value = "";
    });



    function getSelectedText(selectElement) {
        var selectedIndex = selectElement.selectedIndex;
        return selectElement.options[selectedIndex].text;
    }

    // function esCampoVacio(elemento) {
    //     return elemento.value.trim() === "";
    // }


    function guardarDatosEnLocalStorage() {

        // //validar campos
        // if (esCampoVacio(nombre) || esCampoVacio(celular) || esCampoVacio(direccion) || esCampoVacio(email) || esCampoVacio(cedula) || esCampoVacio(rol)) {
        //     alert("Todos los campos deben ser llenados.");
        //     return;
        // }
        // Obtener los datos existentes en localStorage
        var datosGuardados = JSON.parse(localStorage.getItem('datosGuardados')) || [];

        // Recopilar los nuevos datos
        var nombreText = document.getElementById("nombreInput");
        var celularText = document.getElementById("celularInput");
        var direccionText = document.getElementById("direccionInput");
        var emailText = document.getElementById("emailInput");
        var cedulaText = document.getElementById("cedulaInput");
        var rolSelect = document.getElementById("rolSelect");

        var nuevoDato = { 
            nombre: nombreText.value.toUpperCase(),
            celular: celularText.value.toUpperCase(),
            direccion: direccionText.value.toUpperCase(),
            email: emailText.value.toUpperCase(),
            cedula: cedulaText.value.toUpperCase(),
            rol: getSelectedText(rolSelect).toUpperCase(),
            fecha: new Date().toLocaleDateString()
        };

        // Agregar los nuevos datos al array
        datosGuardados.push(nuevoDato);

        // Guardar el array actualizado en localStorage
        localStorage.setItem('datosGuardados', JSON.stringify(datosGuardados));

        nombreInput.value = "";
        celularInput.value = "";
        direccionInput.value = "";
        emailInput.value = "";
        cedulaInput.value = "";
        rolSelect.value = "";
    }

    document.querySelector(".grd-boton").addEventListener("click", function() {
        guardarDatosEnLocalStorage();
    });

    function cargarDatosGuardados() {
        // Obtener los datos almacenados en localStorage
        var datosGuardados = JSON.parse(localStorage.getItem('datosGuardados')) || [];

        // Agregar las filas a la tabla
        datosGuardados.forEach(function (dato) {
            var nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <th>${'01'}</th>
                <th>${dato.rol}</th>
                <th>${dato.nombre.toUpperCase()}</th>
                <th>${dato.email}</th>
                <th>${dato.fecha}</th>
                <th>${'ACTIVO'}</th>
            `;
            tabla.appendChild(nuevaFila);
        });
    }
});