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
    chartdata_c1: String,
    chartdata_c2: String,
  },
  
  setup(props) {
    const average_co2 = ref([1000, 2000, 3000, 4000, 5000]);
    const c1 = ref(0);
    const c2 = ref(0);
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

    // fetch data from 2 api endpoints
    const fetchData = async () => {
      let firstCall = fetch('api/energy');
      let secondCall = fetch('api/mobility');

      Promise.all([firstCall, secondCall])
       .then(values => Promise.all(values.map(value => value.json())))
       .then(finalValues => {
         c1.value = finalValues[0].result_e;
         c2.value = finalValues[1].result_m;
       })
    };


    const testData = computed(() => ({
      labels: ['Energie', 'Arbeitsweg', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          label: 'Deine Daten',
          data: [
            props.chartdata_c1 ? props.chartdata_c1 : c1.value, 
            props.chartdata_c2 ? props.chartdata_c2 : c2.value,
            props.chartdata_c3 ? props.chartdata_c3 : 1000,
            props.chartdata_c4 ? props.chartdata_c4 : 2000,
            props.chartdata_c5 ? props.chartdata_c5 : 3000,
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

    return { c1, c2, testData, barRef, options, fetchData };
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