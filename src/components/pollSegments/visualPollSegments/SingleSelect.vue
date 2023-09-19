<template>
  <v-select
    :class="isCorretnAnswer"
    :options="optionsListForSelect"
    :reduce="(option) => option.id"
    v-model="selectedOptionId"
    :placeholder="placeholder"
    append-to-body
    :calculate-position="withPopper"
  >
    <template #no-options> Ничего не найдено </template>
  </v-select>
</template>

<script>
import { createPopper } from "@popperjs/core";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      selectedOptionId: "",
      placeholder: "Выберите один из вариантов ответа",
      placement: "bottom",
      optionsListForSelect: [],
    };
  },
  props: {
    optionsData: { type: Object },
    pollItemId: { type: String },
  },
  computed: {
    ...mapState({
      showCurrentAnswer: (state) => state.showCurrentAnswer,
    }),
    isCorretnAnswer() {
      if (
        this.optionsData.currentAnswerId.length > 0 &&
        this.showCurrentAnswer
      ) {
        return this.optionsData.currentAnswerId == this.selectedOptionId
          ? "correct"
          : "uncorrect";
      }
    },
  },

  methods: {
    // dropdownShouldOpen: () => true,
    withPopper(dropdownList, component, { width }) {
      dropdownList.style.width = width;
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offsetX: [0, -1],
            },
          },
          {
            name: "toggleClass",
            enabled: true,
            phase: "write",
            fn({ state }) {
              component.$el.classList.toggle(
                "drop-up",
                state.placement === "top"
              );
            },
          },
        ],
      });
      return () => popper.destroy();
    },
    ...mapMutations(["setUserAnswer"]),
  },
  watch: {
    selectedOptionId() {
      const userAnswer = this.selectedOptionId ? this.selectedOptionId : [];
      this.setUserAnswer({
        questionId: this.pollItemId,
        userAnswer,
      });
    },
  },
  mounted() {
    this.optionsListForSelect = this.optionsData.optionsList.reduce(
      (acc, item) => {
        const newItem = {
          label: item.value,
          id: item.id,
        };
        acc.push(newItem);
        return acc;
      },
      []
    );
  },
};
</script>

<style lang="scss">
.v-select {
  &.correct {
    .vs__selected {
      color: #34df34;
    }
    .vs__clear {
      display: none;
    }
  }
  &.uncorrect {
    .vs__selected {
      color: red;
    }
    .vs__clear {
      display: none;
    }
  }
}
.vs__dropdown-toggle {
  padding: 10px !important;
  border-radius: 4px !important;
  border: 1px solid rgba(0, 66, 105, 0.28) !important;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
}
.vs__actions {
  margin-top: -10px;
  margin-bottom: -10px;
  margin-right: -10px;
  padding: 0 !important;
}
.vs__search,
.vs__selected {
  margin-left: 0 !important;
  padding-left: 0 !important;
  margin-top: 0 !important;
  font-size: 18px !important;
  font-style: normal;
  font-weight: 400;
}
.vs__open-indicator.toggle-arrow {
  transform: translate(0) !important;
  border-left: 1px solid rgba(0, 66, 105, 0.28);
  cursor: pointer;
  width: 48px;
  height: 100%;
  display: block;
  position: relative;
  &:before {
    will-change: transform;
    transition: transform 0.2s ease-in-out;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    content: "";
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7.5 9L12 14L16.5 9H7.5Z' fill='%23002033' fill-opacity='0.35'/%3e%3c/svg%3e ");
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;
  }
}

.vs__clear {
  width: 48px;
  height: 100%;
  margin-right: 0 !important;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.16453 9.15597L2.8502 9.84982L6.00027 6.69986L9.14953 9.84923L9.15033 9.85002L9.85014 9.1501L6.70018 5.99997L9.85034 2.84993L9.14323 2.14282L6.0009 5.30066L2.85107 2.15065L2.15039 2.84986L5.30272 6.00229L2.16453 9.15597Z' fill='%2300395C' fill-opacity='0.8'/%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: 12px;
  background-position: center;
  svg {
    display: none;
  }
}
.vs__search {
  padding-left: 0 !important;
  color: rgba(0, 32, 51, 0.35) !important;
}
.vs--open {
  .vs__open-indicator.toggle-arrow:before {
    transform: scale(-1);
  }
}

.vs__dropdown-menu {
  width: 100%;
  .vs__dropdown-option {
    font-family: "Montserrat" !important;
    white-space: inherit;
    padding: 10px;
  }
}

.vs__no-options {
  padding: 20px;
}

.deselect-btn {
  display: block;
  width: 100%;
  height: 100%;
}

.v-select.drop-up.vs--open .vs__dropdown-toggle {
  border-radius: 0 0 4px 4px;
  border-top-color: transparent;
  border-bottom-color: rgba(60, 60, 60, 0.26);
}

[data-popper-placement="top"] {
  border-radius: 4px 4px 0 0 !important;
  border-top-style: solid !important;
  border-bottom-style: none !important;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15) !important;
}
</style>
