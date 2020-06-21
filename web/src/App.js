import React from 'react';

import Identify from './screens/Identify';
import clientAxios from './config/axiosConfig';

const App = () => {
  return <Identify clientAxios={clientAxios} />;
}

export default App;
