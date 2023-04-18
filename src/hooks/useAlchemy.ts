import { alchemy } from '@/config/alchemy/index'
import { useCallback, useEffect, useState } from 'react'

const BLOCKS_PER_PAGE = 5

export default function useAlchemy() {
  const [latestBlock, setLatestBlock] = useState<number>(-1)
  const [blocks20, setBlocks20] = useState([])
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
        setBlocks20(toSet)
      } catch (e) {
        console.log(e)
      }
    },
    [getBlockById, actualPage]
  )
  useEffect(() => {
    getLatestBlock()
  }, [getLatestBlock])

  return {
    latestBlock,
    getBlocks20,
    getBlockById,
    blocks20,
    nextPage,
    previousPage
  }
}
