<template>
    <div class="error-layout">
        <div>
            <h1>Error 404</h1>
        </div>
        <div>
            <nuxt-link to="/">
                Back To Home
            </nuxt-link>
        </div>
    </div>
</template>

<style scoped>
    .error-layout{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex-direction: column;
    }

    .error-layout > div{
        margin:10px;
    }
</style>