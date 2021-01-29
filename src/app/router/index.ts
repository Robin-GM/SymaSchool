import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import { authGuard } from './guards/AuthGuard';

import Home from '@/app/views/Home.vue';
import LoginPage from '@/app/views/LoginPage.vue';
import ProfilePage from '@/app/views/ProfilePage.vue';
import NotFoundPage from '@/app/views/NotFoundPage.vue';
import UserSelectedProfilePage from '@/app/views/UserSelectedProfilePage.vue';
import CloudPage from '@/app/views/Cloud/CloudPage.vue';
import TestField from '@/app/views/TestField/TestFieldPage.vue';

import StudentTeacherDashboard from '@/app/views/StudentTeacherPages/StudentTeacherDashboard.vue'

import AdminDashboard from '@/app/views/AdminPages/AdminDashboard.vue';
import AdminNewUserPage from '@/app/views/AdminPages/NewUserPage.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [

  //---------COMMON ROOT----------//
  {
      path: '/',
      name: RouteNameConstants.HOME,
      component: Home,
  }, 
  {
      path: '/login',
      name: RouteNameConstants.LOGIN,
      component: LoginPage,
  },
  {
      path: '/profile',
      name : RouteNameConstants.PROFILE,
      component: ProfilePage
  },
  {
      path: '/not-found',
      name : RouteNameConstants.NOT_FOUND,
      component: NotFoundPage
  },
  {
    path: '/user-profile',
    name : RouteNameConstants.USER_PROFILE,
    component: UserSelectedProfilePage
  },
  {
    path: '/cloud-page',
    name: RouteNameConstants.CLOUD_PAGE,
    component: CloudPage
  },
  {
    path: '/test-field',
    name: RouteNameConstants.TEST_FIELD,
    component: TestField
  },

  //---------ELEVE & PROF ROOT----------//
  {
    path: '/common/dashboard',
    name : RouteNameConstants.ELEVE_PROF_DASHBOARD,
    component: StudentTeacherDashboard
  },

  //---------ADMIN ROOT----------//
  {
    path: '/admin/dashboard',
    name : RouteNameConstants.ADMIN_DASHBOARD,
    component: AdminDashboard
  },
  {
    path: '/admin/new-user',
    name : RouteNameConstants.ADMIN_NEW_USER,
    component: AdminNewUserPage
  },
];

export const router = new VueRouter({
  routes,
});

router.beforeEach(authGuard);
