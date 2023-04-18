import { useTransactions } from '@/hooks/useTransactions'
import { truncAddress } from '@/utils'
import { AssetTransfersResult } from 'alchemy-sdk'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const TRANSACTIONS_PER_PAGE = 10

export default function AddressDetailsPage() {
  const { getTransactionsByAddress } = useTransactions()
  const [addressData, setAddressData] = useState<AssetTransfersResult[]>([])
  const [pagination, setPagination] = useState(1)
  const router = useRouter()

  const handlePagination = (n: number) => {
    if (
      addressData.slice(
        TRANSACTIONS_PER_PAGE * (pagination - 1 + n),
        TRANSACTIONS_PER_PAGE * (pagination + n)
      ).length > 0
    ) {
      setPagination((prev) => prev + n)
    }
  }

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      getTransactionsByAddress(router.query.id).then((response) =>
        setAddressData(response.transfers)
      )
    }
  }, [router, getTransactionsByAddress])
  return (
    <div className='flex justify-center items-center py-12 flex-col'>
      <ul className='flex flex-col gap-6'>
        {addressData &&
          addressData
            .slice(
              TRANSACTIONS_PER_PAGE * (pagination - 1),
              TRANSACTIONS_PER_PAGE * pagination
            )
            .map((transfer) => (
              <li
                key={transfer.uniqueId}
                className='bg-[--bg-card] border border-[--border-card] px-5 py-4'
              >
                <p>Block: {parseInt(transfer.blockNum, 16)}</p>
                <Link href={'/address/' + transfer.from}>
                  <p>From: {truncAddress(transfer.from)}</p>
                </Link>
                {transfer.to && (
                  <Link href={'/address/' + transfer.to}>
                    <p>To: {truncAddress(transfer.to)}</p>
                  </Link>
                )}
                <p>Asset: {transfer.asset}</p>
              </li>
            ))}
      </ul>
      <div className='flex gap-4 items-center h-12 w-[282px] justify-evenly text-[36px]'>
        <button className='cursor-pointer' onClick={() => handlePagination(-1)}>
          {'<'}
        </button>
        <button className='cursor-pointer' onClick={() => handlePagination(1)}>
          {'>'}
        </button>
      </div>
    </div>
  )
}
