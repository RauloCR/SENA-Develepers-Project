

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


    // // Consulta SQL para verificar las credenciales
    // $sql_usuario = "SELECT * FROM usuario WHERE type_cedula = '$tipoDocumentoS' AND cedula_user = '$identificacion' AND email_user = '$email'";
    // $result = $conn->query($sql);

    // if ($result && $result->num_rows === 1) {
    //   // Guardar los datos del usuario en la variable de sesión
    //   $_SESSION['usuario_validado'] = $result->fetch_assoc();

    //   // La consulta devolvió exactamente una fila, lo que significa que los datos son correctos
    //   echo "¡Datos validados!";
    
    // } else {
    //   // La consulta no devolvió ninguna fila o más de una fila, lo que indica que los datos son incorrectos
    //   echo "¡Favor ingresar información válida!";      
    // }

    session_unset();

    $sql_cliente = "SELECT * FROM cliente WHERE tipo_cedula = '$tipoDocumentoS' AND cedula_usuario = '$identificacion' AND correo_usuario = '$email'";
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
            echo "¡Informacion incorrecta!";
        }
    }

} else {
  // Si falta alguno de los campos, puedes mostrar un mensaje de error o realizar alguna otra acción
  echo "Favor ingresar toda la informacion.";
  
}

$conn->close();
?>
