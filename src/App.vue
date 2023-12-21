<template>
  <div v-if="appDataLoaded && !pageHasProblems">
    <div class="polls-container">
      <app-start-page :appSettings="appSettings" />
      <div
        class="polls-pagination top-polls-pagination"
        :class="{ all_work: surveyСompleted }"
      >
        <div class="polls-pagination__wrapper">
          <div
            class="polls-page-btn"
            v-for="(page, index) in surveyQuestionsPages"
            :key="page.id"
            :class="{ active: page.id === getCurrentPage.id && showQuestions }"
            @click="setPage(page.id)"
          >
            {{ index + 1 }}
          </div>

          <div
            v-if="surveyСompleted"
            class="app-btn btn end-page-btn"
            :class="{ active: showEndPage }"
            @click="selectEndPage"
          >
            Итоговая страница
          </div>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div :key="getCurrentPage.id" v-if="showQuestions">
          <app-survey-page :pageData="getCurrentPage" />
          <div class="polls-pagination__in-footer" v-if="surveyСompleted">
            <div
              class="polls-pagination"
              :class="{ all_work: surveyСompleted }"
            >
              <div class="polls-pagination__wrapper">
                <div
                  class="polls-page-btn"
                  v-for="(page, index) in surveyQuestionsPages"
                  :key="page.id"
                  :class="{
                    active: page.id === getCurrentPage.id && showQuestions,
                  }"
                  @click="setPage(page.id)"
                >
                  {{ index + 1 }}
                </div>

                <div
                  v-if="surveyСompleted"
                  class="app-btn btn end-page-btn"
                  :class="{ active: showEndPage }"
                  @click="selectEndPage"
                >
                  Итоговая страница
                </div>
              </div>
            </div>
          </div>
          <div
            class="polls-pagination next-btn-wrapper"
            v-if="!surveyСompleted"
          >
            <div class="polls-pagination__wrapper">
              <button class="app-btn btn" @click="nextPageOrFinish">
                {{ nextBtnText }}
              </button>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <app-end-page v-if="showEndPage" :appSettings="appSettings" />
      </transition>
    </div>

    <div class="quiz-app__footer">
      <div class="quiz-app__footer-content">
        <div class="quiz-app__footer-text">Создано в</div>
        <div class="quiz-app__footer-logo"></div>
      </div>
    </div>
  </div>
  <div v-if="pageHasProblems" class="page-has-errors">
    <app-not-found />
  </div>
</template>

<script>
import axios from "axios";
import AppSurveyPage from "./components/SurveyPage.vue";
import AppStartPage from "./components/StartPage";
import AppEndPage from "./components/EndPage";
import AppNotFound from "./components/NotFound.vue";

import { mapState, mapGetters, mapMutations } from "vuex";
import { nextTick } from "vue";

export default {
  components: { AppSurveyPage, AppStartPage, AppEndPage, AppNotFound },
  name: "App",
  data() {
    return {
      showQuestions: true,
      showEndPage: false,
      pageHasProblems: false,
    };
  },
  computed: {
    ...mapState({
      appDataLoaded: (state) => state.appDataLoaded,
      surveyQuestionsPages: (state) => state.surveyQuestionsPages,
      appSettings: (state) => state.appSettings,
      userAnswers: (state) => state.userAnswers,
      surveyСompleted: (state) => state.surveyCompleted,
    }),
    ...mapGetters(["getCurrentPage"]),
    isLastPage() {
      return (
        this.surveyQuestionsPages[this.surveyQuestionsPages.length - 1].id ===
        this.getCurrentPage.id
      );
    },
    nextBtnText() {
      return this.isLastPage ? "Завершить опрос" : "Далее";
    },
  },
  methods: {
    ...mapMutations([
      "togglePageValidate",
      "toggleCustomFieldsValidate",
      "blockedPage",
      "setCurrentPageId",
      "compliteSurvey",
      "setShowCurrentAnswer",
      "setStartId",
    ]),
    setPage(pageId) {
      if (!this.surveyСompleted) {
        return;
      }
      this.showQuestions = true;
      this.showEndPage = false;
      this.setCurrentPageId(pageId);
    },
    selectEndPage() {
      this.showQuestions = false;
      this.showEndPage = true;
    },
    nextPageOrFinish() {
      const currentPageId = this.getCurrentPage.id;
      this.togglePageValidate(true);
      this.toggleCustomFieldsValidate(true);
      const currentPage = this.userAnswers.find(
        (page) => page.pageId === currentPageId
      );
      const pageHasAllAnswers = currentPage.pageData.every(
        (answer) => answer.userAnswer.length > 0
      );
      if (!pageHasAllAnswers) {
        nextTick().then(() => {
          const emptyAnswer = document.querySelectorAll(
            ".poll-item.questionEmptyAnswer"
          );
          const position =
            emptyAnswer[0].clientHeight < window.innerHeight ? "center" : "end";
          if (emptyAnswer.length > 0) {
            emptyAnswer[0].scrollIntoView({
              behavior: "smooth",
              block: position,
            });
          }
        });
        return;
      } else {
        const currentIndex = this.surveyQuestionsPages.findIndex(
          (item) => item.id === currentPageId
        );
        const nextPage = this.surveyQuestionsPages[currentIndex + 1];
        this.togglePageValidate(false);
        this.toggleCustomFieldsValidate(false);
        this.blockedPage({
          pageId: currentPageId,
          value: true,
        });
        if (nextPage) {
          this.setCurrentPageId(nextPage.id);
        } else {
          this.compliteSurvey();
          this.showQuestions = false;
          this.showEndPage = true;
          this.setShowCurrentAnswer(true);
          this.$store.dispatch("setAppDataOnServer");
        }
        nextTick().then(() => {
          const topPagination = document.querySelector(".top-polls-pagination");
          topPagination.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }
    },
  },

  beforeCreate() {
    const checkAppComplite = () => {
      const quizID = document.querySelector("#app").dataset.pollId;
      const userID = document.querySelector("#app").dataset.user;
      const complitedPoll = localStorage.getItem(`${quizID}`);
      if (complitedPoll && !this.$store.state.appSettings.takeTheQuizagain) {
        this.showEndPage = true;
        this.showQuestions = false;
        return;
      }
      const checkIsUserPassingStart = (e) => {
        if (e.target.closest(".poll-item-choise")) {
          this.$store.commit("setStartTime");
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
            .then((res) => {
              console.log("Начало прохождения!");
              this.setStartId(res.data);
              document.removeEventListener(
                "pointerup",
                checkIsUserPassingStart,
                {
                  capture: true,
                }
              );
            })
            .catch((error) => {
              console.log("Ошибка:", error);
            });
        }
      };
      document.addEventListener("pointerup", checkIsUserPassingStart, {
        capture: true,
      });
    };

    this.$store
      .dispatch("getAppDataFromServer")
      .then((res) => {
        checkAppComplite();
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "development") {
          this.pageHasProblems = true;
        }
        checkAppComplite();
        console.log("Ошибка:", error);
      });
  },
};
</script>

<style lang="scss">
.next-btn-wrapper {
  margin-top: 20px;

  .app-btn {
    margin-left: auto;
  }
}

#app {
  // min-height: 100vh;
  padding: 0 !important;
}

* {
  font-family: Montserrat;
}

.quiz-start {
  background-color: #ecf4ff;
  padding: 20px;
  margin-bottom: 20px;
}

.polls-container {
  padding-top: 60px;
  padding-bottom: 100px;
  min-height: calc(100vh - 120px);
  margin: auto;
}

.quiz-app__footer {
  z-index: 3;
  position: relative;
  transition: opacity 0.8s ease-in-out;
  background: #333;
  color: #888;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 104%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;

  .quiz-app__footer-logo {
    margin-left: 15px;
    width: 210px;
    height: 40px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='209' height='40' viewBox='0 0 209 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M84.6985 0.000488281H74.5809L74.58 0.00149374C71.508 0.0279201 68.7272 0.709478 66.2376 2.04617C63.7267 3.40982 61.7496 5.29571 60.3066 7.70386C58.8923 10.083 58.1852 12.7668 58.1852 15.7552C58.1852 18.7436 58.8923 21.4419 60.3066 23.85C61.7496 26.2292 63.7267 28.1006 66.2376 29.4642C68.7273 30.801 71.5082 31.4825 74.5804 31.5089L74.5809 31.5095H74.6716C74.7031 31.5096 74.7346 31.5097 74.7662 31.5097C74.7978 31.5097 74.8293 31.5096 74.8608 31.5095H84.6985L82.9392 29.6295C83.0438 29.5755 83.1479 29.5205 83.2515 29.4642C85.0755 28.4736 86.6178 27.2151 87.8783 25.6887V25.728H94.2379V6.07103H88.0598C86.7668 4.42643 85.164 3.08481 83.2515 2.04617C83.1479 1.98988 83.0437 1.93475 82.9389 1.88078L84.6985 0.000488281ZM78.4541 24.8366L69.9557 15.755L78.4377 6.69097C78.8421 6.8543 79.2345 7.04686 79.6149 7.26865C81.058 8.08104 82.1836 9.22708 82.9917 10.7068C83.8287 12.1865 84.2472 13.8693 84.2472 15.7552C84.2472 17.6411 83.8287 19.3239 82.9917 20.8036C82.1836 22.2833 81.058 23.4438 79.6149 24.2852C79.2397 24.4965 78.8528 24.6803 78.4541 24.8366ZM20.0876 1.87208C18.1251 0.972655 15.8017 0.522941 13.1176 0.522941H0V30.9874H7.01336V22.5879H13.1176C15.8017 22.5879 18.1251 22.1527 20.0876 21.2823C22.0791 20.3829 23.6088 19.1063 24.6766 17.4525C25.7445 15.7697 26.2784 13.8113 26.2784 11.5772C26.2784 9.31412 25.7445 7.35569 24.6766 5.70191C23.6088 4.04812 22.0791 2.77151 20.0876 1.87208ZM17.5334 15.4941C16.4367 16.3935 14.8348 16.8432 12.7279 16.8432H7.01336V6.26767H12.7279C14.8348 6.26767 16.4367 6.7319 17.5334 7.66034C18.6301 8.55977 19.1785 9.86539 19.1785 11.5772C19.1785 13.26 18.6301 14.5656 17.5334 15.4941ZM43.2342 22.5009L49.0786 30.9874H56.6115L49.8146 21.1953C51.806 20.3249 53.3357 19.0773 54.4036 17.4525C55.5003 15.7987 56.0487 13.8403 56.0487 11.5772C56.0487 9.31412 55.5148 7.35569 54.4469 5.70191C53.379 4.04812 51.8493 2.77151 49.8579 1.87208C47.8953 0.972655 45.5719 0.522941 42.8878 0.522941H29.7702V30.9874H36.7836V22.5009H42.8878H43.2342ZM47.3036 7.66034C48.4004 8.55977 48.9487 9.86539 48.9487 11.5772C48.9487 13.26 48.4004 14.5656 47.3036 15.4941C46.2069 16.4225 44.6051 16.8867 42.4982 16.8867H36.7836V6.26767H42.4982C44.6051 6.26767 46.2069 6.7319 47.3036 7.66034Z' fill='%23FA0056'/%3e%3cpath d='M83.9499 31.5095C80.8012 31.5095 77.9559 30.9631 75.4139 29.5935C72.9007 28.2238 70.922 26.3442 69.4777 23.9546C68.0622 21.5359 67.3545 18.8258 67.3545 15.8242C67.3545 12.8227 68.0622 10.1271 69.4777 7.7375C70.922 5.31878 72.9007 3.42459 75.4139 2.05495C77.9559 0.685309 80.8012 0.000488281 83.9499 0.000488281C87.0985 0.000488281 89.9294 0.685309 92.4426 2.05495C94.9557 3.42459 96.9345 5.31878 98.3788 7.7375C99.8231 10.1271 100.545 12.8227 100.545 15.8242C100.545 18.8258 99.8231 21.5359 98.3788 23.9546C96.9345 26.3442 94.9557 28.2238 92.4426 29.5935C89.9294 30.9631 87.0985 31.5095 83.9499 31.5095ZM83.9499 25.6157C85.7409 25.6157 87.3585 25.2077 88.8029 24.3918C90.2472 23.5467 91.3738 22.381 92.1826 20.8948C93.0203 19.4086 93.4392 17.7184 93.4392 15.8242C93.4392 13.93 93.0203 12.2398 92.1826 10.7536C91.3738 9.26742 90.2472 8.11634 88.8029 7.30039C87.3585 6.45529 85.7409 6.03274 83.9499 6.03274C82.1589 6.03274 80.5413 6.45529 79.0969 7.30039C77.6526 8.11634 76.5116 9.26742 75.6739 10.7536C74.865 12.2398 74.4606 13.93 74.4606 15.8242C74.4606 17.7184 74.865 19.4086 75.6739 20.8948C76.5116 22.381 77.6526 23.5467 79.0969 24.3918C80.5413 25.2077 82.1589 25.6157 83.9499 25.6157Z' fill='white'/%3e%3cpath d='M127.098 7.60637V31.1234H120.338V13.2015H110.632V31.1234H103.916V7.60637H127.098Z' fill='white'/%3e%3cpath d='M145.798 7.25667C147.964 7.25667 149.929 7.76665 151.691 8.78659C153.482 9.7774 154.883 11.1907 155.894 13.0267C156.905 14.8334 157.41 16.9462 157.41 19.3649C157.41 21.7836 156.905 23.9109 155.894 25.7468C154.883 27.5536 153.482 28.9669 151.691 29.9869C149.929 30.9777 147.964 31.4731 145.798 31.4731C142.822 31.4731 140.483 30.526 138.778 28.6318V39.6035H132.019V7.60637H138.475V10.3165C140.15 8.27662 142.591 7.25667 145.798 7.25667ZM144.628 25.878C146.361 25.878 147.777 25.2951 148.874 24.1295C150.001 22.9347 150.564 21.3465 150.564 19.3649C150.564 17.3833 150.001 15.8096 148.874 14.644C147.777 13.4492 146.361 12.8518 144.628 12.8518C142.895 12.8518 141.465 13.4492 140.338 14.644C139.241 15.8096 138.692 17.3833 138.692 19.3649C138.692 21.3465 139.241 22.9347 140.338 24.1295C141.465 25.2951 142.895 25.878 144.628 25.878Z' fill='white'/%3e%3cpath d='M171.55 31.4731C169.095 31.4731 166.885 30.9631 164.921 29.9432C162.985 28.8941 161.469 27.4516 160.371 25.6157C159.274 23.7798 158.725 21.6962 158.725 19.3649C158.725 17.0336 159.274 14.95 160.371 13.1141C161.469 11.2782 162.985 9.85025 164.921 8.8303C166.885 7.78122 169.095 7.25667 171.55 7.25667C174.006 7.25667 176.201 7.78122 178.137 8.8303C180.072 9.85025 181.589 11.2782 182.686 13.1141C183.784 14.95 184.333 17.0336 184.333 19.3649C184.333 21.6962 183.784 23.7798 182.686 25.6157C181.589 27.4516 180.072 28.8941 178.137 29.9432C176.201 30.9631 174.006 31.4731 171.55 31.4731ZM171.55 25.878C173.284 25.878 174.699 25.2951 175.797 24.1295C176.923 22.9347 177.487 21.3465 177.487 19.3649C177.487 17.3833 176.923 15.8096 175.797 14.644C174.699 13.4492 173.284 12.8518 171.55 12.8518C169.817 12.8518 168.387 13.4492 167.261 14.644C166.134 15.8096 165.571 17.3833 165.571 19.3649C165.571 21.3465 166.134 22.9347 167.261 24.1295C168.387 25.2951 169.817 25.878 171.55 25.878Z' fill='white'/%3e%3cpath d='M198.558 31.4731C196.074 31.4731 193.835 30.9631 191.842 29.9432C189.877 28.8941 188.332 27.4516 187.205 25.6157C186.108 23.7798 185.559 21.6962 185.559 19.3649C185.559 17.0336 186.108 14.95 187.205 13.1141C188.332 11.2782 189.877 9.85025 191.842 8.8303C193.835 7.78122 196.074 7.25667 198.558 7.25667C201.013 7.25667 203.151 7.78122 204.971 8.8303C206.819 9.85025 208.163 11.3219 209 13.2452L203.757 16.0865C202.544 13.93 200.797 12.8518 198.515 12.8518C196.752 12.8518 195.294 13.4346 194.138 14.6003C192.983 15.7659 192.405 17.3541 192.405 19.3649C192.405 21.3756 192.983 22.9638 194.138 24.1295C195.294 25.2951 196.752 25.878 198.515 25.878C200.825 25.878 202.573 24.7997 203.757 22.6433L209 25.5283C208.163 27.3933 206.819 28.8504 204.971 29.8995C203.151 30.9486 201.013 31.4731 198.558 31.4731Z' fill='white'/%3e%3c/svg%3e ");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .quiz-app__footer-content {
    display: flex;
  }

  .quiz-app__footer-text {
    margin-top: 5px;
  }
}

.app-btn.btn.end-page-btn {
  color: #262b31;
  border-radius: 4px;
  margin-left: auto;
  background: #fff;
  box-shadow: 0px 2px 12px 0px rgba(37, 51, 66, 0.08);
  &.active {
    background-color: var(--app-color);
    color: var(--app-text-color);
  }
}

.polls-pagination__in-footer {
  .polls-pagination {
    border-radius: 0;
  }
  display: none;
  @media (max-width: 576px) {
    display: block;
    .polls-pagination__wrapper {
      padding: 10px;
      margin: 0;
    }
  }
}
</style>
