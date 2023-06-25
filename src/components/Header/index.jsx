import './style.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

const Header = ({title}) => {
  const location = useLocation();
  return (
    <header className='p-4 header'>
      {
        (location.pathname !== "/")?
        <Link className='position-absolute text-white' to="/" >
          Return
        </Link>:""
      }
 
      <h1 className='text-center text-white'>{title}</h1>
    </header>
  );
}

export default Header;