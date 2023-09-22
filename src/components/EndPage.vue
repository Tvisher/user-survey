<template>
  <div class="quiz-end">
    <div class="quiz-end-precent" v-if="appHasCurrentAnswers">
      <div class="quiz-end-precent__img">
        <svg
          width="204"
          height="203"
          viewBox="0 0 204 203"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="102.5" cy="102" r="92" fill="var(--app-color)" />
          <path
            d="M194.5 102C194.5 89.9184 192.12 77.9551 187.497 66.7931C182.873 55.6312 176.097 45.4892 167.554 36.9462C159.011 28.4032 148.869 21.6265 137.707 17.0031C126.545 12.3796 114.582 10 102.5 10L102.5 102H194.5Z"
            fill="url(#paint0_linear_1181_55336)"
          />
          <path
            d="M10.4996 102L102.5 194L194.5 102L10.4996 102Z"
            fill="url(#paint1_linear_1181_55336)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1181_55336"
              x1="-10.7307"
              y1="-53.532"
              x2="253.033"
              y2="-20.3577"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0261371" stop-color="white" stop-opacity="0.81" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1181_55336"
              x1="72.3191"
              y1="119.942"
              x2="219.688"
              y2="75.4972"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" />
            </linearGradient>
          </defs>
        </svg>
        <div class="quiz-end-precent__value">{{ truePrecentValue }}%</div>
      </div>
      <div class="quiz-end-precent__title">Правильных ответов</div>
    </div>
    <div class="quiz-end-message" v-if="isHasAppFinalMessage">
      {{ appSettings.appFinalMessage }}
    </div>
    <div class="quiz-end-btns">
      <div class="quiz-end-btn" v-if="isHasCustomLink">
        <a :href="customFinishLinkUrl" class="btn app-btn">
          {{ customFinishLinkText }}
        </a>
      </div>

      <div class="quiz-end-btn" v-if="takeTheQuizagain">
        <a href="#" class="btn app-btn" @click="pageReload"
          >Пройти опрос повторно</a
        >
      </div>
    </div>
  </div>
</template>

<script>
function checkMultiVatiants(userAnswer, correctAnswer) {
  const matchingElements = userAnswer.filter((item) =>
    correctAnswer.includes(item)
  );
  return matchingElements.length > correctAnswer.length / 2;
}

function checkRanginVariant(userAnswer, correctAnswer) {
  const minLength = Math.min(userAnswer.length, correctAnswer.length);
  const matchingIndexes = userAnswer
    .slice(0, minLength)
    .filter((el, idx) => el === correctAnswer[idx]);
  return matchingIndexes.length > minLength / 2;
}

function calculateTruePercentage(booleanArray) {
  const trueCount = booleanArray.reduce((count, value) => count + +value, 0);
  const totalElements = booleanArray.length;
  return Math.round((trueCount / totalElements) * 100);
}

import { mapState } from "vuex";

export default {
  props: {
    appSettings: { type: Object },
  },
  computed: {
    ...mapState({
      userAnswers: (state) => state.userAnswers,
    }),
    isHasAppFinalMessage() {
      return this.appSettings.appFinalMessage.trim() != "";
    },
    isHasCustomLink() {
      return this.appSettings.customFinishLink.enable;
    },
    customFinishLinkUrl() {
      return this.appSettings.customFinishLink.data.linkUrl;
    },
    customFinishLinkText() {
      return this.appSettings.customFinishLink.data.linkText;
    },

    takeTheQuizagain() {
      return this.appSettings.takeTheQuizagain;
    },
    appHasCurrentAnswers() {
      const correctAnswers = this.userAnswers.find((page) => {
        return page.pageData.find(
          (question) => question.correctAnswer.length > 0
        );
      });
      return correctAnswers;
    },

    truePrecentValue() {
      const userAnswersFromAllPages = this.userAnswers.reduce((acc, page) => {
        acc.push(...page.pageData);
        return acc;
      }, []);
      // console.log(userAnswersFromAllPages);
      const res = userAnswersFromAllPages
        .filter(
          (item) =>
            item.hasOwnProperty("correctAnswer") &&
            item.correctAnswer.length > 0
        )
        .map((item) => {
          if (
            item.questionType == "single-choice" ||
            item.questionType == "drop-down-list"
          ) {
            return item.userAnswer[0] == item.correctAnswer[0];
          }
          if (
            item.questionType == "multiple-drop-down-list" ||
            item.questionType == "multiple-choice"
          ) {
            return checkMultiVatiants(item.userAnswer, item.correctAnswer);
          }

          if (item.questionType == "ranging") {
            return checkRanginVariant(item.userAnswer, item.correctAnswer);
          }
        });
      return calculateTruePercentage(res);
    },
  },
  methods: {
    pageReload() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
.quiz-end {
  padding: 20px;
  border-radius: 8px;
  background: #ecf4ff;
}

.quiz-end-precent {
  margin-bottom: 40px;
}

.quiz-end-precent__img {
  margin: auto;
  width: 200px;
  height: 200px;
  position: relative;
  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
}
.quiz-end-precent__value {
  color: #fff;
  font-size: 58px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 58px */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.quiz-end-precent__title {
  color: #002033;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
}

.quiz-end-message {
  margin-bottom: 40px;
  color: rgba(0, 32, 51, 0.6);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
}
.quiz-end-btn {
  display: flex;
  justify-content: center;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
