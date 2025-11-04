import {
  FaCarSide,
  FaCat,
  FaBriefcase,
  FaCarrot,
  FaBicycle,
  FaDollarSign,
  FaChartPie,
} from 'react-icons/fa'

export type MenuItem = {
  to: string
  label: string
  icon: any
  hasSub?: boolean
}

export const MENU_ITEMS = [
  { to: '/', label: 'Home', icon: FaCarSide },
  { to: '/cats', label: 'Cats', icon: FaCat },
  { to: '/jobs', label: 'Jobs', icon: FaBriefcase },
  { to: '/veg', label: 'Veggies', icon: FaCarrot },
  { to: '/bike', label: 'Bikes', icon: FaBicycle },
  { to: '/prices', label: 'Prices', icon: FaDollarSign },
  { to: '/reports', label: 'Reports', icon: FaChartPie, hasSub: true },
] as const satisfies readonly MenuItem[]
