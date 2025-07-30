## Pasos para levantar el proyecto en tu entorno local.

### Base de Datos (PostgreSQL)

1.  Ejecuta el script SQL para crear y poblar la base de datos:
    ```bash
    agenda_clinica-PG.sql
    ```
---

### Backend (Java/Spring Boot)

1.  Navega al directorio del backend en tu terminal.
2.  Limpia e instala las dependencias del proyecto:
    ```bash
    mvn clean install
    ```
3.  Ejecuta la aplicación principal:
    ```bash
    java -jar target/AgendaClinicaApiRestApplication.jar
    ```
    O si estás usando un IDE, ejecuta el archivo `src/main/java/com/agenda/clinica/agendaclinica_apirest/AgendaClinicaApiRestApplication.java`.

---

### Frontend (React)
1.  Navega al directorio del frontend en tu terminal.
2.  Instala las dependencias del proyecto:
    ```bash
    npm install
    ```
3.  Crea un archivo `.env` en el directorio raíz del frontend. (Aquí deberías especificar qué variables de entorno necesita el frontend, por ejemplo, la URL del backend).
    *Ejemplo de `.env`:*
    ```
    VITE_API_URL=http://localhost:8080/api
    ```
4.  Inicia la aplicación en modo desarrollo:
    ```bash
    npm run dev
    ```

---
