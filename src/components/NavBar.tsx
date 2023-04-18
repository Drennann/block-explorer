import Link from 'next/link'

export default function NavBar() {
  return (
    <div className='h-24 w-full border-b border-[rgba(100,116,139,.2)] flex items-center px-4'>
      <Link href='/'>
        <h2 className='text-2xl'>Block Explorer</h2>
      </Link>
    </div>
  )
}
