

<?php

header('Content-Type: application/json');

// Iniciar sesión
session_start();

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "DevelopersProject";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}  


// *******************************************************************************************
// ************************************** CARGAR DATOS ***************************************
// *******************************************************************************************



function cargarDatos(){
    global $conn;

    // Obtener los datos del usuario validado
    $usuarioi = $_SESSION['usuarioValidadoII'];
    // traemos el campo 'id_tecnico' de la tabla 'tecnico'
    $userIdentificacioni = $usuarioi['id_tecnico']; 


    // Consulta SQL
    $sql = "SELECT tipo_cedula, cedula_tecnico, nombre_tecnico, apellido_tecnico, telefono_tecnico, correo_tecnico, direccion_tecnico, contrasena_tecnico FROM tecnico WHERE id_tecnico = $userIdentificacioni"; 
    $result = $conn->query($sql);

    $response = array();

    if ($result->num_rows > 0) {
        // Obtiene los datos
        $row = $result->fetch_assoc();
        $response['tipo_cedula'] = $row['tipo_cedula'];
        $response['cedula_tecnico'] = $row['cedula_tecnico'];
        $response['nombre_tecnico'] = $row['nombre_tecnico'];
        $response['apellido_tecnico'] = $row['apellido_tecnico'];
        $response['telefono_tecnico'] = $row['telefono_tecnico'];
        $response['correo_tecnico'] = $row['correo_tecnico'];
        $response['direccion_tecnico'] = $row['direccion_tecnico'];
        $response['contrasena_tecnico'] = $row['contrasena_tecnico'];
    } else {
        $response['tipo_cedula'] = "";
        $response['cedula_tecnico'] = 0;
        $response['nombre_tecnico'] = "";
        $response['apellido_tecnico'] = "";
        $response['telefono_tecnico'] = 0;
        $response['correo_tecnico'] = "";
        $response['direccion_tecnico'] = "";
        $response['contrasena_tecnico'] = "";
    }
    // Devuelve los datos en formato JSON
    echo json_encode($response);

}

// *******************************************************************************************
// ************************************** ACTUALIZAR DATOS ***********************************
// *******************************************************************************************


function actualizarDatos(){

    global $conn;

    // Obtener los datos del usuario validado
    $usuarioi = $_SESSION['usuarioValidadoII'];
    // traemos el campo 'cedula_tecnico' de la tabla 'tecnico'
    $userIdentificacioni = $usuarioi['cedula_tecnico']; 
    // traemos el campo 'id_tecnico' de la tabla 'tecnico'
    $userIdentificacionii = $usuarioi['id_tecnico']; 


    // Obtener los datos del formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $cedulaUsuario = $_POST['cedulaUsuario'];
        $nombreUsuario = strtoupper($_POST['nombreUsuario']); //strtoupper : se utiliza para pasar a base de datos todo mayuscula
        $apellidoUsuario = strtoupper($_POST['apellidoUsuario']);
        $telefonoUsuario = $_POST['telefonoUsuario'];
        $correoUsuario = $_POST['correoUsuario'];
        $direccionUsuario = strtoupper($_POST['direccionUsuario']);
        $contrasenaUsuario = $_POST['contrasenaUsuario'];
        $tipoCedulaUsuario = strtoupper($_POST['tipoSelect']);

        // Preparar la consulta SQL para actualizar los datos en la tabla
    $sql = "UPDATE tecnico 
        SET tipo_cedula = '$tipoCedulaUsuario', 
            cedula_tecnico = '$cedulaUsuario', 
            nombre_tecnico = '$nombreUsuario', 
            apellido_tecnico = '$apellidoUsuario', 
            telefono_tecnico = '$telefonoUsuario', 
            correo_tecnico = '$correoUsuario', 
            direccion_tecnico = '$direccionUsuario', 
            contrasena_tecnico = '$contrasenaUsuario'
        WHERE id_tecnico = '$userIdentificacionii'";

    $sqlTwo = "UPDATE usuarios 
    SET tipo_cedula = '$tipoCedulaUsuario', 
        cedula_usuario = '$cedulaUsuario', 
        nombre_usuario = '$nombreUsuario', 
        apellido_usuario = '$apellidoUsuario', 
        telefono_usuario = '$telefonoUsuario', 
        correo_usuario = '$correoUsuario', 
        direccion_usuario = '$direccionUsuario', 
        contrasena_usuario = '$contrasenaUsuario'
    WHERE cedula_usuario = '$userIdentificacioni'";


        if ($conn->query($sql) === TRUE & $conn->query($sqlTwo) === TRUE ) {
            echo "Informacion actualizada correctamente.";
        } else {
            echo "¡Error al actualizar la contraseña!". $conn->error;   
        }
    
    }else {
        echo "¡Error! No se actualizo la informacion";
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
            cargarDatos();
            break;
        case 'actualizar':
            // Lógica para procesar el envío del formulario
            actualizarDatos();
            break;
        default:
            // Acción no reconocida
            break;
    }
}

$conn->close();
?>
