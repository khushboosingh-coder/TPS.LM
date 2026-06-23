<template>
  <div class="container mt-5 text-center">
    <h1>404 - Page Not Found</h1>
    <p class="mt-3">The page you're looking for doesn't exist.</p>
    <router-link to="/" class="btn btn-primary mt-4">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
};
</script>
