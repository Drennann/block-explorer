import { HTMLAttributes } from 'react'
import NavBar from './NavBar'

interface LayoutProps extends HTMLAttributes<HTMLElement> {}

export default function Layout({ ...props }: LayoutProps) {
  return (
    <main>
      <NavBar />
      <section {...props} />
    </main>
  )
}
