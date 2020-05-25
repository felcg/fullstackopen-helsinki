import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const BirthyearForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [changeBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const authorsResult = useQuery(ALL_AUTHORS)
  if (authorsResult.loading) {
    return <div>Loading...</div>
  }
  const authors = authorsResult.data.allAuthors

  if (!props.show) {
    return null
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={handleChange}>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          birthyear <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  )
}


export default BirthyearForm
