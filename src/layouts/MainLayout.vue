<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <img src="public/icons/encurtador.png" alt="">
        <q-toolbar-title>
          Encurtador de URL
        </q-toolbar-title>
        <div v-if="!userLogged">
          <q-btn flat round dense label="LOGIN" router-link to="/login" />
        </div>
        <div v-else>
          <q-btn flat round dense label="SAIR" @click="exitUser" router-link to = "/"/>
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">


import { defineComponent, ref } from 'vue'
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false);
    let userLogged = ref();

    function exitUser () {
      userLogged.value = null;
      localStorage.removeItem('userLogged')
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      userLogged,
      exitUser
    }
  },
  mounted() {
    this.userLogged = localStorage.getItem('userLogged')
  }
})
</script>
