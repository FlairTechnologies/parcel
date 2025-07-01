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
  Store
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

interface NavItem {
  name: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  customClick?: () => void
}

// Navigation config with dynamic "Stores" redirect
const navigationItems: NavItem[] = [
  { name: 'Home', href: '/user/home', icon: Home },
  { name: 'Orders', href: '/user/order', icon: ShoppingBag },
  {
    name: 'Stores',
    icon: Store,
    customClick: () => {
      console.log("📦 Stores button clicked");

      const userData = localStorage.getItem('user_data');

      if (userData) {
        try {
          const userDataObj = JSON.parse(userData);
          const token = userDataObj?.accessToken;

          if (!token) {
            console.warn("⚠️ accessToken not found in user_data");
            return;
          }

          const redirectURL = `https://stores.theparcel.com.ng/?token=${encodeURIComponent(token)}`;
          console.log("🔗 Redirecting to:", redirectURL);
          window.location.href = redirectURL;
        } catch (err) {
          console.error("❌ Failed to parse user_data:", err);
        }
      } else {
        console.warn("⚠️ No user_data found in localStorage");
      }
    }
  },
  { name: 'Profile', href: '/user/profile', icon: User },
  // { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = pathname === item.href
    const Icon = item.icon

    const classes = `
      ${isMobile
        ? 'flex flex-col items-center justify-center py-2 px-3 text-xs min-h-[60px]'
        : 'flex items-center px-4 py-3 text-sm font-medium rounded-lg'
      }
      ${isActive
        ? isMobile
          ? 'text-[#F9CA44] rounded-lg'
          : 'bg-[#F9CA44] text-white'
        : isMobile
          ? 'text-gray-600 hover:rounded-lg'
          : 'text-gray-700 hover:rounded-lg'
      }
      ${isActive
        ? 'border-b border-[#F9CA44]'
        : 'hover:bg-[#f9c94459]'
      }
      transition-colors duration-200
    `

    // If customClick is defined, render as a button
    if (item.customClick) {
      return (
        <button
          key={item.name}
          onClick={item.customClick}
          className={`${classes} lg:w-full`}
        >
          <Icon className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-5 w-5 mr-3'}`} />
          <span className={isMobile ? 'text-xs' : ''}>{item.name}</span>
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
        <Icon className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-5 w-5 mr-3'}`} />
        <span className={isMobile ? 'text-xs' : ''}>{item.name}</span>
      </Link>
    )
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white shadow-md border-r border-gray-200">
          {/* Logo/Brand */}
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <h1 className="text-xl font-bold" style={{ color: '#F9CA44' }}>Your App</h1>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigationItems.map((item) => renderNavItem(item))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none pb-16 lg:pb-0">
          <div className="py-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg px-2 py-2" style={{ borderTopColor: '#F9CA44', borderTopWidth: '2px' }}>
          <nav className="flex justify-around items-center">
            {navigationItems.map((item) => renderNavItem(item, true))}
          </nav>
        </div>
      </div>
    </div>
  )
}