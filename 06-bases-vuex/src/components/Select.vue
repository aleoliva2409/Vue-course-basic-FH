<template>
  <select name="activities" id="activities" v-model="selected" :value="selected" >
    <option value="1">Sky</option>
    <option value="2">Run</option>
    <option value="3">Swim</option>
    <option value="4">Basket</option>
    <option value="5">Football</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selected: '1'
    }
  },
  // methods: {
  //   handleSelect(e) {
  //     this.selected = e.target.value
  //   }
  // }
}
</script>

<style>

</style>