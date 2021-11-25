import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);

  const fetchCapital = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCapital();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      generateQuestion();
    }
  }, [data]);

  const shuffledArr = (array) =>
    array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

  const generateQuestion = () => {
    const getRandomIndex = () => parseInt(Math.random() * data.length);

    const correctAnswer = {
      country: data?.[getRandomIndex()]?.name?.common,
      correct: true,
      capital: data?.[getRandomIndex()]?.capital[0]
    };
    let array = [];
    for (let i = 0; i < 3; i++) {
      array.push({
        country: data?.[getRandomIndex()]?.name?.common,
        correct: false
      });
    }
    array.push(correctAnswer);
    setAnswers(array);
    shuffledArr(answers);
    return answers;
  };
  console.log(answers);

  return (
    <div>
      <Box
        sx={{
          width: 300,
          borderRadius: 3,
          border: 1,
          marginTop: 2,
          borderColor: '#D3D3D3'
        }}>
        <div className="p-4">
          <h5 className="d-flex flex-column align-items-center ">
            {!data?.length ? <Skeleton /> : answers.map((a) => a.correct && a.capital)}
            is the capital of
          </h5>
          <div className="d-flex flex-column align-items-center ">
            {answers.map((el, index) => (
              <>
                <Button key={index} className="mb-3 w-75 " variant="outlined">
                  {el.country}
                </Button>
              </>
            ))}
          </div>
          <div className="d-flex flex-column align-items-end">
            <Button className="w-25" onClick={fetchCapital} variant="contained" color="success">
              Next
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
