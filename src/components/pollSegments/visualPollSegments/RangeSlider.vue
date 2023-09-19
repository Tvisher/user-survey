<template>
  <div class="range-slider-visual">
    <div class="range-slider__min">
      {{ this.rangeData.min }}
    </div>
    <Slider
      v-model="defaultValues"
      :min="minToSlider"
      :max="maxToSlider"
      :direction="sliderDirection"
    />
    <div class="range-slider__max">
      {{ this.rangeData.max }}
    </div>
  </div>
</template>

<script>
import Slider from "@vueform/slider";

export default {
  components: { Slider },
  props: {
    rangeData: Object,
    pollItemId: String,
  },
  data: () => ({
    defaultValues: [0, 0],
  }),
  computed: {
    sliderDirection() {
      return this.rangeData.max > this.rangeData.min ? "ltr" : "rtl";
    },
    minToSlider() {
      return this.sliderDirection === "ltr"
        ? this.strToNum(this.rangeData.min)
        : this.strToNum(this.rangeData.max);
    },
    maxToSlider() {
      return this.sliderDirection === "ltr"
        ? this.strToNum(this.rangeData.max)
        : this.strToNum(this.rangeData.min);
    },
  },
  methods: {
    strToNum(value) {
      return +String(value).replace(/[^0-9]/g, "");
    },
  },

  beforeMount() {
    let minParam =
      this.sliderDirection === "ltr"
        ? this.rangeData.defaultMin
        : this.rangeData.defaultMax;
    let maxParam =
      this.sliderDirection === "ltr"
        ? this.rangeData.defaultMax
        : this.rangeData.defaultMin;
    minParam = this.strToNum(minParam);
    maxParam = this.strToNum(maxParam);
    this.defaultValues = [minParam, maxParam];
  },
};
</script>
<style src="@vueform/slider/themes/default.css"></style>

<style lang="scss">
.slider-touch-area {
  cursor: grab !important;
  background-color: transparent;
  border: 2px solid var(--app-color);
  border-radius: 50%;
  width: 16px;
  height: 16px;
}
.range-slider-visual {
  width: 100%;
  position: relative;
  border-radius: 4px;
  border: 1px solid rgba(0, 66, 105, 0.28);
  padding: 70px 10px 30px;
}

.slider-connects,
.slider-base {
  height: 4px;
}
.slider-base {
  border-radius: 4px;
  background: rgba(0, 66, 105, 0.07);
}
.slider-connect {
  background-color: var(--app-color) !important;
}
.slider-tooltip {
  background-color: #fff !important;
  color: #002033;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  border: none;
  box-shadow: 0px 8px 24px 0px rgba(0, 32, 51, 0.12),
    0px 4px 4px 0px rgba(0, 32, 51, 0.04);
}

.range-slider__min,
.range-slider__max {
  position: absolute;
  bottom: 10px;
  color: #002033;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%; /* 18px */
}
.range-slider__min {
  left: 10px;
}
.range-slider__max {
  right: 10px;
  text-align: right;
}
</style>
