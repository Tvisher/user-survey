import { createStore } from 'vuex'
import axios from "axios";
import devJson from "./dev-api.js";



const quizID = document.querySelector('#app').dataset.pollId;
const userID = document.querySelector('#app').dataset.user;
const isAdmin = document.querySelector('#app').hasAttribute('data-admin') ? true : false;


export default createStore({
  state: {
    quizID,
    isAdmin,
    appDataLoaded: false,
    showCurrentAnswer: false,
    getValidate: false,
    getPageValidate: false,
    surveyQuestionsPages: [],
    currentPadeId: '',
    appSettings: {},
    userAnswers: [],
    startTime: 0,
    surveyCompleted: false,
  },
  getters: {
    getCurrentPage: (state) => (state.surveyQuestionsPages.find(page => page.id === state.currentPadeId)),
    getCurrentAnswer: (state) => questionId => {
      const questionPage = state.userAnswers.find(page => page.pageData.find(answ => answ.questionId === questionId));
      const question = questionPage.pageData.find(answ => answ.questionId === questionId);
      return question.userAnswer
    },
    questionIsHasAnswer: (state) => questionId => {
      const questionPage = state.userAnswers.find(page => page.pageData.find(answ => answ.questionId === questionId));
      const question = questionPage.pageData.find(answ => answ.questionId === questionId);
      return question.userAnswer.length > 0
    },
  },
  mutations: {
    setStartTime(state) {
      state.startTime = new Date();
    },
    setSurveyQuestionsData(state, payload) {
      console.log('setSurveyQuestionsData', payload);
      // state.surveyQuestionsPages = payload.filter(page => page.pollList.length > 0);
      state.surveyQuestionsPages = payload;
      state.currentPadeId = state.surveyQuestionsPages[0].id;

      const userAnswersList = payload
        .map(page => {
          const pageAnswersList = page.pollList.map(item => {
            const hasCurrentAnswers = item.data.hasOwnProperty('optionsData') && item.data.optionsData.hasOwnProperty('currentAnswerId') && item.data.optionsData.currentAnswerId.length > 0;
            let currentAnswers = hasCurrentAnswers ? item.data.optionsData.currentAnswerId : [];
            let optionsList = item.data.hasOwnProperty('optionsData') ? item.data.optionsData.optionsList : [];
            if (item.type === 'ranging' && item.data.optionsData.isHasCorrectListAnswers) {
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
      if (state.surveyCompleted) {
        return
      }
      const questionPage = state.userAnswers.find(page => page.pageData.find(answ => answ.questionId === questionId));
      if (questionPage.pageIsBlocked) {
        return
      }
      const question = questionPage.pageData.find(answ => answ.questionId === questionId);
      if (typeof userAnswer == 'string') {
        question.userAnswer = [userAnswer];
      } else {
        question.userAnswer = [...userAnswer];
      }
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
    compliteSurvey(state) {
      state.surveyCompleted = true;
    },
    setShowCurrentAnswer(state, value) {
      state.showCurrentAnswer = value;
    },
    setPreviousWalkthrough: (state, newState) => {
      for (let key in newState) {
        state[key] = newState[key]
      }
      document.body.style.setProperty("--app-color", state.appSettings.appColor.value);
      document.body.style.setProperty("--app-text-color", state.appSettings.appTextColor.value);
    },
  },
  actions: {
    getAppDataFromServer({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/local/templates/quiz/itemjson.php', {
          params: {
            id: quizID,
            type: 'quiz',
          }
        })
          .then(function (response) {
            // console.log(response.data);
            const appData = JSON.parse(response.data.resState);
            const surveyQuestionsData = appData.pollPages;
            const appSettings = appData.appSettings;

            const complitedPoll = localStorage.getItem(`${quizID}`);
            if (!appSettings.takeTheQuizagain && complitedPoll) {
              commit('setPreviousWalkthrough', JSON.parse(complitedPoll));
            } else {
              if (complitedPoll) localStorage.removeItem(`${quizID}`);
              commit('setSurveyQuestionsData', surveyQuestionsData);
              commit('setSurveyAppSettings', appSettings);
            }
            resolve(response);

          })
          .catch(function (error) {
            // DEV
            const appData = devJson;
            const surveyQuestionsData = appData.pollPages;
            const appSettings = appData.appSettings;

            const complitedPoll = localStorage.getItem(`${quizID}`);
            if (!appSettings.takeTheQuizagain && complitedPoll) {
              commit('setPreviousWalkthrough', JSON.parse(complitedPoll));
            } else {
              if (complitedPoll) localStorage.removeItem(`${quizID}`);
              commit('setSurveyQuestionsData', surveyQuestionsData);
              commit('setSurveyAppSettings', appSettings);
            }
            reject(error);
          });
      });

    },
    setAppDataOnServer({ state }) {
      return new Promise((resolve, reject) => {
        const serverData = {};
        serverData.informationAboutPassage = JSON.parse(JSON.stringify(state.userAnswers));
        serverData.completionTimeInMilliseconds = new Date() - state.startTime;
        if (!state.appSettings.takeTheQuizagain) {
          localStorage.setItem(`${state.quizID}`, JSON.stringify(state));
        }
        axios.post('/local/templates/quiz/resultjson.php',
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



