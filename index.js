
// Manejar el evento click del botón de envia

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnenviar").addEventListener("click", function(event) {
    
        var inp = document.getElementById('EnvTex').value;
    
        if (inp !== '') {
            event.preventDefault();    
            
        document.getElementById('resultado').innerHTML = 'Estimado/a usuario, <br><br>'+
                                                         'Agradezco sinceramente su contacto con nosotros. Su interés es muy valioso para la compañia. Nos comprometemos a responderle en breve y proporcionarle la información que necesita.<br><br>' +
                                                         '\nAtentamente,<br>'+
                                                         '\nDeveloper`s <br>';
            abrirVentana()
            
        }else{
            alert('¡Favor ingresar toda la información!')
        }
        
    });
})


// -------------------------------------VENTANA FLOTANTE-----------------------------------------

function abrirVentana() {
    document.getElementById("popup").style.display = "block";
}

function cerrarVentana() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "./Index.html";
}