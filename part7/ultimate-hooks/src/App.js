  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources([...resources, response.data])
  }

  const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
    setResources(resources.filter(element => element.id !== id))
  }

  useEffect(() =>{
    const getAll = async(url) => {
      const response = await axios.get(url)
      setResources(response.data)
    }
    getAll(baseUrl)
  },[baseUrl])

  const service = {
    create, remove
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => 
          <div key={n.id}>
            <p >{n.content}</p>
            <button onClick={() => noteService.remove(n.id)}>remove</button>
          </div>
      )}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => 
        <div key={n.id}>
          <p >{n.name} {n.number}</p>
          <button onClick={() => personService.remove(n.id)}>remove</button>
        </div>
      )}
    </div>
  )
}

export default App