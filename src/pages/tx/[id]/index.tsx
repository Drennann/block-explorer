import TransactionDetails from '@/components/TransactionDetails'
import useAlchemy from '@/hooks/useAlchemy'
import { TransactionResponse } from 'alchemy-sdk'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function TransactionDetailsPage() {
  const [transactionData, setTransactionData] =
    useState<TransactionResponse | null>(null)
  const { getTransactionsById } = useAlchemy()
  const router = useRouter()

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      getTransactionsById(router.query.id)
        .then((response) => {
          if (!response) {
            router.push('/404')
          } else {
            setTransactionData(response)
          }
        })
        .catch((e) => console.log(e))
    }
  }, [router, getTransactionsById])

  return (
    <div className='py-8 flex justify-center items-center w-full min-h-[calc(100vh-96px)]'>
      {transactionData ? (
        <TransactionDetails transactionData={transactionData} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
