import { alchemy } from '@/config/alchemy/index'
import { Block, BlockWithTransactions } from 'alchemy-sdk'
import { useCallback, useEffect, useState } from 'react'

const BLOCKS_PER_PAGE = 5

export default function useAlchemy() {
  const [latestBlock, setLatestBlock] = useState<number>(-1)
  const [latestBlockData, setLatestBlockData] =
    useState<BlockWithTransactions | null>(null)
  const [blocks20, setBlocks20] = useState<Block[]>([])
  const [actualPage, setActualPage] = useState<number>(1)
  const getLatestBlock = useCallback(async () => {
    const toSet = await alchemy.core.getBlockNumber()
    setLatestBlock(toSet)
  }, [])
  const getBlockById = useCallback(async (id: number) => {
    return alchemy.core.getBlock(id)
  }, [])
  const nextPage = useCallback(() => {
    setActualPage((prev) => prev + 1)
  }, [])
  const previousPage = useCallback(() => {
    setActualPage((prev) => prev - 1)
  }, [])
  const getBlocks20 = useCallback(
    async (latest: number) => {
      try {
        const temporalArray = new Array(BLOCKS_PER_PAGE)
          .fill(0)
          .map(
            (_, index) => latest - (actualPage - 1) * BLOCKS_PER_PAGE - index
          )
          .map((blockNumber) => getBlockById(blockNumber))

        const toSet = await Promise.all(temporalArray)
        if (toSet.length > 0) {
          alchemy.core
            .getBlockWithTransactions(toSet[0].hash)
            .then((response) => setLatestBlockData(response))
        }
        setBlocks20(toSet)
      } catch (e) {
        console.log(e)
      }
    },
    [getBlockById, actualPage]
  )

  const getTransactionsById = useCallback(async (id: string) => {
    return alchemy.core.getTransaction(id)
  }, [])

  useEffect(() => {
    getLatestBlock()
  }, [getLatestBlock])

  useEffect(() => {
    getBlocks20(latestBlock)
  }, [getBlocks20, latestBlock])

  return {
    latestBlock,
    blocks20,
    nextPage,
    previousPage,
    latestBlockData,
    getTransactionsById
  }
}
