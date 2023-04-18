import { truncAddress } from '@/utils'
import { TransactionResponse } from 'alchemy-sdk'

export default function TransactionDetails({
  transactionData
}: {
  transactionData: TransactionResponse
}) {
  return (
    <div className='bg-[--bg-card] px-6 py-7 border border-[--border-card] flex flex-col gap-3'>
      <div>{`Transaction Hash: ${truncAddress(transactionData.hash)}`}</div>
      <div>Status: Success</div>
      <div>
        <div>{`Block: ${transactionData.blockNumber}`}</div>
        <div>{`${transactionData.confirmations} Block Confirmations`}</div>
      </div>
      <div>{`Timestamp: ${transactionData.timestamp}`}</div>
      <div>{`From: ${truncAddress(transactionData.from)}`}</div>
      {transactionData.to && (
        <div>{`To: ${truncAddress(transactionData.to)}`}</div>
      )}
    </div>
  )
}
