<template>
  <q-linear-progress  v-if="loading" indeterminate />

  <div class="full-width q-pa-xl" v-else >


    <q-card v-for="url in urls?.data" :key="url.hash" class="row q-mb-lg">
      <div class="q-pa-md">
        <p> hash: <b>{{ url.hash }}</b></p>
        <p> expiration_date: <b>{{ url.expirate_date }}</b></p>
        <p> base_url: <b>{{ url.base_url }} </b></p>
        <p> short_url: <b>{{ url.short_url }}</b></p>
        <p> status: <b>{{ url.status }}</b></p>
      </div>
    </q-card>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="pages"
        :max="pages_count"
        direction-links
        boundary-links
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
      />
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref, watch} from 'vue';

import ShortUrl from "src/services/shortUrl";

export default defineComponent({
  name: 'listUrl',
  setup() {
      let urls = ref();
      const pages = ref(1);
      const pages_count = ref();
      const loading = ref(false);

      async function getUrl(pages: number) {
        const shortUrl = new ShortUrl();
        const request = await shortUrl.getAllShortUrl(pages)
        return request.data
      }

      watch(pages, async () => {
          loading.value = true;
          urls.value = await getUrl(pages.value)
          loading.value = false;
        }
      )

    return {
      urls,
      getUrl,
      pages,
      pages_count,
      loading
    }
  },
async mounted()
{
  this.loading = true;
  const request = await this.getUrl(this.pages);
  this.loading = false
  this.urls = request;
  this.pages_count = request.count_pages;
}

})
</script>
