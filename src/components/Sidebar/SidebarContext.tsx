import { createContext, useContext, useState, useMemo, type PropsWithChildren } from 'react'

export type SidebarOrientation = 'desktop' | 'mobile'

type Ctx = {
  orientation: SidebarOrientation
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

const SidebarContext = createContext<Ctx | null>(null)

export const useSidebarCtx = () => {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebarCtx must be used inside <Sidebar.Root>')
  return ctx
}

type ProviderProps = PropsWithChildren<{
  orientation: SidebarOrientation
  defaultCollapsed?: boolean
  collapsed?: boolean
  onCollapsedChange?(v: boolean): void
}>

export const SidebarProvider = ({
  orientation,
  defaultCollapsed = false,
  collapsed: controlled,
  onCollapsedChange,
  children,
}: ProviderProps) => {
  const [uncontrolled, setUnc] = useState(defaultCollapsed)
  const collapsed = controlled ?? uncontrolled

  const setCollapsed = (v: boolean) => {
    if (controlled == null) setUnc(v)
    onCollapsedChange?.(v)
  }

  const value = useMemo(() => ({ orientation, collapsed, setCollapsed }), [orientation, collapsed])

  return <SidebarContext value={value}>{children}</SidebarContext>
}
