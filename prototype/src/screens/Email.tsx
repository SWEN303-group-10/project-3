import { Page } from '../components/Page'
import { Actions, Avatar, Button, Head, ResultHead } from '../components/ui'
import { group, type Member } from '../data'
import { paths } from '../router'

const crumbs = (label: string) => [
  { label: 'My courses', to: paths.courses },
  { label: group.label, to: paths.group },
  { label },
]

export function EmailMember({ member }: { member: Member }) {
  const title = `Email ${member.name}`
  return (
    <Page title={title} crumbs={crumbs(title)} width="sheet">
      <Head title={title} />
      <section className="card">
        <ul className="rows">
          <li>
            <Avatar initials={`M${member.id}`} />
            <span className="step-body">
              <span className="ask-label">To</span>
              <span className="step-title">{member.name}</span>
              <span className="step-sub">{member.email}</span>
            </span>
          </li>
        </ul>
        <div className="field">
          <label className="ask-label" htmlFor="subject">
            Subject
          </label>
          <input id="subject" defaultValue={group.label} />
        </div>
        <div className="field">
          <label className="ask-label" htmlFor="message">
            Message
          </label>
          <textarea id="message" />
        </div>
        <Actions>
          <Button kind="secondary" to={paths.group}>
            Cancel
          </Button>
          <Button kind="primary" to={paths.emailSent(member.id)}>
            Send
          </Button>
        </Actions>
      </section>
    </Page>
  )
}

//s7?
export function EmailSent({ member }: { member: Member }) {
  return (
    <Page title="Email sent" crumbs={crumbs('Email sent')} width="sheet">
      <section className="card">
        <ResultHead icon="mail" title="Email sent" sub={`Sent to ${member.name} at ${member.email}.`} />
        <Actions single>
          <Button kind="primary" to={paths.group}>
            Back to group
          </Button>
        </Actions>
      </section>
    </Page>
  )
}
