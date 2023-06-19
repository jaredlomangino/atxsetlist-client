import React from 'react';
import './App.css';
import axios from 'axios';
import { useQuery } from 'react-query'
import Concerts from './Concerts'
import { Concert } from './types';

function App() {
  const [pageNumber, setPageNumber] = React.useState(1)
  const pageLimit = 10
  const fetchConcerts = (page = 1) => axios.get(`https://atx-setlist.herokuapp.com/concerts?page=${page}&limit=${pageLimit}`).then((res) => res.data)
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['concerts', pageNumber],
    queryFn: () => fetchConcerts(pageNumber),
    keepPreviousData : true
  })
  if (isLoading) return <p>Loading...</p>

  if (error) return <p>Error...</p>
  return (
    <div className="grid place-items-center w-75">
      {data.map((concert: Concert) => (
        <Concerts concert={concert}/>
      ))}
      <div>
        <button className="text-white mt-4 bg-card-button hover:bg-card-button-hover focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
          onClick={() => setPageNumber(old => Math.max(old - 1, 1))}
          disabled={pageNumber === 1}
        >
          Previous Page
        </button>
        <span>{' ' + pageNumber + ' '}</span>
        {data.length === pageLimit && 
          <button className="text-white mt-4 bg-card-button hover:bg-card-button-hover focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
          onClick={() => {
              setPageNumber(old => old + 1)
          }}
        >
          Next Page
        </button>}
        
        {isFetching ? <span> Loading...</span> : null}{' '}
      </div>
    </div>
  );
}

export default App;
