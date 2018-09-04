import Vue from 'vue'
import Vuex from 'vuex'
// @ts-ignore
import axios from 'axios'
import router from './router'
// @ts-ignore
import vuescroll from 'vue-scroll'

Vue.use(vuescroll)

let iTunesApi = axios.create({
  baseURL: 'https://itunes.apple.com',
  timeout: 3000
})

const playlistApi = axios.create({
  baseURL: `//localhost:3000`,
  timeout: 3000
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songs: [],
    results: {},
    playlist: {}
  },
  mutations: {
    searchResults(state, results) {
      state.results = results
    },
    playlist(state, playlist) {
      state.playlist = playlist
    }
  },
  actions: {
    getQuery({ commit, dispatch }, query) {
      iTunesApi.get('' + query).then(res => {
        commit('searchResults', res.data.results)
      })
    },
    getPlaylist({ commit, dispatch }) {
      playlistApi.get('').then(res => {
        console.log(res.data)
        commit('playlist', res.data)
      })
    },
    addToPlaylist({ commit, dispatch }, song) {
      playlistApi.post('', song)
        .then(res => {
          dispatch('getPlaylist')
        })
    },
    deleteFromPlaylist({ commit, dispatch }, id) {
      playlistApi.delete('' + id)
        .then(res => {
          dispatch('getPlaylist')
        })
    }
  }
})
