<?php
header('Content-Type: application/json');
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "DevelopersProject";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}  



function poblarTabla(){
    global $conn;
    // Consulta SQL para obtener los datos de la tabla usuarios
    $sql = "SELECT id_servicio, tipo_equipo, estado_servicio, createTime_servicio FROM servicio";
    $result = $conn->query($sql);

    // Comprobar si hay resultados
    if ($result->num_rows > 0) {
        $data = array();
        // Iterar sobre los resultados y agregar cada fila de datos al array
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        // Devolver los datos en formato JSON
        echo json_encode($data);
    } else {
        echo json_encode(array('error' => 'No se encontraron resultados'));
    }

}




// *******************************************************************************************
// *************************************** BUSCAR DATOS **************************************
// *******************************************************************************************

function obtenerServicioPorID() {
    
    // Conexión a la base de datos
    global $conn;

    if ($_SERVER["REQUEST_METHOD"] == "GET") {

        

        if (isset($_GET['servicio']) || isset($_GET['estadoS'])) {
            
            $id_servicio = $_GET['servicio'];
            $estadoS = strtoupper(trim($_GET['estadoS'] ?? '')); 
            
            // Consulta SQL para obtener un solo usuario por su ID
        $sql = "SELECT id_servicio, tipo_equipo, estado_servicio, createTime_servicio FROM servicio WHERE 1=1";
        $params = [];

        // Agregar condiciones solo si los parámetros tienen valor
        if (!empty($id_servicio)) {  
            $sql .= " AND id_servicio = ?";
            $params[] = $id_servicio;
        }
        if (!empty($estadoS)) {
            $sql .= " AND estado_servicio = ?";
            $params[] = $estadoS;
        }

        // Preparar la consulta
        $stmt = $conn->prepare($sql);

        // Verifica si la preparación de la consulta fue exitosa
        if (!$stmt) {
            echo json_encode(array('error' => 'Error en la preparación de la consulta: ' . $mysqli->error));
            exit;
        }

        // Vincular los parámetros si hay alguno
        if ($params) {
            $types = str_repeat('s', count($params)); // Tipo de datos (s para string)
            $stmt->bind_param($types, ...$params);
        }

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener el resultado
        $result = $stmt->get_result();

        // Inicializar un array para almacenar los datos
        $data = array();

        // Recuperar los resultados
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Comprobar si se encontraron resultados
        if (!empty($data)) {
            // Enviar los datos en formato JSON
            echo json_encode($data);
        } else {
            // Enviar mensaje de error en formato JSON
            echo json_encode(array('error' => 'No se encontraron resultados'));
        }

        // Cerrar la consulta y la conexión
        $stmt->close();

        

       }



        
    }
}



// *******************************************************************************************
// *************************************** BORRAR DATOS **************************************
// *******************************************************************************************

function borrar_Datos(){
    global $conn;
    // Verificar si la solicitud es de tipo POST y si se ha enviado un ID de usuario
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['servicioE'])) {
        // Obtener el ID del usuario desde el formulario
        $id_servicio = $_POST['servicioE'];

        // Consulta SQL para obtener la información del usuario
        $sql_select = "SELECT * FROM servicio WHERE id_servicio = '$id_servicio'";
        $result = $conn->query($sql_select);

        if ($result->num_rows > 0) {
            // Mostrar la información del usuario y un mensaje de confirmación
            $servicio = $result->fetch_assoc();

            $sql_delete = "DELETE FROM servicio WHERE id_servicio = '$id_servicio'";
            if ($conn->query($sql_delete) === TRUE) {
                echo "¡El servicio ha sido borrado exitosamente!";
            } else {
                echo "¡Ocurrió un error al intentar borrar al servicio! " . $conn->error;
            }

        } else {
            echo "¡No se encontró ningún serivicio con el ID proporcionado!";
        }
    } 
}




  
// *******************************************************************************************
// ************************************** RECIBIR ACCION *************************************
// *******************************************************************************************


if(isset($_GET['accion'])){
    // Obtener el valor de la acción
    $accion = $_GET['accion'];

    // Realizar alguna acción basada en el valor de $accion
    switch($accion) {
        case 'poblar':
            // Lógica para procesar el formulario
            poblarTabla();
            break;
        case 'enviar':
            // Lógica para procesar el envío del formulario
            insetar_Datos();
            break;
        case 'buscar':
            // Lógica para buscar el formulario
            obtenerServicioPorID();
            break;
        case 'borrar':
            // Lógica para borrar el formulario
            borrar_Datos();
            break;
        default:
            // Acción no reconocida
            break;
    }
}

$conn->close();
?>
