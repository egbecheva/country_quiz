import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  let results;
  let obj = {};

  const generateMap = (results) => {
    results.map((item) => {
      obj[item?.capital?.[0] || item.name.common] = item.name.common;
    });
    console.log(obj);
  };

  const fetchAllData = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => (results = data))
      .finally(() => generateMap(results));
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <h1>
      <div>test</div>
    </h1>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
