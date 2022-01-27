<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>

  <div>
    <h2>Stromverbrauch</h2>
  </div>
  
  <form >
    <div class="mb-3 row">
      <label for="inputStrommix" class="col-md-3 col-form-label">Strommix</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="electricitymix" name="electricitymix"  placeholder="e.g. 1000 ">
          <span class="input-group-text">MWh</span>
        </div>
      </div>   
    </div>

    <div class="mb-3 row">
      <label for="inputökostrom" class="col-md-3 col-form-label">Ökostrom</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="greenpower" name="greenpower"  placeholder="e.g. 1000">
          <span class="input-group-text">MWh</span>
        </div>        
      </div>  
    </div>


    <div>
      <h2>Heizkosten</h2>
    </div>

    <div class="mb-3 row">
      <label for="inputStrommix" class="col-md-3 col-form-label">Heizöl</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="fueloil" name="fueloil"  placeholder="e.g. 1000">
          <span class="input-group-text">mmBtu</span>
        </div>       
      </div>   
    </div>

    <div class="mb-3 row">
      <label for="inputökostrom" class="col-md-3 col-form-label">Biogas</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="biogas" name="biogas"  placeholder="e.g. 1000">
          <span class="input-group-text">mmBtu</span>
        </div>        
      </div>  
    </div>

    <div class="mb-3 row">
      <label for="inputStrommix" class="col-md-3 col-form-label">Gas</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="gas" name="gas"  placeholder="e.g. 1000 ">
          <span class="input-group-text">mmBtu</span>
        </div>       
      </div>   
    </div>

    <div class="mb-3 row">
      <label for="inputökostrom" class="col-md-3 col-form-label">Holz</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="wood" name="wood"  placeholder="e.g. 1000">
          <span class="input-group-text">mmBtu</span>
        </div>        
      </div>  
    </div>
  
    <div class="mb-3 row">
      <label for="inputökostrom" class="col-md-3 col-form-label">Fernwärme</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" class="form-control" v-model="districtheat" name="districtheat"  placeholder="e.g. 1000">
          <span class="input-group-text">kWh</span>
        </div>       
      </div>  
    </div>
  </form>

    <div class="container">
      <div class="row justify-content-evenly">
        <div class="col-md-1 offset-md-1">
          <SwitchButton link="/" direction="PREVIOUS" />
        </div>
        <div class="col-md-1 offset-md-1">
          <ResetButton @reset-input="resetInput" />
        </div>
        <div class="col-md-1 offset-md-1">
          <SwitchButton link="/mobility" direction="NEXT" />
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

export default {
  name: 'energy',

  data() {
    return {
      electricitymix: 0,
      greenpower: 0,
      fueloil: 0,
      biogas: 0,
      gas: 0,
      wood: 0,
      districtheat: 0,
      stored_data: 0,
      }
    }
  ,
  computed: {
    getResult() {
      var result = this.electricitymix*728.69 + this.fueloil*66.88 + this.biogas*53.06 +
                   this.gas*53.06 + this.wood*93.8 + this.districtheat*66.33*0.003409

      return parseFloat(result.toFixed(2))
    },
    watchData() {
      return [this.electricitymix, this.greenpower, this.fueloil, this.biogas, this.gas, this.wood, this.districtheat]
    }
  },
  watch: {
      watchData() {
          this.updateInput()
        }
    },

  methods: {
    resetInput() {
      this.electricitymix = 0,
      this.greenpower = 0,
      this.fueloil = 0,
      this.biogas = 0,
      this.gas = 0,
      this.wood = 0,
      this.districtheat = 0,
      this.result_e = 0     
    },
    async updateInput() {
      const newData = {
        electricitymix: this.electricitymix,
        greenpower: this.greenpower,
        fueloil: this.fueloil,
        biogas: this.biogas,
        gas: this.gas,
        wood: this.wood,
        districtheat: this.districtheat,
        result_e: this.getResult
      }
      await fetch('api/energy', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newData)
      })
    },
    async fetchInput() {
      const res = await fetch(
        'api/energy')
      const data = await res.json()
      return data
      
    },
  },

  async created() {
    this.stored_data = await this.fetchInput()
    this.electricitymix = this.stored_data.electricitymix
    this.greenpower = this.stored_data.greenpower
    this.fueloil = this.stored_data.fueloil
    this.biogas = this.stored_data.biogas
    this.gas = this.stored_data.gas
    this.wood = this.stored_data.wood
    this.districtheat = this.stored_data.districtheat
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