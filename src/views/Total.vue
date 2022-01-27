<template>
    <h1>total: {{ colSum }}</h1>
    <SwitchButton link='/mobility3' direction='PREVIOUS' />
</template>

<script>
export default {
    name: 'Total',
    data() {
      return {
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0
      }
    },
    computed: {
      colSum() {
        var result = this.c1+this.c2+this.c3+this.c4
        return result.toFixed(2)
      }
    },
    methods:{
      async fetchData() {
        let firstCall = fetch('api/energy');
        let secondCall = fetch('api/mobility');
        let thirdCall = fetch('api/mobility2');
        let fourthCall = fetch('api/mobility3');
        Promise.all([firstCall, secondCall, thirdCall, fourthCall])
        .then(values => Promise.all(values.map(value => value.json())))
        .then(finalValues => {
            this.c1 = finalValues[0].result_e;
            this.c2 = finalValues[1].result_m;
            this.c3 = finalValues[2].result_m2;
            this.c4 = finalValues[3].result_m3;
        })
    }
    },
    async created() {
        await this.fetchData()
    }

}
</script>