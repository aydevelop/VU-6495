export default function ({ $axios, redirect, store }) {

  $axios.interceptors.request.use(request => {
    if (store.getters['auth/isAuthenticated']) {
      const token = store.getters['auth/getToken']
      request.headers.common['Authorization'] = `Bearer ${token}`;
      $axios.setHeader('Authorization', `Bearer ${token}`)
    }

    return request
  })

}
