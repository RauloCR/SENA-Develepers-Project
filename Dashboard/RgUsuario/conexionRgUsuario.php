
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
      $correoUsuario = strtoupper($_POST['correoUsuario']);
      $direccionUsuario = strtoupper($_POST['direccionUsuario']);
      $contrasenaUsuario = $_POST['contrasenaUsuario'];
      $tipoSeleccionado = strtoupper($_POST['rolSelect']);
      $estadoUsuario = "ACTIVO";
      
      // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla
      $sql = "INSERT INTO usuarios (cedula_usuario, nombre_usuario, apellido_usuario, telefono_usuario, correo_usuario, direccion_usuario, contrasena_usuario, estado_usuario, tipo_rol) VALUES ('$cedulaUsuario', '$nombreUsuario', '$apellidoUsuario', '$telefonoUsuario', '$correoUsuario', '$direccionUsuario', '$contrasenaUsuario', '$estadoUsuario', '$tipoSeleccionado')";
      
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

function obtenerUsuarioPorID() {
    
    // Conexión a la base de datos
    global $conn;

    if ($_SERVER["REQUEST_METHOD"] == "GET") {

        
        $id_usuario = $_GET['idUsuario'];
        // Consulta SQL para obtener un solo usuario por su ID
        $sql = "SELECT id_usuario, tipo_rol, nombre_usuario, correo_usuario, createTime_usuario, estado_usuario  FROM usuarios WHERE id_usuario = $id_usuario";
        $result = $conn->query($sql);
    
        // Comprobar si hay resultados
        if ($result && $result->num_rows === 1) {
                
            $data = array();
            // Iterar sobre los resultados y agregar cada fila de datos al array
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            // Devolver los datos en formato JSON
            // header('Content-Type: application/json');
            // echo json_encode($data, JSON_UNESCAPED_UNICODE); // JSON_UNESCAPED_UNICODE para manejar caracteres con tilde correctamente
               
            // Devolver los datos en formato JSON
            echo json_encode($data);
        } else {
            echo json_encode(array('error' => 'No se encontraron resultados'));
        }

        }

    }

// *******************************************************************************************
// *************************************** BORRAR DATOS **************************************
// *******************************************************************************************

function borrar_Datos(){
    global $conn;
    // Verificar si la solicitud es de tipo POST y si se ha enviado un ID de usuario
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['idUsuario'])) {
        // Obtener el ID del usuario desde el formulario
        $idUsuario = $_POST['idUsuario'];

        // Consulta SQL para obtener la información del usuario
        $sql_select = "SELECT * FROM usuarios WHERE id_usuario = '$idUsuario'";
        $result = $conn->query($sql_select);

        if ($result->num_rows > 0) {
            // Mostrar la información del usuario y un mensaje de confirmación
            $usuario = $result->fetch_assoc();

            $sql_delete = "DELETE FROM usuarios WHERE id_usuario = '$idUsuario'";
            if ($conn->query($sql_delete) === TRUE) {
                echo "¡El usuario ha sido borrado exitosamente!";
            } else {
                echo "¡Ocurrió un error al intentar borrar al usuario! " . $conn->error;
            }

        } else {
            echo "¡No se encontró ningún usuario con el ID proporcionado!";
        }

        // if (isset($_POST['confirmarBorrado'])) {
        //     // Consulta SQL para borrar al usuario
        //     $sql_delete = "DELETE FROM usuario WHERE id_user = '$idUsuario'";
        //     if ($conn->query($sql_delete) === TRUE) {
        //         echo "<script>alert('El usuario ha sido borrado exitosamente'); window.location.href = 'RgUsuario.php';</script>";
        //     } else {
        //         echo "<p>Ocurrió un error al intentar borrar al usuario: " . $conn->error . "</p>";
        //     }
        // }
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













