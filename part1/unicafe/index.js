import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// perform function onClick and show text 'text'- already destructured in this Button component
const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
)

const Statistic = ({ text, val }) => {
  return (
    <tbody> 
      <tr>
        <td>{text}</td>
        <td>{val}</td>
      </tr>
    </tbody>
  )
}

//Statistics results line after line
const Statistics = ({ good, neutral, bad, allClicks }) => {
  if(allClicks === 0) {
    return (
      <div> No feedback given</div>
    )
  } else {
      // if number > 0 first condition evaluates to true, js template literals to append % sign
      let pos_perc = allClicks ? `${(good/allClicks) * 100}%`: '0%';
      let avg = allClicks ? (good - bad) / allClicks : 0;
      return(
        <div>
          <Statistic text='good' val={good}/>
          <Statistic text='neutral' val={neutral}/>
          <Statistic text='bad' val={bad}/>
          <Statistic text='all' val={allClicks}/>  
          <Statistic text='average' val={avg}/>
          <Statistic text='positive' val={pos_perc}/>
        </div>
    )
  }

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)

  const incrementAll = () => setAllClicks(allClicks + 1);

  const incrementGood = () => {
    setGood(good +1)
    incrementAll();
  }

  const incrementNeutral = () => {
    setNeutral(neutral +1);
    incrementAll();
  }

  const incrementBad = () => {
    setBad(bad +1);
    incrementAll();
  } 


  return (
    <div>
        <h1>give feedback</h1>
        <Button onClick={incrementGood} text='good'/>
        <Button onClick={incrementNeutral} text='neutral'/>
        <Button onClick={incrementBad} text='bad'/>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)