<template>
  <div v-if="appDataLoaded" class="polls-container">
    <app-start-page :appSettings="appSettings" />
    <div class="polls-pagination">
      <div class="polls-pagination__wrapper">
        <div
          class="polls-page-btn"
          v-for="(page, index) in surveyQuestionsPages"
          :key="page.id"
          :class="{ active: page.id === getCurrentPage.id }"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>
    <div class="poll-pages">
      <app-survey-page :pageData="getCurrentPage" />
    </div>
  </div>
  <div class="quiz-app__footer">
    <div class="quiz-app__footer-content">
      <div class="quiz-app__footer-text">Создано в</div>
      <div class="quiz-app__footer-logo"></div>
    </div>
  </div>
</template>

<script>
import AppSurveyPage from "./components/SurveyPage.vue";
import AppStartPage from "./components/StartPage";
import { mapState, mapGetters } from "vuex";

export default {
  components: { AppSurveyPage, AppStartPage },
  name: "App",

  methods: {},
  computed: {
    ...mapState({
      appDataLoaded: (state) => state.appDataLoaded,
      surveyQuestionsPages: (state) => state.surveyQuestionsPages,
      appSettings: (state) => state.appSettings,
    }),
    ...mapGetters(["getCurrentPage"]),
  },
  beforeCreate() {
    this.$store
      .dispatch("getAppDataFromServer")
      .then((res) => {})
      .catch((error) => {
        console.log("Ошибка:", error);
      });
  },
};
</script>

<style>
* {
  font-family: Montserrat;
}
.quiz-start {
  background-color: #ecf4ff;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
