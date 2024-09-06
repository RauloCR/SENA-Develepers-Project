
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
  
  $sql = "INSERT INTO cliente (tipo_rol, cedula_cliente, tipo_cedula, nombre_cliente, apellido_cliente, telefono_cliente, correo_cliente, direccion_cliente, contraseña_cliente, estado_cliente) VALUES ('$type_rol', '$cedulaUsuario', '$tipoCedulaUsuario', '$nombreUsuario', '$apellidoUsuario', '$telefonoUsuario', '$correoUsuario', '$direccionUsuario', '$contrasenaUsuario', '$estadoUsuario')";
  $sqlTwo = "INSERT INTO usuarios (tipo_rol, cedula_usuario, tipo_cedula, nombre_usuario, apellido_usuario, telefono_usuario, correo_usuario, direccion_usuario, contraseña_usuario, estado_usuario) VALUES ('$type_rol', '$cedulaUsuario', '$tipoCedulaUsuario', '$nombreUsuario', '$apellidoUsuario', '$telefonoUsuario', '$correoUsuario', '$direccionUsuario', '$contrasenaUsuario', '$estadoUsuario')";

  //validamos que la consulta sea exitosa
  if ($conn->query($sql) === TRUE & $conn->query($sqlTwo) === TRUE ) {
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


