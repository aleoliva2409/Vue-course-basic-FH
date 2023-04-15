<template>
  <div
    class="pointer p-2 entry-container"
    @click="$router.push({ name: 'entry', params: { id: 10 } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">29</span>
      <span class="mx-1 fs-5">Noviembre</span>
      <span class="mx-2 fw-light">2021</span>
    </div>

    <div class="entry-description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
      reprehenderit voluptatibus sapiente velit consequatur neque suscipit
      itaque qui sit quia?
    </div>
  </div>
</template>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
  }
  .entry-description {
    font-size: 12px;
  }
}
</style>
