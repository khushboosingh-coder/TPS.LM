<template>
  <div class="container mt-5">
    <h1>Leave Approvals</h1>
    <div class="row">
      <div v-for="n in 3" :key="n" class="col-md-6">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">John Doe - Casual Leave</h5>
            <p class="card-text">2024-12-20 to 2024-12-22</p>
            <p class="card-text"><small class="text-muted">Reason: Family event</small></p>
            <button class="btn btn-success btn-sm me-2">Approve</button>
            <button class="btn btn-danger btn-sm">Reject</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApprovalsPage',
};
</script>
