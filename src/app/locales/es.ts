import { LocaleMessageObject } from "vue-i18n";

const es: LocaleMessageObject = {
  appName: "SymaSchool",
  language: {
    fr: "Francés",
    en: "Inglés",
    es: "Español",
  },
  navBar:{
    home: "Pagina principal",
    dashboard: "Tablero",
    login: "Conectarse",
    signout: "Desconectarse",
    editAccount: "Gestionar su cuenta SymaSchool",
    mail: "Mail",
    cloud: "Cloud",
    test: "Test",
  },
  homePage: {
    title: "Bienvenido a  ",
    enter: "Entrar",
  },
  loginPage: {
    title: "Conectarse",
    form: {
      username: "Nombre de usuario",
      password: "Contraseña",
      loginBtn: "Conectarse",
      forgotPasswordLink: "¿Contraseña olvidada?",
    },
  },
  dashboardPage: {
    title: "Tablero",
    search: "Busqueda (nombre, apellido...)",
    addUser: "Nuevo Usuario",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Suprimir",
    confirmDelete: "¿Esta seguro de querer suprimir este usuario?",
    dataTable: {
      lastname: "Apellido",
      firstname: "Nombre",
      email: "Correo Electrónico",
      username: "Nombre de usuario",
      roles: "Rôles",
      action: "Acción",
    },
  },
  newUserPage: {
    title: "Perfil :",
    avatar: "Modificar Avatar",
    return: "Regresar",
    form : {
      lastname: "Apellido",
      firstname: "Nombre",
      email: "Correo Electrónico",
      username: "Nombre de usuario",
      password: "Contraseña",
      roles: "Rôles",
      validation: "Validar",
    },
  },
  roles: {
    administrator: "Administrador",
    teacher: "Profesor",
    student: "Alumno",
  },
}

export default es;