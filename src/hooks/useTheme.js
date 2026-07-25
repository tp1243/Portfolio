import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'
const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY)
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches

  return storedTheme ?? (systemPrefersDark ? 'dark' : 'light')
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)
  const mounted = true

  useEffect(() => {
    if (!mounted) {
      return
    }

    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [mounted, theme])

  const value = useMemo(
    () => ({
      theme,
      mounted,
      toggleTheme: () =>
        setTheme((currentTheme) =>
          currentTheme === 'dark' ? 'light' : 'dark',
        ),
    }),
    [mounted, theme],
  )

  return value
}
