<template>
  <a-layout class="layout">

    <a-layout>
      <!-- <SlideBar v-if="!userStore.loadingSession"></SlideBar> -->
      <a-layout-header class="" v-if="!userStore.loadingSession">
        <div class="logo" />
        <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" v-model:selectedKeys="selectedKeys">

          <a-menu-item v-if="userStore.userData" key="perfil">
            <router-link to="/Profile">Profile</router-link>
          </a-menu-item>

        </a-menu>
      </a-layout-header>
      <a-layout-content class="mt-5" style="padding: 0 50px">
        <div class="container">
          <LoadingComponent v-if="userStore.loadingUser" />
          <router-view v-else></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer class="layout-footer">

      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "../src/store/user";
import { useRoute } from "vue-router";
import LoadingComponent from "./components/Loading/LoadingComponent.vue";
import SlideBar from './components/SlideBar/SlideBar.vue';


const userStore = useUserStore();
const route = useRoute();

const selectedKeys = ref([]);

// console.log(route.name);
watch(
  () => route.name,
  () => {
    selectedKeys.value = [route.name];
  }
);
</script>

<style>
.container {
  background-color: #fff;
  padding: 24px;
  min-height: calc(100vh - 64px);
}

.text-center {
  text-align: center;
}
</style>