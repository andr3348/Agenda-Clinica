DROP TABLE IF EXISTS paciente CASCADE;
DROP TABLE IF EXISTS doctor CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;
DROP TABLE IF EXISTS estado_cita CASCADE;
DROP TABLE IF EXISTS cita CASCADE;

CREATE TABLE paciente (
	id_paciente SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL, 	
	telefono VARCHAR(20),
	email VARCHAR(100)
);

CREATE TABLE doctor (
	id_doctor SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	especialidad VARCHAR(100)
);

-- usuario = Encargado/recepcionista, administrador
CREATE TABLE usuario (
	id_usuario SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	email VARCHAR(100),
	rol VARCHAR(50)
);

CREATE TABLE estado_cita (
	id_estado SERIAL PRIMARY KEY,
	nombre_estado VARCHAR(50) NOT NULL UNIQUE,
	color_hex VARCHAR(7) NOT NULL
);

CREATE TABLE cita (
	id_cita SERIAL PRIMARY KEY,
	fecha_inicio TIMESTAMP NOT NULL,
	fecha_fin TIMESTAMP NOT NULL,
	motivo VARCHAR(255),
	
	id_paciente INT NOT NULL REFERENCES paciente(id_paciente) ON DELETE CASCADE,
	id_doctor INT REFERENCES doctor(id_doctor) ON DELETE SET NULL,
	id_estado INT NOT NULL REFERENCES estado_cita(id_estado),
	id_encargado INT REFERENCES usuario(id_usuario) ON DELETE SET NULL,
	creado_en TIMESTAMP DEFAULT NOW()
);

-- Pacientes
INSERT INTO paciente (nombre, telefono, email) VALUES
	('Juan Pérez', '999888777', 'juan.perez@mail.com'),
	('María López', '111222333', 'maria.lopez@mail.com');

-- Doctores
INSERT INTO doctor (nombre, especialidad) VALUES
	('Dra. Ana García', 'Odontología'),
	('Dr. Luis Torres', 'Ortodoncia');

-- Usuarios encargados
INSERT INTO usuario (nombre, email, rol) VALUES
	('Lucía Encargada', 'lucia@clinic.com', 'Recepcionista'),
	('Carlos Admin', 'carlos@clinic.com', 'Administrador');

-- Estados de cita
INSERT INTO estado_cita (nombre_estado, color_hex) VALUES
	('Reservado', '#F97316'), -- Amarillo
	('Confirmado', '#059669'), -- Verde
	('En atención', '#2563EB'), -- Azul
	('No contesta', '#DC2626'); -- Rojo

-- Citas de prueba
INSERT INTO cita (fecha_inicio, fecha_fin, motivo, id_paciente, id_doctor, id_estado, id_encargado)
VALUES 
	(
		'2025-07-01 09:00:00',
		'2025-07-01 09:30:00',
		'Control general',
		1, -- Juan Pérez
		1, -- Dra. Ana
		1, -- Reservado
		NULL -- No confirmado aún
	),
	(
		'2025-07-01 10:00:00',
		'2025-07-01 10:30:00',
		'Revisión ortodoncia',
		2, -- María López
		2, -- Dr. Luis
		2, -- Confirmado
		1 -- Confirmada por Lucía
	),
	(
		'2025-07-01 11:00:00',
		'2025-07-01 11:30:00',
		'Limpieza dental',
		1, -- Juan Pérez
		1, -- Dra. Ana
		4, -- No contesta
		NULL
	),
	(
		'2025-07-04 07:00:00',
		'2025-07-04 08:00:00',
		'Operación de vesícula',
		2,
		2,
		1,
		2
	);

	SELECT * FROM doctor;
	UPDATE usuario SET rol='recepcionista'
	WHERE rol = 'Recepcionista';