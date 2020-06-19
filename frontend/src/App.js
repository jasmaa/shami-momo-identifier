import React from 'react';

const axios = require('axios');

const App = () => {
  return (
    <div>
      <h1>hi there</h1>

      <input type="file" id="file" name="file" />
      <button
        onClick={e => {
          const formData = new FormData();
          const imagefile = document.querySelector('#file');
          formData.append("file", imagefile.files[0]);

          axios.post('http://localhost:5000/api/v1/identify', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
            .then(res => {
              console.log(res.data);
            })
        }}
      >click me</button>

    </div>
  );
}

export default App;
