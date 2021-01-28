import { LocaleMessageObject } from "vue-i18n";

const en: LocaleMessageObject = {
  appName: "SymaSchool",
  language: {
    fr: "French",
    en: "English",
    es: "Spanish",
  },
  navBar:{
    home: "Home",
    dashboard: "Dashboard",
    login: "Sign in",
    signout: "Sign out",
    editAccount: "Manage your SymaSchool Account",
    mail: "Mail",
    cloud: "Cloud",
    test: "Test",
  },
  homePage: {
    title: "Welcome to ",
    enter: "Enter",
  },
  loginPage: {
    title: "Sign in",
    form: {
      username: "Username",
      password: "Password",
      loginBtn: "Sign In",
      forgotPasswordLink: "Forgot your password ?",
    },
  },
  dashboardPage: {
    title: "Dashboard",
    search: "Search (last name, first name...)",
    addUser: "New User",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    confirmDelete: "Do you want to delete this user ?",
    dataTable: {
      lastname: "Last Name",
      firstname: "First Name",
      email: "Email",
      username: "Username",
      roles: "Roles",
      action: "Action",
    },
  },
  newUserPage: {
    title: "Profile :",
    avatar: "Change Avatar",
    return: "Return",
    form : {
      lastname: "Last Name",
      firstname: "First Name",
      email: "Email",
      username: "Username",
      password: "Password",
      roles: "Roles",
      validation: "Confirm",
    },
  },
  roles: {
    administrator: "Administrator",
    teacher: "Teacher",
    student: "Student",
  },
}

export default en;