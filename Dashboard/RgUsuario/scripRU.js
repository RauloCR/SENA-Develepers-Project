// //--------------------------------------SCRIP PARA MOSTRAR NOTIFICACION--------------------------------------

// function mostrarNotificacion(mensaje, tiempo) {
//     var notificacion = document.createElement("div");
//     notificacion.className = "notificacion";
//     notificacion.textContent = mensaje;
//     document.body.appendChild(notificacion);

//     setTimeout(function () {
//         document.body.removeChild(notificacion);
//     }, tiempo);
// }


// //----------------------------------------- Evento para el combo-box ---------------------------------------

// document.addEventListener('DOMContentLoaded', function () {
//     var comboBox = document.querySelector('.combo-box select');

//     comboBox.addEventListener('change', function () {
//         comboBox.parentNode.classList.add('select-active');
//     });
// });

// //---------------------------------------- Placeholder de fechas ------------------------------------------- 

// document.addEventListener('DOMContentLoaded', function () {
//     var dateInputs = document.querySelectorAll('input[type="date"]');

//     dateInputs.forEach(function (input) {
//         input.addEventListener('input', function () {
//             // Cambiar el color del texto cuando se selecciona una fecha
//             if (input.value) {
//                 input.style.color = 'black';
//             } else {
//                 input.style.color = 'gray';
//             }
//         });
//     });
// });


// //------------------------------------- FUNCION PARA GENERAR UUID -------------------------------------

// var iduserx = generateUUID()
// function generateUUID() {
//     return 'xxxx'.replace(/[xy]/g, function (c) {
//         var r = (Math.random() * 16) | 0,
//             v = c === 'x' ? r : (r & 0x3) | 0x8;
//         return v.toString(16);
//     });
// }


// //------------------------------------- SCRIP REGISTRAR USUARIO -----------------------------------------

// document.addEventListener("DOMContentLoaded", function () {
//     var tabla = document.querySelector("table tbody");

//     document.querySelector(".agg-boton").addEventListener("click", function () {
//         var nombre = document.getElementById("nombreInput");
//         var celular = document.getElementById("celularInput");
//         var direccion = document.getElementById("direccionInput");
//         var email = document.getElementById("emailInput");
//         var cedula = document.getElementById("cedulaInput");
//         var rol = document.getElementById("rolSelect");

//         if (esCampoVacio(nombre) || esCampoVacio(celular) || esCampoVacio(direccion) || esCampoVacio(email) || esCampoVacio(cedula) || esCampoVacio(rol)) {
//             alert("Todos los campos deben ser llenados.");
//             return;
//         }


//         var nombreText = nombre.value.toUpperCase();
//         var celularText = celular.value.toUpperCase();
//         var direccionText = direccion.value.toUpperCase();
//         var emailText = email.value.toUpperCase();
//         var cedulaText = cedula.value.toUpperCase();
//         var rolSelect = getSelectedText(rol).toUpperCase();

//         var nuevaFila = document.createElement("tr");

//         nuevaFila.innerHTML = `
//             <th>${iduserx}</th>
//             <th>${rolSelect}</th>
//             <th>${nombreText.toUpperCase()}</th>
//             <th>${emailText}</th>
//             <th>${new Date().toLocaleDateString()}</th>
//             <th>${'ACTIVO'}</th>
//         `;

//         tabla.appendChild(nuevaFila);

//     });

//     function getSelectedText(selectElement) {
//         var selectedIndex = selectElement.selectedIndex;
//         return selectElement.options[selectedIndex].text;
//     }

//     function esCampoVacio(elemento) {
//         return elemento.value.trim() === "";
//     }

//     function guardarDatosEnLocalStorage() {

//         // Obtener los datos existentes en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Recopilar los nuevos datos
//         var nombreText = document.getElementById("nombreInput");
//         var celularText = document.getElementById("celularInput");
//         var direccionText = document.getElementById("direccionInput");
//         var emailText = document.getElementById("emailInput");
//         var cedulaText = document.getElementById("cedulaInput");
//         var rolSelect = document.getElementById("rolSelect");

//         //validar campos
//         if (esCampoVacio(nombreText) || esCampoVacio(celularText) || esCampoVacio(direccionText) || esCampoVacio(emailText) || esCampoVacio(cedulaText) || esCampoVacio(rolSelect)) {
//             alert("Todos los campos deben ser llenados.");
//             return;
//         }

//         // Crear el nuevo dato con un ID único
//         var nuevoDato = {
//             idUser: iduserx,
//             nombre: nombreText.value.toUpperCase(),
//             celular: celularText.value.toUpperCase(),
//             direccion: direccionText.value.toUpperCase(),
//             correo: emailText.value,
//             cedula: cedulaText.value.toUpperCase(),
//             rol: getSelectedText(rolSelect).toUpperCase(),
//             fechaRegistro: new Date().toLocaleDateString()
//         };


//         // Agregar los nuevos datos al array
//         tablaRegistro.push(nuevoDato);

//         // Guardar el array actualizado en localStorage
//         localStorage.setItem('tablaRegistro', JSON.stringify(tablaRegistro));

//         nombreInput.value = "";
//         celularInput.value = "";
//         direccionInput.value = "";
//         emailInput.value = "";
//         cedulaInput.value = "";
//         rolSelect.value = "";
//     }

//     document.querySelector(".grd-boton").addEventListener("click", function () {
//         guardarDatosEnLocalStorage();
//     });
// });



// // --------------------------POBLAR TABLA CON DATOS DEL LOCAL STORAGE-----------------------------


// document.addEventListener("DOMContentLoaded", function () {

//     // var nombreTitular = localStorage.getItem('nombreClienteLogueado');
//     var tabla = document.querySelector("table tbody");
//     cargarDatosGuardados();

//     function cargarDatosGuardados() {
//         // Obtener los datos almacenados en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Agregar las filas a la tabla
//         tablaRegistro.forEach(function (dato) {
//             var nuevaFila = document.createElement("tr");
//             nuevaFila.innerHTML = `
//                 <th>${dato.idUser}</th>
//                 <th>${dato.rol}</th>
//                 <th>${dato.nombre + ' ' + dato.apellido}</th>
//                 <th>${dato.correo}</th>
//                 <th>${dato.fechaRegistro}</th>
//                 <th>${'ACTIVO'}</th>
//             `;
//             tabla.appendChild(nuevaFila);
//         });


//         // Scrip para copiar al portapapeles
//         document.getElementById("copiarExcel").addEventListener("click", function () {
//             copiarTablaAlPortapapeles();
//         });

//         function copiarTablaAlPortapapeles() {
//             var tablaHtml = tabla.outerHTML;
//             var tablaTexto = tabla.innerText;

//             // Crear un elemento de textarea para copiar el texto
//             var textarea = document.createElement("textarea");
//             textarea.value = tablaTexto;
//             document.body.appendChild(textarea);
//             textarea.select();

//             // Copiar al portapapeles
//             document.execCommand('copy');

//             // Eliminar el elemento de textarea
//             document.body.removeChild(textarea);
//             mostrarNotificacion("Los datos se han copiado al portapapeles. Ahora puedes pegarlos en Excel.", 3000);
//         }

//     }


//     // -----------------------------------------FILTRAR USUARIOS POR ID-------------------------------------------

//     document.getElementById("filtro").addEventListener("click", function () {
//         var usuarioSeleccionado = document.getElementById("usuarioFiltrado").value;

//         // Verificar si se ha seleccionado un ID
//         if (usuarioSeleccionado === '') {
//             alert("¡Debes seleccionar un ID!");
//             return;
//         } else {
//             filtrarRegistrosPorEquipo(usuarioSeleccionado);
//         }

//         filtrarRegistrosPorEquipo(usuarioSeleccionado);

//     });

//     // ...

//     function filtrarRegistrosPorEquipo(textoSeleccionado) {

//         // Limpiar la tabla antes de aplicar el filtro
//         while (tabla.firstChild) {
//             tabla.removeChild(tabla.firstChild);
//         }

//         // Obtener los datos almacenados en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Filtrar y agregar las filas a la tabla
//         tablaRegistro.forEach(function (dato) {
//             if (dato.idUser.toLowerCase() === textoSeleccionado.toLowerCase()) {
//                 var nuevaFila = document.createElement("tr");
//                 nuevaFila.innerHTML = `
//                 <th>${dato.idUser}</th>
//                 <th>${dato.rol}</th>
//                 <th>${dato.nombre}</th>
//                 <th>${dato.correo}</th>
//                 <th>${dato.fechaRegistro}</th>
//                 <th>${'ACTIVO'}</th>
//             `;
//                 tabla.appendChild(nuevaFila);
//             }
//         });
//     }



//     // -----------------------------------------------FILTRO POR FECHA--------------------------------------


//     let ordenAscendente = true; // Variable para rastrear el orden actual

//     document.getElementById("filtro_Fecha").addEventListener("click", function () {
//         filtrarRegistrosPorFechaRegistro();
//         cambiarOrdenFecha();
//     });

//     function filtrarRegistrosPorFechaRegistro() {
//         // Limpiar la tabla antes de aplicar el filtro
//         while (tabla.firstChild) {
//             tabla.removeChild(tabla.firstChild);
//         }

//         // Obtener los datos almacenados en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Ordenar el arreglo según el estado actual de la variable de orden
//         tablaRegistro.sort((a, b) => {
//             const convertirFecha = (fecha) => {
//                 const partes = fecha.split('/');
//                 return partes[2] + partes[1].padStart(2, '0') + partes[0].padStart(2, '0');
//             };

//             const fechaA = convertirFecha(a.fechaRegistro);
//             const fechaB = convertirFecha(b.fechaRegistro);

//             // Multiplicar por -1 si el orden es descendente para invertir el orden
//             const multiplicadorOrden = ordenAscendente ? 1 : -1;
//             return multiplicadorOrden * fechaA.localeCompare(fechaB);
//         });

//         // Agregar las filas ordenadas a la tabla
//         tablaRegistro.forEach(function (dato) {
//             var nuevaFila = document.createElement("tr");
//             nuevaFila.innerHTML = `
//             <th>${dato.idUser}</th>
//             <th>${dato.rol}</th>
//             <th>${dato.nombre + ' ' + dato.apellido}</th>
//             <th>${dato.correo}</th>
//             <th>${dato.fechaRegistro}</th>
//             <th>${'ACTIVO'}</th>
//         `;
//             tabla.appendChild(nuevaFila);
//         });
//     }

//     function cambiarOrdenFecha() {
//         // Cambiar el estado de la variable de orden en cada clic
//         ordenAscendente = !ordenAscendente;
//     }


//     // -----------------------------------------------FILTRO A - Z--------------------------------------

//     // Declarar la variable global ordenAscendente si no está declarada en otro lugar del código
//     var ordenAscendenter = true;

//     document.getElementById("filtro_nombre").addEventListener("click", function () {
//         filtrarRegistrosPorNombre();
//         cambiarOrdenAZ();
//     });

//     function filtrarRegistrosPorNombre() {
//         // Limpiar la tabla antes de aplicar el filtro
//         while (tabla.firstChild) {
//             tabla.removeChild(tabla.firstChild);
//         }

//         // Obtener los datos almacenados en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Ordenar el arreglo según el estado actual de la variable de orden
//         tablaRegistro.sort((a, b) => {
//             const nombreA = a.nombre.toUpperCase();
//             const nombreB = b.nombre.toUpperCase();

//             // Multiplicar por -1 si el orden es descendente para invertir el orden
//             const multiplicadorOrden = ordenAscendenter ? 1 : -1;
//             return multiplicadorOrden * nombreA.localeCompare(nombreB);
//         });

//         // Agregar las filas ordenadas a la tabla
//         tablaRegistro.forEach(function (dato) {
//             var nuevaFila = document.createElement("tr");
//             nuevaFila.innerHTML = `
//             <th>${dato.idUser}</th>
//             <th>${dato.rol}</th>
//             <th>${dato.nombre + ' ' + dato.apellido}</th>
//             <th>${dato.correo}</th>
//             <th>${dato.fechaRegistro}</th>
//             <th>${'ACTIVO'}</th>
//         `;
//             tabla.appendChild(nuevaFila);
//         });
//     }

//     function cambiarOrdenAZ() {
//         // Cambiar el estado de la variable de orden (ascendente a descendente o viceversa)
//         ordenAscendenter = !ordenAscendenter;
//     }



//     // ----------------------------------------------- FILTRO ROL --------------------------------------

//     let ordenAscendenteRol = true; // Variable para rastrear el orden actual

//     document.getElementById("filtro_Rol").addEventListener("click", function () {
//         cambiarOrdenRol();
//         filtrarRegistrosPorRol();
//     });

//     function filtrarRegistrosPorRol() {
//         // Limpiar la tabla antes de aplicar el filtro
//         while (tabla.firstChild) {
//             tabla.removeChild(tabla.firstChild);
//         }

//         // Obtener los datos almacenados en localStorage
//         var tablaRegistro = JSON.parse(localStorage.getItem('tablaRegistro')) || [];

//         // Ordenar el arreglo según el estado actual de la variable de orden y el campo "rol"
//         tablaRegistro.sort((a, b) => {
//             const rolA = a.rol.toUpperCase();  // Convertir a mayúsculas para hacer la comparación sin distinción de mayúsculas/minúsculas
//             const rolB = b.rol.toUpperCase();

//             // Multiplicar por -1 si el orden es descendente para invertir el orden
//             const multiplicadorOrden = ordenAscendenteRol ? 1 : -1;
//             return multiplicadorOrden * rolA.localeCompare(rolB);
//         });

//         // Agregar las filas ordenadas a la tabla
//         tablaRegistro.forEach(function (dato) {
//             var nuevaFila = document.createElement("tr");
//             nuevaFila.innerHTML = `
//             <th>${dato.idUser}</th>
//             <th>${dato.rol}</th>
//             <th>${dato.nombre + ' ' + dato.apellido}</th>
//             <th>${dato.correo}</th>
//             <th>${dato.fechaRegistro}</th>
//             <th>${'ACTIVO'}</th>
//         `;
//             tabla.appendChild(nuevaFila);
//         });
//     }

//     function cambiarOrdenRol() {
//         // Cambiar el estado de la variable de orden en cada clic
//         ordenAscendenteRol = !ordenAscendenteRol;
//     }



//     // -------------------------------BORRAR REGISTRO -----------------------------------


//     document.getElementById('idDeleteUser').addEventListener("click", function () {

//         var idUserToDelete = document.getElementById("usuarioFiltrado").value;

//         // Verificar si el campo idUser está vacío
//         if (idUserToDelete.trim() === "") {
//             alert("Por favor, ingrese un ID de usuario para filtrar antes de intentar borrar.");
//             return;
//         }

//         var tablaRegistro = JSON.parse(localStorage.getItem("tablaRegistro")) || [];

//         // Buscar el índice del registro con el idUser proporcionado
//         var indexToDelete = -1;
//         for (var i = 0; i < tablaRegistro.length; i++) {
//             if (tablaRegistro[i].idUser.toString() === idUserToDelete.toString()) {
//                 indexToDelete = i;
//                 break;
//             }
//         }

//         // Verificar si se encontró el registro
//         if (indexToDelete !== -1) {
//             // Eliminar el registro en la posición encontrada
//             tablaRegistro.splice(indexToDelete, 1);

//             // Actualizar los datos en el localStorage
//             localStorage.setItem("tablaRegistro", JSON.stringify(tablaRegistro));

//             // Mostrar un mensaje de éxito
//             alert("Registro con ID " + idUserToDelete + " eliminado exitosamente.");
//         } else {
//             alert("No se encontró un registro con ID " + idUserToDelete + ".");
//         }
//     });
// });



// ------------------------------SCRIP ENVIAR DATOS A PHP --------------------------------------

// Se envian los datos del formulario a php para ser almacenados en base de datos

document.getElementById('enviarFormulario').addEventListener('click', function() {
    document.getElementById('miFormulario').submit();
});

