<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitar Servicios</title>
    <link rel="stylesheet" href="./SServicio.css">
    <script src="https://kit.fontawesome.com/a66f4a03a0.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
</head>

<body>
    <section>
        <div class="contenedor-nav">

            <div class="head">
                <div class="menu-i">
                    <div class="item">
                        <img src="../../images/logo PNG.png" alt="team-work">
                    </div>
                    <div class="menu">
                        <ul>
                            <li class="dropdown">
                                <a href="../MisServicios/MServicios.html" >Mis Servicios</a>
                            </li>
        
                            <li class="dropdown">
                                <a href="#" class="icon-here">Solicitar Servicio</a>
                            </li>
        
                        </ul>
                    </div>
                </div>
                
                <nav>
                    <ul>
                        <li><a href="#"><i class="fa-solid fa-bars"></i>Menu</a></li>
                        <li><a href="../../Index.html"><i class="fa-solid fa-right-from-bracket"></i>Log out</a></li>
                    </ul>
                </nav>
            </div>

            <!-- Otra seccion -->
            
            

            <div class="line-two"></div>

            <div class="tile-one">
                <h2>SOLICITAR SERVICIOS</h2>
            </div>

            <div class="line"></div>

            <!-- SECTION INPUTS -->


            <!-- INPUT DE INGRESO DE DATOS -->

            
            <div class="container-principal">
                <div class="container5">
                    <form action="./conexionSServicio.php" method="post" id="miFormulario">
                        <div class="user-details">
                            
                            <!-- SEGUNDA FILA INPUT -->

                            <div class="user-details">

                                <div class="input-box">
                                    <span for="equipo" class="details">EQUIPO</span>
                                    <div class="combo-box">
                                        <!-- Combo box con dos columnas -->
                                        <select id="equipo" name="equipo">
                                        <option value="" disabled selected >Seleccione...</option>
                                        <!-- Opción 1 -->
                                        <option value="LAVADORA">LAVADORA</option>
                                        <!-- Opción 2 -->
                                        <option value="HORNO MICROHONDA">HORNO MICROHONDA</option>
                                        <!-- Opción 3 -->
                                        <option value=" NEVERA">NEVERA</option>
                                        <!-- Opción 4 -->
                                        <option value="TV">TV</option>
                                        <!-- Opción 5 -->
                                        <option value="EQUIPO">EQUIPO</option>
                                        <!-- Opción 5 -->
                                        <option value="REFRIGERADOR">REFRIGERADOR</option>
                                        <!-- Opción 5 -->
                                        <option value="ESTUFA">ESTUFA</option>
                                        <!-- Opción 5 -->
                                        <option value="CAFETERA">CAFETERA</option>
                                        <!-- Opción 5 -->
                                        <option value="LAVADORA">LICUADORA</option>
                                        <!-- Opción 5 -->
                                        <option value="ASPIRADORA">ASPIRADORA</option>
                                        <!-- Opción 5 -->
                                        <option value="FREIDORA ELECTRICA">FREIDORA ELECTRICA</option>
                                        <!-- Opción 5 -->
                                        <option value="VENTILADOR">VENTILADOR</option>
                                        <!-- Opción 5 -->
                                        <option value="AIRE ACONDICIONADO">AIRE ACONDICIONADO</option>
                                        <!-- Opción 5 -->
                                        <option value="CALENTADOR">CALENTADOR DE AGUA</option>
                                        <!-- oPCION & -->
                                        <option value="OTRO">OTRO...</option>

                                        </select>
                                    </div>
                                </div>

                                <div class="input-box">
                                    <span for="direccion" class="details">DIRECCION</span>
                                    <input type="text" placeholder="Dígite..." required id="direccion" name="direccion">
                                </div>
    
                            </div>

                            
                            <!-- SEGUNDA FILA INPUT -->

                            <div class="user-details">

                                <div class="input-box">
                                    <span for="mantenimiento" class="details">MANTENIMIENTO</span>
                                    <div class="combo-box-two">
                                        <!-- Combo box con dos columnas -->
                                        <select required id="mantenimiento" name="mantenimiento">
                                        <option value="" disabled selected >Seleccione...</option>
                                        <!-- Opción 1 -->
                                        <option value="PREVENTIVO">PREVENTIVO</option>
                                        <!-- Opción 2 -->
                                        <option value="CORRECTIVO">CORRECTIVO</option>
                                        
                                        </select> 
                                        <i id="exclamation-icon" class="fa-solid fa-triangle-exclamation"></i>
                                    <div class="note">Prevéntivo: mantenimiento realizado para evitar y prevenir futuras fallas.<br><br>Correctivo: mantenimiento realizado para reparar y corregir fallas detectadas</div>
                                    </div>
                                </div>

                                <div class="input-box">
                                    <span for="celular" class="details">CELULAR</span>
                                    <input type="text" placeholder="Dígite..." required id="celular" name="celular">
                                </div>
    
                            </div>

                            <!-- TERCERA FILA INPUT -->

                            <div class="user-details">
                                <div class="input-box">
                                    <span for="lugar" class="details">LUGAR</span>
                                    <div class="combo-box">
                                        <!-- Combo box con dos columnas -->
                                        <select id="lugar" name="lugar">
                                        <option value="" disabled selected >Seleccione...</option>
                                        <<option value="DOMICILIO">DOMICILIO</option>
                                        <!-- Opción 2 -->
                                        <option value="LOCAL">LOCAL</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <!-- CUARTA FILA INPUT -->

                            <div class="user-details">

                                <div class="input-box">
                                    <span for="email" class="details">E-MAIL</span>
                                    <input type="text" placeholder="ejemplo@gmail.com" required id="email" name="email">
                                </div>

                            </div>

                        </div>
                    </form>
                    
                </div>
            </div>


            <!-- ICONOS -->
            <div class="left-icon-container">
                <div class="container">
                    <div class="left-icon-two">

                        <div class="icon-options">
                            <i class="fa-solid fa-circle-plus button-agg" id="enviarFormulario"></i>
                        </div>

                        <div class="icon-options" id="guardar-dt">
                            <i class="fa-solid fa-floppy-disk"></i>
                        </div>
                    </div>
                    
                </div>
            </div>


            <!------main-content-start----------->

            <div class="main-content">
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-wrapper">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr class="title-name">
                                        <th class="name-table">NOMBRE</th>
                                        <th class="name-table">EQUIPO</th>
                                        <th class="name-table">LUGAR</th>
                                        <th class="name-table">DIRECCION</th>
                                        <th class="name-table">CELULAR</th>
                                        <th class="name-table">FECHA REGISTRO<i class="fas fa-filter"></i></th>
                                        
                                        
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
                                    $sql = "SELECT type_machine, address_place, type_service, phone_service, destination_place, email_service, createTime_service from servicio";
                                    $result = $conn->query($sql);

                                    // Comprobar si hay resultados
                                    if ($result->num_rows > 0) {
                                        // Iterar sobre los resultados y mostrar cada fila de datos
                                        while($row = $result->fetch_assoc()) {
                                            echo "<tr>";
                                            echo "<td>" . "NAME" . "</td>";
                                            echo "<td>" . strtoupper($row["type_machine"]) . "</td>";
                                            echo "<td>" . strtoupper($row["destination_place"]) . "</td>";
                                            echo "<td>" . strtoupper($row["address_place"]) . "</td>";
                                            echo "<td>" . strtoupper($row["phone_service"]) . "</td>";
                                            echo "<td>" . strtoupper($row["createTime_service"]) . "</td>";
                                            echo "</tr>";
                                        }
                                    } else {
                                        echo "<tr><td colspan='6'>No se encontraron resultados</td></tr>";
                                    }
                                    $conn->close();
                                    ?>
                                    
                                    <!-- <tr>
                                        <th>JOSE JOSE PEREZ PEREZ</th>
                                        <th>LAVADORA</th>
                                        <th>DOMICILIO</th>
                                        <th>CALL 30 CRA 12-45</th>
                                        <th>322 222 2222</th>
                                        <th>23/12/2023</th>
                                    </tr>
                                    <tr>
                                        <th>JOSE JOSE PEREZ PEREZ</th>
                                        <th>NEVERA</th>
                                        <th>DOMICILIO</th>
                                        <th>TV 87 DGG7-34</th>
                                        <th>322 222 2222</th>
                                        <th>23/12/2023</th>
                                    </tr>
                                    <tr>
                                        <th>JOSE JOSE PEREZ PEREZ</th>
                                        <th>HORNO MICROHONDA</th>
                                        <th>LOCAL</th>
                                        <th>CALL 4 CRA 1-65</th>
                                        <th>322 222 2222</th>
                                        <th>23/12/2023</th>
                                    </tr>
                                    <tr>
                                        <th>JOSE JOSE PEREZ PEREZ</th>
                                        <th>PC</th>
                                        <th>DOMICILIO</th>
                                        <th>AV 40 B87</th>
                                        <th>322 222 2222</th>
                                        <th>23/12/2023</th>
                                    </tr>
                                    <tr>
                                        <th>JOSE JOSE PEREZ PEREZ</th>
                                        <th>EQUIPO</th>
                                        <th>LOCAL</th>
                                        <th>CALL 30 CRA 12-45</th>
                                        <th>322 222 2222</th>
                                        <th>23/12/2023</th>
                                        
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
    <script src="../../LogCreate/LogingJS/JavaScript.js"></script>
    <script src="./SServicio.js"></script>

</body>

</html>





