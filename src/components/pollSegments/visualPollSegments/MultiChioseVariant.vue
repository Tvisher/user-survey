<template>
  <div class="multiple-choise-visual">
    <label
      class="single-choise-visual__label"
      :class="{
        checked: checkedInputs.includes(option.id),
        correct: correctAnswerId.includes(option.id),
        uncorrect:
          showCurrentAnswer &&
          hasCorrectAnswer &&
          !correctAnswerId.includes(option.id),
      }"
      v-for="option in optionsData.optionsList"
      :key="option.id"
    >
      <input
        class="single-choise-visual__input"
        type="checkbox"
        :name="pollItemId"
        :checked="checkedInputs.includes(option.id)"
        @input="getChecket($event, option.id)"
      />
      <p class="single-choise-visual__text">{{ option.value }}</p>
    </label>
    <label
      v-if="
        optionsData.hasOwnProperty('hasCustomAnswer') &&
        optionsData.hasCustomAnswer === true
      "
      class="single-choise-visual__label custom-user-answer multiple-custom-user-answer"
      :class="{ checked: checkedInputs.includes('custom-answer') }"
    >
      <div class="multiple-custom-user-answer__wrapper">
        <span style="font-size: 14px">Ваш вариант ответа</span>
        <input
          class="single-choise-visual__input"
          type="checkbox"
          :name="pollItemId"
          @input="getChecket($event, 'custom-answer')"
        />
        <input
          type="text"
          class="variant-item__filed"
          v-model.trim="customAnswerValue"
          @input="updateCustomAnswer"
        />
      </div>
    </label>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  props: {
    optionsData: Object,
    pollItemId: String,
  },
  data() {
    return {
      checkedInputs: [],
      customAnswerValue: "",
    };
  },
  computed: {
    ...mapState({
      showCurrentAnswer: (state) => state.showCurrentAnswer,
    }),
    ...mapGetters(["getCurrentAnswer"]),
    hasCorrectAnswer() {
      return (
        this.optionsData.currentAnswerId.length > 0 &&
        this.showCurrentAnswer === true
      );
    },
    correctAnswerId() {
      if (this.hasCorrectAnswer) {
        return this.optionsData.currentAnswerId;
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapMutations(["setUserAnswer"]),

    getChecket(event, inputId) {
      const isChecked = event.target.checked;
      if (isChecked) {
        this.checkedInputs.push(inputId);
      } else {
        this.checkedInputs = this.checkedInputs.filter((id) => id !== inputId);
      }
      this.setUserAnswer({
        questionId: this.pollItemId,
        userAnswer: [...this.checkedInputs],
        customAnswerValue: this.customAnswerValue,
      });
    },
    updateCustomAnswer() {
      if (this.checkedInputs.includes("custom-answer")) {
        this.setUserAnswer({
          questionId: this.pollItemId,
          userAnswer: [...this.checkedInputs],
          customAnswerValue: this.customAnswerValue,
        });
      }
    },
  },

  beforeMount() {
    if (this.getCurrentAnswer(this.pollItemId).length > 0) {
      this.checkedInputs = [...this.getCurrentAnswer(this.pollItemId)];
    }
  },
};
</script>

<style lang="scss">
.multiple-choise-visual {
  .single-choise-visual__text {
    &:before {
      border-radius: 4px;
    }
    &:after {
      background-color: transparent;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='8' height='9' viewBox='0 0 8 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1288_2204)'%3e%3cpath d='M2.58306 7.38763C2.35598 7.38772 2.13819 7.29746 1.97775 7.13675L0.147687 5.30737C-0.049229 5.11039 -0.049229 4.79109 0.147687 4.59411C0.344666 4.39719 0.663969 4.39719 0.860947 4.59411L2.58306 6.31623L7.13905 1.76024C7.33603 1.56332 7.65533 1.56332 7.85231 1.76024C8.04923 1.95721 8.04923 2.27652 7.85231 2.4735L3.18838 7.13675C3.02794 7.29746 2.81015 7.38772 2.58306 7.38763Z' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1288_2204'%3e%3crect width='8' height='8' fill='white' transform='translate(0 0.5)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ");
    }
  }
}

.multiple-choise-visual
  .single-choise-visual__input:checked
  + .single-choise-visual__text:before {
  background-color: var(--app-color);
}

.single-choise-visual__label {
  position: relative;
  padding-right: 48px;
  &::after {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    content: "";
  }
  &.correct {
    &::after {
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='18' height='18' rx='9' fill='%2330C02D'/%3e%3cpath d='M5 9.72414L6.48101 11.2562C6.87409 11.6629 7.52591 11.6629 7.91899 11.2562L13 6' stroke='white' stroke-linecap='round'/%3e%3c/svg%3e ");
    }
  }
  &.uncorrect {
    &::after {
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='18' height='18' rx='9' fill='%23DC1F1F'/%3e%3cpath d='M6 12L12 6' stroke='white' stroke-linecap='round'/%3e%3cpath d='M12 12L6 6' stroke='white' stroke-linecap='round'/%3e%3c/svg%3e ");
    }
  }
}

.multiple-custom-user-answer {
  padding-left: 50px;
  &.checked {
    .multiple-custom-user-answer__wrapper {
      &::after {
        opacity: 1;
      }
      &::before {
        background-color: var(--app-color);
        border-color: var(--app-color);
      }
    }
  }
}
.multiple-custom-user-answer__wrapper {
  &::after {
    content: "";
    position: absolute;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='8' height='9' viewBox='0 0 8 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1288_2204)'%3e%3cpath d='M2.58306 7.38763C2.35598 7.38772 2.13819 7.29746 1.97775 7.13675L0.147687 5.30737C-0.049229 5.11039 -0.049229 4.79109 0.147687 4.59411C0.344666 4.39719 0.663969 4.39719 0.860947 4.59411L2.58306 6.31623L7.13905 1.76024C7.33603 1.56332 7.65533 1.56332 7.85231 1.76024C8.04923 1.95721 8.04923 2.27652 7.85231 2.4735L3.18838 7.13675C3.02794 7.29746 2.81015 7.38772 2.58306 7.38763Z' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1288_2204'%3e%3crect width='8' height='8' fill='white' transform='translate(0 0.5)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ");
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  &::before {
    border-radius: 4px;
    content: "";
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid #c2cfe0;
    width: 16px;
    height: 16px;
  }
}
</style>
