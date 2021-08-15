<template>
  <q-page class="row items-center justify-evenly q-px-xl">
      <shortUrl/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import shortUrl from "components/shortUrl.vue";

export default defineComponent({
  components: {shortUrl}
});
</script>
