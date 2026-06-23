<template>
  <div class="container mt-5">
    <h1>Dashboard</h1>
    <div class="row mt-4">
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Total Leave Balance</h5>
            <p class="card-text display-4">20</p>
            <p class="card-text text-muted">Days available</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Pending Requests</h5>
            <p class="card-text display-4">2</p>
            <p class="card-text text-muted">Awaiting approval</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Used Leave</h5>
            <p class="card-text display-4">5</p>
            <p class="card-text text-muted">Days used this year</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
};
</script>
