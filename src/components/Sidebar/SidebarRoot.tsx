import type { HTMLAttributes } from 'react'
import { SidebarProvider } from './SidebarContext'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface IProps extends HTMLAttributes<HTMLElement> {
  mobileBp?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  defaultCollapsed?: boolean
  collapsed?: boolean
  onCollapsedChange?(v: boolean): void
}

export const SidebarRoot = ({
  mobileBp = 'md',
  defaultCollapsed,
  collapsed,
  onCollapsedChange,
  children,
  ...rest
}: IProps) => {
  const isMobile = useMediaQuery(`(max-width:${bpPx[mobileBp]}px)`)

  return (
    <SidebarProvider
      orientation={isMobile ? 'mobile' : 'desktop'}
      defaultCollapsed={defaultCollapsed}
      collapsed={collapsed}
      onCollapsedChange={onCollapsedChange}
    >
      <nav aria-label="primary navigation" {...rest}>
        {children}
      </nav>
    </SidebarProvider>
  )
}

const bpPx = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 } as const
