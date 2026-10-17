import { Page } from '../components/Page'
import { Icon } from '../components/ui'
import { courses } from '../data'
import { href, paths } from '../router'

export function MyCourses() {
  return (
    <Page title="My courses" crumbs={[{ label: 'My courses' }]}>
      <div className="head">
        <h1>My courses</h1>
      </div>
      <div className="course-grid">
        {courses.map((c) => (
          <section className="card course-card" key={c.code}>
            <div>
              <span className="ask-label">{c.code}</span>
              <h2 className="sheet-title">{c.name}</h2>
            </div>
            <p className="course-group">
              <Icon name="users" />
              <a
                className="stretch step-title"
                href={c.open ? href(paths.group) : href(paths.courses)}
                aria-label={`Open ${c.code} ${c.group}`}
              >
                {c.group}
              </a>
              <span className="step-sub">{c.members} members</span>
              <Icon name="chevron" className="icon chevron" />
            </p>
          </section>
        ))}
      </div>
    </Page>
  )
}
