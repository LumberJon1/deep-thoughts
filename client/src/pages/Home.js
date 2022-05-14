import React from 'react';
import { useQuery } from '@apollo/client';
import {QUERY_THOUGHTS} from "../utils/queries";
import ThoughtList from '../components/ThoughtList';

const Home = () => {

  // Use hook to make query
  const {loading, data} = useQuery(QUERY_THOUGHTS);

  // Optional chaining to store data in thoughts constant, or assign thoughts to empty array if undefined
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
