import axios from 'axios'

const baseUrl = '/api/blogs'

// Criamos um token como null e depois passamos a ele
// o valor de newToken que é recebido pelo app no momento
// que o usuário loga
let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  // Nosso backend requer um token quando faz um POST request
  // aqui nós passamos esse token para o axios.post usando
  // um custom header
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async (updatedBlog) => {
  // updateLikes recebe um blog como parametro e então
  // envia um PUT request para a api usando o id recebido
  // nos parametros. e passa o Objeto inteiro com os Likes
  // atualizados
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

const deleteBlog = async (blogToDelete) => {
  // Nosso backend permite deletar blogs apenas caso o usuário seja o dono do post
  // por isso precisamos passar o token no header
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
  return response.data
}

const toggleVisibility = async (id) => {
  const blogs = await getAll()
  const blogToToggle = blogs.find((blog) => blog.id === id)
  const toggledBlog = { ...blogToToggle, visibility: !blogToToggle.visibility }
  const response = await axios.put(`${baseUrl}/${blogToToggle.id}`, toggledBlog)
  return response.data
}

export default {
  getAll, setToken, create, updateLikes, deleteBlog, toggleVisibility,
}
