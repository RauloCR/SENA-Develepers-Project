

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

  $observation_service = $_POST['comment'];
  $servicio = $_POST['idservicio'];
  // $calificacionE = ('5');
  $calificacionE = $_POST['rating'];

    
        $sql = "INSERT INTO detalleservicio (comentarioT, id_servicio, id_cliente, id_tecnico, calificacion_servicio, observacion_servicio)
                SELECT s.comentarioT, s.id_servicio, s.id_cliente, s.id_tecnico, $calificacionE, '$observation_service'
                FROM servicio s
                WHERE s.id_servicio = $servicio";

        if ($conn->query($sql) === TRUE) {
          echo "Servicio calificado correctamente.";
          } else {
              echo "Error: " . $result . "\\n" . $conn->error . " ";
          }

}

// Cerrar conexión
$conn->close();
?>


