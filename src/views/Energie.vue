<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>

  <div>
    <h2>Stromverbrauch</h2>
  </div>
  <form @submit="onSubmit">
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
  </form>

  <div>
    <h2>Heizkosten</h2>
  </div>
  <form @submit="onSubmit">
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
        <SwitchButton link="/" direction="PREVIOUS" @update-input="updateInput" />
      </div>
      <div class="col-md-1 offset-md-1">
        <ResetButton @reset-input="resetInput" />
      </div>
      <div class="col-md-1 offset-md-1">
        <SwitchButton link="/energie" direction="NEXT" @update-input="updateInput" />
      </div>
    </div>
  </div>

  <div class="calculation">
    <p>Ihr Fußabdruck:  
      <span id="result">{{ getResult }} </span>
      kg CO₂ pro Jahr</p>
  </div>

</template>

<script>
// @ is an alias to /src
import ResetButton from '../components/ResetButton'
import SwitchButton from '../components/SwitchButton'

export default {
  name: 'energy',
  components: {
    ResetButton,
    SwitchButton,
  },
  data() {
    return {
      electricitymix: '',
      greenpower: '',
      fueloil: '',
      biogas: '',
      gas: '',
      wood: '',
      districtheat: '',
      stored_data: ''
    }
  },
  methods: {
    resetInput() {
      this.electricitymix = '',
      this.greenpower = '',
      this.fueloil = '',
      this.biogas = '',
      this.gas = '',
      this.wood = '',
      this.districtheat = ''     
    },
    onSubmit() {
      const newData = {
        electricitymix: this.electricitymix,
        greenpower: this.greenpower,
        fueloil: this.fueloil,
        biogas: this.biogas,
        gas: this.gas,
        wood: this.wood,
        districtheat: this.districtheat
      }

      return newData
    },
    async updateInput() {
      await fetch('api/energie', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(this.onSubmit)
      })
    },
    async fetchInput() {
      const res = await fetch(
        'api/energie')
      const data = await res.json()
      console.log(data)
      return data[0]
      
    },
  },

  async created() {
    this.stored_data = await this.fetchInput()
    this.electricitymix = this.stored_data.electricitymix
    this.greenpower = this.stored_data.greenpower
    this.fueloil = this.stored_data.fueloil
    this.biogas = this.stored_data.biogas
    this.gas = this.stored_data.gas
    this.wood = this.stored_data.districtheat
  },

  computed: {
    getResult() {
      var result = this.electricitymix*728.69 + this.fueloil*66.88 + this.biogas*53.06 +
                   this.gas*53.06 + this.wood*93.8 + this.districtheat*66.33*0.003409 
      return result.toFixed(2)
    }
  }
}

</script>

<style scoped>
.calculation {
  align-content: center;
  margin-top: 100px;
}

#result {
  color: green;
  font-size: 40px
}
</style>
