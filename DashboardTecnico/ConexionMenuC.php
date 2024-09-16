
<?php

// Iniciar sesión
session_start();

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

    // Obtener los datos del usuario validado
    $usuarioi = $_SESSION['usuarioValidadoII'];

    // traemos el campo 'id_usuario' de la tabla 'cliente'
    $userIdentificacioni = $usuarioi['id_tecnico']; 

    global $conn;
    // Consulta SQL para obtener los datos de la tabla usuarios
    $sql = "SELECT s.id_servicio, s.tipo_equipo, s.destino_servicio, s.direccion_servicio, s.createTime_servicio, s.estado_servicio, CONCAT(c.nombre_cliente, ' ', c.apellido_cliente) AS nombreC_cliente, CONCAT(t.nombre_tecnico, ' ', t.apellido_tecnico) AS nombreC_tecnico FROM servicio s JOIN cliente c ON s.id_cliente = c.id_cliente JOIN tecnico t ON s.id_tecnico = t.id_tecnico WHERE t.id_tecnico = $userIdentificacioni";
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

    // Obtener los datos del usuario validado
    $usuarioi = $_SESSION['usuarioValidadoII'];

    // traemos el campo 'id_usuario' de la tabla 'cliente'
    $userIdentificacioni = $usuarioi['id_tecnico']; 

    if ($_SERVER["REQUEST_METHOD"] == "GET") {

        

        if (isset($_GET['idServicio']) && !empty($_GET['idServicio'])) {
            $id_servicio = $_GET['idServicio'];
            
            // Consulta SQL para obtener un solo usuario por su ID
        $sql = "SELECT s.id_servicio, s.tipo_equipo, s.destino_servicio, s.direccion_servicio, s.createTime_servicio, s.estado_servicio, CONCAT(c.nombre_cliente, ' ', c.apellido_cliente) AS nombreC_cliente, CONCAT(t.nombre_tecnico, ' ', t.apellido_tecnico) AS nombreC_tecnico FROM servicio s JOIN cliente c ON s.id_cliente = c.id_cliente JOIN tecnico t ON s.id_tecnico = t.id_tecnico WHERE s.id_servicio = $id_servicio AND t.id_tecnico = $userIdentificacioni";
        
        $result = $conn->query($sql);
    
        // Comprobar si hay resultados
        if ($result && $result->num_rows === 1) {
                
            $data = array();
            // Iterar sobre los resultados y agregar cada fila de datos al array
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
        }elseif($result->num_rows === 0){
            echo json_encode(array('error' => 'No se encontraron resultados'));
        }
        
    } else {
            if (isset($_GET['estadoB']) && !empty($_GET['estadoB'])) {
                
                $estado = strtoupper($_GET['estadoB']);
    
                $sqltwo = "SELECT s.id_servicio, s.tipo_equipo, s.destino_servicio, s.direccion_servicio, s.createTime_servicio, s.estado_servicio, CONCAT(c.nombre_cliente, ' ', c.apellido_cliente) AS nombreC_cliente, CONCAT(t.nombre_tecnico, ' ', t.apellido_tecnico) AS nombreC_tecnico FROM servicio s JOIN cliente c ON s.id_cliente = c.id_cliente JOIN tecnico t ON s.id_tecnico = t.id_tecnico WHERE s.estado_servicio = '$estado' AND t.id_tecnico = $userIdentificacioni";
    
                $resultt = $conn->query($sqltwo);
    
                // Comprobar si hay resultados
                if ($resultt->num_rows > 0) {
                        
                    $data = array();
                    // Iterar sobre los resultados y agregar cada fila de datos al array
                    while($row = $resultt->fetch_assoc()) {
                        $data[] = $row;
                    }
    
                    echo json_encode($data);
    
                } else {
                    echo json_encode(array('error' => 'No se encontraron resultados'));
                }
    
            } else {
                echo json_encode(array('error' => 'No se encontraron resultados'));
                
            }
        }



        
    }
}



  // *******************************************************************************************
  // ************************************** INSERTAR DATOS *************************************
  // *******************************************************************************************
    
  function insertar_Datos(){
    global $conn;

    // Configuración
    $uploadDir = 'uploads/'; // Directorio donde se guardarán las imágenes

    // Crea la carpeta si no existe
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Obtener los datos del formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $id_servicio = $_POST['id_serv'];
        $estado = strtoupper($_POST['estado']);
        $comentarioT = $_POST['comment'];

        // Preparar y ejecutar la consulta SQL para actualizar los datos en la tabla 'servicio'
        $sql = "UPDATE servicio SET estado_servicio = ?, comentarioT = ? WHERE id_servicio = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $estado, $comentarioT, $id_servicio);

        if ($stmt->execute()) {
            echo "Datos actualizados correctamente";

            // Verificar que se ha subido al menos un archivo
            if (isset($_FILES['images'])) {
                $files = $_FILES['images'];
                $numFiles = count($files['name']);

                // Iterar sobre cada archivo subido
                for ($i = 0; $i < $numFiles; $i++) {
                    $fileName = basename($files['name'][$i]);
                    $fileTmpName = $files['tmp_name'][$i];
                    $fileType = $files['type'][$i];
                    $fileError = $files['error'][$i];
                    $fileSize = $files['size'][$i];
                    
                    // Verificar errores
                    if ($fileError !== UPLOAD_ERR_OK) {
                        echo "Error al subir el archivo $fileName.";
                        continue;
                    }
                    
                    // Mover el archivo al directorio de destino
                    $targetFilePath = $uploadDir . $fileName;
                    if (move_uploaded_file($fileTmpName, $targetFilePath)) {
                        // Guardar información en la base de datos
                        $stmt = $conn->prepare("INSERT INTO images (service_id, file_pathT) VALUES (?, ?)");
                        $stmt->bind_param("is", $id_servicio, $targetFilePath);
                        
                        if (!$stmt->execute()) {
                            echo "Error al guardar la información de la imagen $fileName en la base de datos.";
                        }
                    } else {
                        echo "Error al mover el archivo $fileName.";
                    }
                }
            } else {
                echo "No se han enviado imágenes.";
            }
            
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $stmt->close();
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
        case 'actualizar':
            // Lógica para procesar el envío del formulario
            insertar_Datos();
            break;
        case 'buscar':
            // Lógica para buscar el formulario
            obtenerServicioPorID();
            break;
        default:
            // Acción no reconocida
            break;
    }
}

$conn->close();
?>
