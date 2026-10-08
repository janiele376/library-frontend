<template>
  <div id="header">
    <div class="container-title">
      <img class="img-book" src="../assets/book-logo.svg" alt="Logo" />

      <h2 class="title" data-translation="header_title">Biblioteca Dashboard</h2>

      <div class="container-user-header" v-if="login">
        <div class="imgs">
          <img class="img-user" src="../assets/book-logo.svg" alt="Usuário" />

          <q-btn
            class="img-adjustments"
            icon="settings"
            to="/"
            flat
            round
            dense
            size="20px"
          ></q-btn>

          <q-btn class="img-logout" icon="logout" to="/" flat round dense size="20px"></q-btn>
        </div>

        <div class="text">
          <p id="tenant-logged-name">Usuário</p>

          <p data-translation="nav_settings">Ajustes</p>

          <p data-translation="nav_logout">Sair</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface InputForm {
  login?: boolean;
}

withDefaults(defineProps<InputForm>(), {
  login: false,
});
</script>

<style scoped>
#header {
  background-color: var(--bg-card);
  color: var(--text-main);
  width: 100%;
  min-height: 7rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

#header .container-title {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

#header .title {
  font-size: 1.875rem;
}

#header .img-book {
  width: 2.8rem;
  height: auto;
  margin-top: -1rem;
}

#header .container-user-header {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
}

#header .container-user-header .imgs {
  display: flex;
  align-items: center;
  gap: 1rem;
}

#header .container-user-header .text {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.8rem;
  margin-right: 1rem;
}

#header .container-user-header .imgs .img-user {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
}

#header .container-user-header .imgs .img-adjustments,
#header .container-user-header .imgs .img-logout {
  width: 2.2rem;
  height: 2.2rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

#header .container-user-header .imgs .img-adjustments:hover,
#header .container-user-header .imgs .img-logout:hover {
  opacity: 0.6;
}
</style>
