# Lab2-practicaSupervisada
Laboratorio 2 de practica supervisada

AUTH: 
- /register  POST
  esta funcion nos sirve para poder registar un usuario nuevo todos los atributos necesario, el
  usuario podra registarse como rol de STUDENT_ROLE o TEACHER_ROLE, el body se rellena como form-data
- /login   POST
  esta funcion sirve para los poder logearse a los usuarios que ya estan registrados anteriormente, esta
  consulta el body se llena como tipo JSON

USER:
- /findUser    GET
  esta funcion sirve para que podamos buscar un usuario mediante su ID, 
- /        GET
  esta funcion sirve para poder litar todos los usuarios que ya esten registrados
- /deleteUser/:uid    DELETE
  esta funcion para poder eliminar un usario mediante su ID
- /updateUser/:uid       PUT
  esta funcion sirve para poder editar todos los campos de un usuario que proporcionaste mediante
  su ID, el body se rellena como form-data

COURSE: 
- /createCourse/:uid   POST
  en esta funcion sirve para poder crear un curso y el ID sirve para poder vefificar que la persona
  que lo quiere crear si sea un usuario con el rol de TEACHER, el body se llena con el tipo JSON
- /listCourse/:uid    GET
  esta funcion sirve para que los alumnos puedan ver cuales son los cursos que estan disponibles,
  y puedan ver su ID para que se asignen
- /assignCourse/:uid    POST
  esta funcion sirve para que los alumnos se puedan asignar a un curso, solicita el ID para poder ve-
  rificar que el usuario que se quiere inscribir sea un alumno, el body se llena con el tipo JSON
- /getCourseStudents/:uid    POST
  esta funcion  sirve para que el profesor pueda ver a los alumnos que estas incritos a su curso, le
  solicita el ID para verificar que la persona que esta haciendo la solicitud sea profesor, el body se llena con el tipo JSON
- /deleteCourse/:uid       DELETE
  Esta funcion sirve para que los profesrores puedan elimar algun curso, le solicita el ID para que se
  pueda verificar que el usuario que lo quiere eliminar es un profesor, el body se llena con el tipo JSON
 
