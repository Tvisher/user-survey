<template>
  <div class="pair-ranking-visual">
    <div class="pair-ranking__col">
      <div class="pair-ranking__item">
        <div class="variant-item__dragg"></div>
      </div>
    </div>
    <!-- <div class="pair-ranking__col">

    </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.pair-ranking-visual {
  display: flex;
  .pair-ranking__col {
    width: 50%;
  }

  .pair-ranking__item {
    position: relative;
    border-radius: 4px;
    border: 1px solid rgba(0, 66, 105, 0.28);
    padding: 18px;
    color: #262b31;
    font-size: 14px;
    font-weight: 500;
    line-height: 140%; /* 19.6px */
  }
}
</style>
