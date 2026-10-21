import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { Avatar } from './ui'
import { initialNotifications, initials, ownerName, type Notification } from '../data'
import { usePath } from '../router'
import './Notifications.css'
interface NotificationsState {
  items: Notification[]
  unread: number
  markRead: (id: string) => void
  markAllRead: () => void
}

const NotificationsContext = createContext<NotificationsState | null>(null)

// Wrap the app once (main.tsx) so every screen shares the same notifications.
export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Notification[]>(initialNotifications)
  const state: NotificationsState = {
    items,
    unread: items.filter((n) => n.unread).length,
    markRead: (id) => setItems((ns) => ns.map((n) => (n.id === id ? { ...n, unread: false } : n))),
    markAllRead: () => setItems((ns) => ns.map((n) => ({ ...n, unread: false }))),
  }
  return <NotificationsContext.Provider value={state}>{children}</NotificationsContext.Provider>
}

function useNotifications() {
  const ctx = useContext(NotificationsContext)
  if (!ctx) throw new Error('NotificationBell must be inside NotificationsProvider')
  return ctx
}

function BellIcon() {
  return (
    <svg className="icon lg" aria-hidden="true">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

export function NotificationBell() {
  const { items, unread, markRead, markAllRead } = useNotifications()
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const path = usePath()

  // Close when navigating.
  useEffect(() => setOpen(false), [path])

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const openItem = (n: Notification) => {
    markRead(n.id)
    setOpen(false)
    if (n.to) window.location.hash = n.to
  }

  return (
    <div className="bell-wrap" ref={wrap}>
      <button
        type="button"
        ref={button}
        className={unread > 0 ? 'bell has-unread' : 'bell'}
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
        aria-expanded={open}
        aria-controls="notifications-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <BellIcon />
        {unread > 0 && (
          <span className="bell-badge" aria-hidden="true">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <section className="notif-panel" id="notifications-panel" aria-label="Notifications">
          <div className="notif-head">
            <h2>Notifications</h2>
            <button type="button" className="btn ghost compact" onClick={markAllRead} disabled={unread === 0}>
              Mark all as read
            </button>
          </div>
          {items.length === 0 ? (
            <p className="sheet-sub notif-empty">You’re all caught up.</p>
          ) : (
            <ul className="notif-list">
              {items.map((n) => (
                <li key={n.id}>
                  <button type="button" className={n.unread ? 'notif is-unread' : 'notif'} onClick={() => openItem(n)}>
                    <Avatar small empty={n.actor === null} initials={n.actor === null ? undefined : initials(n.actor)} />
                    <span className="step-body">
                      <span className="notif-text">
                        {n.actor !== null && <b>{ownerName(n.actor)} </b>}
                        {n.text}
                      </span>
                      <span className="step-sub">
                        <b className="notif-group">{n.group}</b> · {n.when}
                      </span>
                    </span>
                    {n.unread && (
                      <>
                        <span className="notif-dot" aria-hidden="true" />
                        <span className="sr-only">Unread</span>
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  )
}