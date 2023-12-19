import { useState } from "react";
import { useApi } from "./useApi";
export const useGetAllApi = <T>({ endpoint, handleError = (err: any) => { }, dependencies }: GetAllApi) => {
    const [ready, setReady] = useState(true)
    const [data, setData] = useState<T[]>([])
    useApi({
        endpoint, handleError, setData, setReady, dependencies
    })
    return ({ ready, data })
}