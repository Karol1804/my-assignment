import React from 'react';
import './App.css';
import useFetch from './components/useFetch';

function App() {
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts');

  const handleRefetch = () => {
    refetch();
  };

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error fetch data.Type of error {error}</h1>}
      {error && <button onClick={handleRefetch}>Refetch Data</button>}
      {data.map((post) => {
        return <div key={post.id}>{<h1>{post.title}</h1>}</div>
      })}
    </div>
  );
}

export default App;
