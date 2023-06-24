import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Country = () => {
  const { state } = useLocation();

  console.log(state)
  return (
    <div>
      recipe
    </div>
  );
}

export default Country;