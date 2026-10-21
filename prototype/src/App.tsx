import { useState } from 'react'
import { initialTasks, initialMessages, member, type ChatMessage, type Task } from './data'
import { usePath } from './router'
import { MyCourses } from './screens/MyCourses'
import { Group } from './screens/Group'
import { Submit, Submitted } from './screens/Submit'
import { EmailMember, EmailSent } from './screens/Email'
import { AskHelp, HelpSent, TaskPage } from './screens/Task'
import { Brief } from './screens/Brief'

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const sendMessage = (text: string) =>
    setMessages((ms) => [
      ...ms,
      { id: ms.length + 1, author: 'you', time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), text },
    ])
  const path = usePath()
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const setOwner = (id: string, owner: Task['owner']) =>
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, owner } : t)))

  let m: RegExpMatchArray | null

  if (path === '/group') {
    return <Group tasks={tasks} assign={(id) => setOwner(id, 'you')} unassign={(id) => setOwner(id, null)} messages={messages} sendMessage={sendMessage}/>
  }
  if (path === '/group/submit') return <Submit />
  if (path === '/group/submitted') return <Submitted />
  if (path === '/group/brief') return <Brief />
  if ((m = path.match(/^\/group\/email\/(\d+)(\/sent)?$/))) {
    const who = member(Number(m[1]))
    if (who) return m[2] ? <EmailSent member={who} /> : <EmailMember member={who} />
  }

  if ((m = path.match(/^\/group\/task\/(\w+)(\/help)?(\/sent)?$/))) {
    const task = tasks.find((t) => t.id === m![1])
    if (task) {
      if (m[2] && m[3]) return <HelpSent task={task} />
      if (m[2]) return <AskHelp task={task} />
      if (!m[3]) return <TaskPage task={task} />
    }
  }

  // "/" + unknown go to courses.
  return <MyCourses />
}
