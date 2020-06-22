import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Stats = ({ bad, neutral, good }) => {


  let all = bad + good + neutral
  let average = (bad * -1 + good * 1) / (all)
  let positive = good / all


  if (all == 0) {
    return (
      <div>No feedback given :(</div>
    )
  }

  return (
    <div>
      <table>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="all" value={all}></StatisticLine>
        <StatisticLine text="average" value={average}></StatisticLine>
        <StatisticLine text="positive" value={positive}></StatisticLine>

      </table>



    </div>
  )

}

const StatisticLine = ({ text, value }) => {

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}



const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>Give feedback</h1>

      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setGood(good + 1)} text="good" />

      <h1>Stats</h1>
      <Stats bad={bad} neutral={neutral} good={good}></Stats>

    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
)