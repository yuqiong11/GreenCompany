<template>
  <div>
    <BarChart ref="barRef" :chartData="testData" :options="options" />
  </div>


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
  },
  
  setup(props) {
    const average_co2 = ref([1000, 2000, 3000, 4000, 5000]);
    const barRef = ref();
    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'dein Fußabdruck kg CO2/year',
        },
      },
    });
    const testData = computed(() => ({
      labels: ['Energie', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [props.chartdata_c1, 4000, 5000, 6000, 7000],
          backgroundColor: ['#CEEFBD', '#C6EF8C', '#ADDE63', '#94D639', '#7BC618'],
        },
        {
          data: average_co2.value,
          backgroundColor: ['#CEEFBD', '#C6EF8C', '#ADDE63', '#94D639', '#7BC618'],
        },
      ],
    }));

    return { testData, barRef, options };
  },
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