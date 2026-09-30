// seungjaehh design system runtime: theme toggle (auto -> light -> dark) and "/" to focus search.
(() => {
  const root = document.documentElement
  const KEY = 'ds-theme'
  const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }
  const write = v => { try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY) } catch { /* private mode */ } }
  const ORDER = [null, 'light', 'dark']
  const LABEL = { null: '자동', light: '라이트', dark: '다크' }

  const apply = t => { t ? root.setAttribute('data-theme', t) : root.removeAttribute('data-theme') }
  apply(read())

  const paint = btn => {
    const t = read()
    btn.textContent = LABEL[t]
    btn.setAttribute('aria-label', `테마: ${LABEL[t]} (누르면 변경)`)
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    paint(btn)
    btn.addEventListener('click', () => {
      const next = ORDER[(ORDER.indexOf(read()) + 1) % ORDER.length]
      write(next); apply(next); document.querySelectorAll('[data-theme-toggle]').forEach(paint)
    })
  })

  document.addEventListener('keydown', e => {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || /input|textarea/i.test(document.activeElement?.tagName)) return
    const s = document.querySelector('[data-search]')
    if (s) { e.preventDefault(); s.focus() }
  })
})()
