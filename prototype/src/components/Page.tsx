import { useEffect, useRef, type ReactNode } from 'react'
import { href, paths } from '../router'
import { you } from '../data'
import { NotificationBell } from './Notifications'

export interface Crumb {
  label: string
  to?: string
}

interface PageProps {
  title: string
  crumbs: Crumb[]
  width?: 'full' | 'sheet' | 'wide'
  children: ReactNode
}

const widthClass = { full: 'page', sheet: 'page sheet-page', wide: 'page wide-page' }

// top bar
export function Page({ title, crumbs, width = 'full', children }: PageProps) {
  const main = useRef<HTMLElement>(null)
  useEffect(() => {
    document.title = title
    window.scrollTo(0, 0)
    main.current?.focus({ preventScroll: true })
  }, [title])

  return (
    <>
      <header className="bar">
        <a className="home" href={href(paths.courses)}>
          Courses
        </a>
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            {crumbs.map((c) => (
              <li key={c.label}>
                {c.to !== undefined ? <a href={href(c.to)}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <div className="bar-end">
          <NotificationBell />
          <span className="avatar" role="img" aria-label="Your profile">
            {you.initials}
          </span>
        </div>
      </header>
      <main className={widthClass[width]} ref={main} tabIndex={-1}>
        {children}
      </main>
    </>
  )
}