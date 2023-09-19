<template>
  <div>
    <div class="poll-item__answer" v-html="deltaToHtml"></div>
  </div>
</template>

<script>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default {
  props: {
    editorValue: { type: Object },
  },
  computed: {
    deltaToHtml() {
      const deltaOps = this.editorValue.ops;
      const converter = new QuillDeltaToHtmlConverter(deltaOps, {});
      return converter.convert();
    },
  },
};
</script>

<style></style>
