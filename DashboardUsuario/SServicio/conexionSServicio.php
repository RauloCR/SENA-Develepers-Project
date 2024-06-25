<!-- -------------------CONEXION A LA BASE DE DATOS------------------- -->

<?php
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
  $equipo = strtoupper($_POST['equipo']);
  $direccion = strtoupper($_POST['direccion']);
  $mantenimiento = strtoupper($_POST['mantenimiento']);
  $celular = $_POST['celular'];
  $lugar = strtoupper($_POST['lugar']);
  $email = strtoupper($_POST['email']);
  $estado = strtoupper('ACTIVO');
  
  // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla
  $sql = "INSERT INTO servicio (type_machine, address_place, type_service, phone_service, destination_place, email_service, status_service) VALUES ('$equipo', '$direccion', '$mantenimiento', '$celular', '$lugar', '$email', '$estado')";
  
  if ($conn->query($sql) === TRUE) {
    // echo "<script>alert('Datos almacenados correctamente.');</script>";
    // echo "<script>setTimeout(function(){ alert('Datos almacenados correctamente.'); }, 2000);</script>";
    echo "Datos almacenados correctamente";
} else {
    echo "Error: " . $sql . "\\n" . $conn->error . "";
}

}

// Cerrar conexión
$conn->close();
?>


