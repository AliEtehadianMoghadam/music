<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from '../store';
import AppUpload from '../components/Upload.vue';
// import { songsCollection, auth } from '../includes/firebase';
import CompositionItem from '../components/CompositionItem.vue';

export default {
  name: 'manage',
  components: {
    AppUpload,
    CompositionItem,
  },
  data: () => ({
    songs: [],
    unsavedFlag: false,
  }),
  methods: {
    updateSong(i, values) {
      this.song[i].modified_name = values.modified_name;
      this.songs.genre = values.genre;
    },
    removeSong(i) {
      this.song.splice(i, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancleUploads();
  //   next();
  // },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-undef, no-restricted-globals
      const leave = confrim('You have unsaved changes. Are you sure yoy want to leave?');
      next(leave);
    }
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.userLoggedIn) {
      next();
    } else {
      next({ name: 'home' });
    }
  },
  async created() {
    // const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
    // snapshot.forEach(this.addSong);
  },
};
</script>

<style></style>
