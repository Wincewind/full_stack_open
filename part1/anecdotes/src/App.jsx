import { useState } from 'react'

const Header = ({ title }) => {
  return (
  <h1>
    {title}
  </h1>
  )
}

const Button = ( { handleClick, text } ) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, addVotes] = useState(Array(anecdotes.length).fill(0))
  const [most_voted_anecdote, setMostVotes] = useState({index: 0, votes: 0})

  const handleVoting = (selected) => {
    const updated_votes = [...votes]
    // console.log("votes before",updated_votes)
    updated_votes[selected] += 1
    addVotes(updated_votes)
    // console.log("votes after",updated_votes)
    if (updated_votes[selected] > most_voted_anecdote.votes)
    setMostVotes({index: selected, votes: updated_votes[selected]})
  }

  return (
    <div>
      <Header title={"Anecdote of the day"} />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => handleVoting(selected)} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
      <Header title={"Anecdote with most votes"} />
      <p>{anecdotes[most_voted_anecdote.index]}</p>
      <p>has {most_voted_anecdote.votes} votes</p>
    </div>
  )
}

export default App