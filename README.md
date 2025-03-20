# CRUD con React y LoopBack + MySQL

Este proyecto es una aplicación web que utiliza **React** para el frontend y **LoopBack 4** como backend, conectado a una base de datos **MySQL**. Se ha desarrollado un CRUD completo (Crear, Leer, Actualizar y Eliminar) mediante una **API REST** en el puerto `3000`.

## Tecnologías utilizadas
- **Frontend:** React  
- **Backend:** LoopBack 4  
- **Base de Datos:** MySQL  
- **API REST:** Desplegada en `http://localhost:3000`

## Instalación y configuración  

### Backend (LoopBack + MySQL)  
1. Asegúrate de tener **LoopBack 4** instalado y configurado con una base de datos **MySQL**.  
   En este caso, la base de datos utilizada se llama **`usuario_crud`** y la tabla principal es **`usuarios`**.  
2. Para ejecutar el backend de LoopBack, usa el siguiente comando en la terminal:  

```bash
npm start
```

3:Una vez iniciado La API REST estará disponible en: **`http://localhost:3000/`**  



### Frontend (React)  
1. Luego de haber iniciado el backend y confirmado que la API REST está en funcionamiento, puedes ejecutar el frontend de React con:


```bash
npm start
```
2. La aplicacion estará disponible en: **`http://localhost:3001/`**, ya que React por defecto usa el puerto 3000, pero se ha cambiado en la configuración del archivo .env para evitar conflictos con el backend.

---

##  LA FUNCIONALIDAD DE ESTE CRUD  ES :
**Crear** nuevos registros en la base de datos  
 **Leer** datos desde la API REST  
 **Actualizar** información de los registros  
 **Eliminar** datos de forma segura  

---

