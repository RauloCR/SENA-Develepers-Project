
<?php

// ********************************************************************************************
// **   PORGRAMADOR: WILMER USBALDO ROJAS GUTIERREZ                                          **
// **   PROYECTO: DEVELOPERS                                                                 **
// **   PROGREMACION: REGISTRO USUARIOS                                                      **
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
    $sql = "SELECT id_usuario, tipo_rol, nombre_usuario, correo_usuario, createTime_usuario, estado_usuario FROM usuarios";
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

function obtenerUsuarioPorID() {
    
    // Conexión a la base de datos
    global $conn;

    if ($_SERVER["REQUEST_METHOD"] == "GET") {

        $nombre = strtoupper($_GET['nombreUsuario']);
        $apellido = strtoupper($_GET['apellidoUsuario']);
        $telefono = strtoupper($_GET['telefonoUsuario']);
        $direccion = strtoupper($_GET['direccionUsuario']);
        $correo = $_GET['correoUsuario'];
        $rol = strtoupper(trim($_GET['rolUsuario'] ?? '')); 

        $cedula = strtoupper($_GET['cedulaUsuario']);
        // $fecha = strtoupper($_GET['fechaUsuario']); 
        $id = strtoupper($_GET['idUsuario']); 


        // Construir la consulta SQL dinámica
        // $sql = "SELECT * FROM usuarios WHERE 1=1";
        $sql = "SELECT id_usuario, tipo_rol, nombre_usuario, correo_usuario, createTime_usuario, estado_usuario FROM usuarios WHERE 1=1";
        $params = [];

        // Agregar condiciones solo si los parámetros tienen valor
        if (!empty($nombre)) {  
            $sql .= " AND nombre_usuario = ?";
            $params[] = $nombre;
        }
        if (!empty($apellido)) {
            $sql .= " AND apellido_usuario = ?";
            $params[] = $apellido;
        }
        if (!empty($telefono)) {
            $sql .= " AND telefono_usuario = ?";
            $params[] = $telefono;
        }
        if (!empty($direccion)) {
            $sql .= " AND direccion_usuario = ?";
            $params[] = $direccion;
        }
        if (!empty($correo)) {
            $sql .= " AND correo_usuario = ?";
            $params[] = $correo;
        }
        if (!empty($rol)) {
            $sql .= " AND tipo_rol = ?";
            $params[] = $rol;
        }
        if (!empty($cedula)) {
            $sql .= " AND cedula_usuario = ?";
            $params[] = $cedula;
        }
        if (!empty($id)) {
            $sql .= " AND id_usuario = ?";
            $params[] = $id;
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
        case 'buscar':
            // Lógica para buscar el formulario
            obtenerUsuarioPorID();
            break;
        
        default:
            // Acción no reconocida
            break;
    }
}

// Cerrar conexión
$conn->close();
?>













