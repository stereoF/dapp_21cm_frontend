<template>
    <div>
        <Suspense>
            <router-view/>
            <template #fallback>
                Loading...
            </template>
        </Suspense>
    </div>
</template>
