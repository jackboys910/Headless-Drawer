import { useState, useEffect, Children, cloneElement, isValidElement, type ReactNode } from 'react'
import type { PolymorphicProps, AnyEl } from '../../types/polymorphic'
import { useSidebarCtx } from './SidebarContext'
import { useLocation } from 'react-router-dom'

interface IProps {
  icon: ReactNode
  active?: boolean
  children: ReactNode
}

export function SidebarSubmenu<E extends AnyEl = 'button'>({
  as,
  icon,
  active,
  children,
  className,
  ...rest
}: PolymorphicProps<E, IProps>) {
  const { orientation, collapsed } = useSidebarCtx()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname, collapsed])

  const [label, ...items] = Children.toArray(children)

  const Comp: AnyEl = as ?? 'button'
  const showInline = (open || active) && orientation === 'desktop' && !collapsed
  const showPopover = collapsed && open && orientation === 'desktop'

  const renderedItems = items.map((el, i) =>
    isValidElement(el) ? cloneElement(el, { key: i, forceShowLabel: true }) : el
  )

  return (
    <>
      <Comp
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-current={active ? 'page' : undefined}
        className={className}
        onClick={() => setOpen((v) => !v)}
        {...rest}
      >
        {icon}
        {(orientation === 'mobile' || !collapsed) && <span>{label}</span>}
      </Comp>

      {showInline && <div role="menu">{renderedItems}</div>}
      {showPopover && (
        <div
          role="menu"
          className="absolute top-1/5 left-full ml-2 -translate-y-1/2 rounded-md bg-white shadow-lg"
        >
          {renderedItems}
        </div>
      )}
    </>
  )
}
