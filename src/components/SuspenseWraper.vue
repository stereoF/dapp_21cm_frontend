<template>
    <div>
        <Suspense>
            <router-view />
            <template #fallback>
                <a-space size="large">
                    <a-spin :size="32" />
                </a-space>
            </template>
        </Suspense>
    </div>
</template>
