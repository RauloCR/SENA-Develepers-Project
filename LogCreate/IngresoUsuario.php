<?php

// Iniciar sesión
session_start();

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$database = "DevelopersProject";


$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener los datos del formulario
$usuario = $_POST['usuario'];
// $usuarioM = strtoupper($usuario);
$contrasena = $_POST['contrasena'];

// Consulta SQL para verificar las credenciales

$sql_cliente = "SELECT * FROM cliente WHERE correo_cliente = '$usuario' AND contrasena_cliente = '$contrasena'";

$resultado_cliente = mysqli_query($conn, $sql_cliente);

if (mysqli_num_rows($resultado_cliente) > 0) { 
    // Limpiamos la variable
    unset($_SESSION['usuarioValidadoI']); 
    // Almacenar los datos del usuario
    $_SESSION['usuarioValidadoI'] = $resultado_cliente->fetch_assoc();
    // El usuario es un cliente
    echo "¡Datos validados cliente!";

}else{
    $sql_administrador = "SELECT * FROM administrador WHERE correo_administrador = '$usuario' AND contrasena_administrador = '$contrasena'";
    $resultado_administrador = mysqli_query($conn, $sql_administrador);
    if (mysqli_num_rows($resultado_administrador) > 0) {
        // El usuario es un administrador
        echo "¡Datos validados Admin!";
    }else{
        $sql_tecnico = "SELECT * FROM tecnico WHERE correo_tecnico = '$usuario' AND contrasena_tecnico = '$contrasena'";
        $resultado_tecnico = mysqli_query($conn, $sql_tecnico);

        if (mysqli_num_rows($resultado_tecnico) > 0) { 
            // Limpiamos la variable
            unset($_SESSION['usuarioValidadoII']); 
            // Almacenar los datos del usuario
            $_SESSION['usuarioValidadoII'] = $resultado_tecnico->fetch_assoc();
            // El usuario es un tecnico
            echo "¡Datos validados tecnico!";
        
        }else{
            echo "¡Usuario o contraseña incorrectos!";
        }
    }
}

$conn->close();
?>
