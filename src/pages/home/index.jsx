import './style.css'
import { useCallback, useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import CountryItem from '../../components/CountryItem';

import axios from 'axios';

const Home = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [page, setPage ] = useState(0);

  const fetchCountriesData = useCallback(async() => {
    try {
      setLoading(true)
      axios.get("https://restcountries.com/v3.1/all")
      .then((res) => {
        console.log(res.data)
        setCountriesList(res.data)
        setLoading(false)
      })
    } catch (error) {
      setLoading(false)
    }
  },[])

  useEffect(() => {     
    fetchCountriesData()
  },[])

  const showCountries = () => {
    if(loading) {
      return <p>Carregando ...</p>
    }
    return (
        <section className='d-flex flex-wrap gap-5 justify-content-center'>
          {countriesList.slice(page*25,page*25+25).map(country => (
            <CountryItem 
              key={country.name.common}
              state={country}
              name={country.name.common}
              imagem={country.flags.png}
              capital={country.capital}
              population={country.population}
            />
          ))}
        </section>
    )
  } 

  const showPaginationButtons = () => {
    const menus = []
    for (let i = 0; i < countriesList.length; i+=25) {
      menus.push(i/25)  
    }
    return (
      <section className='paginationSection'>
        <button onClick={() => {if(page-1 >= 0) setPage(page - 1) }} className='py-2 px-3'>
          &#171;
        </button>
          {menus.map(idx => 
            <button 
              key={idx} 
              style={{background: page === idx?"#4cb1ff":""}} 
              onClick={() => setPage(idx)} 
              className='py-2 px-3'
            >
              { idx }
            </button>)}
        <button onClick={() => {if((page + 1) * 25 < countriesList.length) setPage(page + 1) }} className='py-2 px-3'>
          &#187;
        </button>
      </section>
    )
  }

  return (
    <div style={{background:"#f1f1f1"}}>
      <Container>
        <h1 className='text-center py-5'>Countries List</h1>
        {showCountries()}
      </Container>
      {showPaginationButtons()}
    </div>
  );
}

export default Home;