import { Page } from '../components/Page'
import { Actions, Button, Head } from '../components/ui'
import { group, members } from '../data'
import { paths } from '../router'

const crumbs = [
  { label: 'My courses', to: paths.courses },
  { label: group.label, to: paths.group },
  { label: 'Assignment brief' },
]

const deliverables = [
  { name: 'Code', text: 'Source code in your group’s GitLab repository, with a README that explains how to set it up and run it.' },
  { name: 'Report', text: 'A report of 6 to 8 pages covering the problem, your design decisions, testing and what you would change.' },
  { name: 'Demo video', text: 'A video of up to 3 minutes showing the prototype working. Every member should appear or speak.' },
]

const marking = [
  { name: 'Design', weight: '30%' },
  { name: 'Build and testing', weight: '30%' },
  { name: 'Report', weight: '25%' },
  { name: 'Demo video', weight: '15%' },
]

// Example content for the prototype.
export function Brief() {
  return (
    <Page title="Assignment brief" crumbs={crumbs} width="sheet">
      <Head title="Assignment brief" lede={`${group.course} ${group.courseName} · Group project`} />

      <section className="card">
        <dl className="facts">
          <div>
            <dt className="ask-label">Due</dt>
            <dd className="ask-value">{group.due}</dd>
          </div>
          <div>
            <dt className="ask-label">Weighting</dt>
            <dd className="ask-value">30% of final grade</dd>
          </div>
          <div>
            <dt className="ask-label">Group size</dt>
            <dd className="ask-value">{members.length + 1} members</dd>
          </div>
        </dl>
      </section>

      <section className="card brief">
        <h2>Overview</h2>
        <p>
          Your group will design, build and demonstrate a small device that helps households use less water. You choose
          the problem to solve, such as detecting leaks, timing showers or reminding people to turn off outdoor taps.
        </p>
        <p>
          The device should be a working prototype, not a finished product. Marks go to clear thinking, honest testing
          and a build that does what you say it does.
        </p>
      </section>

      <section className="card brief">
        <h2>Deliverables</h2>
        <ul className="brief-list">
          {deliverables.map((d) => (
            <li key={d.name}>
              <b>{d.name}.</b> {d.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="card brief">
        <h2>Marking</h2>
        <ul className="rows">
          {marking.map((m) => (
            <li className="mark-row" key={m.name}>
              <span className="step-title">{m.name}</span>
              <span className="num">{m.weight}</span>
            </li>
          ))}
        </ul>
        <p className="sheet-sub">Late submissions lose 10% per day. Every member receives the same group mark.</p>
      </section>

      <Actions single>
        <Button kind="primary" to={paths.group}>
          Back to group
        </Button>
      </Actions>
    </Page>
  )
}