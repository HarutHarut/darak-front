<template>
    <div class="error-text text-center">
        <p class="error-statusCode">{{error.statusCode}}</p>
        <h1>Oops, the page doesn't exist</h1>
        <a class="error-link btn btn-color" href="/">Back to home page</a>
    </div>
</template>

<script>
export default {
    layout: 'error-layout',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
}
</script>