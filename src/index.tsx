import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FC, useState, useEffect, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const App: FC = () => {
  const NUMBER_OF_QUESTIONS = 5;
  const NUMBER_OF_RANDOM_ANSWERS = 3;
  const [data, setData] = useState<Country[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [countCorrectAnswers, setCountCorrectAnswers] = useState<number>(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const getRandomIndex = ():number => Math.round(Math.random() * data?.length);
  const isRandomIndexEven = ():boolean => activeQuestionIndex % 2 === 0 ? true : false

  interface Country {
    "name": {
        "common": string,
        "official": string,
        "nativeName": {
            "ara": {
                "official": string,
                "common": string
            }
        }
    },
    "tld": [
        ".kw"
    ],
    "cca2": string,
    "ccn3": string,
    "cca3": string,
    "cioc": string,
    "independent": boolean,
    "status": string,
    "unMember": boolean,
    "currencies": {
        "KWD": {
            "name": string,
            "symbol": string
        }
    },
    "idd": {
        "root": string,
        "suffixes":
          string[]
    },
    "capital": 
      string[]
    ,
    "altSpellings": string[],
    "region": string,
    "subregion": string,
    "languages": {
        "ara": string
    },
    "translations": {
        "ara": {
            "official": string,
            "common": string
        },
        "ces": {
            "official": string,
            "common": string
        },
        "cym": {
            "official": string,
            "common": string
        },
        "deu": {
            "official": string,
            "common": string
        },
        "est": {
            "official": string,
            "common": string
        },
        "fin": {
            "official": string,
            "common": string
        },
        "fra": {
            "official": string,
            "common": string
        },
        "hrv": {
            "official": string,
            "common": string
        },
        "hun": {
            "official": string,
            "common": string
        },
        "ita": {
            "official": string,
            "common": string
        },
        "jpn": {
            "official": string,
            "common": string
        },
        "kor": {
            "official": string,
            "common": string
        },
        "nld": {
            "official": string,
            "common": string
        },
        "per": {
            "official": string,
            "common": string
        },
        "pol": {
            "official": string,
            "common": string
        },
        "por": {
            "official": string,
            "common": string
        },
        "rus": {
            "official": string,
            "common": string
        },
        "slk": {
            "official": string,
            "common": string
        },
        "spa": {
            "official": string,
            "common": string
        },
        "swe": {
            "official": string,
            "common": string
        },
        "urd": {
            "official": string,
            "common": string
        },
        "zho": {
            "official": string,
            "common": string
        }
    },
    "latlng": number[],
    "landlocked": boolean,
    "borders": string[],
    "area": number,
    "demonyms": {
        "eng": {
            "f": string,
            "m": string
        },
        "fra": {
            "f": string,
            "m": string
        }
    },
    "flag": string,
    "maps": {
        "googleMaps": string,
        "openStreetMaps": string
    },
    "population": number,
    "fifa": string,
    "car": {
        "signs": string[],
        "side": string
    },
    "timezones": string[],
    "continents": string[],
    "flags": {
        "png": string,
        "svg": string
    },
    "coatOfArms": {
        "png": string,
        "svg": string
    },
    "startOfWeek": string,
    "capitalInfo": {
        "latlng": number[]
    },
    "postalCode": {
        "format": string,
        "regex": string
    }
}

interface Question {
  "capital": string,
  "country": string,
  "flag": string,
  "id": number,
  "options": string[]
}


function fetchCapital() {
  fetch('https://restcountries.com/v3.1/all')
  .then((response) => response.json())
  .then((data:Country[]) => setData(data))
  .catch((err) => console.error(err));
}


  const handleNextButtonClick = ():void => {
    setActiveQuestionIndex(activeQuestionIndex + 1);
    setSelectedAnswer("");
  }

  useEffect(() => {
    if (selectedAnswer === questions[activeQuestionIndex]?.country) {
      setIsAnswerCorrect(true);
    }
    else {
      setIsAnswerCorrect(false);
    }
  }, [selectedAnswer, questions, activeQuestionIndex]);

  const handleAnswerClick = (event:MouseEvent):void => {
    event.preventDefault();
    setSelectedAnswer(event.currentTarget.id)
    questions[activeQuestionIndex]?.country === event.currentTarget.id && setCountCorrectAnswers(countCorrectAnswers + 1)
  }

  useEffect(() => {
    fetchCapital()
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      generateQuestions();
    }
  }, [data]);



  const shuffledOptions = (array:string[]) =>
    array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    const getRandomAnswers = (): string[] => {
    let arr:string[] = [];
    for (let i: number = 0; i < NUMBER_OF_RANDOM_ANSWERS; i++) {
      arr.push(data?.[getRandomIndex()]?.name?.common);
    }
    return arr;
  };

  const generateQuestions = () => {
    let arrayWithQuestions: Question[] = [];
    for (let i: number = 0; i < NUMBER_OF_QUESTIONS; i++) {
      const questionId:number = getRandomIndex();
      arrayWithQuestions.push({
        id: questionId && questionId,
        country: data?.[questionId]?.name?.common,
        capital: data?.[questionId]?.capital?.[0],
        flag: data?.[questionId]?.flags?.png,
        options: shuffledOptions([...getRandomAnswers(), data && data?.[questionId]?.name?.common])
      });
    }
    setQuestions(arrayWithQuestions);
  };

  if (!data?.length) {
    return <div>...Loading </div>;
  }

  const questionsVariants = (index:number) => {
    let variants: string[] = ['A', 'B', 'C', 'D'];
    for (index; index < variants.length; index++) {
      return variants[index];
    }
  };

 

const answers =
  <div className="d-flex flex-column align-items-center" >
    {questions && questions[activeQuestionIndex]?.options.map((el:string, index:number) => (
      <Button
        id={el}
        key={index}
        endIcon={< CheckCircleOutlineIcon/>}
        className="mb-3 w-75 baba"
        variant="outlined"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: selectedAnswer && el === questions[activeQuestionIndex]?.country ? "#60BF88" : selectedAnswer === el ? "#EA8282" : "white",
          color: selectedAnswer && el === questions[activeQuestionIndex]?.country ? "white" : selectedAnswer === el ? "white" : "#1976D2",
          borderColor:selectedAnswer && el === questions[activeQuestionIndex]?.country ? "#60BF88" : selectedAnswer === el ? "#EA8282" : ""
        }}
        onClick={(el:MouseEvent) => {
          handleAnswerClick(el);
        }}
      >
    {questionsVariants(index)}
      <div className="clickedAnswer"> {el} </div>
      </Button>
    ))
      }
  </div>

  return (
    <div> 
      <h5 className="text-uppercase text-white font-weight-bold">
        Country Quiz
      </h5>
      {activeQuestionIndex === 5 ? (
        <Box
          sx={{
            width: 350,
            borderRadius: 3,
            position: "relative",
            border: 1,
            borderColor: "#D3D3D3",
            backgroundColor: "#FFF",
          }}
        >

          <img className="undraw-adventure-icon" src="../src/assets/icon.svg"/>
          <div className="p-4 d-flex justify-content-center flex-column">
            <img className="winners" src="../src/assets/winners.svg"/>
            <h1 className="d-flex flex-column align-items-center"> Results </h1>
            <h5>
              {countCorrectAnswers === 1 ? (
                <div className="d-flex align-items-baseline justify-content-center">
                  You got
                  <span className="answerCount"> {countCorrectAnswers} </span>{" "}
                  correct answer!
                </div>
              ) : (
                <div className="d-flex align-items-baseline justify-content-center">
                  You got
                  <span className="answerCount"> {countCorrectAnswers} </span>{" "}
                  correct answers!
                </div>
              )}
            </h5>
            <div className="d-flex flex-column align-items-center">
              <Button
                className="w-50"
                onClick={() => {
                  generateQuestions();
                  setActiveQuestionIndex(0);
                  setCountCorrectAnswers(0);
                }}
                //style={{ backGround: "#F9A826" }}
              >
                Try again
              </Button>
            </div>
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            width: 350,
            borderRadius: 3,
            position: "relative",
            border: 1,
            borderColor: "#D3D3D3",
            backgroundColor: "#FFF",
          }}
        >
          <img className="undraw-adventure-icon" src="../src/assets/icon.svg"/>
          <div className="p-4">
            {questions && isRandomIndexEven() ? (
              <div>
                <h5 className="d-flex flex-column align-items-center ">
                  {questions[activeQuestionIndex]?.capital} &nbsp;is the capital
                  of
                </h5>
                  {answers}
              </div>
            ) : (
              <div>
                <h5 className="d-flex flex-column justify-content-space-between">
                  <img
                    className="w-50"
                    src={questions[activeQuestionIndex]?.flag}
                  />
                  <span>Which country does this flag belong to? </span>
                </h5>
                  {answers}
              </div>
            )}
            <div className="d-flex flex-column align-items-end">
              <Button
                className="w-25"
                onClick={handleNextButtonClick}
                style={{ backgroundColor: "#F9A826" }}
                variant="contained"
              >
                Next
              </Button>
            </div>
          </div>
        </Box>
      )}
    </div>
  )
};

ReactDOM.render(<App/>, document.querySelector('#root'));
