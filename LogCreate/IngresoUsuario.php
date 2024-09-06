<?php
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

$sql_cliente = "SELECT * FROM cliente WHERE correo_usuario = '$usuario' AND contraseña_usuario = '$contrasena'";

$resultado_cliente = mysqli_query($conn, $sql_cliente);
if (mysqli_num_rows($resultado_cliente) > 0) {
    // El usuario es un cliente
    echo "¡Datos validados cliente!";
}else{
    $sql_administrador = "SELECT * FROM administrador WHERE correo_administrador = '$usuario' AND contraseña_administrador = '$contrasena'";
    $resultado_administrador = mysqli_query($conn, $sql_administrador);
    if (mysqli_num_rows($resultado_administrador) > 0) {
        // El usuario es un administrador
        echo "¡Datos validados Admin!";
    }else{
        echo "¡Usuario o contraseña incorrectos!";
    }
}


// $result = $conn->query($sql);

// if ($result->num_rows > 0) {
//     // Las credenciales son correctas
//     $row = $result->fetch_assoc();
//     $tipo_usuario = $row['type_rol'];

//     // Redirigir según el tipo de usuario
//     if ($tipo_usuario === 'CLIENTE') {
//         // header("Location: ../DashboardUsuario/MisServicios/MServicios.php");
//         echo "¡Datos validados cliente!";
//     } elseif ($tipo_usuario === 'ADMINISTRADOR') {
//         // header("Location: ../Dashboard/MeinMenu.html");
//         echo "¡Datos validados Admin!";
//     } else {
//         // Si el tipo de usuario no está definido correctamente, mostrar un mensaje de error
//         echo "¡Error! Tipo de usuario no válido";
//     }
// } else {
//     // Las credenciales son incorrectas, mostrar un mensaje de error
//     echo "¡Usuario o contraseña incorrectos!";
// }

$conn->close();
?>
