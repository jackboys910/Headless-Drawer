import { useState, useMemo, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import clsx from 'clsx'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { MENU_ITEMS } from '../constants/menu'

export const DrawerMobile = () => {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const { pathname } = useLocation()
  const [sheet, setSheet] = useState(false)

  if (!isMobile) return null

  const activeRoot = useMemo(() => pathname.split('/')[1] || '', [pathname])

  const openSheet = useCallback(() => setSheet(true), [])
  const closeSheet = useCallback(() => setSheet(false), [])

  return (
    <>
      <nav
        role="menubar"
        className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t bg-white py-1 md:hidden"
      >
        {MENU_ITEMS.map((item) => {
          const { to, label, icon: Icon } = item
          const hasSub = 'hasSub' in item && Boolean((item as { hasSub?: boolean }).hasSub)

          return hasSub ? (
            <button
              key={to}
              role="menuitem"
              onClick={openSheet}
              className={clsx(baseBtn, activeRoot === 'reports' && activeCls)}
            >
              <Icon className="text-lg" />
              {label}
            </button>
          ) : (
            <Link
              key={to}
              to={to}
              role="menuitem"
              className={clsx(baseBtn, activeRoot === to.replace('/', '') && activeCls)}
            >
              <Icon className="text-lg" />
              {label}
            </Link>
          )
        })}
      </nav>

      {sheet && (
        <div className="fixed inset-0 z-40 grid place-items-end bg-black/40" onClick={closeSheet}>
          <div
            className="w-full rounded-t-lg bg-white p-4 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-medium">Reports</h2>
              <button aria-label="Close" className="cursor-pointer text-xl" onClick={closeSheet}>
                <FaTimes />
              </button>
            </div>

            <Link
              to="/reports/w"
              className={sheetItem(pathname === '/reports/w')}
              onClick={closeSheet}
            >
              Weekly
            </Link>
            <Link
              to="/reports/m"
              className={sheetItem(pathname === '/reports/m')}
              onClick={closeSheet}
            >
              Monthly
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

const baseBtn =
  'flex flex-1 cursor-pointer flex-col items-center gap-0.5 py-1 text-xs hover:bg-gray-100'
const activeCls = 'text-sky-600 font-medium'
const sheetItem = (active: boolean) =>
  clsx('block rounded px-4 py-2 text-center hover:bg-gray-100', active && activeCls)
