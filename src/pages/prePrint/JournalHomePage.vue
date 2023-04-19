<template>
    <a-layout style="width: 1000px">
        <a-layout-header>
            <br />
            <h4 style="text-align: center">Pre-Print</h4>
            <br />
        </a-layout-header>
        <a-layout>
            <a-layout-sider style="width: 300px">
                <div class="menu-demo">
                    <a-menu>
                        <a-menu-item>
                            <router-link :to="{ name: 'preprint-journal-published', params: { address: props.address } }">
                                Published
                            </router-link>
                        </a-menu-item>
                        <a-menu-item>
                            <router-link :to="{ name: 'preprint-upload', params: { address: props.address } }">
                                Submit Your Paper
                            </router-link>
                        </a-menu-item>
                        <a-menu-item>
                            <router-link :to="{ name: 'preprint-journal-author', params: { address: props.address } }">
                                Author's Page
                            </router-link>
                        </a-menu-item>
                    </a-menu>
                </div>
            </a-layout-sider>
            <a-layout-content>
                <Suspense>
                    <router-view></router-view>
                </Suspense>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>

const props = defineProps({
    address: {
        type: String,
        required: true,
    },
})


</script>

<style scoped>
.menu-demo {
    box-sizing: border-box;
    width: 100%;
    /* padding: 40px; */
    background-color: #273664;
}
</style>
