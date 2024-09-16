<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost"; // Nombre del servidor
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$dbname = "DevelopersProject"; // Nombre de la base de datos


// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el parámetro de cedula de la consulta
$cedulaU = $conn->real_escape_string($_GET['cedulab']);

// Consulta SQL
$sql = "SELECT id_usuario,
                tipo_rol,
                tipo_cedula,
                nombre_usuario,
                apellido_usuario,
                cedula_usuario,
                telefono_usuario,
                direccion_usuario,
                correo_usuario,
                contrasena_usuario,
                estado_usuario 
                FROM usuarios WHERE cedula_usuario = $cedulaU";
    

$result = $conn->query($sql);

$response = array('success' => false, 'message' => 'No existe');

// Verificar si se encontraron resultados
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response['success'] = true;

    $response['id_usuario'] = $row['id_usuario'];
    $response['tipo_rol'] = $row['tipo_rol'];
    $response['nombre_usuario'] = $row['nombre_usuario'];
    $response['apellido_usuario'] = $row['apellido_usuario'];
    $response['tipo_cedula'] = $row['tipo_cedula'];
    $response['cedula_usuario'] = $row['cedula_usuario'];
    $response['telefono_usuario'] = $row['telefono_usuario'];
    $response['direccion_usuario'] = $row['direccion_usuario'];
    $response['correo_usuario'] = $row['correo_usuario'];
    $response['estado_usuario'] = $row['estado_usuario'];
    $response['contrasena_usuario'] = $row['contrasena_usuario'];

    $response['message'] = 'Cliente encontrado'; // Opcional, para proporcionar más detalles
}

// Enviar respuesta en formato JSON
echo json_encode($response);

// Cerrar conexión
$conn->close();


?>
