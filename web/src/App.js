import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Identify from './screens/Identify';
import clientAxios from './config/axiosConfig';
import './styles/style.css';

const App = () => {
  return <Identify clientAxios={clientAxios} />;
}

export default App;
