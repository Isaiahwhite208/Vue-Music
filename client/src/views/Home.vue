<template>
  <div>
    <header class="header">
      <div class="mainTitle">
        Love Moi Music
      </div>
      <form @submit.prevent="getQuery($event)" class="row">
        <input type="text" name="name" placeholder="Search"><br>
        <button class="seachButton" type="submit">Search</button>
      </form>
    </header>

    <div>
      <div class="main">
        <div class="listTitle">
          <div>
            My Playlists
          </div>
          <div class="scrollBar">
            <div class="column">
              <div v-for="(song, index) in playlist" class="musicTab">
                <div class="row">
                  <div class="card">
                    <p>Song: {{song.trackName}}</p>
                    <p>Artist: {{song.artistName}}</p>
                    <p>Album: {{song.collectionName}}</p>
                  </div>
                  <div class="card">
                    <audio controls :src=song.previewUrl type="audio" />
                    <button class="button" @click="removeFromPlaylist(song)">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="listTitle">
          <div>
            Results
          </div>
          <div class="scrollBar">
            <div class="column">
              <div v-for="(song, index) in results" class="musicTab">
                <div class="row">
                  <div class="card">
                    <p>Song: {{song.trackName}}</p>
                    <p>Artist: {{song.artistName}}</p>
                    <p>Album: {{song.collectionName}}</p>
                  </div>
                  <div class="card">
                    <audio controls :src=song.previewUrl type="audio" />
                    <button class="button" @click="addToPlaylist(song)">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    mounted() {
      this.$store.dispatch('getPlaylist');
    },
    computed: {
      results() {
        return this.$store.state.results;
      },
      playlist() {
        return this.$store.state.playlist;
      }
    },
    methods: {
      getQuery(event) {
        let search = "search?term=" + event.target.name.value
        this.$store.dispatch("getQuery", search)
      },
      addToPlaylist(data) {
        let song = {
          "trackName": data.trackName,
          "artistName": data.artistName,
          "collectionName": data.collectionName,
          "previewUrl": data.previewUrl,
          "albumArt": data.artworkUrl100,
          "trackId": data.trackId
        }
        this.$store.dispatch("addToPlaylist", song)
      },
      removeFromlist(id) {
        this.$store.dispatch('removeFromlist', id)
      },
    }
  }

</script>
<style>
  html {
    background-color: black;
  }

  .header {
    display: flex;
    background-color: gray;
    color: white;
    justify-content: space-between;
    align-content: center;
  }

  .mainTitle {
    font-size: 2rem;
    padding: 2%;
  }

  .listTitle {
    display: flex;
    color: white;
    width: 50vw;
    justify-content: flex-start;
    flex-direction: column;
  }

  .main {
    display: flex;
    background-image: linear-gradient(gray, orangered);
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .musicTab {
    display: flex;
    background-color: #3c3d41;
    color: white;
    margin: 0.5%;
    border-radius: 15px;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .button {
    background-color: #3c3d41;
    border-radius: 15px;
    border: 3px solid orangered;
    color: orangered;
    padding: 15px;
    text-align: center;
    font-size: 15px;
  }

  .scrollBar {
    overflow-y: auto;
    height: 80vh;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 20vw;
  }

  audio {
    max-width: 15vw;
  }

  input[type=text] {
    border: none;
    border-bottom: 2px solid orangered;
    background-color: gray;
    color: white;
  }

  .seachButton {
    background-color: gray;
    border-radius: 15px;
    border: 2px solid orangered;
    color: white;
    padding: 5px 15px;
    text-align: center;
    font-size: 15px;
  }

  ::placeholder {
    color: white;
  }
</style>