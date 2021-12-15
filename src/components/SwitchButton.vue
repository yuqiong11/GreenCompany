<template>
    <!-- <a href="/energie" class="btn btn-primary col-md-1 offset-md-1" role="Button"> {{ SwitchCommand }}</a> -->
    <router-link class="btn btn-primary" role="Button" :to= "link"> {{ direction }}</router-link>
</template>

<script>

export default {
    name: 'SwitchButton',
    props: {
        link: String,
        direction: String
    },
}
</script>
