<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="goToDaybook">Go to daybook</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'daybook' });
    },
  },
};
</script>
