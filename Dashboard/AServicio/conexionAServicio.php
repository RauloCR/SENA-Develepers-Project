<?php

// <!-- -------------------CONEXION A LA BASE DE DATOS------------------- -->

// Configuración de la conexión a la base de datos
$servername = "localhost"; // Nombre del servidor
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$dbname = "DevelopersProject"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}  


// *******************************************************************************************
// *********************************** DATOS DE LA TABALA ************************************
// *******************************************************************************************

function poblarTabla(){
  global $conn;
  // Consulta SQL para obtener los datos de la tabla usuarios
  $sql = "SELECT id_servicio, tipo_equipo, estado_servicio, tipo_servicio, id_tecnico, createTime_servicio FROM servicio";
  $result = $conn->query($sql);
  
  // Comprobar si hay resultados
  if ($result->num_rows > 0) {
      // Preparar un array para almacenar los resultados
      $data = array();
      // Iterar sobre los resultados y agregar cada fila de datos al array
      while($row = $result->fetch_assoc()) {
          $data[] = $row;
      }
      // Devolver los datos en formato JSON
      header('Content-Type: application/json');
      echo json_encode($data, JSON_UNESCAPED_UNICODE); // JSON_UNESCAPED_UNICODE para manejar caracteres con tilde correctamente

      
  } else {
      echo json_encode(array('error' => 'No se encontraron resultados'));
  }
  
}


function insertar_Datos(){
  global $conn;
  
    // Obtener los datos del formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

      $nombre = strtoupper($_POST['nombre']);
      $apellido = strtoupper($_POST['apellido']);
      $direccion = strtoupper($_POST['direccion']);
      $cedula = $_POST['cedula'];
      $lugar = strtoupper($_POST['lugar']);
      $equipo = strtoupper($_POST['equipo']);
      $celular = $_POST['celular'];
      $mantenimiento = strtoupper($_POST['mantenimiento']);
      $correo = strtoupper($_POST['correo']);

      $estado = strtoupper('ACTIVO');

    // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla

    $sql = "INSERT INTO servicio (direccion_servicio, destino_servicio, tipo_equipo, telefono_servicio, tipo_servicio, correo_servicio, estado_servicio) VALUES ('$direccion','$lugar', '$equipo', '$celular', '$mantenimiento', '$correo', '$estado')";

    if ($conn->query($sql) === TRUE) {
      // echo "<script>alert('Datos almacenados correctamente.');</script>";
      // echo "<script>setTimeout(function(){ alert('Datos almacenados correctamente.'); }, 2000);</script>";
      echo "Datos almacenados correctamente";
    } else {
      echo "Error: " . $sql . "\\n" . $conn->error . "";
    }

    }


}



if(isset($_GET['accion'])){
    // Obtener el valor de la acción
    $accion = $_GET['accion'];

    // Realizar alguna acción basada en el valor de $accion
    switch($accion) {
        case 'poblar':
            // Lógica para procesar el formulario
            poblarTabla();
            break;
        case 'enviar':
            // Lógica para procesar el envío del formulario
            insertar_Datos();
            break;
        case 'buscar':
            // Lógica para buscar el formulario
            obtenerUsuarioPorID();
            break;
        case 'borrar':
            // Lógica para borrar el formulario
            borrar_Datos();
            break;
        default:
            // Acción no reconocida
            break;
    }
}




// Cerrar conexión
$conn->close();
?>


