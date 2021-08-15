<template>
  <div class="row items-center justify-center q-px-xl te ">
    <div class="q-pa-xl " style="width: 1000px">
      <q-card class="my-card q-col-gutter-xl-sm q-pa-md q-ma-md " align="center">
        <q-card-section class="q-gutter-md">
          <q-input outlined v-model="username" type="email" label="login"/>
          <q-input outlined v-model="password" type="password" label="senha"/>
        </q-card-section>

        <q-btn :loading="loading" unelevated rounded color="primary" label="Login" @click="login">
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
  </div>
  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Erro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Usuario ou senha invalida
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue'

import LoginServices from "src/services/login";
import {useRouter} from 'vue-router'
import {LocalStorage, useQuasar} from 'quasar'

export default defineComponent({
  name: 'login',
  setup() {
    let password = ref();
    let username = ref();
    let request = null
    let router = useRouter();
    let loading = ref(false)
    let persistent = ref(false)

    async function login() {
      const loginServices = new LoginServices()
      try {
        loading.value = true
        request = await loginServices.login(username.value, password.value)
        loading.value = false
        LocalStorage.set('userLogged', 'true')

        void router.push('listUrl');
      } catch{
        loading.value = false;
        persistent.value = true;
      }
    }

    return {
      password,
      username,
      login,
      request,
      loading,
      persistent
    }
  }
})
</script>
