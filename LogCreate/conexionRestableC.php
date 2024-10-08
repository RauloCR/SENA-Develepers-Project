

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

  // $emailS = strtoupper($email);

    session_unset();

    $sql_cliente = "SELECT * FROM cliente WHERE tipo_cedula = '$tipoDocumentoS' AND cedula_cliente = '$identificacion' AND correo_cliente = '$email'";
    $resultado_cliente = mysqli_query($conn, $sql_cliente);

    if (mysqli_num_rows($resultado_cliente) > 0) {
        // Guardar los datos del usuario en la variable de sesión
        // trigger_error("Este es un error intencional", E_USER_ERROR);
        $_SESSION['usuario_validado_C'] = $resultado_cliente->fetch_assoc();

        // El usuario es un cliente
        echo "¡Datos validados cliente!";
    }else{
        $sql_administrador = "SELECT * FROM administrador WHERE tipo_cedula = '$tipoDocumentoS' AND cedula_administrador = '$identificacion' AND correo_administrador = '$email'";
        $resultado_administrador = mysqli_query($conn, $sql_administrador);
        if (mysqli_num_rows($resultado_administrador) > 0) {
          // Guardar los datos del usuario en la variable de sesión
          $_SESSION['usuario_validado_A'] = $resultado_administrador->fetch_assoc();
            // El usuario es un administrador
            echo "¡Datos validados Administrador!";
        }else{

          $sql_tecnico = "SELECT * FROM tecnico WHERE tipo_cedula = '$tipoDocumentoS' AND cedula_tecnico = '$identificacion' AND correo_tecnico = '$email'";
          $resultado_tecnico = mysqli_query($conn, $sql_tecnico);
          if (mysqli_num_rows($resultado_tecnico) > 0) {
            // Guardar los datos del usuario en la variable de sesión
            $_SESSION['usuario_validado_T'] = $resultado_tecnico->fetch_assoc();
              // El usuario es un administrador
              echo "¡Datos validados Administrador!";
              
            }else{
              echo "¡Informacion incorrecta!";
            }
            
        }
    }

} else {
  // Si falta alguno de los campos, puedes mostrar un mensaje de error o realizar alguna otra acción
  echo "Favor ingresar toda la informacion.";
  
}

$conn->close();
?>
