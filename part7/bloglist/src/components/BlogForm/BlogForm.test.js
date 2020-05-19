import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  test('bl', () => {
    const createForm = jest.fn()
    const component = render(
      <BlogForm addBlog={createForm} />,
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Teste Jest' },
    })
    fireEvent.change(author, {
      target: { value: 'Jester' },
    })
    fireEvent.change(url, {
      target: { value: 'jest.com' },
    })
    fireEvent.submit(form)

    expect(createForm.mock.calls).toHaveLength(1)
    expect(createForm.mock.calls[0][0].title).toBe('Teste Jest')
    expect(createForm.mock.calls[0][0].author).toBe('Jester')
    expect(createForm.mock.calls[0][0].url).toBe('jest.com')
  })
})
