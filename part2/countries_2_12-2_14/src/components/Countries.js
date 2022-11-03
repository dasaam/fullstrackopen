import Country from "./Country"
const Countries = ({ countriesFilter}) => {
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
                          <li key={country.area} >{ country.name.common }</li>
                      )
                  )
              }
            </ul>
          )
    }
  }
export default Countries