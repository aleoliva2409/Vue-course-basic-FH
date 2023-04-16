<template v-if="entry">
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-3">{{ month }}</span>
      <span class="mx-2 fs-4 fw-light">{{ year }}</span>
    </div>
    <div>
      <input
        type="file"
        @change="selectedImg"
        ref="imgSelector"
        v-show="false"
        accept="image/png, image/jpg, image/jpeg"
      />
      <button v-if="entry.id" @click="deleteEntry" class="btn btn-danger m-1">
        Borrar<i class="fa fa-trash-alt mx-1"></i>
      </button>
      <button class="btn btn-primary m-1" @click="selectImg">
        Subir foto<i class="fa fa-upload mx-2"></i>
      </button>
    </div>
  </div>
  <hr />
  <div class="d-flex flex-column px-3 h-75">
    <textarea v-model="entry.text" placeholder="Que sucedio hoy?"></textarea>
  </div>

  <Fab icon="fa-save" @on-click="saveEntry" />

  <img
    v-if="entry.picture && !localImg"
    :src="entry.picture"
    alt="lol"
    class="img-thumbnail"
  />

  <img v-if="localImg" :src="localImg" alt="lol" class="img-thumbnail" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Fab from '../components/Fab.vue';
import { getDayMonthYear } from '../helpers/getDayMonthYear';
import { uploadImages } from '../helpers/uploadImages';

export default {
  components: {
    Fab,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('journal', ['getEntryById']),
    // ...mapActions('journal', ['updateEntry']),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    year() {
      const { year } = getDayMonthYear(this.entry.date);
      return year;
    },
  },
  data() {
    return {
      entry: null,
      localImg: null,
      file: null,
    };
  },
  methods: {
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntryById']), //ahi lo ponen pero yo lo puse arriba
    loadEntry() {
      let entry;
      this.localImg = null;
      this.file = null;

      if (this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: 'no-entry' });
      }

      this.entry = entry;
    },
    async saveEntry() {
      this.$swal({
        title: 'Espere por favor',
        allowOutsideClick: false,
      });

      this.$swal.showLoading();

      const picture = await uploadImages(this.file);
      this.entry.picture = picture;

      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);
        this.$router.push({ name: 'entry', params: { id } });
      }

      this.file = null;
      this.$swal('Guardado', 'Entrada registrada con exito', 'success');
    },

    async deleteEntry() {
      const { isConfirmed } = await this.$swal({
        title: 'Esta seguro?',
        text: 'Una vez borrado, no se podra recuperar',
        showDenyButton: true,
        confirmButtonText: 'Si, estoy seguro',
      });

      if (this.entry.id && isConfirmed) {
        this.$swal({
          title: 'Espere por favor',
          allowOutsideClick: false,
        });

        this.$swal.showLoading();
        await this.deleteEntryById(this.entry.id);
        this.$router.push({ name: 'no-entry' });

        this.$swal('Eliminado', '', 'success');
      }
    },
    selectedImg(e) {
      const imgFile = e.target.files[0];

      if (!imgFile) {
        this.file = null;
        this.localImg = null;
        return;
      }

      this.file = imgFile;
      const fr = new FileReader();
      fr.onload = () => (this.localImg = fr.result);
      fr.readAsDataURL(imgFile);
    },
    selectImg() {
      this.$refs.imgSelector.click();
    },
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
  created() {
    this.loadEntry();
  },
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
