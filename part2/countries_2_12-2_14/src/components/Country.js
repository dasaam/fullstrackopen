
const Country = ({ countries }) => {
    
    const languages = Object.values(countries[0].languages)

    return (
        <>
            <h2>{ countries[0].name.common }</h2>
            <p>capital { countries[0].capital }</p>
            <p>population { countries[0].population }</p>
            <h2>languages</h2>
            <ul>
                {
                    languages.map(language => (
                        <li key={language}>{ language }</li>
                    ))
                }
            </ul>
            <img src={countries[0].flags.png} height="200" width="200" />
        </>
    )
}

export default Country