import './style.css'
import { useCallback, useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import CountryItem from '../../components/CountryItem';

import axios from 'axios';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Header from '../../components/Header';

const Home = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountriesList, setFilteredCountriesList] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [page, setPage ] = useState(0);
  const [search, setSearch ] = useState("");

  const fetchCountriesData = useCallback(async() => {
    try {
      setLoading(true)
      axios.get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountriesList(res.data)
        setFilteredCountriesList(res.data)
        setLoading(false)
      })
    } catch (error) {
      setLoading(false)
    }
  },[])

  useEffect(() => {     
    fetchCountriesData()
  },[])

  const handleSearch = (e) => {
    e.preventDefault();
    if(search.length > 0) {
      const filteredList = countriesList.filter(country => (
        country.name.common.toUpperCase().includes(search.toUpperCase())
      ));
      setFilteredCountriesList(filteredList)
    } else {
      setFilteredCountriesList(countriesList)
    }
  }

  const showCountries = () => {
    if(loading) {
      return <p>Carregando ...</p>
    }
    return (
      <section className='d-flex flex-wrap gap-5 justify-content-center'>
        {filteredCountriesList.length > 0?filteredCountriesList.slice(page*25,page*25+25).map(country => (
          <CountryItem 
            key={country.name.common}
            state={country}
            name={country.name.common}
            imagem={country.flags.png}
            capital={country.capital}
            population={country.population}
          />
        )):
        <p>No country found</p>
        }
      </section>
    )
  } 

  const showPaginationButtons = () => {
    const menus = []
    for (let i = 0; i < filteredCountriesList.length; i+=25) {
      menus.push(i/25)
    }
    return (
      <section className='paginationSection py-3'>
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
        <button onClick={() => {if((page + 1) * 25 < filteredCountriesList.length) setPage(page + 1) }} className='py-2 px-3'>
          &#187;
        </button>
      </section>
    )
  }

  return (
    <div style={{background:"#dbdbdb"}}>
      <Header title="Countries List"/>
      <Container>
        <Form onSubmit={handleSearch}>
          <InputGroup className="my-3 px-5">
            <Form.Control placeholder="Search country" value={search}
            onChange={(e) => setSearch(e.target.value)}/>
            <Button variant="outline-secondary" type="submit" onClick={handleSearch}>
              Search
            </Button>
          </InputGroup>
        </Form>
        {showCountries()}
      </Container>
      {showPaginationButtons()}
    </div>
  );
}

export default Home;