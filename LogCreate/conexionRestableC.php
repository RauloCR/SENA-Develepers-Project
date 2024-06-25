

<?php
// -------------------CONEXION A LA BASE DE DATOS-------------------

// Iniciar sesión
session_start();

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

if (isset($_POST['tipoDocumento']) && isset($_POST['identificacion']) && isset($_POST['email'])) {
  // Los datos están presentes, puedes proceder con su uso
  $tipoDocumento = $_POST['tipoDocumento'];
  $tipoDocumentoS = strtoupper($tipoDocumento);
  $identificacion = $_POST['identificacion'];
  $email = $_POST['email'];
  $emailS = strtoupper($email);

  

    // Consulta SQL para verificar las credenciales
    $sql = "SELECT * FROM usuario WHERE type_cedula = '$tipoDocumentoS' AND cedula_user = '$identificacion' AND email_user = '$emailS'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows === 1) {
      // Guardar los datos del usuario en la variable de sesión
      $_SESSION['usuario_validado'] = $result->fetch_assoc();

      // La consulta devolvió exactamente una fila, lo que significa que los datos son correctos
      echo "¡Datos validados!";
    
    } else {
      // La consulta no devolvió ninguna fila o más de una fila, lo que indica que los datos son incorrectos
      echo "¡Favor ingresar información válida!";      
    }

} else {
  // Si falta alguno de los campos, puedes mostrar un mensaje de error o realizar alguna otra acción
  echo "Favor ingresar toda la informacion.";
  
}

$conn->close();
?>
