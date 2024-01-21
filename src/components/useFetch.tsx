import React, { useState, useEffect } from 'react'

const useFetch = (url: string) => {
    type post = {
        userId: number;
        id: number;
        title: string;
        body: string;
    }
    const [data, setData] = useState<Array<post>>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState('')

    const fetchData = async (url: string) => {
        const resp = await fetch(url)
        const data = await resp.json()
        if (Object.keys(data).length !== 0) {
            setLoading(false)
            setData(data)
            setError('')
        }
        else {
            setLoading(false)
            setError(resp.status.toString())
        }
    }

    useEffect(() =>{
        fetchData(url);
    }, [url])
    return {data: data, loading, error }
}

export default useFetch