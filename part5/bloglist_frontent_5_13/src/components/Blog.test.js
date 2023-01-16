import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Css is easy'
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()


  // method 3
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Css is easy'
  )
})