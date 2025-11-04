import { type ReactNode } from 'react'
import type { PolymorphicProps, AnyEl } from '../../types/polymorphic'
import { useSidebarCtx } from './SidebarContext'

interface IProps {
  icon: ReactNode
  active?: boolean
  children?: ReactNode
  forceShowLabel?: boolean
}

export function SidebarItem<E extends AnyEl = 'button'>({
  as,
  icon,
  active,
  children,
  forceShowLabel = false,
  className,
  ...rest
}: PolymorphicProps<E, IProps>) {
  const { orientation, collapsed } = useSidebarCtx()

  const Comp: AnyEl = (as ?? 'button') as AnyEl
  const showLabel = forceShowLabel || orientation === 'mobile' || !collapsed

  return (
    <Comp
      role="menuitem"
      aria-current={active ? 'page' : undefined}
      className={className}
      {...rest}
    >
      {icon}
      {children && showLabel && <span>{children}</span>}
    </Comp>
  )
}
