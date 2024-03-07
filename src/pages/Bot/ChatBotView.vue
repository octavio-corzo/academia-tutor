<template>
    <div>
        <form @submit.prevent="enviarPregunta">
            <input v-model="pregunta" placeholder="Escribe tu pregunta aquí..." />
            <button type="submit">Enviar</button>
        </form>
        <div v-for="(item, index) in conversacion" :key="index">
            <p><strong>Tú:</strong> {{ item.pregunta }}</p>
            <p><strong>Chatbot:</strong> {{ item.respuesta }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

const pregunta = ref('');
const conversacion = reactive([]);

const enviarPregunta = async () => {
    const payload = {
        model: "gpt-3.5-turbo-instruct",
        prompt: pregunta.value,
        temperature: 0.5,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    try {
        const respuesta = await axios.post('https://api.openai.com/v1/completions', payload, {
            headers: {
                'Authorization': `Bearer `
            }
        });

        conversacion.push({
            pregunta: pregunta.value,
            respuesta: respuesta.data.choices[0].text.trim(),
        });

        pregunta.value = ''; // Limpiar el campo de pregunta después de enviar
    } catch (error) {
        console.error('Error al enviar pregunta:', error);
    }
};
</script>
