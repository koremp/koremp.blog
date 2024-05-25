import Link from 'next/link'
import { AlternateEmail, Edit, GitHub, LinkedIn } from '@mui/icons-material';

export default function Footer() {
  return (
    <footer className='flex flex-row items-center justify-center w-full gap-10'>
      {
        linkItems.map(({ href, children }: LinkItem) => {
          return (
            <FooterLink href={href} key={href + children?.toString()}>
              {children}
            </FooterLink>
          )
        })
      }
    </footer>
  )
}

interface LinkItem {
  href: string
  children: React.ReactNode
}

const linkItems: LinkItem[] = [
  {
    href: "https://github.com/koremp",
    children: <GitHub fontSize="large" />,
  },
  {
    href: "https://linkedin.com/in/koremp",
    children: <LinkedIn fontSize='large' />,
  },
  {
    href: "https://velog.io/@koremp",
    children: <Edit fontSize='large' />,
  },
  {
    href: "mailto:im.koremp@gmail.com",
    children: <AlternateEmail fontSize='large' />,
  }
]

function FooterLink({ href, children }: LinkItem) {
  return (
    <Link href={href} target="_blank">
      {children}
    </Link>
  )
}