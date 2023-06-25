import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';

const Country = () => {
  const { state } = useLocation();  
  const { 
    flags,
    name,
    capital,
    population,
    region,
    flag,
    area,
    maps,
    status,
    timezones,
    continents
  } = state
  
  return (
    <div>
      <Header title="Country Info"/>
      <Container className='d-flex py-5 flex-wrap'>
        <section className='w-50 px-3'>
          <img src={flags.png} alt={name.common} className='w-100'/>
        </section>
        <section className='w-50'>
          <h1>{name.common} <small>{flag}</small></h1>
          <p><strong>Capital:</strong> {capital}</p>
          <p><strong>Area:</strong> {area}km²</p>
          <p><strong>Population:</strong> {population} hab</p>
          <p><strong>Region:</strong> {region}</p>
        </section>
        <section className='w-100'>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Timezone list:</strong></p>
          <ul>
          { timezones.map(time => <li>{time}</li>) }
          </ul>
          <p><strong>Continents:</strong> { continents.map(time => <span> {time} </span>) }</p>
          
          <p><a href={maps.googleMaps} target='_blank' title='VIEW ON GOOGLE MAPS'>VIEW ON GOOGLE MAPS</a></p>
        </section>
      </Container>
    </div>
  );
}

export default Country;