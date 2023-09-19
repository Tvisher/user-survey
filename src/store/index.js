import { createStore } from 'vuex'
import axios from "axios";
import devJson from "./dev-api.js";



const quizID = document.querySelector('#app').dataset.pollId;
const appType = document.querySelector('#app').dataset.pollType;

export default createStore({
  state: {
    appDataLoaded: false,
    surveyQuestionsPages: [],
    currentPadeId: '',
    appSettings: {},
    userAnswers: [],
    startTime: 0,
  },
  getters: {
    getCurrentPage: (state) => (state.surveyQuestionsPages.find(page => page.id === state.currentPadeId))
  },
  mutations: {
    setSurveyQuestionsData(state, payload) {
      console.log(payload);
      state.surveyQuestionsPages = payload;
      state.currentPadeId = state.surveyQuestionsPages[0].id;
    },

    setSurveyAppSettings(state, payload) {
      state.appSettings = payload;
      document.body.style.setProperty("--app-color", state.appSettings.appColor.value);
      document.body.style.setProperty("--app-text-color", state.appSettings.appTextColor.value);
      state.appDataLoaded = true;
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



