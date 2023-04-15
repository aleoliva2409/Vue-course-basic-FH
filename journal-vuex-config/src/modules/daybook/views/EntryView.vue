<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">30</span>
      <span class="mx-1 fs-3">noviembre</span>
      <span class="mx-2 fs-4 fw-light">2021</span>
    </div>
    <div>
      <button class="btn btn-danger m-1">
        Borrar<i class="fa fa-trash-alt mx-1"></i>
      </button>
      <button class="btn btn-primary m-1">
        Subir foto<i class="fa fa-upload mx-2"></i>
      </button>
    </div>
  </div>
  <hr>
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="Que sucedio hoy?" ></textarea>
  </div>

  <Fab icon="fa-save" />

  <img src="https://i.blogs.es/bf5ad0/league-of-legends-destacada/1366_2000.jpeg" alt="lol" class="img-thumbnail">
</template>

<script>
import Fab from '../components/Fab.vue'

export default {
  components: {
    Fab
  }
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:hover {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>
