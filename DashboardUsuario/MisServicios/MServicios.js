 // SCRIP DE LOS COMBO-BOX PLACEHOLDER

document.addEventListener('DOMContentLoaded', function () {
    var comboBoxes = document.querySelectorAll('.combo-box select');

    comboBoxes.forEach(function (comboBox) {
        comboBox.addEventListener('change', function () {
            comboBox.parentNode.classList.add('select-active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var comboBoxesTwo = document.querySelectorAll('.combo-box-two select');

    comboBoxesTwo.forEach(function (comboBox) {
        comboBox.addEventListener('change', function () {
            comboBox.parentNode.classList.add('select-active');
        });
    });
});

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

// EVENTO PARA LOS BOTONES -CIRCLE-

    document.addEventListener('DOMContentLoaded', function () {
        // Obtén todos los elementos con la clase 'fa-circle'
        var circleIcons = document.querySelectorAll('.fa-regular.fa-circle');

        // Agrega un evento de clic a cada elemento
        circleIcons.forEach(function (circleIcon) {
            circleIcon.addEventListener('click', function () {
                // Cambia el icono de círculo a un chulito cuando se hace clic
                if (this.classList.contains('fa-circle')) {
                    this.classList.remove('fa-circle');
                    this.classList.add('fa-check-circle');
                    this.classList.add('fa-solid')
                } else {
                    // Si ya es un chulito, cambia de nuevo a círculo
                    this.classList.remove('fa-check-circle');
                    this.classList.remove('fa-solid')
                    this.classList.add('fa-circle');
                }
            });
        });
    });


    // VALORACION ESTRELLAS

    let selectedStars = 0;

    function rateStar(star) {
      selectedStars = star;
      for (let i = 1; i <= 5; i++) {
        const starElement = document.querySelector(`#rating-stars .star:nth-child(${i})`);
        starElement.classList.toggle('active', i <= selectedStars);
      }
    }
  
    function submitComment() {
      const commentText = document.getElementById('comment').value;
      if (selectedStars === 0 || commentText.trim() === '') {
        alert('Por favor, selecciona una valoración y escribe un comentario.');
      } else {
        alert(`Valoración: ${selectedStars}`);
        document.getElementById('comment').value = ''; 
        // Limpiar el campo de comentarios
        // reiniciar las estrellas a su estado inicial.
        selectedStars = 0;
        rateStar(selectedStars);
      }
    }
  


