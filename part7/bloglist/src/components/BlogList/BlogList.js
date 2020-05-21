/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import { toggleVisibility, addLike, removeBlog } from '../../reducers/blogReducer'

const useStyles = makeStyles({
  table: {
    minWidth: 0,
  },
  link: {
    'text-decoration': 'none',
    color: 'blue',
  },
  title: {
    'font-size': 'larger',
    background: '#5d78ff',
    color: 'white',
  },
})


const Blog = ({ blog }) => {
  const classes = useStyles()

  return (
    <div>
      <div className="blogPartial">
        <div>
          <Link className={classes.link} to={`/blogs/${blog.id}`}>"{blog.title}" - {blog.author}</Link>
        </div>
      </div>
    </div>
  )
}

const BlogList = ({
  blogs, addLike, removeBlog,
}) => {
  const classes = useStyles()
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.title}>Blog List</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell component="th" scope="row">
                  <Blog
                    blog={blog}

                    removeBlog={removeBlog}
                    addLike={addLike}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}


const mapStateToProps = (state) => ({
  blogs: state.blogs,
})

const mapDispatchToProps = {
  toggleVisibility, addLike, removeBlog,
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default ConnectedBlogs
