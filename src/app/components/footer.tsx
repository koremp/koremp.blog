import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='flex flex-row items-center justify-center w-full'>
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
    children: "github icon",
  },
  {
    href: "https://linkedin.com/in/koremp",
    children: "linkedin icon",
  },
  {
    href: "https://velog.io/@koremp",
    children: "blog icon",
  },
]

function FooterLink({ href, children }: LinkItem) {
  return (
    <Link href={href} target="_blank">
      {children}
    </Link>
  )
}