/* eslint-disable react/jsx-closing-tag-location */
import useAlchemy from '@/hooks/useAlchemy'
import { truncAddress } from '@/utils'
import Link from 'next/link'

export default function LatestTransactions() {
  const { latestBlockData } = useAlchemy()
  return (
    <div className='bg-[#080C14] w-fit px-4 flex flex-col items-center border border-[rgba(100,116,139,.2)] min-w-[252px]'>
      <ul>
        <li className='h-12 flex justify-center items-center'>
          <p>Latest transactions</p>
        </li>
        {latestBlockData &&
          latestBlockData.transactions.slice(0, 5).map((transaction) => (
            <li
              key={transaction.hash}
              className='border-t border-[rgba(100,116,139,.2)] py-4 text-center'
            >
              <Link href={'/tx/' + transaction.hash}>
                <div>{`TX# ${truncAddress(transaction.hash)}`}</div>
              </Link>
              <Link href={'/address/' + transaction.from}>
                <div>{`From ${truncAddress(transaction.from)}`}</div>
              </Link>
              {transaction.to && (
                <Link href={'/address/' + transaction.to}>
                  <div>{`To ${truncAddress(transaction.to)}`}</div>
                </Link>
              )}
            </li>
          ))}
        <li className='border-t border-[rgba(100,116,139,.2)] h-12 flex justify-center items-center cursor-pointer'>
          <p>VIEW ALL TRANSACTIONS</p>
        </li>
      </ul>
    </div>
  )
}
