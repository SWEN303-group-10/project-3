import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Avatar } from './ui'
import { initials, ownerName, type ChatMessage } from '../data'
import './Chat.css'

interface ChatProps {
  messages: ChatMessage[]
  send: (text: string) => void
}

export function Chat({ messages, send }: ChatProps) {
  const [draft, setDraft] = useState('')
  const log = useRef<HTMLUListElement>(null)

  // Keep the newest message in view.
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight })
  }, [messages.length])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    send(text)
    setDraft('')
  }

  return (
    <>
      <ul className="chat-log" ref={log} aria-label="Group chat messages">
        {messages.map((m) => (
          <li className="chat-msg" key={m.id}>
            <Avatar small initials={initials(m.author)} />
            <div>
              <span className="sheet-sub">
                {ownerName(m.author)} · {m.time}
              </span>
              <p>{m.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <form className="chat-compose" onSubmit={submit}>
        <input
          aria-label="Message"
          placeholder="Message the group"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn primary compact" disabled={!draft.trim()}>
          Send
        </button>
      </form>
    </>
  )
}