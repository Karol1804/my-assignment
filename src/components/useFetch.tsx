import { useState, useEffect } from 'react'

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}
type FetchResult = {
    data: Array<Post>;
    loading: boolean;
    error: string;
    onSuccess: (data: Array<Post>) => void;
    onError: (error: string) => void;
    refetch: () => void;
}
type Props = {
    url: string;
    onSuccess: (data: Array<Post>) => void;
    onError: (error: string) => void;
};

const useFetch = ({ url, onSuccess, onError }: Props): FetchResult => {

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
            onSuccess(responseData);
        } catch (error: any) {
            setData([])
            setLoading(false);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setError(errorMessage);
            onError(errorMessage);
        }
    }

    const refetch = () => {
        setLoading(true);
        fetchData(url);
    };

    useEffect(() => {
        fetchData(url);
    }, [url])

    return { data, loading, error, onSuccess, onError, refetch }
}

export default useFetch
