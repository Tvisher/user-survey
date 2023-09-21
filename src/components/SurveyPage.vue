<template>
  <div class="poll-pages" :class="{ pageIsBlocked }">
    <p class="page-description">
      {{ pageData.pageComment }}
    </p>

    <app-poll-element
      v-for="(question, index) in pagePollList"
      :pollNumber="index"
      :key="question.id"
      :pollItemId="question.id"
      :pollItemType="question.type"
      :pollItemName="question.typeName"
      :pollItemData="question.data"
      :class="{ pageIsBlocked }"
    />
  </div>
</template>

<script>
import AppPollElement from "./PollElement.vue";
import { mapState } from "vuex";

export default {
  props: {
    pageData: { type: Object },
  },
  components: {
    AppPollElement,
  },
  computed: {
    ...mapState({
      userAnswers: (state) => state.userAnswers,
    }),
    pagePollList() {
      return this.pageData.pollList;
    },
    pageIsBlocked() {
      return this.userAnswers.find((page) => page.pageId === this.pageData.id)
        .pageIsBlocked;
    },
  },
};
</script>

<style lang="scss">
.page-description {
  color: rgba(0, 32, 51, 0.6);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}
.poll-item__name:before {
  display: none !important;
}
.pageIsBlocked {
  pointer-events: none !important;
}
.poll-item.pageIsBlocked *::selection {
  background-color: transparent;
}
.poll-item__name {
  cursor: default !important;
}
</style>
