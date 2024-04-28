<template>
    <div class="notes-container">
        <h1 class="title">Mis Notas</h1>
        <div class="user-email">{{ userStore.userData?.email }}</div>
        <div class="add-form-container">
            <AddFormComponent @addNote="handleSubmit"></AddFormComponent>
        </div>
        <p v-if="databaseStore.loadingDoc">Cargando notas...</p>
        <div class="notes-list-container">
            <NotesListComponent></NotesListComponent>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../../store/user';
import { userDatabaseStore } from '../../store/database';
import AddFormComponent from '../../components/Notes/AddFormComponent.vue';
import NotesListComponent from '../../components/Notes/NotesListComponent.vue';

const userStore = useUserStore();
const databaseStore = userDatabaseStore();


</script>

<style scoped>
body {
    background: linear-gradient(135deg, #ece9e6 0%, #ffffff 100%);
}

.notes-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.15);
}

.title {
    font-size: 2.5em;
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}

.user-email {
    text-align: center;
    color: #555;
    margin-bottom: 30px;
}

.add-form-container,
.notes-list-container {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(128, 127, 127, 0.1), 0 6px 6px rgba(145, 143, 143, 0.13);
    margin-bottom: 20px;
}
</style>