// script.js

// Función para hacer la petición GET y actualizar la tabla
function actualizarTabla() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'index.php', true);

  xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 400) {
          var data = JSON.parse(xhr.responseText);
          console.log(xhr.responseText)
          var tabla = document.getElementById('datos-table').getElementsByTagName('tbody')[0];
          tabla.innerHTML = ''; // Limpiar tabla antes de actualizar

          // Iterar sobre los datos y agregar filas a la tabla
          data.forEach(function(item) {
              var row = tabla.insertRow();
              row.insertCell(0).textContent = item.type_rol;
              row.insertCell(1).textContent = item.type_decula;
              row.insertCell(2).textContent = item.name_user;
              // Agrega más celdas según tus datos
          });
      } else {
          console.error('Error al obtener los datos. Estado HTTP:', xhr.status);
      }
  };

  xhr.onerror = function() {
      console.error('Error de red al obtener los datos.');
  };

  xhr.send();
}

// Llamar a la función para actualizar la tabla al cargar la página
window.onload = function() {
  actualizarTabla();
};
