<template>
    <a-result status="success" :title="route.query.title as string | undefined" >
        <template #subtitle>
            {{ route.query.subtitle }}
        </template>
        <!-- <template #extra>
        <a-space>
          <a-button type='primary'>Back</a-button>
        </a-space>
      </template> -->
    </a-result>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute();

</script>