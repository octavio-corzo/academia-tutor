<template>
    <div class="login-container">
        <div class="brand-container">
            <img class="logo" src="../../assets/images/logo.png" alt="Logo">
        </div>
        <a-row type="flex" justify="center" align="middle" class="login-row">
            <a-col class="text-center">
                <div class="form-container">
                    <h1 class="text-center">Registrate</h1>
                    <a-form name="basicLogin" layout="vertical" :model="formState" @finish="onFinish"
                        @finishFailed="onFinishFailed" class="login-form">
                        <a-form-item name="email" label="Correo Electrónico" :rules="formRules.email">
                            <a-input v-model:value="formState.email" placeholder="ejemplo@correo.com"></a-input>
                        </a-form-item>
                        <a-form-item name="password" label="Contraseña" :rules="formRules.password">
                            <a-input-password v-model:value="formState.password"
                                placeholder="Contraseña"></a-input-password>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit" block :loading="userStore.loadingUser">
                                Registrarse
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useUserStore } from '../../store/user.js';
import { message } from 'ant-design-vue';

const userStore = useUserStore();

const formState = reactive({
    email: '',
    password: '',
});

const formRules = {
    email: [
        { required: true, message: 'Por favor, ingresa tu correo electrónico', type: 'email' },
    ],
    password: [
        { required: true, message: 'Por favor, ingresa tu contraseña', min: 6 },
    ],
};

const onFinish = async () => {
    console.log('Success:', formState);
    const error = await userStore.registerUser(formState.email, formState.password);

    if (!error) {
        message.success('Bienvenido');
    } else {
        switch (error) {
            case 'auth/email-already-in-use':
                message.error('Este correo ya esta registrado');
                break;
            default:
                message.error('Error externo. Intentelo de nuevo');
                break;
        }
    }
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
</script>

<style scoped>
@keyframes gradient-bg {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.login-container {
    min-height: 100vh;
    display: flex;
    justify-content: space-around;
    /* Esto separa los elementos en el contenedor */
    align-items: center;
    background: linear-gradient(-45deg, #e1e2e3, #dff0f1, #eff3f8, #daf1f2);
    background-size: 400% 400%;
    animation: gradient-bg 15s ease infinite;
}

.brand-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    max-width: 600px;
    /* O cualquier tamaño que prefieras */
    width: 100%;
    /* Hace que la imagen sea responsiva */
    box-shadow: 0 4px 6px rgba(7, 148, 235, 0.5);
}

.form-container {
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(62, 149, 205, 0.5);
    width: 400px;
    max-width: 500px;
    /* O cualquier tamaño que prefieras */
}


.login-form {
    margin: auto;
}

.text-center {
    text-align: center;
    margin-bottom: 20px;
}
</style>
