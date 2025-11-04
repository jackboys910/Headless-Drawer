import { useState, useCallback } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  FaCarSide,
  FaCat,
  FaBriefcase,
  FaChartPie,
  FaCarrot,
  FaBicycle,
  FaDollarSign,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import clsx from 'clsx'
import { Sidebar, Item, Submenu } from '../components/Sidebar'
import { DrawerMobile } from './DrawerMobile'

const iconCls = 'text-2xl shrink-0'
const navBase =
  'group flex items-center gap-4 rounded-md px-4 py-3 transition-colors hover:bg-[--brand-hover] focus:outline-none cursor-pointer'

export const Drawer = () => {
  const [collapsed, setCollapsed] = useState(true)
  const { pathname } = useLocation()

  const nav = useCallback(
    (active: boolean) => clsx(navBase, active && 'text-sky-600 font-medium'),
    []
  )

  const sidebarCls = clsx(
    'relative space-y-1 bg-[--brand] text-black transition-all',
    collapsed ? 'w-16' : 'w-60',
    'hidden md:block'
  )

  return (
    <div className="flex min-h-screen">
      <Sidebar
        className={sidebarCls}
        defaultCollapsed
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      >
        <button
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((v) => !v)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md p-2 hover:bg-[--brand-hover]"
        >
          {collapsed ? (
            <FaChevronRight className="text-xl" />
          ) : (
            <FaChevronLeft className="text-xl" />
          )}
        </button>

        <Item
          as={Link}
          to="/"
          icon={<FaCarSide className={iconCls} />}
          className={nav(pathname === '/')}
          active={pathname === '/'}
        >
          Dashboard
        </Item>

        <Item
          as={Link}
          to="/cats"
          icon={<FaCat className={iconCls} />}
          className={nav(pathname.startsWith('/cats'))}
          active={pathname.startsWith('/cats')}
        >
          Cats
        </Item>

        <Item
          as={Link}
          to="/jobs"
          icon={<FaBriefcase className={iconCls} />}
          className={nav(pathname.startsWith('/jobs'))}
          active={pathname.startsWith('/jobs')}
        >
          Jobs
        </Item>

        <Submenu
          icon={<FaChartPie className={iconCls} />}
          className={nav(pathname.startsWith('/reports'))}
          active={pathname.startsWith('/reports')}
        >
          Reports
          <Item
            as={Link}
            to="/reports/w"
            icon={<span />}
            className={nav(pathname === '/reports/w')}
            active={pathname === '/reports/w'}
          >
            Weekly
          </Item>
          <Item
            as={Link}
            to="/reports/m"
            icon={<span />}
            className={nav(pathname === '/reports/m')}
            active={pathname === '/reports/m'}
          >
            Monthly
          </Item>
        </Submenu>

        <Item
          as={Link}
          to="/veg"
          icon={<FaCarrot className={iconCls} />}
          className={nav(pathname === '/veg')}
          active={pathname === '/veg'}
        >
          Veggies
        </Item>

        <Item
          as={Link}
          to="/bike"
          icon={<FaBicycle className={iconCls} />}
          className={nav(pathname === '/bike')}
          active={pathname === '/bike'}
        >
          Bikes
        </Item>

        <Item
          as={Link}
          to="/prices"
          icon={<FaDollarSign className={iconCls} />}
          className={nav(pathname === '/prices')}
          active={pathname === '/prices'}
        >
          Prices
        </Item>
      </Sidebar>

      <main className="flex-1 p-8">
        <Outlet />
      </main>

      <DrawerMobile />
    </div>
  )
}
