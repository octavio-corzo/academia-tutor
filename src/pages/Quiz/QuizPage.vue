<template>
    <div>
        <div class="image-text-wrapper">
            <img src="../../assets/images/eduMentor.jpg" style="height: 250px;" alt="">
            <div class="animated-text mt-5">
                <p class="animated-text-content mb-5">¡Bienvenido al Quiz!</p>
                <p class="animated-text-content">
                    Hola {{ userStore.userData?.displayName }}, soy EduMentor, tu tutor académico personalizado y el
                    siguiente quiz me ayudará a saber que
                    temas dominas bien y en cuales podemos reforzar más.
                </p>
                <p class="animated-text-content mt-5 mb-5">
                    Al finalizar el cuestionaro tendras tus resultados y tu nota final. Es importante que respondas cada
                    pregunta con honestidad, así podre crear el mejor plan de estudio personalizado para ti.
                </p>
            </div>
        </div>

        <a-divider />
        <div class="text-h3 text-center" style="color: #2E4053;">Responde las siguientes preguntas:</div>
        <a-divider></a-divider>
        <v-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <v-col v-for="(item, index) in questionsStore.questions" :key="index" sm="5" md="6">
                <v-card v-if="!item.answered" class="mx-auto my-8" elevation="16" max-width="550">
                    <v-card-item class="text-center">
                        <v-card-title>{{ item.topic }}</v-card-title>
                    </v-card-item>
                    <v-card-text class="text-center">{{ item.question }}</v-card-text>
                    <v-card-text class="text-center">
                        Selecciona la respuesta correcta:
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn class="text-none" color="blue-darken-4" rounded="0" variant="outlined"
                            v-for="option in item.options" :key="option" @click="checkAnswer(item.id, option)">
                            {{ option }}
                        </v-btn>
                    </v-card-actions>
                </v-card>

                <v-card v-else="item.answered" style="background-color: #E5E8E8;" class="mx-auto my-8" elevation="16"
                    max-width="550">
                    <v-card-item class="text-center">
                        <v-card-title>{{ item.topic }}</v-card-title>
                    </v-card-item>
                    <v-card-text class="text-center">{{ item.question }}</v-card-text>
                    <v-card-text class="text-center">
                        Selecciona la respuesta correcta:
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn class="text-none" color="blue-darken-4" rounded="0" variant="outlined"
                            v-for="option in item.options" :key="option" @click="checkAnswer(item.id, option)">
                            {{ option }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <a-divider></a-divider>

        <!-- <v-card v-if="allQuestionsAnswered" class="text-center">
            <v-card-item class="text-center">
                <v-card-title>Resultados</v-card-title>
            </v-card-item>
            <p v-if="questionsStore.questions.length > 0">
                Preguntas correctas: {{ correctCount }}
            </p>
            <p v-if="questionsStore.questions.length > 0">
                Preguntas incorrectas: {{ incorrectCount }}
            </p>
            <p v-if="questionsStore.questions.length > 0">
                Tu nota: {{ calculateScore() }}/10
            </p>
        </v-card> -->
        <div>
            <transition-group name="results-transition">
                <v-card v-if="allQuestionsAnswered" class="text-center" transition="fade">
                    <v-card-item class="text-center">
                        <v-card-title>Resultados</v-card-title>
                    </v-card-item>
                    <p v-if="questionsStore.questions.length > 0">
                        Preguntas correctas: {{ correctCount }}
                    </p>
                    <p v-if="questionsStore.questions.length > 0">
                        Preguntas incorrectas: {{ incorrectCount }}
                    </p>
                    <v-text-card v-if="questionsStore.questions.length > 0">
                        Tu nota: {{ calculateScore() }}/10
                    </v-text-card>

                    <v-list-item v-for="question in getIncorrectQuestions" :key="question.id">
                        <v-list-item-content>
                            <v-list-item-title>
                                <span style="color: red;">
                                    Respondiste incorrectamente a: {{ question.topic }}
                                </span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </transition-group>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useQuestionsStore } from '../../store/questions';
import { useUserStore } from '../../store/user';
import { saveAs } from 'file-saver'; // Import FileSaver.js

const userStore = useUserStore();


const questionsStore = useQuestionsStore();

questionsStore.getQuestions();

let correctCount = ref(0);
let incorrectCount = ref(0);




const checkAnswer = (questionId, selectedOption) => {
    const question = questionsStore.questions.find(item => item.id === questionId);
    if (!question.answered) {
        if (question.answer === selectedOption) {
            correctCount.value++;
        } else {
            incorrectCount.value++;
            question.incorrectAnswer = true;
        }
        question.answered = true;
    }
};

const calculateScore = () => {
    const totalQuestions = questionsStore.questions.length;
    if (totalQuestions === 0) return 0;

    const score = Math.round((correctCount.value / totalQuestions) * 10);
    return score;
};

const allQuestionsAnswered = computed(() => {
    return questionsStore.questions.every(question => question.answered);
});

// const getIncorrectQuestions = computed(() => {
//     return questionsStore.questions.filter(question => question.incorrectAnswer);
// });
// const saveIncorrectQuestions = (data) => {
//     const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
//     const filename = 'incorrect_questions.json';
//     saveAs(blob, filename);
//     console.log('Incorrect questions saved successfully!');
// };

const getIncorrectQuestions = computed(() => {
    const incorrect = questionsStore.questions.filter(question => question.incorrectAnswer);
    // saveIncorrectQuestions(incorrect); // Save data on change
    return incorrect;
});


watch([correctCount, incorrectCount], () => {
    console.log('Actualizando puntuación...');
    calculateScore();
});

</script>

<style scoped>
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