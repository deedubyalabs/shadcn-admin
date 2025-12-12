// ... existing code ...
'use client';

import { SwatchBook, Check } from 'lucide-react'
import { useColorTheme, useColorThemes } from '@/context/color-theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export function ColorThemeSelector() {
  const { colorTheme, setColorTheme } = useColorTheme()
  const themes = useColorThemes()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="scale-95 rounded-full">
          <SwatchBook className="size-[1.2rem]" />
          <span className="sr-only">Select color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {themes.map((t) => {
          const active = colorTheme === t.value
          return (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setColorTheme(t.value)}
              className={cn(
                'flex items-center gap-2 cursor-pointer',
                active && 'bg-accent/60'
              )}
            >
              <span
                className={cn(
                  'h-3 w-3 rounded-full border border-border shadow-sm',
                  t.colorClass
                )}
              />
              <span className="flex-1">{t.name}</span>
              {active && <Check className="h-3.5 w-3.5" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}