<template>
    <div id="app">
        {{text}}
    </div>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                text: 'this is test'
            }
        }
    }
</script>

<style scoped>
    #app {
        color: red;
    }
</style>
