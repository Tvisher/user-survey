<template>
  <div class="confirm-modal" :class="{ 'show-modal': showModal }">
    <div class="confirm-modal__content">
      <div class="confirm-modal__close" @click="$emit('cancel')"></div>
      <h3 class="confirm-modal__title">{{ title }}</h3>
      <span class="confirm-modal__descr">{{ description }}</span>
      <div class="confirm-modal__btns" v-if="isOkModalType">
        <button
          class="btn app-btn"
          style="width: 100%"
          @click="$emit('cancel')"
        >
          Понятно
        </button>
      </div>
      <div class="confirm-modal__btns" v-else>
        <button class="btn app-btn" @click="$emit('confirmRemove')">
          Удалить
        </button>
        <button class="btn app-btn btn_pale" @click="$emit('cancel')">
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: { type: Boolean },
    title: { type: String },
    description: { type: String },
    isOkModalType: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
.confirm-modal {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  &.show-modal {
    opacity: 1;
    visibility: visible;
  }
}
.confirm-modal__content {
  border-radius: 8px;
  max-width: 450px;
  width: 100%;
  background: #ebf4ff;
  padding: 30px;
  position: relative;
}
.confirm-modal__close {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='1.41406' width='26' height='2' transform='rotate(45 1.41406 0)' fill='%2348474D'/%3e%3crect x='19.7988' y='1.41406' width='26' height='2' transform='rotate(135 19.7988 1.41406)' fill='%2348474D'/%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: contain;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.confirm-modal__title {
  padding-right: 20px;
  color: #262b31;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  margin-bottom: 20px;
}
.confirm-modal__descr {
  color: #202020;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 15.6px */
  margin-bottom: 20px;
  display: block;
}
.confirm-modal__btns {
  display: flex;
  gap: 20px;
  width: 100%;
  .btn {
    width: 50%;
    font-size: 16px;
  }
}
.btn.btn_pale {
  color: var(--app-color) !important;
  border: 2px solid var(--app-color) !important;
  background-color: #ebf4ff !important;
}
</style>
