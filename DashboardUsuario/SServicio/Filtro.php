<?php

// Iniciar sesión
session_start();

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "DevelopersProject";

$conn = new mysqli($servername, $username, $password, $dbname);

// Obtener los datos del usuario validado
$usuarioi = $_SESSION['usuarioValidadoI'];

// traemos el campo 'id_usuario' de la tabla 'cliente'
$userIdentificacioni = $usuarioi['id_cliente']; 

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener los datos de la tabla usuarios
$sql = "SELECT tipo_equipo, destino_servicio, direccion_servicio, telefono_servicio, createTime_servicio FROM servicio WHERE id_usuario = $userIdentificacioni";
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
