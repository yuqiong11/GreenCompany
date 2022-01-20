<template>
    <router-link  @click="onClick()"   class="btn btn-primary" role="Button" :to= "link"> {{ direction }}</router-link>
</template>

<script>

export default {
    name: 'SwitchButton',
    props: {
        link: String,
        direction: String,
    },
    methods: {
        onClick() {
            this.$emit('update-input')
        }
    }

}
</script>
