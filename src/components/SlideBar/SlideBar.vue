<template>
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item style="" @click="navigateTo('/dashboard')" class="menu-item" key="1">
                <LucideVueNext.LayoutDashboard />
            </a-menu-item>
            <!-- Agrega más a-menu-item aquí según sea necesario -->
        </a-menu>
    </a-layout-sider>
</template>

<script setup>
import * as LucideVueNext from 'lucide-vue-next';
import { useRouter } from "vue-router";
import { ref } from 'vue';

const collapsed = ref(false);
const selectedKeys = ref(['1']); // Asegúrate de que la clave seleccionada coincida con la clave del ítem por defecto
const router = useRouter();

// Función para navegar
function navigateTo(route) {
    router.push(route);
}
</script>

<style scoped>
/* Estilos existentes */
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    /* Ajusta según el tamaño de tu logo */
}

.a-layout-sider,
.a-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Nuevos estilos para centrar íconos */
.menu-item {
    display: flex;
    justify-content: center;
    /* Centra horizontalmente */
    align-items: center;
    /* Centra verticalmente */
}

.menu-item .lucide-icon {
    margin-right: 8px;
    /* Espaciado opcional a la derecha del ícono, ajusta según sea necesario */
}

/* Ajustes adicionales para cuando el sider está colapsado */
.a-layout-sider-collapsed .menu-item {
    justify-content: center;
    /* Asegura que el contenido esté centrado incluso cuando está colapsado */
}

.a-layout-sider-collapsed .menu-item .lucide-icon {
    margin: 0;
    /* Elimina el margen cuando el sider está colapsado para mantener el ícono centrado */
}
</style>
