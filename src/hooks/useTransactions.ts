import { alchemy } from '@/config/alchemy'
import { AssetTransfersCategory } from 'alchemy-sdk'
import { useCallback } from 'react'

export function useTransactions() {
  const getTransactionsByAddress = useCallback(async (address: string) => {
    return alchemy.core.getAssetTransfers({
      category: [
        'external' as AssetTransfersCategory,
        'erc20' as AssetTransfersCategory,
        'internal' as AssetTransfersCategory
      ],
      fromAddress: address
    })
  }, [])
  return {
    getTransactionsByAddress
  }
}
