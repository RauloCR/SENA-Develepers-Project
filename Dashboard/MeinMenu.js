    // SCRIP DE LA FECHA PLACEHOLDER

    document.addEventListener('DOMContentLoaded', function() {
        var dateInputs = document.querySelectorAll('input[type="date"]');

        dateInputs.forEach(function(input) {
            input.addEventListener('input', function() {
                // Cambiar el color del texto cuando se selecciona una fecha
                if (input.value) {
                    input.style.color = 'black';
                } else {
                    input.style.color = 'gray';
                }
            });

            // Restaurar el color del texto cuando se recarga la página (si hay una fecha preseleccionada)
            if (input.value) {
                input.style.color = 'black';
            }
        });
    });
