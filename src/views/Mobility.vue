
<template>
<div class="container">
  <div class="row">
    <div class="col-md-8">
      <div>
          <h2>Arbeitsweg Personal</h2>
      </div>

      <form >
        <div class="mb-3 row">
          <label for="inputdistance" class="col-md-3 col-form-label">Mittelwert Strecke</label>
          <div class="col-md-6">
            <div class="input-group">
              <input type="number" class="form-control" v-model="avg_distance" name="avg_distance"  placeholder="e.g. 1000 ">
              <span class="input-group-text">km</span>
            </div>
          </div>   
        </div>

        <div class="mb-3 row">
          <label for="inputcar" class="col-md-3 col-form-label">Auto</label>
          <div class="col-md-6">
            <div class="input-group">
              <input type="number" class="form-control" v-model="car" name="car"  placeholder="e.g. 1000" min="0" max="100">
              <span class="input-group-text">%</span>
            </div>        
          </div>  
        </div>

        <div class="mb-3 row">
          <label for="inputbike" class="col-md-3 col-form-label">Fahrrad</label>
          <div class="col-md-6">
            <div class="input-group">
              <input type="number" class="form-control" v-model="bike" name="bike"  placeholder="e.g. 1000" min="0" max="100">
              <span class="input-group-text">%</span>
            </div>       
          </div>   
        </div>

        <div class="mb-3 row">
          <label for="inputpub" class="col-md-3 col-form-label">ÖPNV</label>
          <div class="col-md-6">
            <div class="input-group">
              <input type="number" class="form-control" v-model="pub_transport" name="pub_transport"  placeholder="e.g. 1000" min="0" max="100">
              <span class="input-group-text">%</span>
            </div>        
          </div>  
        </div>

        <div class="mb-3 row">
          <label for="inputhome" class="col-md-3 col-form-label">Home Office</label>
          <div class="col-md-6">
            <div class="input-group">
              <input type="number" class="form-control" v-model="home" name="home"  placeholder="e.g. 1000 " min="0" max="100">
              <span class="input-group-text">%</span>
            </div>       
          </div>   
        </div>
      </form>
    </div>

    <div class="col-md-4">
      <div class="calculation">
        <p>Dein Fußabdruck:  
        <span id="result">{{ getResult_m }} </span>
         kg CO₂ pro Jahr</p>
      </div>

      <div class="flex-container">
          <Barchart  :chartdata_c2='getResult_m'/>
      </div>
    </div>
  </div>
</div>

  <div class="container-button">
    <div class="row justify-content-evenly">
      <div class="col-md-1 offset-md-1">
        <SwitchButton link="/energy" direction="PREVIOUS" />
      </div>
      <div class="col-md-1 offset-md-1">
        <ResetButton @reset-input="resetInput" />
      </div>
      <div class="col-md-1 offset-md-1">
        <SwitchButton link="/mobility2" direction="NEXT" />
      </div>
    </div>
  </div>

</template>

<script>
export default {
    name: 'Mobility',
    data () {
        return {
            avg_distance: null,
            car: null,
            bike: null,
            pub_transport: null,
            home: null,
            stuffnum: null,
            workingdays: null
        }
    },
    computed: {
      getResult_m() {
        var result = this.stuffnum*this.workingdays*this.avg_distance*(this.car*0.211887577+this.bike*0+this.pub_transport*0.08885608+this.home*0)*0.01
        return parseFloat(result.toFixed(2))     
      },
      watchData() {
        return [this.avg_distance, this.car, this.bike, this.pub_transport, this.home]
      }
    },
    watch: {
      watchData() {
          this.updateInput()
        }
    },
  methods: {
    resetInput() {
      this.avg_distance = null,
      this.car = null,
      this.bike = null,
      this.pub_transport = null,
      this.home = null,
      this.result_m = 0
    },
    async updateInput() {
      if ((this.car + this.bike + this.pub_transport + this.home) != 100) {
        alert('The total percentages of Auto, Fahrrad, ÖPNV, Home Office should be 100%. Please check your inputs again.')
        return 
      }
      const newData = {
        avg_distance: this.avg_distance,
        car: this.car,
        bike: this.bike,
        pub_transport: this.pub_transport,
        home: this.home,
        result_m: this.getResult_m
      }
      await fetch('api/mobility', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newData)
      })
    },

    async fetchData() {
      let firstCall = fetch('api/mobility');
      let secondCall = fetch('api/basicdata');
      Promise.all([firstCall, secondCall])
       .then(values => Promise.all(values.map(value => value.json())))
       .then(finalValues => {
          this.avg_distance = finalValues[0].avg_distance
          this.car = finalValues[0].car
          this.bike = finalValues[0].bike
          this.pub_transport = finalValues[0].pub_transport
          this.home = finalValues[0].home
          this.stuffnum = finalValues[1].stuffnum
          this.workingdays = finalValues[1].workingdays
       })
    }
  },
  async created() {
    // const stored_data = await this.fetchInput()
    // this.avg_distance = stored_data.avg_distance
    // this.car = stored_data.car
    // this.bike = stored_data.bike
    // this.pub_transport = stored_data.pub_transport
    // this.home = stored_data.home
    // const basic_data = await this.fetchInputBasic()
    // this.stuffnum = basic_data.stuffnum
    // this.workingdays = basic_data.workingdays
    await this.fetchData()
  },
}
</script>


<style scoped>
.calculation {
  align-content: center;
  margin-top: 50px;
}
.flex-container {
  display:flex;
  justify-content: center;
}
.container {
  margin-top: 50px;
}
.container-button {
  margin-top: 50px;
}
.col-md-8 {
  margin-top: 80px;
}
#result {
  color: green;
  font-size: 40px
}
</style>