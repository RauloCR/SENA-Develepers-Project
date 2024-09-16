

<?php


$servername = "localhost"; // Nombre del servidor
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$dbname = "DevelopersProject"; // Nombre de la base de datos

$serviceId = isset($_GET['idservicio']) ? intval($_GET['idservicio']) : 0;

// Ruta base donde se encuentran las imágenes
$baseImagePath = '../../DashboardUsuario/SServicio/';

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consultar las imágenes del servicio solo desde el campo file_path
$stmt = $conn->prepare("SELECT file_path FROM images WHERE service_id = ?");
$stmt->bind_param("i", $serviceId);
$stmt->execute();
$result = $stmt->get_result();

$images = [];
while ($row = $result->fetch_assoc()) {
    if (!empty($row['file_path'])) { // Asegúrate de que file_path no esté vacío
        // Concatenar la ruta base con el path de la imagen
        $fullImagePath = $baseImagePath . $row['file_path'];
        $images[] = $fullImagePath;
    }
}

// Verificar si se encontraron imágenes
if (empty($images)) {
    $response = ['message' => 'No se cargaron imágenes para este servicio.'];
} else {
    $response = $images;
}

echo json_encode($response);

$stmt->close();
$conn->close();


?>


