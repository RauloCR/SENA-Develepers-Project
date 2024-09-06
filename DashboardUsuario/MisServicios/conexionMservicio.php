

<?php

// <!-- -------------------CONEXION A LA BASE DE DATOS------------------- -->

// Configuración de la conexión a la base de datos
$servername = "localhost"; // Nombre del servidor
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$dbname = "DevelopersProject"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);
 
// Verificar la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $observation_service = $_POST['comment'];
  
  // $calificacionE = ('5');
  $calificacionE = $_POST['rating'];


  // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla
  $sql = "INSERT INTO detalleservicio (observation_service, qualify_service) VALUES ('$observation_service', '$calificacionE')";
  
  if ($conn->query($sql) === TRUE) {
    echo "Servicio calificado correctamente.";
} else {
    echo "Error: " . $sql . "\\n" . $conn->error . " ";
}

}

// Cerrar conexión
$conn->close();
?>


