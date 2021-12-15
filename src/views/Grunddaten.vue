<template>
  <div class="Grunddaten">
    <h1>Grunddaten deiner Firma</h1>
  </div>

  <form>
    <div class="mb-5 row">
      <label for="inputGrundfläche" class="col-md-3 col-form-label">
        Grundfläche
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16" @click="showDetails" data-bs-content="Nur die Fläche mit Heizung">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
      </svg>
      </label>
  

      <div class="col-md-6">      
        <div class="input-group">
          <input type="text" class="form-control" v-model="floorspace" name="floorspace"  placeholder="e.g. 150,5 ">
          <span class="input-group-text">m²</span>
        </div>
      </div>
    </div>



    <div class="mb-5 row">
      <label for="inputmitarbeiter" class="col-md-3 col-form-label">Anzahl Mitarbeiter</label>
      <div class="col-md-6">
        <input type="number" class="form-control" v-model="stuffnum" name="stuffnum"  placeholder="e.g. 20">
      </div>  
    </div>

    <div class="mb-5 row">
      <label for="inputarbeitstage" class="col-md-3 col-form-label">Arbeitstage im Jahr</label>
      <div class="col-md-6">
        <!-- <input type="number" class="form-control" v-model="workingdays" name="workingdays"  placeholder="e.g. 200"> -->
        <p> {{ workingdays }} Tage</p>
        <input type="range" class="form-range" min="0" max="365" v-model="workingdays" name="workingdays" id="workingdays">
          <div class="d-flex justify-content-between">
            <span>0</span>
            <span>100</span>
            <span>200</span>
            <span>365</span>
          </div>
      </div>  
      
    </div>
  </form>

  <div class="container">
      <div class="row">
        <div class="col-md-1 offset-md-3">
          <ResetButton @reset-input="resetInput" />
        </div>
        <div class="col-md-1 offset-md-3">
          <SwitchButton link="/energie" direction="NEXT" />
        </div>       
      </div>
  </div>

  
</template>

<script>
import ResetButton from '../components/ResetButton'
import SwitchButton from '../components/SwitchButton'
import { Popover } from "bootstrap"

export default {
  name: 'floorspace',
  components: {
    ResetButton,
    SwitchButton
  },
  data() {
    return {
      floorspace: '',
      stuffnum: 0,
      workingdays: 0,
      bsPopover: null,
    }
  },
  methods: {
    resetInput() {
      this.floorspace = '',
      this.stuffnum = 0,
      this.workingdays = 0
    },
    showDetails(e) {
      this.bsPopover = new Popover(e.target, {placement: 'top', trigger: 'click'})
      this.bsPopover.show()
    }
  }
}

// var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
// var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
//   return new bootstrap.Popover(popoverTriggerEl)
// })
</script>
