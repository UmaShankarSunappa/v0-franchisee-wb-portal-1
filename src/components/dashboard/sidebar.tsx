"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  User,
  ShoppingCart,
  CreditCard,
  RotateCcw,
  Wallet,
  FileText,
  BarChart3,
  FileSpreadsheet,
  Receipt,
  MessageSquare,
} from "lucide-react"

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Account Profile", href: "/dashboard/profile", icon: User },
  { name: "Order History", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Account Balance", href: "/dashboard/balance", icon: CreditCard },
  { name: "Return Details", href: "/dashboard/returns", icon: RotateCcw },
  { name: "Payments", href: "/dashboard/payments", icon: Wallet },
  { name: "Provisional Indent", href: "/dashboard/indent", icon: FileText },
  { name: "Performance Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Monthly Reports", href: "/dashboard/monthly-reports", icon: FileSpreadsheet },
  { name: "Invoices", href: "/dashboard/invoices", icon: Receipt },
  { name: "Complaints", href: "/dashboard/complaints", icon: MessageSquare },
]

interface SidebarContentProps {
  onLinkClick?: () => void
}

export function SidebarContent({ onLinkClick }: SidebarContentProps) {
  const pathname = usePathname()

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center gap-3">
        <div className="h-10 w-10 rounded-lg overflow-hidden flex items-center justify-center bg-white">
          <Image 
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image-1759660819624.png"
            alt="Medplus Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <span className="text-xl font-bold text-cyan-900">Medplus</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onLinkClick}
                      className={cn(
                        isActive ? "bg-cyan-50 text-cyan-800" : "text-gray-700 hover:text-cyan-800 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors",
                      )}
                    >
                      <item.icon
                        className={cn(
                          isActive ? "text-cyan-800" : "text-gray-400 group-hover:text-cyan-800",
                          "h-5 w-5 shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export function DashboardSidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col border-r border-gray-200">
      <SidebarContent />
    </div>
  )
}