

// ####################################################################################################
// ################################### ENVIAR DATOS GT A PHP ##########################################
// ####################################################################################################


document.addEventListener('DOMContentLoaded', function() {

    const idservicio = document.getElementById('idservicio');

    const cliente = document.getElementById('cliente');
    const equipo = document.getElementById('equipo');
    const direccion = document.getElementById('direccion');
    const tecnico = document.getElementById('tecnico');
    const lugar = document.getElementById('lugar');
    const estado = document.getElementById('estado');
    

    idservicio.addEventListener('input', function() {
        const idserviciov = idservicio.value;

        // Verifica que el input no esté vacío
        if (idserviciov.length > 0) {
            
            fetch('detalleS.php?idservicio=' + encodeURIComponent(idserviciov))
            
                .then(response => {
                    
                    // Verifica si la respuesta es correcta
                    if (!response.ok) {
                        
                        throw new Error('Network response was not ok');
                        
                    }
                    
                    return response.json();

                })
                
                .then(data => {
                    
                    if (data.success) {
                        // Si el usuario es encontrado, actualiza los campos con la información del cliente
                        cliente.value = data.nombre_cliente || '';
                        equipo.value = data.tipo_equipo || '';
                        direccion.value = data.direccion_servicio || '';
                        tecnico.value = data.nombre_tecnico || '';
                        lugar.value = data.destino_servicio || '';
                        estado.value = data.estado_servicio || '';
                        
                    } else {
                        // Si el cliente no es encontrado, muestra un mensaje en los campos

                        cliente.value = 'Dato usuario no encontrado...';
                        equipo.value = 'Dato usuario no encontrado...';
                        direccion.value = 'Dato usuario no encontrado...';
                        tecnico.value = 'Dato usuario no encontrado...';
                        lugar.value = 'Dato usuario no encontrado...';
                        estado.value = 'Dato usuario no encontrado...';
                    }
                })
                .catch(error => {
                    // Maneja errores de red o errores JSON
                    console.error('Error:', error.message); // Muestra el mensaje de error
                });
        } else {
            // Limpia los campos si el input está vacío

            cliente.value = '';
            equipo.value = '';
            direccion.value = '';
            tecnico.value = '';
            lugar.value = '';
            estado.value = '';
            
        }
    });
});




// ####################################################################################################
// ################################### MOSTRAR IMG DETALLE S ##########################################
// ####################################################################################################


document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar imágenes desde el servidor
    function loadImages(serviceId) {
        fetch(`get_images.php?idservicio=${serviceId}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('image-container');
                container.innerHTML = '';

                // Verifica si la respuesta contiene un mensaje o un array de imágenes
                if (data.message) {
                    // Si hay un mensaje, muéstralo
                    const noImagesMessage = document.createElement('p');
                    noImagesMessage.textContent = data.message;
                    container.appendChild(noImagesMessage);
                } else {
                    // Si no hay mensaje, se asume que es un array de imágenes
                    data.forEach(imagePath => {
                        const img = document.createElement('img');
                        img.src = imagePath;
                        img.alt = 'Imagen del servicio';
                        img.style.width = '200px';
                        img.style.margin = '10px';
                        img.classList.add('click'); // Agrega la clase aquí

                        // Agrega el manejador de eventos para el clic
                        img.addEventListener('click', function() {
                            // Verifica si la imagen ya tiene la clase 'clicked'
                            if (img.classList.contains('clicked')) {
                                // Si la imagen ya tiene la clase 'clicked', la elimina
                                img.classList.remove('clicked');
                            } else {
                                // Si la imagen no tiene la clase 'clicked', la añade
                                // Elimina la clase 'clicked' de todas las imágenes
                                document.querySelectorAll('#image-container img').forEach(img => {
                                    img.classList.remove('clicked');
                                });
                                // Añade la clase 'clicked' a la imagen que fue clickeada
                                img.classList.add('clicked');
                            }
                        });

                        container.appendChild(img);
                    });
                }
            })
            .catch(error => console.error('Error al cargar imágenes:', error));
    }

    // Manejar el clic del botón
    document.getElementById('buscarDatos').addEventListener('click', function() {
        const serviceId = document.getElementById('idservicio').value;
        if (serviceId) {
            loadImages(serviceId); // Llamar a la función para cargar las imágenes
        }
    });
});
