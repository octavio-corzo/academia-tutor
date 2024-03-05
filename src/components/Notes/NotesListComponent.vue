<script setup>
import { userDatabaseStore } from "../../store/database";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const databaseStore = userDatabaseStore();
const router = useRouter();

const confirm = (id) => {
    console.log(id);
    databaseStore.deleteNote(id); // Cambiado de deleteUrl a deleteNote
    message.success("Eliminado");
};

const cancel = (e) => {
    console.log(e);
    message.error("No se eliminó");
};

const copiarPortapapeles = (note) => {
    console.log(note);
    if (!navigator.clipboard) {
        return message.error('No se pudo copiar la nota');
    }

    navigator.clipboard.writeText(note)
        .then(() => {
            message.success('Nota copiada al portapapeles');
        })
        .catch(err => {
            message.error('No se pudo copiar la nota al portapapeles', err);
        });
}


databaseStore.getNotes(); 
</script>

<template>
    <a-space direction="vertical" style="width: 100%" class="space-container">
        <a-card hoverable v-for="item of databaseStore.documents" :key="item.id" :title="`Título: ${item.name.title}`"
            class="note-card">
            <p>{{ item.name.note }}</p>
            <a-space class="button-group">
                <a-button type="primary" @click="copiarPortapapeles(item.name.note)">
                    Copiar
                </a-button>
                <a-button @click="router.push(`/editar/note/${item.id}`)">
                    Editar
                </a-button>
                <a-popconfirm title="¿Estás seguro que deseas eliminar esta nota?" ok-text="Sí" cancel-text="No"
                    @confirm="() => confirm(item.id)" @cancel="cancel">
                    <a-button danger>Eliminar</a-button>
                </a-popconfirm>
            </a-space>
        </a-card>
    </a-space>
</template>




<style scoped>
.note-card:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(45, 8, 230, 0.2);
    cursor: pointer;
}


.space-container {
    padding: 20px;
}

.note-card {
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button-group {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
}
</style>
