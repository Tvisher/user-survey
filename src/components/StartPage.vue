<template>
  <div class="quiz-start">
    <div class="quiz-start__head">
      <div class="quiz-start__logo" v-if="appLogo">
        <img :style="{ objectFit: stretchAppLogo }" :src="appLogo" alt="" />
      </div>
      <div class="quiz-start__title">{{ appTitle }}</div>
    </div>
    <div class="quiz-start__descr">{{ appDescription }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    appSettings: { type: Object },
  },
  computed: {
    appLogo() {
      const appLogoPath = this.appSettings.appLogo.path;
      if (appLogoPath) {
        return appLogoPath;
      } else {
        return false;
      }
    },

    stretchAppLogo() {
      if (
        this.appSettings.appLogo.stretchImage &&
        this.appSettings.appLogo.stretchImage == true
      ) {
        return "cover";
      } else {
        return "contain";
      }
    },

    appTitle() {
      return this.appSettings.appTitle;
    },

    appDescription() {
      return this.appSettings.appDescription;
    },
  },
  methods: {
    startQuiz() {
      this.$store.commit("setStartTime");
      this.$emit("startQuiz");
      const quizID = document.querySelector("#app").dataset.pollId;
      const userID = document.querySelector("#app").dataset.user;
      axios
        .post(
          "/local/templates/quiz/startitem.php",
          {
            id: quizID,
            user: userID,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(function (response) {
          console.log("Начало прохождения викторины!");
        })
        .catch(function (error) {
          console.log("Ошибка:", error);
        });
    },
  },
};
</script>

<style lang="scss">
.quiz-start {
  border-radius: 8px;
  padding: 45px;
  background: rgb(255, 255, 255);
  backdrop-filter: blur(12px);
}
.quiz-start__head {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.quiz-start__logo {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  margin-right: 40px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
}
.quiz-start__title {
  color: #002033;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 36px */
}
.quiz-start__descr {
  color: rgba(0, 32, 51, 0.6);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
  // margin-bottom: 40px;
}
.quiz-start-btn__wrapper {
  display: flex;
  justify-content: center;
}
</style>
