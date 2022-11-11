import Country from "./Country"
const Countries = ({ countriesFilter, react, handleDetails }) => {
    if(countriesFilter.length > 10){
        return (
            <p>Too many matches, specifi another filter</p>
        )        
    }else if(countriesFilter.length == 1){
        return (
            <Country countries={countriesFilter} />
        )
    }else{
        return (
            <ul>
              {
                  countriesFilter.map(country =>(
                        <react.Fragment>
                            <li key={country.area} >{ country.name.common }</li>
                            <button onClick={() => handleDetails(country.name.common) }>{country.name.common}</button>
                        </react.Fragment>
                      )
                  )
              }
            </ul>
          )
    }
  }
export default Countries