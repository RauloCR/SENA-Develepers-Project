// JS PARA LOS COMBOBOX

document.addEventListener('DOMContentLoaded', function () {
    var comboBoxes = document.querySelectorAll('.combo-box select');
    var comboBoxesTwo = document.querySelectorAll('.combo-box-two select');
    var comboBoxesThree = document.querySelectorAll('.combo-box-tree select');

    function addSelectActiveClass(comboBoxes) {
        comboBoxes.forEach(function (comboBox) {
            comboBox.addEventListener('change', function () {
                comboBox.parentNode.classList.add('select-active');
            });
        });
    }

    addSelectActiveClass(comboBoxes);
    addSelectActiveClass(comboBoxesTwo);
    addSelectActiveClass(comboBoxesThree);
});