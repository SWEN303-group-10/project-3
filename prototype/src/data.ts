// Fixed sample data for the prototype at this stage tba..

export type Status = 'ready' | 'unfinished' | 'missing'

export interface Course {
  code: string
  name: string
  group: string
  members: number
  open: boolean
}

export interface Member {
  id: number
  name: string
  email: string
  activity: { figure: string; label: string; status?: Status }
}

export type Lane = 'To do' | 'In progress' | 'Done'

export type Owner = number | 'you'

export interface Task {
  id: string
  name: string
  lane: Lane
  owner: Owner | null
}

export const you = { initials: 'Y', name: 'You', email: 'you@myvuw.ac.nz' }

export const courses: Course[] = [
  { code: 'ENGR101', name: 'Engineering Technology', group: 'Group 7', members: 6, open: true },
  { code: 'SWEN225', name: 'Software Design', group: 'Team 4', members: 4, open: false },
]

export const group = {
  course: 'ENGR101',
  courseName: 'Engineering Technology',
  name: 'Group 7',
  label: 'ENGR101 Group 7',
  dueToday: 'Due today, 11:59 pm',
  due: 'Today, 11:59 pm',
}

export const members: Member[] = [
  { id: 1, name: 'Member 1', email: 'member1@myvuw.ac.nz', activity: { figure: 'Today', label: 'last active' } },
  { id: 2, name: 'Member 2', email: 'member2@myvuw.ac.nz', activity: { figure: 'Yesterday', label: 'last active' } },
  { id: 3, name: 'Member 3', email: 'member3@myvuw.ac.nz', activity: { figure: '2 days ago', label: 'last active' } },
  { id: 4, name: 'Member 4', email: 'member4@myvuw.ac.nz', activity: { figure: '14 days', label: 'no commits or edits', status: 'missing' } },
  { id: 5, name: 'Member 5', email: 'member5@myvuw.ac.nz', activity: { figure: 'Today', label: 'last active' } },
]

export const resources: { logo: string; name: string; detail: string; to?: string }[] = [
  { logo: 'logo-gitlab', name: 'GitLab repo', detail: 'engr101/group-7' },
  { logo: 'logo-drive', name: 'Google Drive', detail: 'Group 7 shared folder' },
  { logo: 'logo-discord', name: 'Group chat', detail: 'Discord' },
  { logo: 'logo-pdf', name: 'Assignment brief', detail: 'PDF · ENGR101', to: "/group/brief" },
]

export const lanes: Lane[] = ['To do', 'In progress', 'Done']

export const initialTasks: Task[] = [
  { id: 'a', name: 'Task A', lane: 'To do', owner: null },
  { id: 'b', name: 'Task B', lane: 'To do', owner: null },
  { id: 'c', name: 'Task C', lane: 'To do', owner: 3 },
  { id: 'd', name: 'Task D', lane: 'In progress', owner: 2 },
  { id: 'e', name: 'Task E', lane: 'Done', owner: 1 },
]

// Only Task D has one so far
export const notes: Record<string, { author: number; when: string; text: string }[]> = {
  d: [
    {
      author: 2,
      when: 'yesterday',
      text: 'blah blah blah blah',
    },
  ],
}

export interface ChatMessage { id: number; author: Owner; time: string; text: string }

export interface Deliverable {
  name: string
  where: string
  owner: Owner
  status: Status
  label: string
  action?: 'email' | 'add-link'
}

export const initialMessages: ChatMessage[] = [
  { id: 1, author: 1, time: 'Yesterday, 4:12 pm', text: 'blah blah blah' },
  { id: 2, author: 2, time: 'Yesterday, 4:20 pm', text: 'blah blah blah blah' },
  { id: 3, author: 3, time: 'Today, 9:05 am', text: 'blah blah' },
]

export const deliverables: Deliverable[] = [
  { name: 'Code', where: 'GitLab, engr101/group-7', owner: 1, status: 'ready', label: 'Ready' },
  { name: 'Report', where: 'Google Drive, Group 7 shared folder', owner: 3, status: 'unfinished', label: 'Unfinished', action: 'email' },
  { name: 'Demo video', where: 'No link yet', owner: 'you', status: 'missing', label: 'Missing', action: 'add-link' },
]

export function member(id: number) {
  return members.find((m) => m.id === id)
}

export function ownerName(owner: Owner) {
  return owner === 'you' ? you.name : (member(owner)?.name ?? '')
}

export function initials(owner: Owner) {
  return owner === 'you' ? you.initials : `M${owner}`
}


// Add to data.ts. Also add this import at the top of the file:
//   import { paths } from './router'

export interface Notification {
  id: string
  group: string // which group it came from, shown on every notification
  actor: Owner | null // null = system message (no person)
  text: string
  when: string
  unread: boolean
  to?: string // where it opens, if anywhere
}

export const initialNotifications: Notification[] = [
  {
    id: 'n1',
    group: 'ENGR101 Group 7',
    actor: 1,
    text: 'opened a pull request on GitHub: “Add login form validation”',
    when: '12 min ago',
    unread: true,
    to: "/group",
  },
  {
    id: 'n2',
    group: 'ENGR101 Group 7',
    actor: 1,
    text: 'moved Task E from In progress to Done',
    when: '1 hour ago',
    unread: true,
    to: "/group/task/e",
  },
  {
    id: 'n3',
    group: 'ENGR101 Group 7',
    actor: null,
    text: 'Submission is due today at 11:59 pm. 1 of 3 items is ready.',
    when: '3 hours ago',
    unread: true,
    to: "/group/submit",
  },
  {
    id: 'n4',
    group: 'ENGR101 Group 7',
    actor: 2,
    text: 'left a note on Task D',
    when: 'Yesterday',
    unread: false,
    to: "/group/task/d",
  },
  {
    id: 'n5',
    group: 'SWEN225 Team 4',
    actor: 2,
    text: 'requested your review on a pull request on GitHub',
    when: '2 days ago',
    unread: false,
  },
]