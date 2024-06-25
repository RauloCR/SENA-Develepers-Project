<?php
// Conexión a la base de datos (debes modificar los valores según tu configuración)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "myBD";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta a la base de datos (ejemplo básico)
$sql = "SELECT * FROM usuario";
$result = $conn->query($sql);

// Preparar un array para almacenar los resultados
$data = array();

// Obtener los resultados y agregarlos al array
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Cerrar conexión
$conn->close();

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($data, JSON_UNESCAPED_UNICODE); // JSON_UNESCAPED_UNICODE para manejar caracteres con tilde correctamente
?>
