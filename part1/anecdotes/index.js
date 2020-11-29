import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  // fill up array with 0 for initialization of votes
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  
  const generateNextAnecdote = () => setSelected(generateRandomAnecdoteNumber);
  const generateRandomAnecdoteNumber = () => {
    let next = Math.floor(Math.random() * (anecdotes.length));
    // avoid picking the same anecdote for two consecutive times
    while(next === selected) {
      next = Math.floor(Math.random() * (anecdotes.length));
    }
    return next;
  } 

  const castVote = () => {
    let copy = [...votes]
    copy[selected]+=1
    setVotes(copy);
  }

  const getMaxVotedAnecdote = () => votes.indexOf(Math.max(...votes))

  return (
    <>
      <h1> Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div> has {votes[selected]} votes</div>
      <button onClick={castVote}>vote</button>
      <button onClick={generateNextAnecdote}>next anecdote</button>
      <h1> Anecdote with most votes</h1>
      <div>{anecdotes[getMaxVotedAnecdote()]}</div>
      <div>has {votes[getMaxVotedAnecdote()]} votes</div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)