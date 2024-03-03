<template>
  <a-layout class="layout">
    <SlideBar></SlideBar>
    <a-layout>
      <a-layout-header class="layout-header">
        <div class="logo" />
        <a-menu theme="dark" mode="horizontal" class="menu-horizontal">
        </a-menu>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <div class="mt-10 container">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer class="layout-footer">

      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import SlideBar from './components/SlideBar/SlideBar.vue';
</script>

<style>
:root {
  --color-footer-bg: #002d40;
  /* Color de fondo del footer */
  --color-content-bg: #f0f2f5;
  /* Color de fondo del contenido */
  --text-color: #fff;
  /* Color del texto */
}


.container {
  background-color: var(--color-content-bg);
  padding: 24px;
  min-height: calc(100vh - 64px);
}

.layout-footer {
  text-align: center;
  background-color: var(--color-footer-bg);
  color: var(--text-color);
}
</style>
