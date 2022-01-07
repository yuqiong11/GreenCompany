<template>
  <div id="nav">
    <router-link to="/">Grunddaten</router-link> |
    <router-link to="/energie">Energie</router-link>
  </div>
  <router-view/>
  <div>
    <BarChart ref="doughnutRef" :chartData="testData" :options="options" />
    <button @click="shuffleData">Shuffle</button>
  </div>

</template>

<script>
import { computed, ref } from "vue";
import { shuffle } from "lodash";
import { BarChart } from "vue-chart-3";
import { Chart,  registerables } from "chart.js";

Chart.register(...registerables);

export default ({
  name: 'App',
  components: { BarChart },
  setup() {
    const data = ref([30, 40, 60, 70, 100]);
    const doughnutRef = ref();

    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Barchart Chart',
        },
      },
    });

    const testData = computed(() => ({
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: data.value,
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    }));

    function shuffleData() {
      data.value = shuffle(data.value);
    }

    return { testData, shuffleData, doughnutRef, options };
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
