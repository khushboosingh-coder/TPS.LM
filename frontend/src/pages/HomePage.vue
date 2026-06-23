<template>
  <div class="container mt-5">
    <h1>Welcome to TPS Leave Management System</h1>
    <p class="lead mt-4">Manage your leave requests efficiently and stay organized.</p>
    <div class="row mt-5">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Request Leave</h5>
            <p class="card-text">Submit and manage your leave requests easily.</p>
            <router-link to="/leaves" class="btn btn-primary">Go to Leaves</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">View Dashboard</h5>
            <p class="card-text">See your leave balance and request status.</p>
            <router-link to="/dashboard" class="btn btn-primary">Go to Dashboard</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Manage Approvals</h5>
            <p class="card-text">Review and approve leave requests.</p>
            <router-link v-if="isManager" to="/approvals" class="btn btn-primary">Go to Approvals</router-link>
            <p v-else class="text-muted">Available for managers</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useAuthStore } from '../stores/auth.js';

export default {
  name: 'HomePage',
  setup() {
    const authStore = useAuthStore();
    const isManager = computed(() => authStore.user?.role === 'manager' || authStore.user?.role === 'admin');

    return { isManager };
  },
};
</script>
