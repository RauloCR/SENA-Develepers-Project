

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
    $usuarioi = $_SESSION['usuarioValidadoI'];
    // traemos el campo 'id_cliente' de la tabla 'cliente'
    $userIdentificacioni = $usuarioi['id_cliente']; 


    // Consulta SQL
    $sql = "SELECT tipo_cedula, cedula_cliente, nombre_cliente, apellido_cliente, telefono_cliente, correo_cliente, direccion_cliente, contrasena_cliente FROM cliente WHERE id_cliente = $userIdentificacioni"; 
    $result = $conn->query($sql);

    $response = array();

    if ($result->num_rows > 0) {
        // Obtiene los datos
        $row = $result->fetch_assoc();
        $response['tipo_cedula'] = $row['tipo_cedula'];
        $response['cedula_cliente'] = $row['cedula_cliente'];
        $response['nombre_cliente'] = $row['nombre_cliente'];
        $response['apellido_cliente'] = $row['apellido_cliente'];
        $response['telefono_cliente'] = $row['telefono_cliente'];
        $response['correo_cliente'] = $row['correo_cliente'];
        $response['direccion_cliente'] = $row['direccion_cliente'];
        $response['contrasena_cliente'] = $row['contrasena_cliente'];
    } else {
        $response['tipo_cedula'] = "";
        $response['cedula_cliente'] = 0;
        $response['nombre_cliente'] = "";
        $response['apellido_cliente'] = "";
        $response['telefono_cliente'] = 0;
        $response['correo_cliente'] = "";
        $response['direccion_cliente'] = "";
        $response['contrasena_cliente'] = "";
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
    $usuarioi = $_SESSION['usuarioValidadoI'];
    // traemos el campo 'cedula_cliente' de la tabla 'cliente'
    $userIdentificacioni = $usuarioi['cedula_cliente']; 
    // traemos el campo 'id_cliente' de la tabla 'cliente'
    $userIdentificacionii = $usuarioi['id_cliente']; 


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
    $sql = "UPDATE cliente 
        SET tipo_cedula = '$tipoCedulaUsuario', 
            cedula_cliente = '$cedulaUsuario', 
            nombre_cliente = '$nombreUsuario', 
            apellido_cliente = '$apellidoUsuario', 
            telefono_cliente = '$telefonoUsuario', 
            correo_cliente = '$correoUsuario', 
            direccion_cliente = '$direccionUsuario', 
            contrasena_cliente = '$contrasenaUsuario'
        WHERE id_cliente = '$userIdentificacionii'";

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
