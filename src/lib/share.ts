import type { Title } from './scoring'

export function buildShareText(iq: number, title: Title, topPercent: number): string {
  return [
    '🧠 IQT — Pattern Cognition Assessment',
    `${title.emoji} ${title.name} — Est. IQ ${iq} (top ${topPercent}%)`,
    'For entertainment only. Beat me: https://iqt.moosha.org',
  ].join('\n')
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
