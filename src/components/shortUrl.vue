<template>

  <div class="q-pa-xl" style="width: 1000px">
     <q-card class="my-card q-col-gutter-xl-sm q-pa-md q-ma-md" align="center">
      <q-card-section align="left">
        <q-input outlined  v-model="baseUrl" class="fas fa-link"  type="Email" label="Sua URL *" />
        <q-expansion-item
        label="Mais opções"
        align="right"
      >
        <div class="q-gutter-md">
          <q-input outlined v-model="shortUrlInput"  type="Email" label="Personalize sua url"/>
        <q-input outlined v-model="expirationDate"  type="Email" label="Data de expiracao" />
        </div>
        </q-expansion-item>
      </q-card-section>
       <q-btn :loading="loading" unelevated rounded  color="primary"   label="Encurtar" @click="createShortURl" >
         <template v-slot:loading>
             <q-circular-progress
                indeterminate
                size="20px"
                color="white"
              />
          </template>
       </q-btn>
    </q-card>
  </div>

  <q-dialog v-model="alert">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6" v-if="url.status == 200" > Parabéns, sua url está pronta. </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{url.data.data}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script lang="ts">

import {defineComponent, ref} from 'vue'

import ShortUrl from "src/services/shortUrl";

export default defineComponent ({
  name:'shortUrl',
  setup() {
    let baseUrl = ref();
    let shortUrlInput = ref();
    let expirationDate = ref(7);
    let url = ref();
    let  alert = ref(false);
    let loading = ref(false)



    async function createShortURl(){
      try {
      loading.value = true;
      const shortUrl = new ShortUrl();
      const request = await shortUrl.createShortUrl(baseUrl.value, shortUrlInput.value, expirationDate.value)
      baseUrl.value = null;
      shortUrlInput.value = null;
      url.value = request;
      alert.value = true;
      loading.value =false;

      }catch(error) {

      }

    }

    return {
      baseUrl,
      shortUrlInput,
      expirationDate,
      createShortURl,
      url,
      alert,
      loading
    }
  }
})


</script>
