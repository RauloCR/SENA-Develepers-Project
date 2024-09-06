

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
    if ($_SERVER["REQUEST_METHOD"] == "GET") {

        
    $equipoFiltrado = $_GET['equipoFiltrado'];
    
    // Consulta SQL para verificar las credenciales
    $sql = "SELECT * FROM servicio WHERE tipo_equipo = '$equipoFiltrado'";
    
    $result = $conn->query($sql);

    if ($result && $result->num_rows === 1) {
      
        // Consulta SQL para obtener los datos de la tabla usuarios
        $sql = "SELECT correo_servicio, tipo_equipo, destino_servicio, createTime_servicio, estado_servicio FROM servicio WHERE tipo_equipo = '$equipoFiltrado'";
        $result = $conn->query($sql);

        // Comprobar si hay resultados
        if ($result->num_rows > 0) {
            $data = array();
            // Iterar sobre los resultados y agregar cada fila de datos al array
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            // Devolver los datos en formato JSON
            // header('Content-Type: application/json');
            // JSON_UNESCAPED_UNICODE para manejar caracteres con tilde correctamente
            // echo json_encode($data, JSON_UNESCAPED_UNICODE); 
            // Devolver los datos en formato JSON
            echo json_encode($data);

        } else {
            echo json_encode(array('error' => 'No se encontraron resultados'));
        }
    
    } else {
      // La consulta no devolvió ninguna fila o más de una fila, lo que indica que los datos son incorrectos
    //   echo "¡No se encontro ningun servicio!";      
      echo json_encode(array('error' => 'No se encontraron resultados'));
    }
  

}

// Cerrar conexión
$conn->close();
?>


