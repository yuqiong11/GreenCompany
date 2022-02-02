<template>
<div class="container">
  <div class="row">
    <div class="col-md-8">
      <div>
          <h2>Dienstreisen-Vielreisende</h2>
      </div>

      <form >
          <!-- background data -->
        <div class="mb-3 row">
          <label for="inputdistance" class="col-md-3 col-form-label">Anzahl</label>
          <div class="col-md-6">
            <div class="input-group">
              <input type="number" class="form-control" v-model="stuffnum" name="stuffnum"  placeholder="e.g. 1000 ">
            </div>
          </div>   
        </div>

        <div class="mb-3 row">
          <label for="inputdistance" class="col-md-3 col-form-label">Dienstreisen pro Monat</label>
          <div class="col-md-6">
            <div class="input-group">
              <input type="number" class="form-control" v-model="businesstrips" name="businesstrips"  placeholder="e.g. 1000 ">
            </div>
          </div>   
        </div>

        <div class="mb-3 row">
          <label for="inputdistance" class="col-md-3 col-form-label">Mittelwert Strecke</label>
          <div class="col-md-6">
            <div class="input-group">
              <input type="number" class="form-control" v-model="avg_distance" name="avg_distance"  placeholder="e.g. 1000 ">
              <span class="input-group-text">km</span>
            </div>
          </div>   
        </div>

        <!-- different transports -->
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
          <label for="inputbike" class="col-md-3 col-form-label">Flugzeug</label>
          <div class="col-md-6">
            <div class="input-group">
              <input type="number" class="form-control" v-model="plane" name="plane"  placeholder="e.g. 1000" min="0" max="100">
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
      </form>
    </div>

    <div class="col-md-4">
      <div class="calculation">
          <p>Dein Fußabdruck:  
          <span id="result">{{ getResult_m2 }} </span>
          kg CO₂ pro Jahr</p>
      </div>

      <div>
          <Barchart  :chartdata_c3='getResult_m2'/>
      </div>
    </div>
  </div>


    <div class="container-button">
      <div class="row justify-content-evenly">
        <div class="col-md-1 offset-md-1">
          <SwitchButton link="/mobility" direction="PREVIOUS" />
        </div>
        <div class="col-md-1 offset-md-1">
          <ResetButton @reset-input="resetInput" />
        </div>
        <div class="col-md-1 offset-md-1">
          <SwitchButton link="/mobility3" direction="NEXT" />
        </div>
      </div>
    </div>
 </div>


</template>

<script>
export default {
    name: 'Mobility2',

    data () {
        return {
            stuffnum: null,
            businesstrips: null,
            avg_distance: null,
            car: null,
            plane: null,
            pub_transport: null,
        }
    },
    computed: {
      getResult_m2() {
        var result = this.stuffnum*this.businesstrips*this.avg_distance*(this.car*0.211887577+this.plane*0.081399626+this.pub_transport*0.070214945)*0.01*12
        return parseFloat(result.toFixed(2))     
      },
      watchData() {
        return [this.stuffnum, this.businesstrips, this.avg_distance, this.car, this.plane, this.pub_transport]
      }
    },
    watch: {
        watchData() {
            this.updateInput()
        }
    },   
  methods: {
    resetInput() {
      this.stuffnum = null,
      this.businesstrips = null,
      this.avg_distance = null,
      this.car = null,
      this.pub_transport = null,
      this.plane = null,
      this.result_m2 = 0
    },
    async updateInput() {

      if ((this.car + this.plane + this.pub_transport) != 100) {
        alert('The total percentages of Auto, Flugzeug, ÖPNV should be 100%. Please check your inputs again.')
        return 
      }

      const newData = {
        stuffnum: this.stuffnum,
        businesstrips: this.businesstrips,
        avg_distance: this.avg_distance,
        car: this.car,
        plane: this.plane,
        pub_transport: this.pub_transport,
        result_m2: this.getResult_m2
      }
      await fetch('api/mobility2', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newData)
      })
    },
    async fetchInput() {
      const res = await fetch(
        'api/mobility2')
      const data = await res.json()
      this.stuffnum = data.stuffnum
      this.businesstrips = data.businesstrips
      this.avg_distance = data.avg_distance
      this.car = data.car
      this.plane = data.plane
      this.pub_transport = data.pub_transport       
    },
  },
  async created() {
    await this.fetchInput()
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