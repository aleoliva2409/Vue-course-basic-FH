<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2 mb-2">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar entrada"
        v-model="term"
      />
    </div>
    <div class="mt-2 d-flex flex-column">
      <button @click="createNewEntry" class="btn btn-primary mx-3">
        <i class="fa fa-plus-circle"></i>
        Nueva Entrada
      </button>
    </div>
    <div class="entry-scrollarea">
      <Entry v-for="entry in getEntriesByTerm" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>

<script>
import Entry from './Entry.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Entry,
  },
  computed: {
    ...mapGetters('journal', ['getEntries']),
    getEntriesByTerm() {
      return this.getEntries(this.term);
    },
  },
  data() {
    return {
      term: '',
    };
  },
  methods: {
    createNewEntry() {
      this.$router.push({ name: 'entry', params: { id: 'new' } });
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}

.entry-scrollarea {
  height: calc(100vh - 110px);
  overflow: auto;
}
</style>
