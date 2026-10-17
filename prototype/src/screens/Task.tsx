import { Page } from '../components/Page'
import { Actions, Avatar, Button, Head, Icon, ResultHead } from '../components/ui'
import { group, initials, member, notes, ownerName, type Task } from '../data'
import { paths } from '../router'

const crumbs = (task: Task, label?: string) => [
  { label: 'My courses', to: paths.courses },
  { label: group.label, to: paths.group },
  label ? { label: task.name, to: paths.task(task.id) } : { label: task.name },
  ...(label ? [{ label }] : []),
]

export function TaskPage({ task }: { task: Task }) {
  const taskNotes = notes[task.id] ?? []
  const lede = (
    <>
      {task.owner !== null && <Avatar small initials={initials(task.owner)} />}
      {task.owner === null ? 'Unassigned' : ownerName(task.owner)} · {task.lane}
    </>
  )

  return (
    <Page title={task.name} crumbs={crumbs(task)} width="sheet">
      <Head title={task.name} lede={lede} />
      <section className="card">
        <h2>Links</h2>
        <ul className="rows">
          <li>
            <span className="step-lead">
              <Icon name="logo-gitlab" className="logo" />
            </span>
            <span className="step-body">
              <a className="stretch step-title" href="#">
                GitLab issue
              </a>
              <span className="step-sub">engr101/group-7</span>
            </span>
            <Icon name="external" className="icon external" />
          </li>
        </ul>
      </section>
      {taskNotes.length > 0 && (
        <section className="card">
          <h2>Notes</h2>
          {taskNotes.map((n) => (
            <div className="task-note" key={n.text}>
              <Avatar initials={`M${n.author}`} />
              <div>
                <span className="sheet-sub">
                  {member(n.author)?.name} · {n.when}
                </span>
                <p>{n.text}</p>
              </div>
            </div>
          ))}
        </section>
      )}
      <Actions single>
        <Button kind="primary" to={paths.askHelp(task.id)}>
          Ask a tutor for help
        </Button>
      </Actions>
    </Page>
  )
}

// S9
export function AskHelp({ task }: { task: Task }) {
  const hasNotes = (notes[task.id] ?? []).length > 0
  return (
    <Page title="Ask a tutor for help" crumbs={crumbs(task, 'Ask a tutor for help')} width="sheet">
      <Head title="Ask a tutor for help" />
      <section className="card">
        <div className="field">
          <span className="ask-label">To</span>
          <span className="step-title">{group.course} tutors</span>
        </div>
        <div className="field">
          <span className="ask-label">Attached</span>
          <ul className="note-pills">
            <li className="note-pill">
              <Icon name="file" />
              {task.name}
            </li>
            <li className="note-pill">
              <Icon name="logo-gitlab" className="logo" />
              GitLab issue
            </li>
            {hasNotes && (
              <li className="note-pill">
                <Icon name="chat" />
                Notes
              </li>
            )}
          </ul>
        </div>
        <div className="field">
          <label className="ask-label" htmlFor="message">
            Message
          </label>
          <textarea id="message" />
        </div>
        <Actions>
          <Button kind="secondary" to={paths.task(task.id)}>
            Cancel
          </Button>
          <Button kind="primary" to={paths.helpSent(task.id)}>
            Send
          </Button>
        </Actions>
      </section>
    </Page>
  )
}

// S10
export function HelpSent({ task }: { task: Task }) {
  return (
    <Page title="Request sent" crumbs={crumbs(task, 'Request sent')} width="sheet">
      <section className="card">
        <ResultHead icon="send" title="Request sent" sub="The tutor's reply will be emailed to every member of the group." />
        <Actions single>
          <Button kind="primary" to={paths.task(task.id)}>
            Back to task
          </Button>
        </Actions>
      </section>
    </Page>
  )
}
