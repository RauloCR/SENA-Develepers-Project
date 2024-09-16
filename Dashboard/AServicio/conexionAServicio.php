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
    $sql = "SELECT id_servicio, tipo_equipo, estado_servicio, tipo_servicio, id_tecnico, id_cliente, createTime_servicio FROM servicio";
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
  // *************************************** BUSCAR DATOS **************************************
  // *******************************************************************************************
  
  function obtenerServicio() {
      
    // Conexión a la base de datos
    global $conn;
  
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
  
        
        $id_servicio = $_GET['id_servicio'];
        $estadoS = strtoupper(trim($_GET['estado'] ?? '')); 
  
        // Consulta SQL para obtener un solo usuario por su ID
        $sql = "SELECT id_servicio, tipo_equipo, estado_servicio, tipo_servicio, id_tecnico, id_cliente, createTime_servicio FROM servicio WHERE 1=1";
        $params = [];

        // Agregar condiciones solo si los parámetros tienen valor
        if (!empty($id_servicio)) {  
            $sql .= " AND id_servicio = ?";
            $params[] = $id_servicio;
        }
        if (!empty($estadoS)) {
            $sql .= " AND estado_servicio = ?";
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
  // ************************************** INSERTAR DATOS *************************************
  // *******************************************************************************************
  
  function insertar_Datos(){
    global $conn;
      // Obtener los datos del formulario 
      if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
        $id_servicio = $_POST['id_serv'];
        $id_tecnico = $_POST['id_tec'];
        $cliente = $_POST['cliente'];
        $estadoS = $_POST['estadoS'];
        // $cedula = $_POST['cedula'];
  
        
        // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla
  
        $sql = "UPDATE servicio SET id_tecnico = $id_tecnico WHERE id_servicio = $id_servicio AND id_cliente = $cliente";
        $sqltwo = "UPDATE servicio SET estado_servicio = '$estadoS' WHERE id_servicio = $id_servicio AND id_cliente = $cliente";
  
  
        
        if ($conn->query($sql) === TRUE && $conn->query($sqltwo) === TRUE) {
          echo "Datos actualizados correctamente.";
      } else {
          echo "Error: " . $sql . "\\n" . $conn->error . "";
      }
  }
  }
  
  
  
  
  // *******************************************************************************************
  // ***************************************** ACCIONES ****************************************
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
              insertar_Datos();
              break;
          case 'buscar':
              // Lógica para buscar el formulario
              obtenerServicio();
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
  
  
  