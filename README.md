# Sistema Prestamo Libro

TBD

## Requisitos

Tener instalado Node.js en el computador con una version igual o superior a la 16.13.0

## Tutorial para arrancar

1. Clone el repo

   ```bash
   git clone https://github.com/your-username/your-project.git
   ```

2. Dirigete al projecto

    ```bash
    cd prisma/
    ```

3. Instalar dependencias

    ```bash
    npm install
    ```

## Configurar Base de Datos

4. Crear y aplicar migraciones

    ```bash
    npx prisma migrate dev
    ```

5. Llenar la base de datos con datos de prueba

    ```bash
    node seed/seed.js
    ```

## Ejecutar el projecto

```bash
    npm start
```

El servidor empezara a ejecutarse en http://localhost:3000.

## Endpoints

1. Listar todos los libros

```bash
    GET /api/books/
```

1. Listar todos los clientes

```bash
    GET /api/clients/
```

1. Listar todos los prestamos

```bash
    GET /api/loans/
```