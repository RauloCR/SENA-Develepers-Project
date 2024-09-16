
<?php
// Iniciar sesión
session_start();

// Configuración
$uploadDir = 'uploads/'; // Directorio donde se guardarán las imágenes

// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "DevelopersProject";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Crea la carpeta si no existe
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Obtener los datos del usuario validado
$usuarioi = $_SESSION['usuarioValidadoI'];
$userIdentificacioni = $usuarioi['id_cliente'];

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $direccion = strtoupper($_POST['direccion']);
    $mantenimiento = strtoupper($_POST['mantenimiento']);
    $celular = $_POST['celular'];
    $lugar = strtoupper($_POST['lugar']);
    $email = $_POST['email'];   
    $comentario = strtoupper($_POST['comment']);
    $estado = strtoupper('PENDIENTE');
    
    // Preparar y ejecutar la consulta SQL para insertar los datos en la tabla 'servicio'
    if (!empty($_POST['equipo'])) {
        $equipo = strtoupper(trim($_POST['equipo']));
    } else {
        $equipo = strtoupper($_POST['equipo-select']);
    }

    $sql = "INSERT INTO servicio (tipo_equipo, direccion_servicio, tipo_servicio, telefono_servicio, destino_servicio, correo_servicio, estado_servicio, id_cliente, comentario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssis", $equipo, $direccion, $mantenimiento, $celular, $lugar, $email, $estado, $userIdentificacioni, $comentario);
    
    if ($stmt->execute()) {
        $serviceId = $stmt->insert_id; // Obtener el ID del servicio recién insertado
        
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
                    $stmt = $conn->prepare("INSERT INTO images (client_id, service_id, file_path) VALUES (?, ?, ?)");
                    $stmt->bind_param("iis", $userIdentificacioni, $serviceId, $targetFilePath);
                    
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
        
        echo "Datos almacenados correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $stmt->close();
}

$conn->close();
?>

