<template>
  <Navbar />

  <div class="d-flex">
    <div class="col-4">
      <EntryList />
    </div>
    <div class="col">
      <RouterView />
    </div>
  </div>
  
</template>

<script>
import EntryList from '../components/EntryList.vue'
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar,
    EntryList
  }
}
</script>

<style>

</style>