import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  const blog = {
    title: 'Test4',
    author: 'Felipe',
    url: 'test4.com',
    likes: 4,
    id: '1234',
  }
  let component; let removeBlog; const
    showRemoveButton = false
  beforeEach(() => {
    removeBlog = jest.fn()
    component = render(
      <Blog blog={blog} removeBlog={removeBlog} showRemoveButton={showRemoveButton} />,
    )
  })


  test('renders content', () => {
    const partialBlog = component.container.querySelector('.blogPartial')
    expect(partialBlog).toHaveTextContent(blog.title)
    expect(partialBlog).toHaveTextContent(blog.author)
  })

  test('blog does not render url and likes by default', () => {
    const partialBlog = component.container.querySelector('.blogPartial')
    expect(partialBlog).not.toHaveTextContent('like')
    expect(partialBlog).not.toHaveTextContent(blog.url)
  })
})
