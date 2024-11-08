<template>
  <header class="app-header">
    <nav class="app-header__tabs">
      <router-link
        to="/"
        class="app-header__tab"
        :class="{ active: isActive('/') }"
      >
        Форма
      </router-link>
      <router-link
        to="/preview"
        class="app-header__tab"
        :class="{ active: isActive('/preview') }"
      >
        Превью
      </router-link>
    </nav>
  </header>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "AppHeader",
  setup() {
    const route = useRoute();

    const isActive = (path) => {
      return route.path === path;
    };

    return {
      isActive,
    };
  },
};
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
  border-bottom: 1px solid var(--color-border);
  width: 100%;
  background-color: var(--color-bg-default);
}

.app-header__tabs {
  display: flex;
  gap: 20px;
}

.app-header__tab {
  text-decoration: none;
  padding: 5px 10px;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
}

.app-header__tab.active {
  opacity: 0.6;
}
</style>
