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

const StatisticLine =  ( { text, value } ) => {
  return (
          <tr>
            <td>{ text }
            </td>
            <td>{ value }</td>
          </tr>
        )
}

const Statistics = ( { stats }) => {
  const all = stats.reduce((partialSum, a) => partialSum + a.amount, 0)
  let average = 0
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
      const positive = stats[0].amount/all * 100 
  return (
    <table>
      <tbody>
        <StatisticLine text={stats[0].type} value={stats[0].amount} />
        <StatisticLine text={stats[1].type} value={stats[1].amount} />
        <StatisticLine text={stats[2].type} value={stats[2].amount} />
        <tr>
          <td>all</td>
          <td>{ all }</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{ average }</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{ positive } %</td>
        </tr>
      </tbody>
    </table>
    )
  }
  else {
    return (
      <div>
        No feedback given
      </div>
      )
  }
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