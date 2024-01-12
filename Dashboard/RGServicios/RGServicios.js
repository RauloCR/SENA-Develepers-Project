// Evento para el combo-box---------------------------------

// document.addEventListener('DOMContentLoaded', function () {
//     var comboBox = document.querySelector('.combo-box select');

//     comboBox.addEventListener('change', function () {
//         comboBox.parentNode.classList.add('select-active');
//     });

// });

document.addEventListener('DOMContentLoaded', function () {
    var comboBoxes = document.querySelectorAll('.combo-box select');

    comboBoxes.forEach(function (comboBox) {
        comboBox.addEventListener('change', function () {
            comboBox.parentNode.classList.add('select-active');
        });
    });
});