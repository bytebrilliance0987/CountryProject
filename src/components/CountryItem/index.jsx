import './style.css'
import { Link } from 'react-router-dom';

const CountryItem = ({ id, name, imagem, capital, population, state}) => {
  return (
    <Link to={"/country/"+name} state={state}>
      <div className='countryItem'>
        <section className='imageSection'>
          <img src={imagem} alt={name} className='w-100 h-100'/>
        </section>
        <section className='py-3'>
          <p className='text-black-50 mt-2'>Name: {name}</p>
          <p className='text-black-50 mt-2'>Capital: {capital}</p>
          <p className='text-black-50 mt-2'>Population: {population}</p>
        </section>
       
      </div>
    </Link>
  );
}

export default CountryItem;