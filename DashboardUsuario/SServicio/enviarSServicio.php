<?php
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

// Consulta SQL para obtener los datos de la tabla usuarios
$sql = "SELECT type_machine, destination_place, address_place, phone_service, createTime_service FROM servicio";
$result = $conn->query($sql);

// Comprobar si hay resultados
if ($result->num_rows > 0) {
    $data = array();
    // Iterar sobre los resultados y agregar cada fila de datos al array
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Devolver los datos en formato JSON
    echo json_encode($data);
} else {
    echo json_encode(array('error' => 'No se encontraron resultados'));
}
$conn->close();
?>
