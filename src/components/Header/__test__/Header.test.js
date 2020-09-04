import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Header from '../Header'

afterEach(cleanup)

it('renders', () => {
  const { asFragment } = render(<Header />)
  expect(asFragment()).toMatchSnapshot()
})
