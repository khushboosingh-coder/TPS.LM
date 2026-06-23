<template>
  <div id="app">
    <nav v-if="!isAuthPage" class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">TPS Leave Management</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li v-if="isAuthenticated" class="nav-item">
              <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <router-link to="/leaves" class="nav-link">My Leaves</router-link>
            </li>
            <li v-if="isAuthenticated && isManager" class="nav-item">
              <router-link to="/approvals" class="nav-link">Approvals</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <button @click="logout" class="nav-link btn btn-link">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main :class="{ 'auth-layout': isAuthPage }">
      <router-view />
    </main>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth.js';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const isManager = computed(() => authStore.user?.role === 'manager' || authStore.user?.role === 'admin');
    const isAuthPage = computed(() => {
      return ['login', 'register'].includes(router.currentRoute.value.name);
    });

    const logout = () => {
      authStore.logout();
      router.push('/login');
    };

    return {
      isAuthenticated,
      isManager,
      isAuthPage,
      logout,
    };
  },
};
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 20px;
}

main.auth-layout {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
