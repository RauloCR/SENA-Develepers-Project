
<?php
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

// Obtener el parámetro id_servicio de la solicitud GET
$idservicio = isset($_GET['idservicio']) ? $conn->real_escape_string($_GET['idservicio']) : '';

if (empty($idservicio)) {
    echo json_encode(['error' => 'No se proporcionó el ID del servicio']);
    exit();
}

// Consulta SQL
$sql = "SELECT * FROM servicio WHERE id_servicio = '$idservicio'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Recuperar los datos en formato asociativo
    $data = $result->fetch_assoc();
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'No se encontraron resultados']);
}

// Cerrar la conexión
$conn->close();
?>
