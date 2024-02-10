import React from 'react';
import './App.css';
import useFetch from './components/useFetch';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const handleSuccess = (data: Array<Post>) => {
    console.log('Data fetched successfully:', data);
  };

  const handleError = (error: string) => {
    console.error('Error fetching data:', error);
  };

  const { data, loading, error, refetch } = useFetch({
    url: 'https://jsonplaceholder.typicode.com/posts',
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleRefetch = () => {
    refetch();
  };

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {error && (
        <>
          <h1>Error fetch data. Type of error {error}</h1>
          <button onClick={handleRefetch}>Refetch Data</button>
        </>
      )}
      {data.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
