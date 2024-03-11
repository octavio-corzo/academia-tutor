<template>
    <div class="chat-container">
        <div class="messages">
            <div v-for="(item, index) in conversation" :key="index" class="message">
                <div class="message-user mb-10">Tú: {{ item.question }}</div>
                <div class="message-bot mt-10">EduMentor: {{ item.response }}</div>
            </div>
        </div>
        <form @submit.prevent="sendQuestion" class="chat-form">
            <input v-model="question" class="chat-input" placeholder="Escribe tu question aquí..." />
            <button type="submit" class="chat-send">send</button>
        </form>
    </div>
</template>


<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { API_KEY } from '../../globalVars';

const question = ref('');
const conversation = reactive([]);

const sendQuestion = async () => {
    const payload = {
        model: "gpt-3.5-turbo-instruct",
        prompt: question.value,
        temperature: 0.5,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', payload, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        conversation.push({
            question: question.value,
            response: response.data.choices[0].text.trim(),
        });

        question.value = '';
    } catch (error) {
        console.error('Error al enviar question:', error);
    }
};
</script>

<style>
.chat-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 500px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f9f9f9;
    margin: auto;
    width: 80%;
    max-width: 600px;
    padding: 10px;
}

.messages {
    overflow-y: auto;
    padding: 10px;
    height: calc(100% - 60px);
}

.message {
    display: flex;
    flex-direction: column;
}

.message-user {
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    border-radius: 20px;
    padding: 5px 10px;
    max-width: 60%;
    margin-bottom: 4px;
    /* Espacio entre mensajes del usuario y del bot */
}

.message-bot {
    align-self: flex-start;
    background-color: #eee;
    border-radius: 20px;
    padding: 5px 10px;
    max-width: 60%;
}

.chat-form {
    display: flex;
    margin-top: 10px;
}

.chat-input {
    flex: 1;
    border-radius: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    margin-right: 10px;
}

.chat-send {
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}
</style>
