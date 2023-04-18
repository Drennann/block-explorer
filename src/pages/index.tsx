/* import Image from 'next/image'
import { Inter } from 'next/font/google' */

import LatestBlocks from '@/components/LatestsBlocks'
import LatestTransactions from '@/components/LatestTransactions'

/* const inter = Inter({ subsets: ['latin'] }) */

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center py-24'>
      <LatestBlocks />
      <LatestTransactions />
    </main>
  )
}
