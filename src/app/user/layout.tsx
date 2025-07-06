'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  User,
  Settings,
  Mail,
  FileText,
  ShoppingBag,
  Store,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

interface NavItem {
  name: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  customClick?: () => void
  badge?: number
}

// Navigation config with dynamic "Stores" redirect
const navigationItems: NavItem[] = [
  { name: 'Home', href: '/user/home', icon: Home },
  { name: 'Orders', href: '/user/order', icon: ShoppingBag, },
  {
    name: 'Stores',
    icon: Store,
    customClick: () => {
      // Custom store navigation logic
    }
  },
  { name: 'Profile', href: '/user/profile', icon: User },
]

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = pathname === item.href
    const Icon = item.icon

    const baseClasses = `
      group relative transition-all duration-300 ease-in-out
      ${isMobile
        ? 'flex flex-col items-center justify-center py-3 px-2 text-xs min-h-[64px] rounded-xl'
        : 'flex items-center px-4 py-3 text-sm font-medium rounded-xl mx-2 my-1'
      }
    `

    const activeClasses = isActive
      ? isMobile
        ? 'text-white bg-gradient-to-br from-[#F9CA44] to-[#f7b731] shadow-lg scale-105'
        : 'bg-gradient-to-r from-[#F9CA44] to-[#f7b731] text-white shadow-lg shadow-[#F9CA44]/30 scale-105'
      : isMobile
        ? 'text-gray-600 hover:text-[#F9CA44] hover:bg-[#F9CA44]/10'
        : 'text-gray-700 hover:text-[#F9CA44] hover:bg-[#F9CA44]/10 hover:scale-105'

    const classes = `${baseClasses} ${activeClasses}`

    // If customClick is defined, render as a button
    if (item.customClick) {
      return (
        <button
          key={item.name}
          onClick={item.customClick}
          className={`${classes} lg:w-full`}
        >
          <div className="relative">
            <Icon className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-5 w-5 mr-3'} transition-transform duration-300 group-hover:scale-110`} />
            {item.badge && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                {item.badge}
              </span>
            )}
          </div>
          <span className={`${isMobile ? 'text-xs font-medium' : 'font-medium'} transition-all duration-300`}>
            {item.name}
          </span>
        </button>
      )
    }

    // Otherwise render as a Link
    return (
      <Link
        key={item.name}
        href={item.href!}
        className={classes}
      >
        <div className="relative">
          <Icon className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-5 w-5 mr-3'} transition-transform duration-300 group-hover:scale-110`} />
          {item.badge && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
              {item.badge}
            </span>
          )}
        </div>
        <span className={`${isMobile ? 'text-xs font-medium' : 'font-medium'} transition-all duration-300`}>
          {item.name}
        </span>
      </Link>
    )
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow pt-8 pb-6 overflow-y-auto bg-white/80 backdrop-blur-xl shadow-2xl border-r border-gray-200/50">
          {/* Logo/Brand */}
          <div className="flex items-center flex-shrink-0 px-6 mb-12">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F9CA44] to-[#f7b731] rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#F9CA44] to-[#f7b731] bg-clip-text text-transparent">
                Parcel
              </h1>
            </div>
          </div>

          {/* User Profile Section */}
          {/* <div className="px-6 mb-8">
            <div className="flex items-center p-4 bg-gradient-to-r from-[#F9CA44]/10 to-[#f7b731]/10 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F9CA44] to-[#f7b731] rounded-full flex items-center justify-center mr-3">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
            </div>
          </div> */}

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <div className="space-y-2">
              {navigationItems.map((item) => renderNavItem(item))}
            </div>
          </nav>

          {/* Bottom Section */}
          {/* <div className="px-6 mt-auto">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
              <div className="flex items-center mb-2">
                <Bell className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-900">Updates</span>
              </div>
              <p className="text-xs text-blue-700">New features available!</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#F9CA44] to-[#f7b731] bg-clip-text text-transparent">
                Parcel
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4">
              {navigationItems.map((item) => renderNavItem(item))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#F9CA44] to-[#f7b731] bg-clip-text text-transparent">
              Parcel
            </h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto focus:outline-none pb-20 lg:pb-0">
          <div className="py-6 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl shadow-2xl px-4 py-2 border-t border-gray-200/50">
          <nav className="flex justify-around items-center">
            {navigationItems.map((item) => renderNavItem(item, true))}
          </nav>
        </div>
      </div>
    </div>
  )
}