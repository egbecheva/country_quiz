import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  let answers = useRef([, , , ,]);
  useEffect(() => {
    fetchCapital();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      randomAnswers();
    }
  }, [data]);

  let array = [];
  const randomIndex = parseInt(Math.random() * data.length);
  const correctAnswer = {
    country: data?.[randomIndex]?.name?.common,
    correct: true,
    capital: data?.[randomIndex]?.capital[0]
  };
  console.log(correctAnswer);

  const fetchCapital = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  };

  const randomAnswers = () => {
    for (let i = 0; i < 3; i++) {
      array.push({
        country: data?.[parseInt(Math.random() * data?.length)]?.name?.common,
        correct: false
      });
    }
    array.push(correctAnswer);
    answers.current = array;
  };
  console.log(answers);

  const shuffledArr = (array) =>
    array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

  const shuffledAnswers = shuffledArr(answers.current);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <Box
        sx={{
          width: 300,
          height: 350,
          borderRadius: 3,
          border: 1,
          marginTop: 2,
          borderColor: '#D3D3D3'
        }}>
        <div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="mt-4">{correctAnswer.capital} is the capital of</div>
            {/* {shuffledAnswers.map((el, index) => (
              <>
                <Button key={index} className="mt-3 w-75 " variant="outlined">
                  {el.country}
                </Button>
              </>
            ))} */}
          </div>
          <div className="d-flex justify-content-end m-4">
            <Button variant="contained" color="success">
              Next
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
