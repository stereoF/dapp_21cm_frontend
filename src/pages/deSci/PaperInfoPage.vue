<template>
    <Suspense>
        <PaperInfo :address="address" :paperCID="paperCID" />
    </Suspense>
</template>

<script lang="ts" setup>
import PaperInfo from '@/pages/deSci/PaperInfo.vue';

const props = defineProps(
    {
        address: {
            type: String,
            required: true,
        },
        paperCID: {
            type: String,
            required: true,
        },
    }
);

</script>