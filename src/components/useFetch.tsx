import { useState, useEffect } from 'react'

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const useFetch = (url: string) => {
    const [data, setData] = useState<Array<Post>>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchData = async (url: string) => {
        try {
            const resp = await fetch(url);

            if (!resp.ok) {
                throw new Error(resp.status.toString());
            }

            const responseData = await resp.json();
            setLoading(false);
            setData(responseData);
            setError('');
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchData(url);
    }, [url])
    return { data, loading, error }
}

export default useFetch
