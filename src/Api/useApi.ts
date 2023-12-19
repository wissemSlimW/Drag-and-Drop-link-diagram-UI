import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";

const apiUrl = import.meta.env.VITE_BASE_URL

export const useApi = <T>({ endpoint, setData, setReady, handleError, dependencies }: {
    endpoint: string,
    setData: React.Dispatch<React.SetStateAction<T[]>>,
    setReady: React.Dispatch<React.SetStateAction<boolean>>,
    handleError: (err: any) => void,
    dependencies?: React.DependencyList
}) => {
    useEffect(() => {
        setReady(false)
        axios.get(`${apiUrl}/${endpoint}`)
            .then((response: AxiosResponse) => {
                setData(response.data || [])
            }).catch((err) => {
                handleError(err?.response,)
            }).finally(() => setReady(true))
    }, [...dependencies || []])
}