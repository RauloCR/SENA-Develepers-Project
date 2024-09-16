-- ***********************************************************************
-- ***********************************************************************
-- **	Solucion XAAMP no conecta MySQL				        **
-- ** 								        **
-- **	netstat -nao|findstr 0.0:3306				        **
-- **								        **
-- **	taskkill /pid 8148 /f					        **
-- **							 	        **
-- ***********************************************************************
-- ***********************************************************************

-- ------http://localhost/phpmyadmin/

-- ------CREAR BASE DE DATOS-------

CREATE DATABASE IF NOT EXISTS DevelopersProject CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE DevelopersProject;

-- ------CREAR TABLAS-------


-- ***************************************************************************************************************************************************
-- ***************************************************************************************************************************************************
-- ***************************************************************************************************************************************************


CREATE TABLE usuarios (
   id_usuario INT(10) AUTO_INCREMENT PRIMARY KEY,
   tipo_rol VARCHAR(30),
   tipo_cedula VARCHAR(30),
   nombre_usuario VARCHAR(50),	
   apellido_usuario VARCHAR(50),
   cedula_usuario BIGINT,	
   telefono_usuario BIGINT,
   direccion_usuario VARCHAR(50),
   correo_usuario VARCHAR(50),
   contrasena_usuario VARCHAR(20),
   createTime_usuario TIMESTAMP,
   estado_usuario VARCHAR(20)
);

INSERT INTO usuarios (tipo_rol, tipo_cedula, nombre_usuario, apellido_usuario, cedula_usuario, telefono_usuario, direccion_usuario, correo_usuario, contrasena_usuario, createTime_usuario, estado_usuario) 
VALUES 

('ADMINISTRADOR', 'CEDULA DE CIUDADANIA', 'CRISTIAN', 'MUNOZ', '10293929381', '314123456', 'AV. PRINCIPAL, EDIF. CENTRAL', 'cristian.munoz@developers.com', '123', '2024-05-10 08:20:10', 'ACTIVO'),
('TECNICO', 'CEDULA DE CIUDADANIA', 'JUAN', 'PEREZ', '1009283821', '310123456', 'CALLE PRINCIPAL 123', 'juan.perez@developers.com', '123', '2024-06-10 08:20:10', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'JUAN', 'RENDON', '2917267192', '123456789', 'CALLE 5 N 4 - 23', 'juanrendon@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'MARIA', 'LOPEZ', '1830137642', '987654321', 'AVENIDA 456', 'maria@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('TECNICO', 'CEDULA DE CIUDADANIA', 'PEDRO', 'RODRÍGUEZ', '10038239238', '311345678', 'PLAZA MAYOR 789', 'pedro.rodriguez@developers.com', '123', '2023-02-07 15:30:04', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'PEDRO', 'GARCIA', '1357924682', '987123654', 'PLAZA 789', 'pedro@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'ANA', 'MARTINEZ', '19837173234', '321654987', 'CALLE 10 N 1 - 5', 'anamartinez@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'CARLOS', 'RODIGUEZ', '1283774913', '987321654', 'AVENIDA 890', 'carlos@gmail.com', '123', '2024-05-01 12:00:00', 'INACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'LAURA', 'HERNANDEZ', '246801357', '159357246', 'CALLE 4 - 246', 'laura@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'MIGUEL', 'SANCHEZ', '678901234', '456789012', 'AVENIDA 78', 'miguel@gamil.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'SPFIA', 'GOMEZ', '1289361449', '654321098', 'PLAZA 012', 'sofia@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'DIEGO', 'PEREZ', '987012345', '789456123', 'CALLE 901', 'diego@example.com', '123', '2024-05-01 12:00:00', 'INACTIVO'),
('TECNICO', 'CEDULA DE CIUDADANIA', 'CARLOS', 'SÁNCHEZ', '1002837294', '31456789', 'PASEO PRINCIPAL 234', 'carlos.sanchez@developers.com', '123', '2024-01-30 20:10:06', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'LUCIA', 'DIAZ', '543210987', '210987654', 'AVENIDA 234', 'lucia@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'DAYANA', 'HERNANDEZ', '19764986767', '83783913', 'CALLE 236', 'dayana@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'CRISTRIAN', 'MOLINA', '481739128', '193819391', 'AVENIDA 289', 'cristian@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'KARLA', 'MENDEZ', '937194719', '312934828', 'PLAZA 120', 'karla@hotmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('ADMINISTRADOR', 'CEDULA DE CIUDADANIA', 'SOFIA', 'BECERRA', '10239284999', '312123456', 'CALLE SECUNDARIA, TORRE B', 'sofia.becerra@developers.com', '123', '2024-06-30 15:20:10', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'ALBERTO', 'ROJAS', '1755866823', '391481290', 'CALLE 300', 'alberto@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'VALENTINA', 'MORA', '128351831', '319710482', 'AVENIDA 23', 'valentina@example.com', '123', '2024-05-01 12:00:00', 'ACTIVO');



CREATE TABLE tecnico (
   id_tecnico INT(10) AUTO_INCREMENT PRIMARY KEY,
   tipo_rol VARCHAR(30),
   tipo_cedula VARCHAR(30),
   nombre_tecnico VARCHAR(50),	
   apellido_tecnico VARCHAR(50),
   cedula_tecnico BIGINT,
   telefono_tecnico BIGINT,
   direccion_tecnico VARCHAR(50),
   correo_tecnico VARCHAR(50),
   contrasena_tecnico VARCHAR(20),
   createTime_tecnico TIMESTAMP,
   estado_tecnico VARCHAR(20)
);


INSERT INTO tecnico (tipo_rol, tipo_cedula, nombre_tecnico, apellido_tecnico, cedula_tecnico, telefono_tecnico, direccion_tecnico, correo_tecnico, contrasena_tecnico, createTime_tecnico, estado_tecnico) 
VALUES 
('TECNICO', 'CEDULA DE CIUDADANIA', 'JUAN', 'PEREZ', '1009283821', '310123456', 'CALLE PRINCIPAL 123', 'juan.perez@developers.com', '123', '2024-06-10 08:20:10', 'ACTIVO'),
('TECNICO', 'CEDULA DE CIUDADANIA', 'PEDRO', 'RODRÍGUEZ', '10038239238', '311345678', 'PLAZA MAYOR 789', 'pedro.rodriguez@developers.com', '123', '2023-02-07 15:30:04', 'ACTIVO'),
('TECNICO', 'CEDULA DE CIUDADANIA', 'CARLOS', 'SÁNCHEZ', '1002837294', '31456789', 'PASEO PRINCIPAL 234', 'carlos.sanchez@developers.com', '123', '2024-01-30 20:10:06', 'ACTIVO');



CREATE TABLE administrador (
   id_administrador INT(10) AUTO_INCREMENT PRIMARY KEY,
   tipo_rol VARCHAR(30),
   tipo_cedula VARCHAR(30),
   nombre_administrador VARCHAR(50),
   apellido_administrador VARCHAR(50),   
   cedula_administrador BIGINT,
   telefono_administrador BIGINT,
   direccion_administrador VARCHAR(50),
   correo_administrador VARCHAR(50),
   contrasena_administrador VARCHAR(20),
   createTime_administrador TIMESTAMP,
   estado_administrador VARCHAR(30)
);

INSERT INTO administrador (tipo_rol, tipo_cedula, nombre_administrador, apellido_administrador, cedula_administrador, telefono_administrador, direccion_administrador, correo_administrador, contrasena_administrador, createTime_administrador, estado_administrador) 
VALUES 
('ADMINISTRADOR', 'CEDULA DE CIUDADANIA', 'CRISTIAN', 'MUNOZ', '10293929381', '314123456', 'AV. PRINCIPAL, EDIF. CENTRAL', 'cristian.munoz@developers.com', '123', '2024-05-10 08:20:10', 'ACTIVO'),
('ADMINISTRADOR', 'CEDULA DE CIUDADANIA', 'SOFIA', 'BECERRA', '10239284999', '312123456', 'CALLE SECUNDARIA, TORRE B', 'sofia.becerra@developers.com', '123', '2024-06-30 15:20:10', 'ACTIVO');



CREATE TABLE cliente(
   id_cliente INT(10) AUTO_INCREMENT PRIMARY KEY,
   tipo_rol VARCHAR(30),
   tipo_cedula VARCHAR(30),
   nombre_cliente VARCHAR(50),	
   apellido_cliente VARCHAR(50),
   cedula_cliente BIGINT,
   telefono_cliente BIGINT,
   direccion_cliente VARCHAR(50),
   correo_cliente VARCHAR(50),
   contrasena_cliente VARCHAR(20),
   createTime_cliente TIMESTAMP,
   estado_cliente VARCHAR(20)
);

INSERT INTO cliente (tipo_rol, tipo_cedula, nombre_cliente, apellido_cliente, cedula_cliente, telefono_cliente, direccion_cliente, correo_cliente, contrasena_cliente, createTime_cliente, estado_cliente) 
VALUES 
('CLIENTE', 'CEDULA DE CIUDADANIA', 'JUAN', 'RENDON', '2917267192', '123456789', 'CALLE 5 N 4 - 23', 'juanrendon@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'MARIA', 'LOPEZ', '1830137642', '987654321', 'AVENIDA 456', 'maria@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'PEDRO', 'GARCIA', '1357924682', '987123654', 'PLAZA 789', 'pedro@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'ANA', 'MARTINEZ', '19837173234', '321654987', 'CALLE 10 N 1 - 5', 'anamartinez@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'CARLOS', 'RODIGUEZ', '1283774913', '987321654', 'AVENIDA 890', 'carlos@gmail.com', '123', '2024-05-01 12:00:00', 'INACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'LAURA', 'HERNANDEZ', '246801357', '159357246', 'CALLE 4 - 246', 'laura@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'MIGUEL', 'SANCHEZ', '678901234', '456789012', 'AVENIDA 78', 'miguel@gamil.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'SPFIA', 'GOMEZ', '1289361449', '654321098', 'PLAZA 012', 'sofia@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'DIEGO', 'PEREZ', '987012345', '789456123', 'CALLE 901', 'diego@example.com', '123', '2024-05-01 12:00:00', 'INACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'LUCIA', 'DIAZ', '543210987', '210987654', 'AVENIDA 234', 'lucia@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'DAYANA', 'HERNANDEZ', '19764986767', '83783913', 'CALLE 236', 'dayana@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'CRISTRIAN', 'MOLINA', '481739128', '193819391', 'AVENIDA 289', 'cristian@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'KARLA', 'MENDEZ', '937194719', '312934828', 'PLAZA 120', 'karla@hotmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'ALBERTO', 'ROJAS', '1755866823', '391481290', 'CALLE 300', 'alberto@gmail.com', '123', '2024-05-01 12:00:00', 'ACTIVO'),
('CLIENTE', 'CEDULA DE CIUDADANIA', 'VALENTINA', 'MORA', '128351831', '319710482', 'AVENIDA 23', 'valentina@example.com', '123', '2024-05-01 12:00:00', 'ACTIVO');



CREATE TABLE servicio (
   id_servicio INT(10) AUTO_INCREMENT PRIMARY KEY,
   tipo_equipo VARCHAR(30),
   tipo_servicio VARCHAR(30),
   estado_servicio VARCHAR(30),
   createTime_servicio TIMESTAMP,
   tiempo_alarma DATE,
   destino_servicio VARCHAR(20),
   direccion_servicio VARCHAR(50),
   telefono_servicio BIGINT,
   correo_servicio VARCHAR(100),
   id_cliente INT(10),
   id_tecnico INT(10),
   comentario VARCHAR(300),
   comentarioT VARCHAR(300)
);


INSERT INTO servicio (tipo_equipo, tipo_servicio, estado_servicio, createTime_servicio, tiempo_alarma, destino_servicio, direccion_servicio, telefono_servicio, correo_servicio, id_cliente, id_tecnico, comentario, comentarioT) 
VALUES 
('NEVERA', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'CALLE 5 N 4 - 23', '31928392838', 'juanrendon@gmail.com', '1', '1', 'REPARACION', 'SE COMPLRETO'),
('CELULAR', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'AVENIDA 456', '31928392838', 'juanrendon@gmail.com', '1', '1', 'MANTENIMIENTO', 'SE COMPLRETO'),
('TELEVISOR', 'CORRECTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'PLAZA 789', '31928392838', 'juanrendon@gmail.com', '1', '3', 'REPARACION', 'SE COMPLRETO'),
('ESTUFA', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'CALLE 10 N 1 - 5', '311828191931', 'maria@gmail.com', '2', '1', 'MANTENIMIENTO', 'SE COMPLRETO'),
('HORNO', 'CORRECTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'LOCAL', 'OFICINA CENTRAL', '311828191931', 'maria@gmail.com', '2', '1', 'REPARACION', 'SE COMPLRETO'),
('VENTILADOR', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'CALLE 4 - 246', '311828191931', 'maria@gmail.com', '2', '1', 'MANTENIMIENTO', 'SE COMPLRETO'),
('NEVERA', 'CORRECTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'AVENIDA 78', '31810218101', 'pedro@gmail.com', '3', '2', 'REPARACION', 'SE COMPLRETO'),
('HORNO MICROHONDA', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'PLAZA 012', '31810218101', 'pedro@gmail.com', '3', '1', 'MANTENIMIENTO', 'SE COMPLRETO'),
('COMPUTADOR', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'LOCAL', 'OFICINA CENTRAL', '31810218101', 'pedro@gmail.com', '3', '3', 'MANTENIMIENTO', 'SE COMPLRETO'),
('PORTATIL', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'AVENIDA 234', '31231131331', 'anamartinez@gmail.com', '4', '1', 'MANTENIMIENTO', 'SE COMPLRETO'),
('HORNO', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'LOCAL', 'OFICINA CENTRAL', '31231131331', 'anamartinez@gmail.com', '4', '2', 'MANTENIMIENTO', 'SE COMPLRETO'),
('CALEFAXION', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'LOCAL', 'OFICINA CENTRAL', '31231131331', 'anamartinez@gmail.com', '4', '2', 'MANTENIMIENTO', 'SE COMPLRETO'),
('ESTUFA', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'PLAZA 120', '3181283711', 'carlos@gmail.com', '5', '3', 'MANTENIMIENTO', 'SE COMPLRETO'),
('LAVADORA', 'PREVENTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'CALLE 300', '3181283711', 'carlos@gmail.com', '5', '2', 'MANTENIMIENTO', 'SE COMPLRETO'),
('HORNO', 'CORRECTIVO', 'ASIGNADO', '2024-05-01 12:00:00', '2025-05-01', 'DOMICILIO', 'AVENIDA 23', '3181283711', 'carlos@gmail.com', '5', '3', 'REPARACION', 'SE COMPLRETO');



CREATE TABLE detalleServicio (
   id_detalleServicio INT(10) AUTO_INCREMENT PRIMARY KEY,
   createTime_detalleServicio TIMESTAMP,
   tiempo_alarma DATE,
   calificacion_servicio INT(20),
   observacion_servicio VARCHAR(1000),
   comentarioT VARCHAR (1000),
   id_servicio INT(10),
   id_cliente INT(10),
   id_tecnico INT(10)
);



CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    service_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_pathT VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



