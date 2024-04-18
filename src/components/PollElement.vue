<template>
  <div
    class="poll-item"
    :class="{
      questionEmptyAnswer: showError,
    }"
  >
    <!-- <div class="poll-item__head">
      <div class="poll-item__head-wrapper">
        <div class="poll-item__name">
          <div class="poll-item__num">{{ indexNumber }}</div>
          <div class="poll-item__title">{{ pollItemName }}</div>
        </div>
      </div>
    </div> -->
    <app-visual-poll-body
      :pollItemId="pollItemId"
      :pollItemType="pollItemType"
      :pollItemData="pollItemData"
    />
    <span class="empty-error" v-if="showError">
      Необходимо ответить на вопрос
    </span>
  </div>
</template>

<script>
import AppVisualPollBody from "./pollSegments/VisualPollBody.vue";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    AppVisualPollBody,
  },
  props: {
    pollItemId: { type: [Number, String] },
    pollItemType: { type: String },
    pollItemName: { type: String },
    pollItemData: { type: Object },
    pollNumber: { type: Number },
  },

  data() {
    return {};
  },
  computed: {
    indexNumber() {
      return this.pollNumber + 1;
    },
    ...mapState(["getPageValidate"]),
    ...mapGetters(["questionIsHasAnswer"]),
    questionHasAnswer() {
      return this.questionIsHasAnswer(this.pollItemId);
    },
    showError() {
      return this.getPageValidate && !this.questionHasAnswer;
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.poll-item__counter {
  color: #002033;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 27.6px */
}

.sub-btn {
  margin-top: 20px;
}
.empty-error {
  color: red;
  font-size: 14px;
}
.poll-item {
  border: 1px solid #fff;

  &.questionEmptyAnswer {
    border-color: red;
    .poll-item__title {
      color: red;
    }
  }
}
</style>
