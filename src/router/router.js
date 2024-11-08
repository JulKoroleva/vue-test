import { createRouter, createWebHistory } from "vue-router";
import FormPage from "../pages/form/FormPage.vue";
import PreviewPage from "../pages/preview/PreviewPage.vue";

const routes = [
  { path: "/", component: FormPage },
  { path: "/preview", component: PreviewPage },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
