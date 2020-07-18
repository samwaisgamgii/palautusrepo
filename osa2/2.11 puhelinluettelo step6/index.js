import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Person = ({ person }) => <p>{person.name}: {person.number}</p>

const PersonForm = ({ newName, newNum, handleName, handleNum, handleAdd }) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleName} />
      </div>
      <div>
        number: <input value={newNum} onChange={handleNum} />
      </div>
      <div>
        <button type="submit" onClick={handleAdd}>add</button>
      </div>
    </form>
  )
}

const Filter = ({ newFil, handleFil }) =>
  (
    <div>
      filter shown with: <input value={newFil} onChange={handleFil} />
    </div>
  )



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFil, setFil] = useState('')

  const handleName = (event) => setNewName(event.target.value)
  const handleNum = (event) => setNewNum(event.target.value)
  const handleFil = (event) => setFil(event.target.value)

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  },[])

  const handleAdd = (event) => {
    event.preventDefault()
    if (persons.find(ele => ele.name === newName) === undefined) {
      const name = { name: newName, number: newNum }
      setPersons(persons.concat(name))
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }
  const personsFil = persons.filter(person => person.name.toLocaleLowerCase().includes(newFil.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFil={newFil} handleFil={handleFil} />
      <h2>Add new</h2>
      <PersonForm newName={newName} newNum={newNum} handleName={handleName} handleNum={handleNum} handleAdd={handleAdd} />
      <h2>Numbers</h2>
      <div>
        {personsFil.map(person => <Person key={person.name} person={person} />)}
      </div>

    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))