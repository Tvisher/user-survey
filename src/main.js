import { createApp, h } from 'vue'
import App from './App.vue'
import store from './store'

import "./assets/scss/style.scss";
import "./assets/scss/quiz-style.scss";
import '@vueup/vue-quill/dist/vue-quill.snow.css';


import vSelect from 'vue-select';
vSelect.props.components.default = () => ({
    OpenIndicator: {
        render: () => h("span", {
            class: { "toggle-arrow": true },
        }),
    },
    Deselect: {
        render: () => h("span", {
            class: { "deselect-btn": true },
            title: ''
        }),
    },
});


const app = createApp(App)
    .component('vSelect', vSelect)
    .use(store)
    .mount('#app')
