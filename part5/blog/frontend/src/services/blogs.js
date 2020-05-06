import axios from 'axios'

const baseUrl = '/api/blogs'

// Criamos um token como null e depois passamos a ele
// o valor de newToken que é recebido pelo app no momento
// que o usuário loga
let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
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

export default { getAll, setToken, create }
