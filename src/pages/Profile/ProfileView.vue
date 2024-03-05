<template>
    <a-typography-title class="text-center">Perfil de usuario</a-typography-title>
    <div class="text-center mb-5">
        <a-avatar :src="userStore.userData.photoURL" :size="200"></a-avatar>
    </div>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
            <!-- <a-card> -->
            <a-form name="basicPerfil" autocomplete="off" layout="vertical" :model="userStore.userData"
                @finish="onFinish">
                <a-form-item name="email" label="Tu correo (no modificable)" :rules="[
            {
                whitespace: true,
                type: 'email',
                message: 'Ingresa un email válido',
            },
        ]">
                    <a-input disabled v-model:value="userStore.userData.email"></a-input>
                </a-form-item>
                <a-form-item name="displayName" label="Ingrese su nickname" :rules="[
            {
                required: true,
                whitespace: true,
                message: 'Ingresa un nickname válido',
            },
        ]">
                    <a-input v-model:value="userStore.userData.displayName"></a-input>
                </a-form-item>

                <div class="text-center">
                    <a-upload v-model:file-list="fileList" list-type="picture" :before-upload="beforeUpload"
                        :max-count="1" @change="handleChange">
                        <a-button class="mb-2">Subir Foto de perfil</a-button>
                    </a-upload>
                </div>

                <a-form-item class="text-center mt-5">
                    <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser"
                        :loading="userStore.loadingUser">Actualizar información</a-button>
                </a-form-item>
            </a-form>
            <!-- </a-card> -->
        </a-col>
    </a-row>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { useUserStore } from '../../store/user';
import { ref } from 'vue';

const fileList = ref([]);

const handleRemove = file => {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
};

const handleChange = (info) => {

    const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error("Solo se aceptan imagenes JPG o PNG");
        handleRemove(info.file);
        return;
    }

    if (info.file.status !== 'uploading') {
        //console.log(info.file);
    }
}

const beforeUpload = (file) => {
    fileList.value = [...fileList.value, file]
    return false;
}

const userStore = useUserStore();

const onFinish = async () => {
    const error = await userStore.updateUser(userStore.userData.displayName, fileList.value[0]);

    if (!error) {
        message.success('Se ha actualizado tu info correctamente.')
    } else {
        message.error('Ocurrio un error a la hora de actualizar tu perfil.')
    }
};
</script>

<style>
.mt-5 {
    margin-top: 1rem;
}
</style>