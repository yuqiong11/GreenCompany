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
  setup() {
    const data = ref([3000, 4000, 6000, 7000, 10000]);  /* repalce by average */
    const barRef = ref();

    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'dein Fußabdruck zu den von anderem',
        },
      },
    });

    const testData = computed(() => ({
      labels: ['Energie', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: data.value,
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
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
