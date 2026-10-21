import { useSyncExternalStore } from 'react'

// Hash routing as usuel
function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getPath() {
  return window.location.hash.replace(/^#/, '') || '/'
}

export function usePath() {
  return useSyncExternalStore(subscribe, getPath)
}

export function href(path: string) {
  return `#${path}`
}

export const paths = {
  courses: '/',
  group: '/group',
  submit: '/group/submit',
  submitted: '/group/submitted',
  email: (member: number) => `/group/email/${member}`,
  emailSent: (member: number) => `/group/email/${member}/sent`,
  task: (id: string) => `/group/task/${id}`,
  askHelp: (id: string) => `/group/task/${id}/help`,
  helpSent: (id: string) => `/group/task/${id}/help/sent`,
  brief: '/group/brief',
}
