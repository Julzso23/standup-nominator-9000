import axios from 'axios'

async function sha256(plain) {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

function base64urlencode(hash){
  const a = String.fromCharCode(...new Uint8Array(hash))
  return btoa(a).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export default {
  namespaced: true,

  state: {
    clientId: 'b03d6ec5e09546ba982f33d7f9318764',
    repsonseType: 'code',
    redirectUri: 'standup-nominator-9000://spotifyAuth',
    codeChallengeMethod: 'S256',
    scope: 'user-modify-playback-state',
    codeVerifier: null,
    codeChallenge: null,
    accessToken: localStorage.getItem('spotifyAccessToken') || null,
    refreshToken: localStorage.getItem('spotifyRefreshToken') || null,
    axiosInstance: null
  },

  mutations: {
    setCodeVerifier (state, verifier) {
      state.codeVerifier = verifier
    },
    setCodeChallenge (state, challenge) {
      state.codeChallenge = challenge
    },
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
      if (accessToken === null) {
        localStorage.removeItem('spotifyAccessToken')
      } else {
        localStorage.setItem('spotifyAccessToken', accessToken)
      }
    },
    setRefreshToken (state, refreshToken) {
      state.refreshToken = refreshToken
      if (refreshToken === null) {
        localStorage.removeItem('spotifyRefreshToken')
      } else {
        localStorage.setItem('spotifyRefreshToken', refreshToken)
      }
    },
    setAxiosInstance (state) {
      if (state.axiosInstance !== null) return

      state.axiosInstance = axios.create({
        baseURL: 'https://api.spotify.com/v1/me/player/',
        timeout: 1000,
        headers: {'Authorization': `Bearer ${state.accessToken}`}
      })
    }
  },

  actions: {
    async generateCodeChallenge ({ commit, state }) {
      commit('setCodeVerifier', [...crypto.getRandomValues(new Uint8Array(64))].map(m=>('0'+m.toString(16)).slice(-2)).join(''))
      commit('setCodeChallenge', base64urlencode(await sha256(state.codeVerifier)))
    },

    async getToken ({ commit, state }, code) {
      const params = new URLSearchParams()
      params.append('client_id', state.clientId)
      params.append('grant_type', 'authorization_code')
      params.append('code', code)
      params.append('redirect_uri', state.redirectUri)
      params.append('code_verifier', state.codeVerifier)

      return axios.post('https://accounts.spotify.com/api/token', params).then(response => {
        commit('setAccessToken', response.data.access_token)
        commit('setRefreshToken', response.data.refresh_token)
      })
    },

    async unlink ({ commit }) {
      commit('setAccessToken', null)
      commit('setRefreshToken', null)
    },

    async play ({ state, commit }) {
      if (!state.accessToken) return

      commit('setAxiosInstance')
      return state.axiosInstance.put('play')
    },

    async pause ({ state, commit }) {
      if (!state.accessToken) return

      commit('setAxiosInstance')
      return state.axiosInstance.put('pause')
    }
  },

  getters: {
    authoriseLink (state) {
      return `https://accounts.spotify.com/authorize?client_id=${state.clientId}&response_type=${state.repsonseType}&redirect_uri=${state.redirectUri}&code_challenge_method=${state.codeChallengeMethod}&code_challenge=${state.codeChallenge}&scope=${state.scope}`
    }
  }
}
