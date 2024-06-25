
<?php
// <!-- -------------------CONEXION A LA BASE DE DATOS------------------- -->

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


// Verificar si los datos del usuario están en la sesión
if(isset($_SESSION['usuario_validado'])) {

    // Obtener los datos del usuario validado
    $usuario = $_SESSION['usuario_validado'];
    // Acceder a los datos necesarios, como el ID del usuario
    $userIdentificacion = $usuario['cedula_user']; // traemos el campo 'cedula_user' de la tabla 'usuario'
    
    // Procesar el cambio de contraseña (aquí debes obtener la nueva contraseña del formulario)
    $nuevaContrasena = $_POST['nuevaContrasena'];
    $nuevaContrasenaTwo = $_POST['nuevaContrasenaTwo'];


    // Verificar que las contraseñas coincidan
    if($nuevaContrasena === $nuevaContrasenaTwo) {
        // Hashear la nueva contraseña antes de guardarla
        // $hashedPassword = password_hash($nuevaContrasena, PASSWORD_DEFAULT);

        // Query para actualizar la contraseña en la base de datos
        $sql = "UPDATE usuario SET password_user = '$nuevaContrasena' WHERE cedula_user = '$userIdentificacion'";

        if ($conn->query($sql) === TRUE) {
            echo "Contraseña cambiada exitosamente.";
        } else {
            echo "¡Error al actualizar la contraseña!". $conn->error;
            
        }
    
    // Después de actualizar la contraseña, puedes limpiar la variable de sesión
    unset($_SESSION['usuario_validado']);
    
    
} else {
    // Si los datos del usuario no están en la sesión, redirigir al primer PHP para validar nuevamente
    echo "¡Error! las contraseñas no coinciden";
    exit();
}
}else{
    echo "Error al cambiar contraseña.";
}
?>

