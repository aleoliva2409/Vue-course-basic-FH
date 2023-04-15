<template>
  <Navbar />

  <div v-if="isLoading" class="row justify-content-md-center">
    <div class="col-3 alert-info text-center mt-5">
      Espere por favor...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div v-else class="d-flex">
    <div class="col-4">
      <EntryList />
    </div>
    <div class="col">
      <RouterView />
    </div>
  </div>
  
</template>

<script>
import { mapActions, mapState } from 'vuex'
import EntryList from '../components/EntryList.vue'
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar,
    EntryList
  },
  methods: {
    ...mapActions('journal', ['loadEntries'])
  },
  computed: {
    ...mapState('journal', ['isLoading'])
  },
  created() {
    this.loadEntries()
  }
}
</script>

<style>

</style>