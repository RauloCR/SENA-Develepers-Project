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
    $sql = "SELECT id_usuario, cedula_usuario, createTime_usuario, correo_usuario, estado_usuario FROM usuarios";
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
  
        
        $id_servicio = $_GET['idservicio2'];
        $estadoS = strtoupper(trim($_GET['estado'] ?? '')); 
  
        // Consulta SQL para obtener un solo usuario por su ID
        $sql = "SELECT id_servicio, tipo_equipo, estado_servicio, tiempo_alarma FROM servicio WHERE 1=1";
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
  
        $id_servicio = $_POST['idservicio'];
        $fechaA = $_POST['fecha'];
        
        // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla
  
        $sql = "UPDATE servicio SET tiempo_alarma = '$fechaA' WHERE id_servicio = $id_servicio";
        
        if ($conn->query($sql) === TRUE) {
          echo "Datos guardados correctamente.";
      } else {
          echo "Error: " . $sql . "\\n" . $conn->error . "";
      }
  }
  }
  



  
// *******************************************************************************************
// ************************************** ACTUALIZAR DATOS ***********************************
// *******************************************************************************************


function actualizarDatos(){

    global $conn;

    // Obtener los datos del formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $cedulav = $_POST['cedulab'];

        $id = $_POST['id'];
        $rol = strtoupper($_POST['rol']); //strtoupper : se utiliza para pasar a base de datos todo mayuscula
        $nombre = strtoupper($_POST['nombre']);
        $apellido = $_POST['apellido'];
        $tipocc = $_POST['tipocc'];
        $cc = $_POST['cc'];
        $tl = $_POST['telefono'];
        $direccion = strtoupper($_POST['direccion']);
        $correo = $_POST['correo'];
        $estado = strtoupper($_POST['estado']);
        $contrasena = $_POST['contrasena'];

        // Preparar la consulta SQL para actualizar los datos en la tabla


        $sql = "UPDATE usuarios 
                    SET 
                    tipo_rol = '$rol', 
                    tipo_cedula = '$tipocc', 
                    nombre_usuario = '$nombre', 
                    apellido_usuario = '$apellido', 
                    cedula_usuario = '$cc', 
                    telefono_usuario = '$tl',
                    direccion_usuario = '$direccion', 
                    correo_usuario = '$correo',
                    contrasena_usuario = '$contrasena',
                    estado_usuario = '$estado'
                    WHERE cedula_usuario = '$cedulav'";

                        $sqltwo = "UPDATE cliente 
                        SET 
                        tipo_rol = '$rol', 
                        tipo_cedula = '$tipocc', 
                        nombre_cliente = '$nombre', 
                        apellido_cliente = '$apellido', 
                        cedula_cliente = '$cc', 
                        telefono_cliente = '$tl',
                        direccion_cliente = '$direccion', 
                        correo_cliente = '$correo',
                        contrasena_cliente = '$contrasena',
                        estado_cliente = '$estado'
                        WHERE cedula_cliente = '$cedulav'";

                            $sqlthree = "UPDATE tecnico 
                            SET 
                            tipo_rol = '$rol', 
                            tipo_cedula = '$tipocc', 
                            nombre_tecnico = '$nombre', 
                            apellido_tecnico = '$apellido', 
                            cedula_tecnico = '$cc', 
                            telefono_tecnico = '$tl',
                            direccion_tecnico = '$direccion', 
                            correo_tecnico = '$correo',
                            contrasena_tecnico = '$contrasena',
                            estado_tecnico = '$estado'
                            WHERE cedula_tecnico = '$cedulav'";

                                $sqlfour = "UPDATE administrador
                                SET 
                                tipo_rol = '$rol', 
                                tipo_cedula = '$tipocc', 
                                nombre_administrador = '$nombre', 
                                apellido_administrador = '$apellido', 
                                cedula_administrador = '$cc', 
                                telefono_administrador = '$tl',
                                direccion_administrador = '$direccion', 
                                correo_administrador = '$correo',
                                contrasena_administrador = '$contrasena',
                                estado_administrador = '$estado'
                                WHERE cedula_administrador = '$cedulav'";


        if ($conn->query($sql) && $conn->query($sqltwo) && $conn->query($sqlthree) && $conn->query($sqlfour)){
            echo "Informacion actualizada correctamente.";
        }else {
            echo "¡Error al actualizar la contraseña!". $conn->error;   
        }
    
    }else {
        echo "¡Error! No se actualizo la informacion";
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
            case 'actualizar':
                // Lógica para actualizar
                actualizarDatos();
                break;
          default:
              // Acción no reconocida
              break;
      }
  }
  
  
  
  
  // Cerrar conexión
  $conn->close();
  ?>
  
  
  