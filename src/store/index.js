import { createStore } from 'vuex'
import axios from "axios";
import devJson from "./dev-api.js";



const quizID = document.querySelector('#app').dataset.pollId;
const appType = document.querySelector('#app').dataset.pollType;

export default createStore({
  state: {
    appDataLoaded: false,
    // showCurrentAnswer: false,
    getValidate: false,
    getPageValidate: false,
    surveyQuestionsPages: [],
    currentPadeId: '',
    appSettings: {},
    userAnswers: [],
    startTime: 0,
  },
  getters: {
    getCurrentPage: (state) => (state.surveyQuestionsPages.find(page => page.id === state.currentPadeId)),
    questionIsHasAnswer: (state) => questionId => {
      const questionPage = state.userAnswers.find(page => page.pageData.find(answ => answ.questionId === questionId));
      const question = questionPage.pageData.find(answ => answ.questionId === questionId);
      return question.userAnswer.length > 0
    },
    // currenPageHasAllAnswers: state => {
    //   const currentPage = state.userAnswers.find(page => page.pageId === state.currentPadeId);
    //   console.log(currentPage.pageData.every(answer => answer.userAnswer.length > 0));
    //   return currentPage.pageData.every(answer => answer.userAnswer.length > 0);
    // }
  },
  mutations: {
    setSurveyQuestionsData(state, payload) {
      // console.log(payload);
      state.surveyQuestionsPages = payload;
      state.currentPadeId = state.surveyQuestionsPages[0].id;

      const userAnswersList = payload
        .map(page => {
          const pageAnswersList = page.pollList.map(item => {
            const hasCurrentAnswers = item.data.hasOwnProperty('optionsData') && item.data.optionsData.hasOwnProperty('currentAnswerId') && item.data.optionsData.currentAnswerId.length > 0;
            let currentAnswers = hasCurrentAnswers ? item.data.optionsData.currentAnswerId : [];
            let optionsList = item.data.hasOwnProperty('optionsData') ? item.data.optionsData.optionsList : [];
            if (item.type === 'ranging') {
              currentAnswers = item.data.optionsData.optionsList.map(item => item.id);
            }
            return {
              questionType: item.type,
              questionId: item.id,
              optionsList,
              correctAnswer: currentAnswers,
              userAnswer: [],
            }
          });
          return {
            pageId: page.id,
            pageIsBlocked: false,
            pageData: pageAnswersList,
          }
        })

      state.userAnswers = userAnswersList;
    },

    setSurveyAppSettings(state, payload) {
      state.appSettings = payload;
      document.body.style.setProperty("--app-color", state.appSettings.appColor.value);
      document.body.style.setProperty("--app-text-color", state.appSettings.appTextColor.value);
      state.appDataLoaded = true;
    },

    setUserAnswer(state, { questionId, userAnswer }) {
      const questionPage = state.userAnswers.find(page => page.pageData.find(answ => answ.questionId === questionId));
      if (questionPage.pageIsBlocked) {
        return
      }
      const question = questionPage.pageData.find(answ => answ.questionId === questionId);
      question.userAnswer = userAnswer;
      console.log(question);
    },

    togglePageValidate(state, value) {
      state.getPageValidate = value
    },
    toggleCustomFieldsValidate(state, value) {
      state.getValidate = value
    },
    blockedPage(state, { pageId, value }) {
      state.userAnswers.find(page => page.pageId === pageId).pageIsBlocked = value;
    },
    setCurrentPageId(state, id) {
      state.currentPadeId = id
    },

  },
  actions: {
    getAppDataFromServer({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/bitrix/templates/quiz/itemjson.php', {
          params: {
            id: quizID,
            type: 'quiz',
          }
        })
          .then(function (response) {
            // console.log(response.data);
            const appData = JSON.parse(response.data.resState);
            const surveyQuestionsData = appData.pollPages;
            commit('setSurveyQuestionsData', surveyQuestionsData);

            const appSettings = appData.appSettings;
            commit('setSurveyAppSettings', appSettings);
            resolve(response);

          })
          .catch(function (error) {
            // console.log(error);
            // DEV
            const appData = JSON.parse(devJson.resState);
            const surveyQuestionsData = appData.pollPages;
            commit('setSurveyQuestionsData', surveyQuestionsData);

            const appSettings = appData.appSettings;
            commit('setSurveyAppSettings', appSettings);
            reject(error);
          });
      });

    },
    setAppDataOnServer({ state }) {
      return new Promise((resolve, reject) => {
        const serverData = {};
        serverData.informationAboutPassage = JSON.parse(JSON.stringify(state.userAnswers));
        serverData.completionTimeInMilliseconds = new Date() - state.startTime;
        axios.post('/bitrix/templates/quiz/resultjson.php',
          {
            id: quizID,
            user: userID,
            json: serverData,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(function (response) {
            console.log(response);
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    }
  }
});



