<template>
  <div class="container mt-5">
    <h1>My Leave Requests</h1>
    <button class="btn btn-primary mb-4" @click="showForm = !showForm">
      {{ showForm ? 'Cancel' : 'New Leave Request' }}
    </button>
    <div v-if="showForm" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Create New Leave Request</h5>
        <form @submit.prevent="submitLeaveRequest">
          <div class="mb-3">
            <label class="form-label">Leave Type</label>
            <select class="form-select">
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Annual Leave</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Start Date</label>
            <input type="date" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">End Date</label>
            <input type="date" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Reason</label>
            <textarea class="form-control" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-success">Submit Request</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div v-for="n in 3" :key="n" class="col-md-6">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Casual Leave</h5>
            <p class="card-text">2024-12-20 to 2024-12-22</p>
            <span class="badge bg-warning">Pending</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LeavesPage',
  setup() {
    const showForm = ref(false);

    const submitLeaveRequest = () => {
      alert('Leave request submitted');
      showForm.value = false;
    };

    return { showForm, submitLeaveRequest };
  },
};
</script>
