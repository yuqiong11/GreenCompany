<template>
  <div>
    <BarChart ref="barRef" :chartData="testData" :options="options" />
  </div>

  <!-- <div>  <h1> c1-active {{ chartdata_c1 }}</h1></div>
  <div>  <h1> c1-archive {{ c1 }}</h1></div>

  <div><h1> c2-active {{ chartdata_c2 }}</h1></div>
  <div><h1> c2-archive {{ c2 }}</h1></div> -->


</template>

<script>
import { computed, ref } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart,  registerables } from "chart.js";
Chart.register(...registerables);
export default ({
  name: 'Barchart',
  components: { BarChart },
  props: {
    chartdata_c1: Number,
    chartdata_c2: Number,
    chartdata_c3: Number,
    chartdata_c4: Number,
  },
  
  setup(props) {
    const average_co2 = ref([1000, 2000, 3000, 4000]);
    const c1 = ref(0);
    const c2 = ref(0);
    const c3 = ref(0);
    const c4 = ref(0);
    const barRef = ref();
    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',

        },
        title: {
          display: true,
          text: 'dein Fußabdruck kg CO2/year',
        },
      },
    });

    // fetch data from multiple api endpoints
    const fetchData = async () => {
      let firstCall = fetch('api/energy');
      let secondCall = fetch('api/mobility');
      let thirdCall = fetch('api/mobility2');
      let fourthCall = fetch('api/mobility3');

      Promise.all([firstCall, secondCall, thirdCall, fourthCall])
       .then(values => Promise.all(values.map(value => value.json())))
       .then(finalValues => {
         c1.value = finalValues[0].result_e;
         c2.value = finalValues[1].result_m;
         c3.value = finalValues[2].result_m2;
         c4.value = finalValues[3].result_m3;
       })
    };


    const testData = computed(() => ({
      labels: ['Energie', 'Arbeitsweg', 'Vielreisende', 'Normalreisende'],
      datasets: [
        {
          label: 'Deine Daten',
          data: [
            props.chartdata_c1 ? props.chartdata_c1 : c1.value, 
            props.chartdata_c2 ? props.chartdata_c2 : c2.value,
            props.chartdata_c3 ? props.chartdata_c3 : c3.value,
            props.chartdata_c4 ? props.chartdata_c4 : c4.value,
            ],
          backgroundColor: ['#CEEFBD', '#C6EF8C', '#ADDE63', '#94D639', '#7BC618'],
        },
        {
          label: 'Durchschnittliche',
          data: average_co2.value,
          backgroundColor: ['#ffa343'],
        },
      ],
    }));

    return { c1, c2, c3, c4, testData, barRef, options, fetchData };
  },

  created() {
    this.fetchData()
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>