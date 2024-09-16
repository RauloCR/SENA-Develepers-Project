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
$cedula = $conn->real_escape_string($_GET['cedula']);

// Consulta SQL
$sql = "SELECT nombre_cliente, apellido_cliente FROM cliente WHERE cedula_cliente = '$cedula'";
$result = $conn->query($sql);

$response = array('success' => false, 'message' => 'No existe');

// Verificar si se encontraron resultados
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response['success'] = true;
    $response['nombre_cliente'] = $row['nombre_cliente'];
    $response['apellido_cliente'] = $row['apellido_cliente'];
    $response['message'] = 'Cliente encontrado'; // Opcional, para proporcionar más detalles
}

// Cerrar conexión
$conn->close();

// Enviar respuesta en formato JSON
echo json_encode($response);

?>
