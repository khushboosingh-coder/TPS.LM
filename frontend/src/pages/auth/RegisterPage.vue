<template>
  <div class="container auth-container">
    <div class="auth-card">
      <h1 class="mb-4">Register</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input v-model="form.firstName" type="text" class="form-control" id="firstName" required />
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input v-model="form.lastName" type="text" class="form-control" id="lastName" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" id="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control" id="password" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>
      <p class="mt-3 text-center">
        Already have an account? <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth.js';

export default {
  name: 'RegisterPage',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const form = reactive({ firstName: '', lastName: '', email: '', password: '' });

    const handleRegister = async () => {
      try {
        await authStore.register(form.email, form.password, form.firstName, form.lastName);
        router.push('/dashboard');
      } catch (error) {
        alert('Registration failed: ' + (error.message || 'Unknown error'));
      }
    };

    return { form, handleRegister };
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
