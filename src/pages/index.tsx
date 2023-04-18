/* import Image from 'next/image'
import { Inter } from 'next/font/google' */

import useAlchemy from '@/hooks/useAlchemy'
import { useEffect } from 'react'

/* const inter = Inter({ subsets: ['latin'] }) */

export default function Home() {
  const { latestBlock, blocks20, getBlocks20 } = useAlchemy()

  useEffect(() => {
    getBlocks20(latestBlock)
  }, [getBlocks20, latestBlock])

  return <main className='p-24'>{latestBlock}</main>
}
