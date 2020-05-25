import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const BirthyearForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [changeBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })


  if (!props.show) {
    return null
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
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
