<template>
  <nav class="container-menu">
    <router-link to="/dashboard" class="menu-item active"> Dashboard </router-link>

    <span class="menu-item">Usuários</span>
    <span class="menu-item">Aluguéis</span>
    <span class="menu-item">Livros</span>
    <span class="menu-item">Editoras</span>
  </nav>
</template>

<style scoped>
.container-menu {
  width: 10rem;
  flex-shrink: 0;
  background-color: var(--btn-secondary-bg);
  display: flex;
  flex-direction: column;
}

.menu-item {
  width: 100%;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  border: 0.0625rem solid var(--border-color);
  text-decoration: none;
  font-size: 1.125rem;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.menu-item.active {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border-color: var(--btn-primary-border);
}
</style>
