import { Container } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const Country = () => {
  const { country } = useParams();
  const { state } = useLocation();  
  const [loading, setLoading] = useState(false);
  const [countryInfo, setCountryInfo] = useState(state);
  
  const fetchCountryData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://restcountries.com/v3.1/name/" + country);
      const data = response.data[0];
      setCountryInfo(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [country]);

  useEffect(() => {
    if (!state) {
      fetchCountryData();
    }
  }, [state, fetchCountryData]);

  return (
    <div>
      {!loading && countryInfo && (
        <>
          <Header title="Country Info" />
          <Container className='d-flex py-5 flex-wrap'>
            <section className='w-50 px-3'>
              <img src={countryInfo.flags.png} alt={countryInfo.name.common} className='w-100' />
            </section>
            <section className='w-50'>
              <h1>{countryInfo.name.common} <small>{countryInfo.flag}</small></h1>
              <p><strong>Capital:</strong> {countryInfo.capital}</p>
              <p><strong>Area:</strong> {countryInfo.area}km²</p>
              <p><strong>Population:</strong> {countryInfo.population} hab</p>
              <p><strong>Region:</strong> {countryInfo.region}</p>
            </section>
            <section className='w-100 py-4'>
              <p><strong>Status:</strong> {countryInfo.status}</p>
              <p><strong>Timezone list:</strong></p>
              <ul>
                {countryInfo.timezones && countryInfo.timezones.map((time, index) => <li key={index}>{time}</li>)}
              </ul>
              <p><strong>Continents:</strong> {countryInfo.continents && countryInfo.continents.map((continent, index) => <span key={index}>{continent}</span>)}</p>
              <p><a href={countryInfo.maps.googleMaps} target='_blank' rel='noopener noreferrer' title='VIEW ON GOOGLE MAPS'>VIEW ON GOOGLE MAPS</a></p>
            </section>
          </Container>
        </>
      )}
    </div>
  );
};

export default Country;
