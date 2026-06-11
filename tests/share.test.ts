import { describe, it, expect } from 'vitest'
import { buildShareText } from '../src/lib/share'

describe('buildShareText', () => {
  it('includes score, title, percentile and URL', () => {
    const text = buildShareText(127, { name: 'Logic Llama', emoji: '🦙' }, 4)
    expect(text).toContain('127')
    expect(text).toContain('🦙 Logic Llama')
    expect(text).toContain('top 4%')
    expect(text).toContain('https://iqt.moosha.org')
    expect(text).toContain('For entertainment only')
  })
})
