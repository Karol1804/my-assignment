import { useState, useEffect } from 'react'

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}
interface FetchOptions {
    onSuccess?: (data: Post[]) => void;
    onError?: (error: string) => void;
}

const useFetch = (url: string, options: FetchOptions = {}) => {
    const { onSuccess, onError } = options;
    console.log(options)

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
            if (onSuccess) {
                onSuccess(responseData);
            }
        } catch (error: any) {
            setData([])
            setLoading(false);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setError(errorMessage);
            if (onError) {
                onError(errorMessage);
            }
        }
    }
    const refetch = () => {
        setLoading(true);
        fetchData(url);
    };

    useEffect(() => {
        fetchData(url);
    }, [url])

    return { data, loading, error, refetch }
}

export default useFetch
