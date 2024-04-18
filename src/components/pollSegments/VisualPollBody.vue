<template>
  <div class="poll-body">
    <!-- <hr /> -->
    <div
      class="poll-body__image-block"
      v-if="isHasImageInPoll"
      :class="imagePositionType"
    >
      <img
        :src="pollItemData.pollImage.path"
        :alt="pollItemData.pollImage.name"
      />
    </div>
    <app-text-from-editor :editorValue="pollItemData.editorValue" />

    <div class="poll-item-choise">
      <app-single-choise-variant
        v-if="pollItemType === 'single-choice'"
        :optionsData="pollItemData.optionsData"
        :pollItemId="pollItemId"
      />
      <app-multi-choise-variant
        v-if="pollItemType === 'multiple-choice'"
        :optionsData="pollItemData.optionsData"
        :pollItemId="pollItemId"
      />
      <app-single-select
        v-if="pollItemType === 'drop-down-list'"
        :optionsData="pollItemData.optionsData"
        :pollItemId="pollItemId"
      />

      <app-multi-select
        v-if="pollItemType === 'multiple-drop-down-list'"
        :optionsData="pollItemData.optionsData"
        :pollItemId="pollItemId"
      />

      <app-range-slider
        v-if="pollItemType === 'range-selection'"
        :rangeData="pollItemData.rangeData"
        :pollItemId="pollItemId"
      />

      <app-ranging-visual
        v-if="pollItemType === 'ranging'"
        :optionsData="pollItemData.optionsData"
        :pollItemId="pollItemId"
      />
      <app-datapicker-visual
        v-if="pollItemType === 'date'"
        :dateData="pollItemData.dateData"
        :pollItemId="pollItemId"
      />
      <app-custom-fields-visual
        v-if="pollItemType === 'custom-fields'"
        :optionsData="pollItemData.optionsData"
        :pollItemId="pollItemId"
      />
    </div>
  </div>
</template>

<script>
import AppTextFromEditor from "./visualPollSegments/TextFromEditor.vue";
import AppSingleChoiseVariant from "./visualPollSegments/SingleChioseVariant.vue";
import AppMultiChoiseVariant from "./visualPollSegments/MultiChioseVariant.vue";
import AppSingleSelect from "./visualPollSegments/SingleSelect.vue";
import AppMultiSelect from "./visualPollSegments/MultiSelect.vue";
import AppRangeSlider from "./visualPollSegments/RangeSlider.vue";
import AppRangingVisual from "./visualPollSegments/RangingVisual.vue";
import AppDatapickerVisual from "./visualPollSegments/DatapickerVisual.vue";
import AppCustomFieldsVisual from "./visualPollSegments/CustomFieldsVisual.vue";
export default {
  components: {
    AppTextFromEditor,
    AppSingleChoiseVariant,
    AppMultiChoiseVariant,
    AppSingleSelect,
    AppMultiSelect,
    AppRangeSlider,
    AppRangingVisual,
    AppDatapickerVisual,
    AppCustomFieldsVisual,
  },
  props: {
    pollItemId: { type: [Number, String] },
    pollItemType: { type: String },
    pollItemData: { type: Object },
  },
  computed: {
    isHasImageInPoll() {
      const pollImage = this.pollItemData.pollImage;
      return pollImage && Object.keys(pollImage).length !== 0;
    },
    imagePositionType() {
      if (this.isHasImageInPoll) {
        return this.pollItemData.pollImage.stretchImage ? "_cover" : "_contain";
      }
    },
  },
};
</script>

<style></style>
