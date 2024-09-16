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
// $idservicio = intval($idservicio);

// Consulta SQL

$sql = "SELECT 
        s.tipo_equipo,
        s.direccion_servicio,
        s.destino_servicio,
        s.estado_servicio,
        t.nombre_tecnico,
        c.nombre_cliente
        FROM 
            servicio s
        JOIN 
            tecnico t ON s.id_tecnico = t.id_tecnico
        JOIN 
            cliente c ON s.id_cliente = c.id_cliente
        WHERE s.id_servicio = '$idservicio'";
    

$result = $conn->query($sql);

$response = array('success' => false, 'message' => 'No existe');

// Verificar si se encontraron resultados
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response['success'] = true;

    $response['nombre_cliente'] = $row['nombre_cliente'];
    $response['tipo_equipo'] = $row['tipo_equipo'];
    $response['direccion_servicio'] = $row['direccion_servicio'];
    $response['nombre_tecnico'] = $row['nombre_tecnico'];
    $response['destino_servicio'] = $row['destino_servicio'];
    $response['estado_servicio'] = $row['estado_servicio'];
    

    $response['message'] = 'Cliente encontrado'; // Opcional, para proporcionar más detalles
}

// Enviar respuesta en formato JSON
echo json_encode($response);

// Cerrar conexión
$conn->close();


?>
