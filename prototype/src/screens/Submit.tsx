import { Page } from '../components/Page'
import { Actions, Button, ResultHead, Head, Icon } from '../components/ui'
import { deliverables, group, ownerName } from '../data'
import { paths } from '../router'

const crumbs = (label: string) => [
  { label: 'My courses', to: paths.courses },
  { label: group.label, to: paths.group },
  { label },
]

export function Submit() {
  const ready = deliverables.filter((d) => d.status === 'ready').length
  const notReady = deliverables.length - ready

  return (
    <Page title="Ready to submit?" crumbs={crumbs('Ready to submit?')} width="wide">
      <Head title="Ready to submit?" lede={group.label} />
      <div className="split">
        <section className="card">
          <div className="sheet-head">
            <div>
              <h2 className="sheet-title">Deliverables</h2>
              <span className="sheet-sub">{deliverables.length} items</span>
            </div>
          </div>
          <div className="track">
            {deliverables.map((d) => (
              <div className="step deliverable" data-status={d.status} key={d.name}>
                <span className="step-body">
                  <span className="step-title">{d.name}</span>
                  <span className="step-sub">{d.where}</span>
                </span>
                <span className="owner">{ownerName(d.owner)}</span>
                <span className="consequence">{d.label}</span>
                <span className="act">
                  {d.action === 'email' && typeof d.owner === 'number' && (
                    <Button kind="secondary" compact to={paths.email(d.owner)} label={`Email ${ownerName(d.owner)}`}>
                      Email
                    </Button>
                  )}
                  {/* A dead end same as as in the prototype. */}
                  {d.action === 'add-link' && (
                    <Button kind="secondary" compact label={`Add ${d.name.toLowerCase()} link`}>
                      Add link
                    </Button>
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>

        <aside className="card submit-panel" aria-label="Submit">
          <dl className="facts">
            <div>
              <dt className="ask-label">Due</dt>
              <dd className="ask-value">{group.due}</dd>
            </div>
            <div>
              <dt className="ask-label">Ready</dt>
              <dd className="ask-value">
                {ready} of {deliverables.length} items
              </dd>
            </div>
          </dl>
          {notReady > 0 && (
            <p className="watch">
              <Icon name="alert" />
              <span>{notReady} items are not ready. Submitting sends them as is.</span>
            </p>
          )}
          <Actions single>
            <Button kind="primary" to={paths.submitted}>
              Submit
            </Button>
          </Actions>
          <p className="sheet-sub">Every member is emailed the list of what was submitted.</p>
        </aside>
      </div>
    </Page>
  )
}

// S5
export function Submitted() {
  return (
    <Page title="Submitted" crumbs={crumbs('Submitted')} width="sheet">
      <section className="card">
        <ResultHead icon="check" title="Submitted" sub="This list has been emailed to every member." status="ready" />
        <div className="track">
          {deliverables.map((d) => (
            <div className="step plain" key={d.name}>
              <span className="step-body">
                <span className="step-title">{d.name}</span>
              </span>
              <span className="consequence">Received</span>
            </div>
          ))}
        </div>
        <Actions single>
          <Button kind="primary" to={paths.group}>
            Back to group
          </Button>
        </Actions>
      </section>
    </Page>
  )
}
