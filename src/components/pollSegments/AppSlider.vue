<template>
  <Swiper
    :modules="[Pagination, Autoplay]"
    :slides-per-view="1"
    :space-between="50"
    :pagination="{ clickable: true }"
    :loop="true"
    :speed="800"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: true,
    }"
  >
    <SwiperSlide v-for="slide in props.slides">
      <div class="slide-image">
        <img :src="slide.path" alt="" />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
const props = defineProps({
  slides: Array,
});
</script>

<style lang="scss">
.swiper-pagination-bullet-active {
  background: var(--app-color);
}

@media (max-width: 768px) {
  .slide-image {
    height: 55vw !important;
  }
}
</style>
