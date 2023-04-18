/* eslint-disable react/jsx-closing-tag-location */
import useAlchemy from '@/hooks/useAlchemy'
import { timestampAgo, truncAddress } from '@/utils'

export default function LatestTransactions() {
  const { latestBlockData } = useAlchemy()
  return (
    <div className='bg-[#080C14] w-fit px-4 flex flex-col items-center border border-[rgba(100,116,139,.2)] min-w-[252px]'>
      <ul>
        <li className='h-12 flex justify-center items-center'>
          <p>Latest Blocks</p>
        </li>
        {latestBlockData &&
          latestBlockData.transactions.slice(0, 5).map((transaction) => (
            <li
              key={transaction.hash}
              className='border-t border-[rgba(100,116,139,.2)] py-4'
            >
              <div>{`TX# ${truncAddress(transaction.hash)}`}</div>
              <div>{`From ${truncAddress(transaction.from)}`}</div>
              <div>{`To ${truncAddress(transaction.to)}`}</div>
            </li>
          ))}
        <li className='border-t border-[rgba(100,116,139,.2)] h-12 flex justify-center items-center cursor-pointer'>
          <p>VIEW ALL BLOCKS</p>
        </li>
      </ul>
    </div>
  )
}
