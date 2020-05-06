import React from 'react'

const BlogForm = ({
  onSubmit,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) => (

  // Passamos o event.target do onChange desestruturado, pegando
  // apenas o targe e o usando para modificar o States desejados
  <form onSubmit={onSubmit}>
    <div>
      title
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author
      <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url
      <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
)


export default BlogForm
