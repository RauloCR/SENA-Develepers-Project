<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Usuario</title>
    <link rel="stylesheet" href="./StyleGU.css">
    <script src="https://kit.fontawesome.com/a66f4a03a0.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
</head>

<body>
    <section>
        <div class="contenedor-nav">

            <div class="head">

                <div class="menu">
                    <ul>
                        <li class="dropdown">
                            <a href="#" class="icon icon-here">Admin</a>
                            <div class="dropdown-content">
                                <a class="icon-here-two" href="#">Registrar Usuario</a>
                                <a href="../MeinMenu.html">Reportes</a>
                            </div>
                        </li>
    
                        <li class="dropdown">
                            <a href="#" class="icon">Buscar</a>
                            <div class="dropdown-content">
                                <a href="../BusquedaP/BusquedaP.html">Busqueda personal</a>
                            </div>
                        </li>
    
                        <li class="dropdown">
                            <a href="#" class="icon">Asistencia</a>
                            <div class="dropdown-content">
                                <a href="../RGServicios/RGServicios.html">Registro General de Servicios</a>
                                <a href="../RServicio/RServicio.html">Registro servicio</a>
                                <a href="../AServicio/AServicio.html">Asignar servicio</a>
                            </div>
                        </li>
    
                        <li class="dropdown">
                            <a href="#" class="icon">Detalle de servicio</a>
                            <div class="dropdown-content">
                                <a href="../GenerarDTS/">Generar DTS</a>
                                <a href="../GenerarA/GenerarA.html">Generar Alarma</a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="icon">Notificaciones</a>
                            <div class="dropdown-content">
                                <a href="../ConsultarN/ConsultarN.html">Consultar Notificacion</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <nav>
                    <ul>
                        <li><a href="#"><i class="fa-solid fa-bars"></i>Menu</a></li>
                        <li><a href="../../Index.html"><i class="fa-solid fa-right-from-bracket"></i>Log out</a></li>
                    </ul>
                </nav>
            </div>


            <!--  SECTION LINEAS -->

            <div class="line-two"></div>

            <div class="tile-one">
                <h2>REGISTRO USUARIO</h2>
            </div>

            <div class="line"></div>

            <!-- INPUT DE INGRESO DE DATOS -->

            <div class="container-principal">
                <div class="container5">
                    <form action="./conexionRgUsuario.php" method="post" id="miFormulario">
                        <div class="user-details">
 
                            <div class="input-one">
                                <div class="input-box-two">
                                    <span for="nombreUsuario" class="details">NOMBRE</span>
                                    <input id="nombreUsuario" name="nombreUsuario" type="text" placeholder="Nombres" required>
                                </div>

    
                                <div class="input-box-two">
                                    <span for="telefonoUsuario" class="details">CELULAR</span>
                                    <input id="telefonoUsuario" name="telefonoUsuario" type="text" placeholder="3### ### ###  " required>
                                </div>
    
                                <div class="input-box-two">
                                    <span for="direccionUsuario" class="details">DIRECCIÓN</span>
                                    <input id="direccionUsuario" name="direccionUsuario" type="text" placeholder="Carrera 1 Calle 11 - 11" required>
                                </div>
    
                                <div class="input-box-two">
                                    <span for="correoUsuario" class="details">EMAIL</span>
                                    <input id="correoUsuario" name="correoUsuario" type="text" placeholder="ejemplo@hotmail.com" required>
                                </div>
                                <div class="input-box-two">
                                    <span for="cedulaUsuario" class="details">CEDULA</span>
                                    <input id="cedulaUsuario" name="cedulaUsuario" type="text" placeholder="Digite..." required>
                                </div>

                                <div class="input-box-two">
                                    <span for="contrasenaUsuario" class="details">PASSWORD</span>
                                    <input id="contrasenaUsuario" name="contrasenaUsuario" type="text" placeholder="Digite..." required>
                                </div>
                            </div>

                            <div class="input-two">

                            <div class="input-one">
                                <div class="input-box-four">
                                    <span for="apellidoUsuario" class="details">APELLIDO</span>
                                    <input id="apellidoUsuario" name="apellidoUsuario" type="text" placeholder="Apellidos" required>
                                </div>
                            </div>

                            <div class="input-box">
                                <span for="rolSelect" class="details">ROL</span>
                                <div class="combo-box">
                                    <!-- Combo box con dos columnas -->
                                    <select required id="rolSelect" name="rolSelect">
                                        <option value="" disabled selected >Seleccione...</option>
                                        <!-- Opción 1 -->
                                        <option value="Administrador">Administrador</option>
                                        <!-- Opción 2 -->
                                        <option value="Auxiliar o tecnico">Auxiliar o tecnico</option>
                                        <!-- Opción 3 -->
                                        <option value="Cliente">Cliente</option>
                                    </select>
                                </div>

                            </div>

                            <div class="title-tree">
                                <h2>Busqueda</h2>
                            </div>

                            <div class="line-tree"></div>

                            <div class="children-input-box">
                                <div class="input-box-tree">
                                    <span class="details">FECHA INICIAL</span>
                                    <input type="date" placeholder="dd/mm/aaaa">
                                </div>
    
                                <div class="input-box-tree">
                                    <span class="details details-two">FECHA FINAL</span>
                                    <input type="date" placeholder="Digite...">
                                </div>
                            </div>

                            <div class="input-box">
                                <span class="details">ID USER</span>
                                <input id="usuarioFiltrado" type="text" placeholder="Digite...">
                            </div>
                            
                            
                            </div>

                        </div>
                        </form>
                    
                    <div class="item">
                        <img src="../../images/logo PNG.png" alt="team-work">
                    </div>
                </div>
            </div>

            <div class="left-icon-container">
                <div class="container">
                    <div class="left-icon">
                        <div class="icon-options">
                            <i id="enviarFormulario" class="fa-solid fa-user-plus agg-boton"></i>
                        </div>
                        <div class="icon-options" >
                            <i  class="fa-solid fa-floppy-disk grd-boton"></i>
                        </div>
                        <div class="icon-options">
                            <img id="filtro" src="../../ICON/file-magnifying-glass.svg" alt="">
                        </div>
                        <div class="icon-options">
                            <i id="idDeleteUser" class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                    <div class="right-icon">
                        <i id="copiarExcel" class="fa-solid fa-right-from-bracket"></i>
                    </div>
                    
                </div>
            </div>
   
            
            <!------MEIN-CONTENT-TABLE----------->

            <div class="main-content">
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-wrapper">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr class="title-name">
                                        <th class="name-table">ID USER</th>
                                        <th id="filtro_Rol" class="name-table">ROL</th>
                                        <th id="filtro_nombre" class="name-table">NOMBRE</th>
                                        <th id="filtro_Email" class="name-table">E-MAIL</th>
                                        <th id="filtro_Fecha" class="name-table">FECHA REGISTRO<i class="fas fa-filter"></i></th>
                                        <th class="name-table">ESTADO</th>
                                    </tr>
                                </thead>

                                <tbody>
                                <?php
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

                                    // Consulta SQL para obtener los datos de la tabla usuarios
                                    $sql = "SELECT id_user, type_rol, name_user, email_user, address_user, status_user FROM usuario";
                                    $result = $conn->query($sql);

                                    // Comprobar si hay resultados
                                    if ($result->num_rows > 0) {
                                        // Iterar sobre los resultados y mostrar cada fila de datos
                                        while($row = $result->fetch_assoc()) {
                                            echo "<tr>";
                                            echo "<td>" . $row["id_user"] . "</td>";
                                            echo "<td>" . strtoupper($row["type_rol"]) . "</td>";
                                            echo "<td>" . strtoupper($row["name_user"]) . "</td>";
                                            echo "<td>" . strtoupper($row["email_user"]) . "</td>";
                                            echo "<td>" . strtoupper($row["address_user"]) . "</td>";
                                            echo "<td>" . strtoupper($row["status_user"]) . "</td>";
                                            echo "</tr>";
                                        }
                                    } else {
                                        echo "<tr><td colspan='6'>No se encontraron resultados</td></tr>";
                                    }
                                    $conn->close();
                                    ?>

                                    <!-- <th>001</th>
                                    <th>ADMINISTRADOR</th>
                                    <th>JOSE JOSE PEREZ PEREZ</th>
                                    <th>ejemploemail@gmail.com</th>
                                    <th>12/02/2023</th>
                                    <th class="name-table-two">ACTIVO<img src="../../ICON/pen-line.svg" alt="Icono SVG"><i class="fa-solid fa-ban"></i></th>
                                    </tr> -->
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
    <script src="./scripRU.js"></script>
</body>

</html>