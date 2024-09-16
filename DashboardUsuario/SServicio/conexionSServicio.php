<?php
// <!-- -------------------CONEXION A LA BASE DE DATOS------------------- -->

// Iniciar sesión
session_start();

$uploadDir = 'uploads/';
// Configuración de la conexión a la base de datos
$servername = "localhost"; // Nombre del servidor
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$dbname = "DevelopersProject"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Crea la carpeta si no existe
if (!is_dir($uploadDir)) {
  mkdir($uploadDir, 0755, true);
}

// Obtener los datos del usuario validado
$usuarioi = $_SESSION['usuarioValidadoI'];

// traemos el campo 'id_usuario' de la tabla 'cliente'
$userIdentificacioni = $usuarioi['id_cliente']; 

// Verificar la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
} 

// Obtener los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $direccion = strtoupper($_POST['direccion']);
  $mantenimiento = strtoupper($_POST['mantenimiento']);
  $celular = $_POST['celular'];
  $lugar = strtoupper($_POST['lugar']);
  $email = $_POST['email'];   
  $comentario = strtoupper($_POST['comment']);
  $estado = strtoupper('PENDIENTE');
  
  
  // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla

  if (!empty($_POST['equipo'])) {
    $equipo = strtoupper(trim($_POST['equipo']));
    $sql = "INSERT INTO servicio (tipo_equipo, direccion_servicio, tipo_servicio, telefono_servicio, destino_servicio, correo_servicio, estado_servicio, id_cliente, comentario) VALUES ('$equipo', '$direccion', '$mantenimiento', '$celular', '$lugar', '$email', '$estado', '$userIdentificacioni', '$comentario')";
  }else{
    $equipo = strtoupper($_POST['equipo-select']);
    $sql = "INSERT INTO servicio (tipo_equipo, direccion_servicio, tipo_servicio, telefono_servicio, destino_servicio, correo_servicio, estado_servicio, id_cliente, comentario) VALUES ('$equipo', '$direccion', '$mantenimiento', '$celular', '$lugar', '$email', '$estado', '$userIdentificacioni', '$comentario')";
  }

  
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

<?php

