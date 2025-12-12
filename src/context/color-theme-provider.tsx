'use client';

import { type ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { getCookie, setCookie } from '@/lib/cookies'

export type ColorTheme =
  | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
  | 'red' | 'orange' | 'amber' | 'yellow'
  | 'lime' | 'green' | 'emerald' | 'teal'
  | 'cyan' | 'sky' | 'blue' | 'indigo'
  | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'
  | 'brand'

const COOKIE_NAME = 'color_theme'
const DEFAULT_COLOR_THEME: ColorTheme = 'slate'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type ColorThemeProviderProps = {
  children: ReactNode
  defaultColorTheme?: ColorTheme
}

type ColorThemeContextValue = {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
  resetColorTheme: () => void
}

const ColorThemeContext = createContext<ColorThemeContextValue | undefined>(
  undefined
)

export function ColorThemeProvider({
  children,
  defaultColorTheme = DEFAULT_COLOR_THEME,
}: ColorThemeProviderProps) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const fromCookie = getCookie(COOKIE_NAME) as ColorTheme | undefined
    return fromCookie || defaultColorTheme
  })

  useEffect(() => {
    // Persist selection
    setCookie(COOKIE_NAME, colorTheme, COOKIE_MAX_AGE)

    // Remove existing theme-* classes
    const body = document.body
    Array.from(body.classList)
      .filter((c) => c.startsWith('theme-'))
      .forEach((c) => body.classList.remove(c))

    // Add new class
    body.classList.add(`theme-${colorTheme}`)
  }, [colorTheme])

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme)
  }

  const resetColorTheme = () => {
    setColorThemeState(DEFAULT_COLOR_THEME)
  }

  return (
    <ColorThemeContext.Provider
      value={{ colorTheme, setColorTheme, resetColorTheme }}
    >
      {children}
    </ColorThemeContext.Provider>
  )
}

export function useColorTheme() {
  const ctx = useContext(ColorThemeContext)
  if (!ctx) throw new Error('useColorTheme must be used within a ColorThemeProvider')
  return ctx
}

/**
 * Helper list for UI rendering with tailwind color dots
 */
export function useColorThemes() {
  const themes: { name: string; value: ColorTheme; colorClass: string }[] = [
    { name: 'Slate', value: 'slate', colorClass: 'bg-slate-600' },
    { name: 'Gray', value: 'gray', colorClass: 'bg-gray-600' },
    { name: 'Zinc', value: 'zinc', colorClass: 'bg-zinc-600' },
    { name: 'Neutral', value: 'neutral', colorClass: 'bg-neutral-600' },
    { name: 'Stone', value: 'stone', colorClass: 'bg-stone-600' },
    { name: 'Red', value: 'red', colorClass: 'bg-red-600' },
    { name: 'Orange', value: 'orange', colorClass: 'bg-orange-600' },
    { name: 'Amber', value: 'amber', colorClass: 'bg-amber-600' },
    { name: 'Yellow', value: 'yellow', colorClass: 'bg-yellow-600' },
    { name: 'Lime', value: 'lime', colorClass: 'bg-lime-600' },
    { name: 'Green', value: 'green', colorClass: 'bg-green-600' },
    { name: 'Emerald', value: 'emerald', colorClass: 'bg-emerald-600' },
    { name: 'Teal', value: 'teal', colorClass: 'bg-teal-600' },
    { name: 'Cyan', value: 'cyan', colorClass: 'bg-cyan-600' },
    { name: 'Sky', value: 'sky', colorClass: 'bg-sky-600' },
    { name: 'Blue', value: 'blue', colorClass: 'bg-blue-600' },
    { name: 'Indigo', value: 'indigo', colorClass: 'bg-indigo-600' },
    { name: 'Violet', value: 'violet', colorClass: 'bg-violet-600' },
    { name: 'Purple', value: 'purple', colorClass: 'bg-purple-600' },
    { name: 'Fuchsia', value: 'fuchsia', colorClass: 'bg-fuchsia-600' },
    { name: 'Pink', value: 'pink', colorClass: 'bg-pink-600' },
    { name: 'Rose', value: 'rose' as ColorTheme, colorClass: 'bg-rose-600' },
    { name: 'Brand', value: 'brand' as ColorTheme, colorClass: 'bg-blue-500' },
  ]
  return themes
}