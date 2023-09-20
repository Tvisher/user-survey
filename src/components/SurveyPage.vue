<template>
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
  />
</template>

<script>
import AppPollElement from "./PollElement.vue";

export default {
  props: { pageData: { type: Object } },
  components: {
    AppPollElement,
  },
  computed: {
    pagePollList() {
      return this.pageData.pollList;
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
</style>
