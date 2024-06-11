import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function RemoteMdxPage({ url }: { url: string }) {
  const res = await fetch(url)
  const markdown = await res.text()
  return <MDXRemote source={markdown} />
}