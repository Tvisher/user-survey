<template>
  <div :ref="`${pollItemId}-multiSelectComponent`">
    <v-select
      class="multi-select"
      multiple
      :pushTags="true"
      :options="optionsListForSelect"
      :reduce="(option) => option.id"
      v-model="selectedOptionId"
      :placeholder="placeholder"
      append-to-body
      :calculate-position="withPopper"
    >
      <template #no-options> Ничего не найдено </template>
    </v-select>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
import { mapState, mapMutations, mapGetters } from "vuex";
import { nextTick } from "vue";

export default {
  data() {
    return {
      selectedOptionId: [],
      placeholder: "Выберите один или несколько вариантов ответа",
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
    ...mapGetters(["getCurrentAnswer"]),
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
      this.setUserAnswer({
        questionId: this.pollItemId,
        userAnswer: [...this.selectedOptionId],
      });
    },
  },
  beforeMount() {
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
  mounted() {
    if (this.getCurrentAnswer(this.pollItemId).length > 0) {
      this.selectedOptionId = [...this.getCurrentAnswer(this.pollItemId)];
      nextTick().then(() => {
        if (this.optionsData.currentAnswerId.length > 0) {
          const currentTextValues = this.optionsListForSelect
            .filter((item) => {
              if (this.optionsData.currentAnswerId.includes(item.id)) {
                return item;
              }
            })
            .map((item) => item.label.toLowerCase());
          const multiSelectParentElement =
            this.$refs[`${this.pollItemId}-multiSelectComponent`];

          const selectedOption =
            multiSelectParentElement.querySelectorAll(".vs__selected");

          selectedOption.forEach((item) => {
            const selectedOptionText = item.textContent.toLowerCase();
            if (currentTextValues.includes(selectedOptionText)) {
              item.classList.add("correct");
            } else {
              item.classList.add("uncorrect");
            }
          });
        }
      });
    }
  },
};
</script>

<style lang="scss">
.multi-select {
  .vs__selected-options {
    display: flex;
    gap: 4px;
    .vs__selected {
      padding: 4px 8px 4px 12px !important;
      border-radius: 4px;
      background-color: rgba(0, 66, 105, 0.07) !important;
      border: none;
      display: flex;
      align-items: center;
      font-size: 16px !important;
      margin-right: 4px;
      &.correct,
      &.uncorrect {
        position: relative;
        padding: 4px 12px 4px 36px !important;
        &::before {
          position: absolute;
          width: 18px;
          height: 18px;
          top: 50%;
          transform: translateY(-50%);
          content: "";
          left: 12px;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .vs__deselect {
          display: none;
        }
      }
      &.correct {
        &::before {
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='18' height='18' rx='9' fill='%2330C02D'/%3e%3cpath d='M5 9.72414L6.48101 11.2562C6.87409 11.6629 7.52591 11.6629 7.91899 11.2562L13 6' stroke='white' stroke-linecap='round'/%3e%3c/svg%3e ");
        }
      }
      &.uncorrect {
        &::before {
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='18' height='18' rx='9' fill='%23DC1F1F'/%3e%3cpath d='M6 12L12 6' stroke='white' stroke-linecap='round'/%3e%3cpath d='M12 12L6 6' stroke='white' stroke-linecap='round'/%3e%3c/svg%3e ");
        }
      }
    }
    .vs__deselect {
      margin-left: 6px !important;
      svg {
        display: none;
      }
      width: 16px;
      height: 16px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg opacity='0.4'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.75699 2.34326L2.34277 3.75748L6.58541 8.00012L2.34277 12.2428L3.75699 13.657L7.99963 9.41433L12.2423 13.657L13.6565 12.2428L9.41384 8.00012L13.6565 3.75748L12.2423 2.34326L7.99963 6.5859L3.75699 2.34326Z' fill='%2300395C' fill-opacity='0.8'/%3e%3c/g%3e%3c/svg%3e ");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
}
.vs__dropdown-toggle {
  min-height: 53px;
}
</style>
