import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  let results;
  let obj = {};
  const generateMap = (results) => {
    results.map((item) => {
      obj[item?.capital?.[0] || item?.name.common] = item?.name.common;
    });
    return obj;
  };

  const fetchAllData = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => (results = data))
      .then(() => generateMap(results))
      .finally(() => console.log(Object.keys(obj)));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          width: 300,
          height: 450,
          borderRadius: 3,
          border: 1,
          marginTop: 2,
          borderColor: '#D3D3D3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
        <Button className="mt-3 w-75 " variant="outlined">
          Delete
        </Button>
        <Button className="mt-3 w-75 " variant="outlined">
          Delete
        </Button>
        <Button className="mt-3 w-75 " variant="outlined">
          Delete
        </Button>
        <Button className="mt-3 w-75 " variant="outlined">
          Delete
        </Button>
        <Button className="mt-4 col-4 w-50" variant="contained" color="success">
          Next
        </Button>
      </Box>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
