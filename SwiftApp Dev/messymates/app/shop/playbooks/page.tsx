import { redirect } from 'next/navigation'

export default function PlaybooksRedirectPage() {
  redirect('/shop?category=playbooks')
}
