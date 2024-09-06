
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
  $cedulaUsuario = $_POST['cedulaUsuario'];
  $nombreUsuario = strtoupper($_POST['nombreUsuario']);
  $apellidoUsuario = strtoupper($_POST['apellidoUsuario']);
  $telefonoUsuario = $_POST['telefonoUsuario'];
  $correoUsuario = strtoupper($_POST['correoUsuario']);
  $direccionUsuario = strtoupper($_POST['direccionUsuario']);
  $contrasenaUsuario = $_POST['contrasenaUsuario'];
  $tipoSeleccionado = $_POST['rolSelect'];
  $estadoUsuario = "ACTIVO";
  
  // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla
  $sql = "INSERT INTO usuario (cedula_user, name_user, lastName_user, phone_user, email_user, address_user, password_user, status_user, type_rol) VALUES ('$cedulaUsuario', '$nombreUsuario', '$apellidoUsuario', '$telefonoUsuario', '$correoUsuario', '$direccionUsuario', '$contrasenaUsuario', '$estadoUsuario', '$tipoSeleccionado')";
  
  if ($conn->query($sql) === TRUE) {
    // echo "<script>alert('Datos almacenados correctamente.');</script>";
    // echo "<script>setTimeout(function(){ alert('Datos almacenados correctamente.'); }, 2000);</script>";
    echo "<script>alert('Datos almacenados correctamente.'); window.location.href = 'RgUsuario.php';</script>";
} else {
    echo "<script>alert('Error: " . $sql . "\\n" . $conn->error . "');</script>";
}

}

// Cerrar conexión
$conn->close();
?>


