<template>
    <div class="loading-container">
        <div class="logo-container">
            <img src="../../assets/images/logo.png" alt="Logo" class="logo" />
        </div>
        <a-spin size="large" tip="Cargando...">
        </a-spin>
    </div>
</template>


<script setup>

</script>

<style lang="scss" scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; // Ajusta la altura del contenedor de carga al 100% de la altura de la ventana
}

.logo-container {
    margin-bottom: 20px; // Espacio entre el logo y el spinner

    .logo {
        width: 300px; // Ajusta según el tamaño deseado para tu logo
        animation: blinkAnimation 1.5s infinite; // Aplica la animación de parpadeo
    }
}

// Definición de la animación de parpadeo
@keyframes blinkAnimation {
    0% {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    50% {
        box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
}
</style>
