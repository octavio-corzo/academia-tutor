import axios from "axios";
import { defineStore } from "pinia";

export const useQuestionsStore = defineStore("questionsStore", {
  state: () => ({
    loading: false,
    questions: [],
    incorrectQuestions: [],
  }),
  actions: {
    async getQuestions() {
      if (this.questions.length !== 0) {
        return;
      }
      try {
        this.loading = true;
        const response = await axios.get("src/pages/Quiz/questions.json");
        this.questions = response.data.questions; // Asegúrate de acceder a la propiedad correcta
        console.log("desde store", response.data.questions); // Verifica que los datos son correctos
      } catch (error) {
        console.error("Error al cargar las preguntas: ", error);
      } finally {
        this.loading = false;
      }
    },
    setIncorrectQuestions(questions) {
      this.incorrectQuestions = questions;
    },
  },
});
