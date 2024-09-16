
<?php
// <!-- -------------------CONEXION A LA BASE DE DATOS------------------- -->

// Iniciar sesión
session_start();

// Configuración de la conexión a la base de datos
$servername = "localhost"; // Nombre del servidor
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$dbname = "DevelopersProject"; // Nombre de la base de datos

// Crear conexió
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
die("Conexión fallida: " . $conn->connect_error);
}


// Verificar si los datos del usuario están en la sesión
if (isset($_SESSION['usuario_validado_C']) && !empty($_SESSION['usuario_validado_C'])) {
    
    // trigger_error("Este es un error intencional", E_USER_ERROR);

    // Obtener los datos del usuario validado
    $usuarioC = $_SESSION['usuario_validado_C'];

    // Acceder a los datos necesarios, como el ID del usuario
    // traemos el campo 'cedula_usuario' de la tabla 'cliente'
    $userIdentificacionC = $usuarioC['cedula_cliente']; 
    
    // Procesar el cambio de contraseña (aquí se toma la nueva contraseña del formulario)
    $nuevaContrasena = $_POST['nuevaContrasena'];
    $nuevaContrasenaTwo = $_POST['nuevaContrasenaTwo'];

    // Verificar que las contraseñas coincidan
    if($nuevaContrasena === $nuevaContrasenaTwo) {
        // Hashear la nueva contraseña antes de guardarla
        // $hashedPassword = password_hash($nuevaContrasena, PASSWORD_DEFAULT);
            
            // Query para actualizar la contraseña en la base de datos
            $sql = "UPDATE cliente SET contrasena_cliente = '$nuevaContrasena' WHERE cedula_cliente = '$userIdentificacionC'";
            $sqltwo = "UPDATE usuarios SET contrasena_usuario = '$nuevaContrasena' WHERE cedula_usuario = '$userIdentificacionC'";

            if ($conn->query($sql) === TRUE && $conn->query($sqltwo) === TRUE) {
                echo "Contraseña cambiada exitosamente.";
            } else {
                echo "¡Error al actualizar la contraseña!". $conn->error;
                
            }
        }
    // Después de actualizar la contraseña, puedes limpiar la variable de sesión
    unset($_SESSION['usuario_validado']);
    
    
}else{
    if (isset($_SESSION['usuario_validado_A']) && !empty($_SESSION['usuario_validado_A'])) {

        // Obtener los datos del usuario validado
        $usuarioA = $_SESSION['usuario_validado_A'];  

        // Acceder a los datos necesarios, como el ID del usuario
        // traemos el campo 'cedula_user' de la tabla 'usuario'
        $userIdentificacionA = $usuarioA['cedula_administrador']; 
        
        // Procesar el cambio de contraseña (aquí se toma la nueva contraseña del formulario)
        $nuevaContrasena = $_POST['nuevaContrasena'];
        $nuevaContrasenaTwo = $_POST['nuevaContrasenaTwo'];

        // Verificar que las contraseñas coincidan
        if($nuevaContrasena === $nuevaContrasenaTwo) {
                
            // Query para actualizar la contraseña en la base de datos
            $sql = "UPDATE administrador SET contrasena_administrador = '$nuevaContrasena' WHERE cedula_administrador = '$userIdentificacionA'";
            $sqltwo = "UPDATE usuarios SET contrasena_usuario = '$nuevaContrasena' WHERE cedula_usuario = '$userIdentificacionA'";
            
            if ($conn->query($sql) === TRUE && $conn->query($sqltwo) === TRUE) {
                echo "Contraseña cambiada exitosamente.";
            } else {
                echo "¡Error al actualizar la contraseña!". $conn->error;   
            }
        // Después de actualizar la contraseña, limpiamos la variable de sesión
        unset($_SESSION['usuario_validado_A']);

        } else {
        
        
        // Si los datos del usuario no están en la sesión, redirigir al primer PHP para validar nuevamente
        echo "¡Error! las contraseñas no coinciden";
        exit();
    } 

    }else{

        if (isset($_SESSION['usuario_validado_T']) && !empty($_SESSION['usuario_validado_T'])) {

            // Obtener los datos del usuario validado
            $usuarioA = $_SESSION['usuario_validado_T'];  
    
            // Acceder a los datos necesarios, como el ID del usuario
            // traemos el campo 'cedula_user' de la tabla 'usuario'
            $userIdentificacionT = $usuarioA['cedula_tecnico']; 
            
            // Procesar el cambio de contraseña (aquí se toma la nueva contraseña del formulario)
            $nuevaContrasena = $_POST['nuevaContrasena'];
            $nuevaContrasenaTwo = $_POST['nuevaContrasenaTwo'];
    
            // Verificar que las contraseñas coincidan
            if($nuevaContrasena === $nuevaContrasenaTwo) {
                    
                // Query para actualizar la contraseña en la base de datos
                $sql = "UPDATE tecnico SET contrasena_tecnico = '$nuevaContrasena' WHERE cedula_tecnico = '$userIdentificacionT'";
                $sqltwo = "UPDATE usuarios SET contrasena_usuario = '$nuevaContrasena' WHERE cedula_usuario = '$userIdentificacionT'";

                if ($conn->query($sql) === TRUE && $conn->query($sqltwo) === TRUE) {
                    echo "Contraseña cambiada exitosamente.";
                } else {
                    echo "¡Error al actualizar la contraseña!". $conn->error;   
                }
            // Después de actualizar la contraseña, limpiamos la variable de sesión
            unset($_SESSION['usuario_validado_A']);
    
        } else {
            
            
            // Si los datos del usuario no están en la sesión, redirigir al primer PHP para validar nuevamente
            echo "¡Error! las contraseñas no coinciden";
            exit();
        } 
    
        }else{
            echo "Error al cambiar contraseña.";    
        } 
    }    
}

?>



