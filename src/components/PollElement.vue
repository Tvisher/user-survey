<template>
  <div class="poll-item">
    <div class="poll-item__head">
      <div class="poll-item__head-wrapper">
        <div class="poll-item__name">
          <div class="poll-item__num">{{ indexNumber }}</div>
          <div class="poll-item__title">{{ pollItemName }}</div>
        </div>
      </div>
    </div>
    <app-visual-poll-body
      :pollItemId="pollItemId"
      :pollItemType="pollItemType"
      :pollItemData="pollItemData"
    />
  </div>
</template>

<script>
import AppVisualPollBody from "./pollSegments/VisualPollBody.vue";

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
  },
  methods: {},
};
</script>

<style>
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
</style>
