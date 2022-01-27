<template>
  <div class='text'>
    <p>
     <span id="result">{{ colSum }} </span>
    kg CO2 pro Jahr</p> 
    
  </div>

  <div class="container">
  <div class="row align-items-start">
    <div class="col"> 
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100" height="100" xml:space="preserve"><path d="M50 33.333c-7.2 0-12.122 5.808-10.938 12.91l1.797 10.752c.71 4.265 4.817 7.748 9.141 7.748 4.319 0 8.435-3.483 9.144-7.748l1.791-10.752c1.184-7.102-3.738-12.91-10.935-12.91zM72.451 69.704 59.922 65.53c-2.63 2.568-6.165 4.213-9.922 4.213s-7.292-1.645-9.922-4.213l-12.526 4.174c-2.317.774-4.219 3.408-4.219 5.853v11.11h53.334v-11.11c0-2.445-1.898-5.078-4.216-5.853z"/><path d="M63.333 26.667c-2.984 0-5.54 1.038-7.467 2.715 2.552.931 4.82 2.457 6.559 4.512 2.995 3.535 4.248 8.333 3.441 13.17l-1.791 10.752c-.01.065-.039.127-.052.192 4.06-.349 7.783-3.646 8.454-7.679l1.79-10.752c1.185-7.103-3.737-12.91-10.934-12.91zM37.571 33.894c2.416-2.852 5.834-4.697 9.643-5.313l.387-2.338c1.186-7.103-3.736-12.91-10.934-12.91-7.201 0-12.123 5.808-10.938 12.91l1.797 10.752c.553 3.337 3.196 6.169 6.39 7.256-.013-3.848 1.247-7.513 3.655-10.357zM25.964 64.961l11.094-3.691c-.512-1.097-.932-2.239-1.133-3.454l-1.384-8.301c-2.946-.491-5.671-1.91-7.796-3.984l-12.526 4.174C11.901 50.479 10 53.112 10 55.557v11.11h12.845a10.49 10.49 0 0 1 3.119-1.706zM85.784 63.037l-12.529-4.173a14.868 14.868 0 0 1-6.455 3.688l7.23 2.409c4.355 1.455 7.637 6.009 7.637 10.596V80H90V68.89c0-2.445-1.897-5.078-4.216-5.853z"/></svg>
      <div class="col2"><span class="separateresult">{{ parseFloat(colSum / this.stuffnum).toFixed(2)}}</span>
      kg CO2 pro Mitrbeiter</div> 
    </div>
    <div class="col">
       <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"  viewBox="0 0 32 32"><path d="m31.63 12.22-15-12a1 1 0 0 0-1.25 0l-15 12A1 1 0 0 0 1 14h2v17a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1V14h2a1 1 0 0 0 .63-1.78zM18 30h-4v-8h4zm10-18a1 1 0 0 0-1 1v17h-7v-9a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v9H5V14h17v-2H3.85L16 2.28 28.15 12z" data-name="10-House"/></svg>
       <div class="col2"><span class="separateresult">{{ parseFloat(colSum / this.floorspace).toFixed(2)}}</span>
       kg CO2 pro Grundflach(m²)</div>
    </div>
    <div class="col">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><path style="fill:#191919" d="M117.852 0H10.145C4.899 0 .642 4.257.642 9.503v16.782h126.714V9.503C127.355 4.257 123.098 0 117.852 0zM30.101 17.885a5.707 5.707 0 0 1-5.702-5.702c0-3.136 2.566-5.702 5.702-5.702a5.707 5.707 0 0 1 5.702 5.702 5.694 5.694 0 0 1-5.702 5.702zm70.323 0a5.707 5.707 0 0 1-5.702-5.702c0-3.136 2.566-5.702 5.702-5.702a5.707 5.707 0 0 1 5.702 5.702 5.694 5.694 0 0 1-5.702 5.702zM.645 32.304v86.193A9.494 9.494 0 0 0 10.148 128h107.708a9.494 9.494 0 0 0 9.503-9.503V32.304H.645zm63.461 64.811H31.929c.076-3.383.798-6.462 2.167-9.237 1.311-3.136 4.428-6.462 9.332-9.959 4.257-3.041 7.013-5.227 8.268-6.557 1.92-2.053 2.889-4.295 2.889-6.728 0-1.996-.551-3.649-1.654-4.961-1.102-1.33-2.68-1.977-4.733-1.977-2.813 0-4.733 1.045-5.74 3.136-.589 1.216-.931 3.136-1.045 5.778h-8.971c.152-4.01.874-7.241 2.167-9.693 2.471-4.694 6.861-7.051 13.152-7.051 4.98 0 8.933 1.387 11.879 4.143 2.946 2.756 4.409 6.405 4.409 10.948 0 3.478-1.045 6.557-3.117 9.275-1.368 1.787-3.611 3.782-6.728 5.987l-3.706 2.623c-2.3 1.654-3.896 2.832-4.752 3.573s-1.578 1.578-2.148 2.566h20.508v8.134zm32.766-3.364c-2.737 3.022-6.823 4.523-12.221 4.523-6.652 0-11.271-2.167-13.856-6.519-1.368-2.3-2.129-5.341-2.281-9.066H77.6c0 1.882.304 3.421.912 4.657 1.121 2.281 3.155 3.402 6.101 3.402 1.825 0 3.402-.608 4.752-1.863 1.349-1.235 2.015-3.022 2.015-5.36 0-3.098-1.254-5.151-3.744-6.196-1.425-.57-3.668-.874-6.728-.874v-6.614c3.003-.038 5.094-.323 6.272-.874 2.053-.912 3.06-2.737 3.06-5.512 0-1.787-.513-3.25-1.559-4.371-1.045-1.121-2.528-1.692-4.409-1.692-2.186 0-3.782.703-4.809 2.072-1.026 1.387-1.52 3.231-1.463 5.55h-8.629a22.643 22.643 0 0 1 1.197-6.652c.76-1.825 1.939-3.535 3.554-5.075a12.211 12.211 0 0 1 4.314-2.528c1.654-.589 3.706-.893 6.12-.893 4.486 0 8.116 1.178 10.872 3.497 2.737 2.319 4.124 5.436 4.124 9.351 0 2.775-.817 5.094-2.471 6.994-1.026 1.197-2.11 2.015-3.231 2.433.836 0 2.053.722 3.63 2.186 2.357 2.167 3.535 5.151 3.535 8.933.001 3.991-1.387 7.488-4.143 10.491z"/></svg>
      <div class="col2 "><span class="separateresult">{{ parseFloat(colSum / this.workingdays).toFixed(2)}}</span>
       kg CO2 pro Arbeitstag</div>
    </div>
  </div>
</div>

 

  <div class="button">
    <SwitchButton link='/mobility3' direction='BACK' />
  </div>

</template>

<script>
export default {
    name: 'Total',
    data() {
      return {
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        floorspace: 0,
        stuffnum: 0,
        workingdays: 0
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
        let fifthCall = fetch('api/basicdata');
        Promise.all([firstCall, secondCall, thirdCall, fourthCall, fifthCall])
        .then(values => Promise.all(values.map(value => value.json())))
        .then(finalValues => {
            this.c1 = finalValues[0].result_e;
            this.c2 = finalValues[1].result_m;
            this.c3 = finalValues[2].result_m2;
            this.c4 = finalValues[3].result_m3;
            this.floorspace = finalValues[4].floorspace;
            this.stuffnum = finalValues[4].stuffnum;
            this.workingdays = finalValues[4].workingdays
        })
    }
    },
    async created() {
        await this.fetchData()
    }

}
</script>

<style scoped>
.text {
  text-align: center;
  font-size: 25px;
}
#result {
  text-align: center;
  color: green;
  font-size: 100px
}
.separateresult {
  color: green;
  font-size: 20px;
}
.button {
  margin-top: 5%;
}
.col {
  margin-top: 5em;
}
.col2 {
  margin-top: 3em;
}
</style>