import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./store/user";
import { userDatabaseStore } from "./store/database";

import DashBoard from "./pages/Dashboard/DashBoard.vue";
import Login from "./pages/Login/LoginView.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession = false;
};

const redireccion = async (to, from, next) => {
  const databaseStore = userDatabaseStore();
  const userStore = useUserStore();
  userStore.loadingSession = true;
  console.log(to.params.pathMatch[0]);
  const name = await databaseStore.getUrl(to.params.pathMatch[0]);
  if (!name) {
    next();
    userStore.loadingSession = false;
  } else {
    window.location.href = name;
    userStore.loadingSession = true;
    next();
  }
};

const routes = [
  {
    path: "/dashboard",
    component: DashBoard,
    // beforeEnter: requireAuth,
    name: "dashboard",
  },
  { path: "/login", component: Login, name: "login" },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
