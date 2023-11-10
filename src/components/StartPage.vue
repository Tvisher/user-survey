<template>
  <div class="quiz-start">
    <div class="quiz-start__head">
      <div class="quiz-start__logo" v-if="appLogo">
        <img :style="{ objectFit: stretchAppLogo }" :src="appLogo" alt="" />
      </div>
      <div class="quiz-start__title">{{ appTitle }}</div>
      <a
        :href="`/lk/poll/public/survey/?id=${quizID}`"
        class="admin-edit"
        v-if="isAdmin"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2041_44503)">
            <path
              d="M0.781333 12.7459C0.281202 13.2459 0.000151033 13.9241 0 14.6312L0 15.9999H1.36867C2.07585 15.9997 2.75402 15.7187 3.254 15.2186L12.1493 6.32325L9.67667 3.85059L0.781333 12.7459Z"
              fill="var(--app-color)"
            />
            <path
              d="M15.4298 0.570239C15.2675 0.407729 15.0747 0.278809 14.8625 0.19085C14.6503 0.102891 14.4228 0.0576172 14.1931 0.0576172C13.9634 0.0576172 13.736 0.102891 13.5238 0.19085C13.3116 0.278809 13.1188 0.407729 12.9565 0.570239L10.6191 2.90824L13.0918 5.38091L15.4298 3.04357C15.5923 2.88123 15.7212 2.68845 15.8092 2.47626C15.8972 2.26406 15.9424 2.03661 15.9424 1.80691C15.9424 1.5772 15.8972 1.34975 15.8092 1.13755C15.7212 0.925358 15.5923 0.73258 15.4298 0.570239Z"
              fill="var(--app-color)"
            />
          </g>
          <defs>
            <clipPath id="clip0_2041_44503">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
    <div class="quiz-start__descr">{{ appDescription }}</div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  props: {
    appSettings: { type: Object },
  },
  computed: {
    ...mapState({
      isAdmin: (state) => state.isAdmin,
      quizID: (state) => state.quizID,
    }),
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
  position: relative;
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
  padding-right: 37px;
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

.admin-edit {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 36px;
  height: 36px;
  background: #ffe7ef;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
