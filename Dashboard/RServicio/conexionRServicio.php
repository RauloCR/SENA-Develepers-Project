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
  $sql = "SELECT s.id_cliente, 
       CONCAT(c.nombre_cliente, ' ', c.apellido_cliente) AS nombre_completo,
       s.tipo_equipo, 
       s.destino_servicio, 
       s.direccion_servicio, 
       s.telefono_servicio, 
       s.createTime_servicio
        FROM servicio s
        JOIN cliente c ON s.id_cliente = c.id_cliente";
  
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


function poblarTablaN(){
  global $conn;


 // Obtener la cédula desde la solicitud GET
$cedula = $conexion->real_escape_string($_GET['cedula']);

// Consultar la base de datos
$sql = "SELECT nombre_cliente, apellido_cliente FROM cliente WHERE cedula_cliente = '$cedula'";
$result = $conexion->query($sql);

$response = array();

if ($result->num_rows > 0) {
    // Preparar un array para almacenar los resultados
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
} else {
    $response['error'] = 'No se encontraron resultados';
}

// Cerrar conexión
$conexion->close();

// Devolver los datos en formato JSON
echo json_encode($response, JSON_UNESCAPED_UNICODE);

}



function insertar_Datos(){
  global $conn;
  
    // Obtener los datos del formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

      // $nombre = strtoupper($_POST['nombre']);
      // $apellido = strtoupper($_POST['apellido']);
      
      $cedula = $_POST['cedula'];
      
      $sqlc = "SELECT id_cliente FROM cliente WHERE cedula_cliente = $cedula ";

      // Ejecutar la consulta
    $result = mysqli_query($conn, $sqlc);


    // Verificar si se obtuvo un resultado
    if ($result && mysqli_num_rows($result) > 0) {
      // Obtener el id_cliente
      $row = mysqli_fetch_assoc($result);
      $id_cliente = $row['id_cliente'];
      // Definir los otros valores para la inserción
      $direccion = $_POST['direccion'];
      $lugar =strtoupper ($_POST['lugar']);
      $equipo = strtoupper($_POST['equipo']) ;
      $celular = $_POST['celular'];
      $mantenimiento = strtoupper($_POST['mantenimiento']) ;
      $correo = $_POST['correo'];
      $estado = strtoupper('PENDIENTE');

      // Preparar la consulta para insertar el nuevo servicio
      $sql_insert_servicio = "INSERT INTO servicio (id_cliente, direccion_servicio, destino_servicio, tipo_equipo, telefono_servicio, tipo_servicio, correo_servicio, estado_servicio) VALUES ('$id_cliente', '$direccion', '$lugar', '$equipo', '$celular', '$mantenimiento', '$correo', '$estado')";

      // Ejecutar la consulta
      if (mysqli_query($conn, $sql_insert_servicio)) {
          echo "Nuevo servicio insertado correctamente";
      } else {
          echo "Error: " . mysqli_error($conn);
      }

    } else {
      // Manejar el caso cuando no se encuentra el id_cliente
      echo("Cliente no encontrado");
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
        case 'poblarN':
          // Lógica para procesar el formulario
          poblarTablaN();
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


