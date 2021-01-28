import { LocaleMessageObject } from "vue-i18n";

const fr: LocaleMessageObject = {
  appName: "SymaSchool",
  language: {
    fr: "Français",
    en: "Anglais",
    es: "Espagnol",
  },
  navBar:{
    home: "Accueil",
    dashboard: "Tableau de bord",
    login: "Se connecter",
    signout: "Déconnexion",
    editAccount: "Gérez votre Compte SymaSchool",
    mail: "Mail",
    cloud: "Cloud",
    test: "Test",
  },
  homePage: {
    title: "Bienvenue sur ",
    enter: "Entrer",
  },
  loginPage: {
    title: "Se connecter",
    form: {
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      loginBtn: "Connexion",
      forgotPasswordLink: "Mot de passe oublié ?",
    },
  },
  dashboardPage: {
    title: "Tableau de bord",
    search: "Rechercher (nom, prénom...)",
    addUser: "Nouvel Utilisateur",
    save: "Sauvegarder",
    cancel: "Annuler",
    delete: "Supprimer",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
    dataTable: {
      lastname: "Nom",
      firstname: "Prénom",
      email: "Email",
      username: "Nom d'utilisateur",
      roles: "Rôles",
      action: "Action",
    },
  },
  newUserPage: {
    title: "Profil :",
    avatar: "Modifier Avatar",
    return: "Retour",
    form : {
      lastname: "Nom",
      firstname: "Prénom",
      email: "Email",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      roles: "Rôles",
      validation: "Valider",
    },
  },
  roles: {
    administrator: "Administrateur",
    teacher: "Professeur",
    student: "Élève",
  },
}

export default fr;