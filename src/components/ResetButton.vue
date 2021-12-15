<template>
    <button @click="onclick()" type="button" class="btn btn-primary">RESET</button>
</template>

<script>
export default({
    name:'ResetButton',

    methods: {
        onclick() {
            this.$emit("reset-input")
        }
    }
})
</script>
