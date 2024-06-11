"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

interface Nav {
  href: string
  label: string
}

export const navs: Nav[] = [
  {
    href: '/',
    label: "Home",
  },
  {
    href: '/about',
    label: 'About'
  },
  {
    href: '/prev',
    label: "Previous Posts",
  },
  {
    href: '/blog',
    label: 'Blog Posts'
  }
]

export default function NavHeader() {
  return (
    <nav className='flex flex-row items-center justify-center w-full gap-10 mt-8'>
      {
        navs.map(({ href, label }) => {
          return (
            <NavItem href={href} label={label} key={label} />
          )
        }
        )
      }
    </nav>
  )
}

export function NavItem({ href, label }: Nav) {
  const pathname = usePathname()

  return (
    <Link href={href}
      className={twMerge(clsx(
        "text-3xl text-gray-400 hover:text-gray-800",
        pathname.startsWith(href) ? "text-gray-600" : "text-gray-400"
      ))}
    >
      {label}
    </Link >
  )
}