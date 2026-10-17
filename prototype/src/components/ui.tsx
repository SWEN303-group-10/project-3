import type { ReactNode } from 'react'
import { href } from '../router'
import type { Status } from '../data'

// stylesheet unchanged from it 3 so keep markup and class names in alignment
export function Icon({ name, className = 'icon' }: { name: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`${import.meta.env.BASE_URL}icons.svg#${name}`} />
    </svg>
  )
}

export function Avatar({ initials, small, empty }: { initials?: string; small?: boolean; empty?: boolean }) {
  const cls = ['avatar', small && 'sm', empty && 'empty'].filter(Boolean).join(' ')
  return (
    <span className={cls} aria-hidden="true">
      {initials}
    </span>
  )
}

interface ButtonProps {
  kind: 'primary' | 'secondary'
  children: ReactNode
  to?: string
  onClick?: () => void
  compact?: boolean
  label?: string
}

export function Button({ kind, children, to, onClick, compact, label }: ButtonProps) {
  const cls = `btn ${kind}${compact ? ' compact' : ''}`
  if (to !== undefined) {
    return (
      <a className={cls} href={href(to)} aria-label={label}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} onClick={onClick} aria-label={label}>
      {children}
    </button>
  )
}

export function Actions({ children, single }: { children: ReactNode; single?: boolean }) {
  return <div className={single ? 'sheet-actions single' : 'sheet-actions'}>{children}</div>
}

export function Head({ title, lede }: { title: string; lede?: ReactNode }) {
  return (
    <div className="head">
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
    </div>
  )
}

interface CushionProps {
  figure: string
  label: string
  status?: Status
  inRow?: boolean
}

export function Cushion({ figure, label, status, inRow }: CushionProps) {
  return (
    <span className={inRow ? 'cushion in-row' : 'cushion'} data-status={status}>
      <b>{figure}</b>
      <small>{label}</small>
    </span>
  )
}

interface ResultHeadProps {
  icon: string
  title: string
  sub: string
  status?: Status
}

export function ResultHead({ icon, title, sub, status }: ResultHeadProps) {
  return (
    <div className="result-head">
      <span className="arrived-mark" data-status={status}>
        <Icon name={icon} />
      </span>
      <div>
        <h1 className="sheet-title">{title}</h1>
        <span className="sheet-sub">{sub}</span>
      </div>
    </div>
  )
}
