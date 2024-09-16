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
$idservicio = $conn->real_escape_string($_GET['idservicio']);

// Consulta SQL
$sql = "SELECT 
    s.destino_servicio,
    t.nombre_tecnico,
    t.id_tecnico,
    c.nombre_cliente,
    c.cedula_cliente
FROM 
    servicio s
JOIN 
    tecnico t ON s.id_tecnico = t.id_tecnico
JOIN 
    cliente c ON s.id_cliente = c.id_cliente
WHERE s.id_servicio = $idservicio";

$result = $conn->query($sql);

$response = array('success' => false, 'message' => 'No existe');

// Verificar si se encontraron resultados
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response['success'] = true;
    $response['destino_servicio'] = $row['destino_servicio'];
    $response['nombre_tecnico'] = $row['nombre_tecnico'];
    $response['id_tecnico'] = $row['id_tecnico'];
    $response['nombre_cliente'] = $row['nombre_cliente'];
    $response['cedula_cliente'] = $row['cedula_cliente'];
    $response['message'] = 'Cliente encontrado'; // Opcional, para proporcionar más detalles
}

// Cerrar conexión
$conn->close();

// Enviar respuesta en formato JSON
echo json_encode($response);

?>
