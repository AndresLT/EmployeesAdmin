# EmployeesAdmin

Este proyecto se llama EmployeesAdmin. Es una aplicación web para la administración de empleados. Cuenta con un sistema de inicio de sesión multiusuarios con diferentes roles y permisos. Está desarrollada con Angular v17 y con algunas librerias adicionales como CryptoJS, Angular Material, Bootstrap, Sweetalert.

## Pasos para su ejecución

#### Clonar proyecto

```bash
  git clone https://github.com/AndresLT/EmployeesAdmin.git
```
#### Ejecución
Para la ejecución de este proyecto es posible realizarlo con la ayuda de Visual Studio o directamente desde la terminal del sistema operativo que se esté usando. 

Para esto debemos dirigirnos a la carpeta principal del proyecto que se llama "EmployeesAdmin", estando ahí abriremos una terminal y ejecutamos el comando para instalar las dependencias de angular:
```bash
  npm install
  ó
  npm install -force
```
Una vez finalizado este procedimiento se debe ejecutar la aplicación con el siguiente comando:
```bash
  ng serve
```
Una vez finalizada la compilación del proyecto este podrá ser visualizado desde nuestro navegador en la siguiente url:
```bash
  http://localhost:4200/
```
Una vez ejecutado correctamente el proyecto se podrá visualizar una ventana para iniciar sesión, cambiar contraseña y registrarse. Si se desea iniciar sesión sin registrarse existen unos usuarios por defecto:
```bash
  ADMINISTRADOR
  usuario: alozano
  contraseña: 1234
  ó
  EMPLEADO
  usuario: klozano
  contraseña: 1234
```
Es importante tener en cuenta que el usuario administrador tiene acceso al módulo de administración mientras que el empleado no.

Una vez inicies sesión, ya sea con un usuario que tu mismo registres o con uno de los que vienen por defecto, tendrás acceso a un modulo para ver la información de tu perfil junto con dos funcionalidades, una para cambiar tu puesto de trabajo y otra para abandonar la compañía. Por otro lado, el modulo de administración permitirá manipular los datos de los usuarios registrados y crear nuevos.

Esta aplicación usa el LocalStorage del Navegador como metodo para almacenar datos, razón por la cual se realizó su encriptación para mayor seguridad de los datos.

Se desarrollaron algunas características adicionales como Guards, Pipes, Modelos, LazyLoading. Se realizó la instalación de una fuente para los textos (Quicksand) y la estructura o arquitectura que se usó para la organización del proyecto fue la separación del código fuente en 3 cartepas principales, Core, Features y Shared.

## Tech Stack

**Cliente:** Angular 17

**UI:** Angular Material, Sweetalert, Bootstrap

**Seguridad:** CryptoJS

**Unit Tests:** Jasmine, Karma

