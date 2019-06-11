import apiConnection from 'hiep294-apiconnection'
export default apiConnection({
  url: '/api/recipes',
  actions: ['index', 'create', 'update', 'delete']
})