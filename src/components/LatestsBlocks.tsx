/* eslint-disable react/jsx-closing-tag-location */
import useAlchemy from '@/hooks/useAlchemy'
import { timestampAgo, truncAddress } from '@/utils'

export default function LatestBlocks() {
  const { blocks20 } = useAlchemy()
  return (
    <div className='bg-[#080C14] w-fit px-4 flex flex-col items-center border border-[rgba(100,116,139,.2)] my-8 min-w-[252px]'>
      <ul>
        <li className='h-12 flex justify-center items-center'>
          <p>Latest Blocks</p>
        </li>
        {blocks20.map((block) => (
          <li
            key={block.hash}
            className='border-t border-[rgba(100,116,139,.2)] py-4'
          >
            <div>{`Block ${block.number} ${timestampAgo(
              block.timestamp
            )}`}</div>
            <div>{`Fee Recipient: ${truncAddress(block.miner)}`}</div>
            <div>{`${block.transactions.length} txns`}</div>
          </li>
        ))}
        <li className='border-t border-[rgba(100,116,139,.2)] h-12 flex justify-center items-center cursor-pointer'>
          <p>VIEW ALL BLOCKS</p>
        </li>
      </ul>
    </div>
  )
}
