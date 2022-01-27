<template>
    <router-link  class="btn btn-primary" role="Button" :to= "link"> {{ direction }}</router-link>
</template>

<script>

export default {
    name: 'SwitchButton',
    props: {
        link: String,
        direction: String,
    },
    // methods: {
    //     onClick() {
    //         this.$emit('send-alert')
    //     }
    // }

}
</script>
