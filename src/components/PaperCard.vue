<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <a :href="item.link" class="btn btn-primary">Read More</a>
        </div>
        <div v-if="item.description">
            <div class="divider"></div>
            <p class="card-text">{{ item.description.substring(0, 250) }}{{ item.description.length > 250 ? '...' : '' }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(
    {
        item: {
            type: Object,
            required: true
        }
    }
);
</script>


<style scoped>

.card {
  width: 40rem;
}
.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.btn {
  display: inline-block;
}
.card-title {
  display: inline-block;
}
.card-text {
  display: block;
}
.divider {
  margin-top: 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  width: 100%;
}
</style>