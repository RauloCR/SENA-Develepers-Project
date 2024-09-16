
<?php

// ********************************************************************************************
// **   PORGRAMADOR: WILMER USBALDO ROJAS GUTIERREZ                                          **
// **   PROYECTO: DEVELOPERS                                                                 **
// **   PROGREMACION: DETALLE SERVICIO                                                       **
// ********************************************************************************************



// <!-- -------------------CONEXION A LA BASE DE DATOS------------------- -->

// Configuración de la conexión a la base de datos
$servername = "localhost"; // Nombre del servidor
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$dbname = "DevelopersProject"; // Nombre de la base de datos




// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

$conn->set_charset("utf8");

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
    $sql = "SELECT s.id_servicio, 
        s.tipo_equipo,   
        s.createTime_servicio, 
        s.estado_servicio,
        CONCAT(t.nombre_tecnico, ' ', t.apellido_tecnico) AS nombre_completo
        FROM servicio s
        JOIN tecnico t ON s.id_tecnico = t.id_tecnico";
    
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
  

// *******************************************************************************************
// ************************************** INSERTAR DATOS *************************************
// *******************************************************************************************

function insetar_Datos(){
  global $conn;
    // Obtener los datos del formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $cedulaUsuario = $_POST['cedulaUsuario'];
      $nombreUsuario = strtoupper($_POST['nombreUsuario']);
      $apellidoUsuario = strtoupper($_POST['apellidoUsuario']);
      $telefonoUsuario = $_POST['telefonoUsuario'];
      $correoUsuario = $_POST['correoUsuario'];
      $direccionUsuario = strtoupper($_POST['direccionUsuario']);
      $contrasenaUsuario = $_POST['contrasenaUsuario'];
      $tipoSeleccionado = strtoupper($_POST['rolSelect']);
      $tipocc = strtoupper($_POST['tipocc']);
      $estadoUsuario = "ACTIVO";
      
      
      // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla
      $sql = "INSERT INTO usuarios (cedula_usuario, nombre_usuario, apellido_usuario, telefono_usuario, correo_usuario, direccion_usuario, contrasena_usuario, estado_usuario, tipo_rol, tipo_cedula) VALUES ('$cedulaUsuario', '$nombreUsuario', '$apellidoUsuario', '$telefonoUsuario', '$correoUsuario', '$direccionUsuario', '$contrasenaUsuario', '$estadoUsuario', '$tipoSeleccionado', '$tipocc')";
    //   $sqlTwo = "INSERT INTO cliente (cedula_usuario, nombre_usuario, apellido_usuario, telefono_usuario, correo_usuario, direccion_usuario, contrasena_usuario, estado_usuario, tipo_rol, tipo_cedula) VALUES ('$cedulaUsuario', '$nombreUsuario', '$apellidoUsuario', '$telefonoUsuario', '$correoUsuario', '$direccionUsuario', '$contrasenaUsuario', '$estadoUsuario', '$tipoSeleccionado', '$tipocc')";

      if ($conn->query($sql) === TRUE) {

        echo "Datos almacenados correctamente.";
    } else {
        echo "Error: " . $sql . "\\n" . $conn->error . "";
    }
}
}


  // *******************************************************************************************
  // *************************************** BUSCAR DATOS **************************************
  // *******************************************************************************************
  
  function obtenerServicio() {
      
    // Conexión a la base de datos
    global $conn;
  
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
  
        
        $id_servicio = $_GET['id_servicio'];
        $estadoS = strtoupper(trim($_GET['estado'] ?? '')); 
  
        // Consulta SQL para obtener un solo usuario por su ID

        $sql = "SELECT s.id_servicio, 
        s.tipo_equipo,   
        s.createTime_servicio, 
        s.estado_servicio,
        CONCAT(t.nombre_tecnico, ' ', t.apellido_tecnico) AS nombre_completo
        FROM servicio s
        JOIN tecnico t ON s.id_tecnico = t.id_tecnico
        WHERE 1=1";

        $params = [];

        // Agregar condiciones solo si los parámetros tienen valor
        if (!empty($id_servicio)) {  
            $sql .= " AND s.id_servicio = ?";
            $params[] = $id_servicio;
        }
        if (!empty($estadoS)) {
            $sql .= " AND s.estado_servicio = ?";
            $params[] = $estadoS;
        }

         // Preparar la consulta
         $stmt = $conn->prepare($sql);

         // Verifica si la preparación de la consulta fue exitosa
         if (!$stmt) {
             echo json_encode(array('error' => 'Error en la preparación de la consulta: ' . $mysqli->error));
             exit;
         }
 
         // Vincular los parámetros si hay alguno
         if ($params) {
             $types = str_repeat('s', count($params)); // Tipo de datos (s para string)
             $stmt->bind_param($types, ...$params);
         }
 
         // Ejecutar la consulta
         $stmt->execute();
 
         // Obtener el resultado
         $result = $stmt->get_result();
 
         // Inicializar un array para almacenar los datos
         $data = array();
 
         // Recuperar los resultados
         while ($row = $result->fetch_assoc()) {
             $data[] = $row;
         }
 
         // Comprobar si se encontraron resultados
         if (!empty($data)) {
             // Enviar los datos en formato JSON
             echo json_encode($data);
         } else {
             // Enviar mensaje de error en formato JSON
             echo json_encode(array('error' => 'No se encontraron resultados'));
         }
 
         // Cerrar la consulta y la conexión
         $stmt->close();

      }
  }
  
  


        
// *******************************************************************************************
// ************************************** RECIBIR ACCION *************************************
// *******************************************************************************************


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
            insetar_Datos();
            break;
        case 'buscar':
            // Lógica para buscar el formulario
            obtenerServicio();
            break;
        default:
            // Acción no reconocida
            break;
    }
}

// Cerrar conexión
$conn->close();
?>













