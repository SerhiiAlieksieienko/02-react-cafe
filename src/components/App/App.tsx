import { useState } from 'react'

import CafeInfo from '../CafeInfo/CafeInfo'

import css from "./App.module.css"
import {type Votes, type VoteType } from '../../types/votes';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';
export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0
  }
  )

  const handleVote = (voteType: VoteType):void => {
    setVotes(prevState => ({
      ...prevState,
      [voteType]: prevState[voteType] + 1
    }));
  };

  const resetVotes = ():void => { 
    setVotes({ good: 0, neutral: 0, bad: 0 });
  }
  
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const canReset = totalVotes > 0;
  const positiveRate = totalVotes === 0 ? 0 : Math.round((votes.good / totalVotes) * 100);
  return (
    <>
      <div className={css.app}>
        <CafeInfo />
        <VoteOptions
          onVote={handleVote}   
          onReset={resetVotes} 
          canReset={canReset}  
        />
        {totalVotes > 0 ? (
          <VoteStats
          votes={votes} 
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
        ) : (
            <Notification />
        )}
      </div>
      
    </>
  )
}


