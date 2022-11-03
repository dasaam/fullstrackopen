import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filter, setFilter ] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('render', countries.length, 'countries')
  //console.log('render', countries)
  

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  /*const oso = countries.map((country) =>{
    return country.name.common
  })*/

  //console.log(oso);
  const countriesFilter = (filter == '') ? countries : countries.filter((country) => {
    return country.name.common.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  })

  return (
    <div>
      <Filter filter = { filter } handleFilterChange = { handleFilterChange} />
      <Countries countriesFilter={countriesFilter} /> 

    </div>
  )
}

export default App