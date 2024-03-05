<script setup>
import { reactive } from 'vue';
import { userDatabaseStore } from '../../store/database';
import { message } from 'ant-design-vue';

const databaseStore = userDatabaseStore();

const formState = reactive({
    note: '',
    title: '', // Nuevo estado para el título de la nota
});

const onFinish = async () => {
    console.log('Intentando agregar:', formState.title, formState.note);
    // Cambiada la función addUrl a addNote y se pasa un objeto con el título y la nota
    const error = await databaseStore.addNote({
        title: formState.title,
        note: formState.note,
    });

    if (!error) {
        message.success('Nota agregada ✅');
    } else {
        message.error("Ocurrió un error en el servidor, inténtelo más tarde...");
    }
}
</script>

<template>
    <a-form name="addform" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
        <a-form-item name="title" label="Título" :rules="[{
        required: true,
        message: 'Ingrese el título de la nota'
    }]">
            <a-input placeholder="Ingrese el título de la nota" v-model:value="formState.title"></a-input>
        </a-form-item>
        <a-form-item name="note" label="Nota" :rules="[{
        required: true,
        message: 'Ingrese el contenido de la nota'
    }]">
            <a-input placeholder="Ingrese el contenido de la nota" v-model:value="formState.note"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :loading="databaseStore.loading">
                Agregar Nota
            </a-button>
        </a-form-item>
    </a-form>
</template>
