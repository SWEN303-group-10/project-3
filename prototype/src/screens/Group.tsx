import { Page } from '../components/Page'
import { Actions, Avatar, Button, Cushion, Head, Icon } from '../components/ui'
import { deliverables, group, initials, lanes, members, ownerName, resources, you, type Task } from '../data'
import { href, paths } from '../router'

interface GroupProps {
  tasks: Task[]
  assign: (id: string) => void
  unassign: (id: string) => void
}

export function Group({ tasks, assign, unassign }: GroupProps) {
  const ready = deliverables.filter((d) => d.status === 'ready').length

  return (
    <Page title={group.label} crumbs={[{ label: 'My courses', to: paths.courses }, { label: group.label }]}>
      <Head title={group.name} lede={`${group.course} ${group.courseName} · ${members.length + 1} members`} />

      <div className="summary">
        <section className="card">
          <h2>Members</h2>
          <ul className="rows">
            {members.map((m) => (
              <li key={m.id}>
                <Avatar initials={`M${m.id}`} />
                <span className="step-body">
                  <span className="step-title">{m.name}</span>
                  <span className="step-sub">{m.email}</span>
                </span>
                <span className="trail">
                  <Cushion inRow {...m.activity} />
                  <Button kind="secondary" compact to={paths.email(m.id)} label={`Email ${m.name}`}>
                    Email
                  </Button>
                </span>
              </li>
            ))}
            <li>
              <Avatar initials={you.initials} />
              <span className="step-body">
                <span className="step-title">{you.name}</span>
                <span className="step-sub">{you.email}</span>
              </span>
            </li>
          </ul>
        </section>

        <div className="column">
          <section className="card">
            <h2>Project resources</h2>
            <ul className="rows">
              {resources.map((r) => (
                <li key={r.name}>
                  <span className="step-lead">
                    <Icon name={r.logo} className="logo" />
                  </span>
                  <span className="step-body">
                    {/* Placeholder links: the real ones come from the course. */}
                    <a className="stretch step-title" href="#">
                      {r.name}
                    </a>
                    <span className="step-sub">{r.detail}</span>
                  </span>
                  <Icon name="external" className="icon external" />
                </li>
              ))}
            </ul>
          </section>
          <section className="card">
            <div className="sheet-head">
              <div>
                <h2>Submission</h2>
                <span className="sheet-sub">{group.dueToday}</span>
              </div>
              <Cushion
                figure={`${ready} of ${deliverables.length}`}
                label="items ready"
                status={ready < deliverables.length ? 'missing' : undefined}
              />
            </div>
            <Actions single>
              <Button kind="secondary" to={paths.submit}>
                Check submission
              </Button>
            </Actions>
          </section>
        </div>
      </div>

      <section className="board">
        <h2 className="section-title">Tasks</h2>
        <div className="lanes">
          {lanes.map((lane) => {
            const inLane = tasks.filter((t) => t.lane === lane)
            return (
              <div className="track" key={lane}>
                <div className="option-divider">
                  <b>{lane}</b>
                  {inLane.length}
                </div>
                {inLane.map((t) => (
                  <TaskRow key={t.id} task={t} assign={assign} unassign={unassign} />
                ))}
              </div>
            )
          })}
        </div>
      </section>
    </Page>
  )
}

function TaskRow({ task, assign, unassign }: { task: Task } & Omit<GroupProps, 'tasks'>) {
  const mine = task.owner === 'you'
  return (
    <div className={mine ? 'step is-now' : 'step'}>
      <span className="step-lead">
        {task.owner === null ? <Avatar small empty /> : <Avatar small initials={initials(task.owner)} />}
      </span>
      <span className="step-body">
        <a className="stretch step-title" href={href(paths.task(task.id))}>
          {task.name}
        </a>
        <span className="step-sub">{task.owner === null ? 'Unassigned' : ownerName(task.owner)}</span>
      </span>
      {task.owner === null && (
        <span className="trail">
          <Button kind="secondary" compact onClick={() => assign(task.id)} label={`Assign ${task.name} to me`}>
            Assign to me
          </Button>
        </span>
      )}
      {mine && (
        <span className="trail">
          <Button kind="secondary" compact onClick={() => unassign(task.id)} label={`Unassign ${task.name}`}>
            Unassign
          </Button>
        </span>
      )}
    </div>
  )
}
