import { useState } from 'react'

const Header = ({ title }) => {
  // console.log(props)
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

const Statistics = ( { stats }) => {
  const all = stats.reduce((partialSum, a) => partialSum + a.amount, 0)
  let average = 0
  let positive = 0
  stats.forEach(stat => {
    if (stat.type === "good")
      {
        average += stat.amount
      }
    if (stat.type === "bad")
      {
        average += (stat.amount * -1)
      }
    })
    if (all > 0) { 
      average = average / all
      positive = stats[0].amount/all * 100 }
  return (
    <div>
      <p>{stats[0].type} {stats[0].amount}</p>
      <p>{stats[1].type} {stats[1].amount}</p>
      <p>{stats[2].type} {stats[2].amount}</p>
      <p>all { all }</p>
      <p>average { average }</p>
      <p>positive { positive } %</p>
    </div>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedback = [
    {type: "good",
    amount: good},
    {type: "neutral",
    amount: neutral},
    {type: "bad",
    amount: bad}]

  return (
    <div>
      <Header title={"Give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header title={"Statistics"} />
      <Statistics stats={feedback} />
    </div>
  )
}

export default App