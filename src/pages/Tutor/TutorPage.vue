<template>
    <div>
        <div class="text-h3 text-center" style="color: #2E4053;">Tutor personalizado:</div>
        <div class="image-text-wrapper">
            <img src="../../assets/images/eduMentor.jpg" style="height: 250px;" alt="">
            <div class="animated-text mt-5">
                <p class="animated-text-content">
                    Hola de nuevo, {{ userStore.userData?.displayName }}, soy EduMentor, tu tutor académico
                    personalizado.
                </p>
                <p class="animated-text-content mt-5 mb-5">
                    Ya tenemos tus resultados, según los resultados que obtuve estos serían los temas que necesitas
                    reforzar.
                </p>
                <p class="animated-text-content mt-5 mb-5">
                    Presiona uno de los temas y empezaré con la tutoría personalizada.
                </p>
            </div>
        </div>
        <v-row>
            <v-col v-for="question in incorrectQuestions" :key="question.id" :span="8">
                <div class="mt-7">
                    <v-btn @click="sendQuestion(question.topic)" class="topic-button">
                        {{ question.topic }}
                    </v-btn>
                </div>
            </v-col>
        </v-row>

        <div class="chat-box mt-5">
            <!-- <a-spin v-if="loading" class="loading" tip="Cargando respuesta..."></a-spin> -->
            <div class="chat-message" v-for="(msg, index) in conversation" :key="index">
                <div class="message-user mt-5">Tú: {{ msg.question }}</div>
                <div class="message-bot mt-5">EduMentor: {{ msg.response }}</div>
            </div>
            <!-- Botón que se muestra después de recibir la primera respuesta -->
            <v-btn v-if="conversation.length > 0 && stage === 1" @click="handleAdditionalQuestion(currentTopic)"
                class="follow-up-button">
                Más información sobre {{ currentTopic }}
            </v-btn>
            <v-btn v-if="conversation.length > 0 && stage === 2" @click="handleAdditionalQuestion(currentTopic)"
                class="follow-up-button">
                Ejemplos sobre {{ currentTopic }}
            </v-btn>
            <v-btn v-if="conversation.length > 0 && stage === 3" @click="handleAdditionalQuestion(currentTopic)"
                class="follow-up-button">
                Casos de uso {{ currentTopic }}
            </v-btn>
            <v-btn v-if="conversation.length > 0 && stage === 4" @click="handleAdditionalQuestion(currentTopic)"
                class="follow-up-button">
                ¿Qué más puedo hacer con {{ currentTopic }}?
            </v-btn>
            <v-btn v-if="conversation.length > 0 && stage === 5" @click="handleAdditionalQuestion(currentTopic)"
                class="follow-up-button">
                Ejercios para practicar {{ currentTopic }}
            </v-btn>

            <div v-if="conversation.length > 0 && stage === 6" class="image-text-wrapper mt-5">
                <img src="../../assets/images/eduMentor.jpg" style="height: 250px;" alt="">
                <div class="animated-text mt-5">
                    <p class="animated-text-content">
                        Muy bien, {{ userStore.userData?.displayName }}, espero que la tutoría haya sido de ayuda y
                        hayas podido aprender más sobre {{ currentTopic }}.
                    </p>
                    <p class="animated-text-content mt-5 mb-5">
                        Presiona otro tema que necesites reforzar para continuar con la tutoría.
                    </p>
                </div>
            </div>
            <a-spin v-if="loading" class="loading mt-5" tip="Cargando respuesta..."></a-spin>

        </div>

    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useUserStore } from '../../store/user';
import axios from 'axios';
import { API_KEY } from '../../globalVars';

const userStore = useUserStore();

// Define las props que esperas recibir
const props = defineProps({
    incorrectQuestions: Array
});

const conversation = ref([]);

const loading = ref(false);

const currentTopic = ref('');

const stage = ref(0);

const sendQuestion = async (topic, additionalText = '') => {
    loading.value = true;
    currentTopic.value = topic;
    let fullQuestion = `Necesito ayuda con el tema de ${topic}. ¿Podrías explicarme más sobre esto?`;
    if (additionalText) {
        fullQuestion = additionalText;
    }

    const payload = {
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: fullQuestion }],
        temperature: 0.7,
        max_tokens: 300,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        const { content } = response.data.choices[0].message;
        conversation.value.push({
            question: fullQuestion,
            response: content.trim(),
        });
        stage.value += 1;
    } catch (error) {
        console.error('Error al enviar pregunta:', error);
    } finally {
        loading.value = false;
    }
};

const handleAdditionalQuestion = () => {
    let additionalText = `Profundiza más sobre el tema de: ${currentTopic.value}`;

    console.log(`Pidiendo más información sobre el tema: ${currentTopic.value}`);
    if (stage.value === 3) {
        additionalText = `Ahora que tengo una idea básica sobre ${currentTopic.value}, ¿podrías darme 3 ejemplos?`;
    } else if (stage.value === 3) {
        additionalText = `¿En que casos de uso se utilizan ${currentTopic.value}?`;
    } else if (stage.value === 4) {
        additionalText = `¿Qué más puedo hacer con ${currentTopic.value}?`;
    } else if (stage.value === 5) {
        additionalText = `Dame 3 ejercicios de ${currentTopic.value} para practicar, por favor.`;
    }
    sendQuestion(currentTopic.value, additionalText);
}
</script>

<style scoped>
.follow-up-button {
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #00b30f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.follow-up-button:hover {
    background-color: #65b300;
}

.button-wrapper {
    display: flex;
    justify-content: center;
    /* Centra el botón horizontalmente */
    padding: 10px;
    /* Añade algo de espacio alrededor del botón */
}

.topic-button {
    min-width: 100%;
    /* Asegura que todos los botones tengan el mismo ancho dentro de su contenedor */
    padding: 10px 20px;
    background-color: #f44336;
    /* Color rojo para indicar incorrecto */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.topic-button:hover {
    background-color: #d32f2f;
}

.image-text-wrapper {
    display: flex;
    /* Allow stacking image and text */
    align-items: center;
    /* Vertically center content */
}

.animated-text {
    position: relative;
    /* Required for pseudo-element positioning */
    margin-left: 20px;
    /* Space between image and text */
    animation: slide-in 0.5s ease-in-out forwards;
}


.animated-text::after {
    content: '';
    position: absolute;
    bottom: -20px;
    /* Adjust position as needed */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    /* Left border of bubble */
    border-right: 15px solid transparent;
    border-bottom: 20px solid #EEE;
    /* Bottom of bubble */
    /* Animation for smooth appearance */
    animation: appear 1.5s ease-in-out forwards;
}

.animated-text-content {
    position: relative;
    /* Required for pseudo-element interaction */
    padding: 10px 20px;
    background-color: #EEE;
    border-radius: 10px;
    /* Rounded corners for bubble */
    animation: pop-in 0.5s ease-in-out forwards;
    /* Animation for content pop-in */
    /* Optional styling for the text */
    color: #333;
    font-weight: bold;
}

.results-transition-enter-active {
    /* Define the initial state of the card when entering */
    opacity: 0;
    transform: translateY(50px);
    /* Card starts offscreen below */
}

.results-transition-enter-done {
    /* Define the final state of the card after entering */
    opacity: 1;
    transform: translateY(0);
    /* Card is fully visible */
    transition: all 0.5s ease-in-out;
    /* Animation properties */
}

.results-transition-leave-active {
    /* Define the initial state of the card when leaving */
    opacity: 1;
    transform: translateY(0);
    /* Card is initially visible */
}

.results-transition-leave-done {
    /* Define the final state of the card after leaving */
    opacity: 0;
    transform: translateY(50px);
    /* Card moves offscreen below */
    transition: all 0.5s ease-in-out;
    /* Animation properties */
}

.chat-box {
    margin-top: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    overflow-y: auto;
    height: 300px;
    /* Ajusta según tus necesidades */
}

.chat-message {
    margin-bottom: 10px;
}

.message-user,
.message-bot {
    background-color: #eef;
    padding: 5px 10px;
    border-radius: 10px;
    margin-bottom: 5px;
}

.message-user {
    background-color: #007bff;
    color: white;
}

.message-bot {
    background-color: #eee;
    color: black;
}

.topic-button {
    min-width: 100%;
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.topic-button:hover {
    background-color: #d32f2f;
}


@keyframes appear {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes pop-in {
    from {
        transform: translateY(10px);
        /* Content pops in from above */
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slide-in {
    from {
        transform: translateX(20px);
        /* Text slides in from the right */
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
