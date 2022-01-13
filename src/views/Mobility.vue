
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>

  <div>
      <h2>Arbeitsweg Personal</h2>
  </div>

  <form >
    <div class="mb-3 row">
      <label for="inputdistance" class="col-md-3 col-form-label">Mittelwert Strecke</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="avg_distance" name="avg_distance"  placeholder="e.g. 1000 ">
          <span class="input-group-text">km</span>
        </div>
      </div>   
    </div>

    <div class="mb-3 row">
      <label for="inputcar" class="col-md-3 col-form-label">Auto</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="car" name="car"  placeholder="e.g. 1000">
          <span class="input-group-text">%</span>
        </div>        
      </div>  
    </div>

    <div class="mb-3 row">
      <label for="inputbike" class="col-md-3 col-form-label">Fahrrad</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="bike" name="bike"  placeholder="e.g. 1000">
          <span class="input-group-text">%</span>
        </div>       
      </div>   
    </div>

    <div class="mb-3 row">
      <label for="inputpub" class="col-md-3 col-form-label">ÖPNV</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="pub_transport" name="pub_transport"  placeholder="e.g. 1000">
          <span class="input-group-text">%</span>
        </div>        
      </div>  
    </div>

    <div class="mb-3 row">
      <label for="inputhome" class="col-md-3 col-form-label">Home Office</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="home" name="home"  placeholder="e.g. 1000 ">
          <span class="input-group-text">%</span>
        </div>       
      </div>   
    </div>
  </form>

    <div class="container">
      <div class="row justify-content-evenly">
        <div class="col-md-1 offset-md-1">
          <SwitchButton link="/energy" direction="PREVIOUS" @update-input="updateInput" />
        </div>
        <div class="col-md-1 offset-md-1">
          <ResetButton @reset-input="resetInput" @update-input="updateInput"/>
        </div>
        <div class="col-md-1 offset-md-1">
          <SwitchButton link="/mobility" direction="NEXT" @update-input="updateInput" />
        </div>
      </div>
    </div>

    <div class="calculation">
        <p>Dein Fußabdruck:  
        <span id="result">{{ getResult }} </span>
        kg CO₂ pro Jahr</p>
    </div>

    <div class="flex-container">
        <Barchart  :chartdata_c1='getResult'/>
    </div>

</template>

<script>
import ResetButton from '../components/ResetButton'
import SwitchButton from '../components/SwitchButton'
import Barchart from '../components/BarChart'
export default {
    name: 'Mobility',
    Component:{
        ResetButton,
        SwitchButton,
        Barchart
    },
    data () {
        return {
            avg_distance: null,
            car: null,
            bike: null,
            pub_transport: null,
            home: null
        }
    },
    computed: {
    getResult() {
      var result = this.avg_distance*(this.car*0.211887577+this.bike*0+this.pub_transport*0.08885608+this.home*0)
      return result.toFixed(2)
        }
    },
  methods: {
    resetInput() {
      this.avg_distance = null,
      this.car = null,
      this.bike = null,
      this.pub_transport = null,
      this.home = null
    },
    async updateInput() {
      const newData = {
        avg_distance: this.avg_distance,
        car: this.car,
        bike: this.bike,
        pub_transport: this.pub_transport,
        home: this.home
      }
      await fetch('api/mobility', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newData)
      })
    },
    async fetchInput() {
      const res = await fetch(
        'api/mobility')
      const data = await res.json()
      return data      
    },
  },
  async created() {
    const stored_data = await this.fetchInput()
    this.avg_distance = stored_data.avg_distance
    this.car = stored_data.car
    this.bike = stored_data.bike
    this.pub_transport = stored_data.pub_transport
    this.home = stored_data.home
  },
}
</script>


<style scoped>
.calculation {
  align-content: center;
  margin-top: 100px;
}
.flex-container {
  display:flex;
  justify-content: center;
}
#result {
  color: green;
  font-size: 40px
}
</style>