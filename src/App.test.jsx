import '@testing-library/jest-dom/vitest'
import React, { useEffect } from 'react'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('./components/common/Preloader', () => ({
  Preloader: () => React.createElement('div', null, 'Preloader'),
}))

vi.mock('./components/common/AnimatedCursor', () => ({
  AnimatedCursor: () => React.createElement('div', null, 'Cursor'),
}))

vi.mock('./components/layout/Navbar', () => ({
  Navbar: ({ items }) =>
    React.createElement(
      'nav',
      null,
      items.map((item) =>
        React.createElement('span', { key: item.id }, item.label),
      ),
    ),
}))

vi.mock('./sections/Hero', () => ({
  Hero: ({ onSceneReady }) => {
    useEffect(() => {
      onSceneReady()
    }, [onSceneReady])

    return React.createElement('section', { id: 'home' }, 'Hero Section')
  },
}))

vi.mock('./sections/About', () => ({
  About: () => React.createElement('section', { id: 'about' }, 'About Section'),
}))

vi.mock('./components/SkillsSection', () => ({
  SkillsSection: () => React.createElement('section', { id: 'skills' }, 'Skills Section'),
}))

vi.mock('./sections/Projects', () => ({
  Projects: () => React.createElement('section', { id: 'projects' }, 'Projects Section'),
}))

vi.mock('./sections/Experience', () => ({
  Experience: () => React.createElement('section', { id: 'experience' }, 'Experience Section'),
}))

vi.mock('./sections/SectionPlaceholder', () => ({
  SectionPlaceholder: ({ title }) => React.createElement('section', null, title),
}))

describe('App', () => {
  it('renders navigation and the implemented sections', () => {
    render(React.createElement(App))

    const navigation = screen.getByRole('navigation')

    expect(within(navigation).getByText('Home')).toBeInTheDocument()
    expect(within(navigation).getByText('Projects')).toBeInTheDocument()
    expect(within(navigation).getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('About Section')).toBeInTheDocument()
    expect(screen.getByText('Skills Section')).toBeInTheDocument()
    expect(screen.getByText('Projects Section')).toBeInTheDocument()
    expect(screen.getByText('Experience Section')).toBeInTheDocument()
  })
})
