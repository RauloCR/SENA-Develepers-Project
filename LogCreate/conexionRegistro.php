
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
  $cedulaUsuario = $_POST['cedulaUsuario'];
  $nombreUsuario = strtoupper($_POST['nombreUsuario']); //strtoupper : se utiliza para pasar a base de datos todo mayuscula
  $apellidoUsuario = strtoupper($_POST['apellidoUsuario']);
  $telefonoUsuario = $_POST['telefonoUsuario'];
  $correoUsuario = $_POST['correoUsuario'];
  $direccionUsuario = strtoupper($_POST['direccionUsuario']);
  $contrasenaUsuario = $_POST['contrasenaUsuario'];
  $tipoCedulaUsuario = strtoupper($_POST['tipoSelect']);
  $estadoUsuario = "ACTIVO";
  $type_rol = "CLIENTE";
  
  // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla
  $sql = "INSERT INTO usuario (type_rol, cedula_user, type_cedula, name_user, lastName_user, phone_user, email_user, address_user, password_user, status_user) VALUES ('$type_rol', '$cedulaUsuario', '$tipoCedulaUsuario', '$nombreUsuario', '$apellidoUsuario', '$telefonoUsuario', '$correoUsuario', '$direccionUsuario', '$contrasenaUsuario', '$estadoUsuario')";
  
  //validamos que la consulta sea exitosa
  if ($conn->query($sql) === TRUE) {
    echo "Datos almacenados correctamente";
} else {
    echo "¡Error! No se creo el usuario";
}

}else {
  echo "¡Error! No se creo el usuario";
}

// Cerrara conexión
$conn->close();
?>

<!-- -------------------------------------------------------------------------------------------- -->

