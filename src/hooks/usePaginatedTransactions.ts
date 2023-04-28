import { useCallback, useState } from "react"
import { PaginatedRequestParams, PaginatedResponse, Transaction } from "../utils/types"
import { PaginatedTransactionsResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithCache, loading } = useCustomFetch()
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<
    Transaction[]
  > | null>(null)

  const fetchAll = useCallback(async () => {
    console.log(1111)
    const response = await fetchWithCache<PaginatedResponse<Transaction[]>, PaginatedRequestParams>(
      "paginatedTransactions",
      {
        page: paginatedTransactions === null ? 0 : paginatedTransactions.nextPage,
      }
      )

    setPaginatedTransactions((previousResponse) => {
      if (response === null || previousResponse === null) {
        console.log(123)
        return response
      }
      console.log(234)
      return { data: response.data, nextPage: response.nextPage }
    })
    console.log(345)
    //Bug 6
    setTimeout(() => {
      console.log("hrer" , response)
    }, 2000)
    return response
  }, [fetchWithCache, paginatedTransactions])

  const invalidateData = useCallback(() => {
    setPaginatedTransactions(null)
  }, [])
  return { data: paginatedTransactions, loading, fetchAll, invalidateData }
}
