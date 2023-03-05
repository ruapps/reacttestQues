import { useEffect, useState } from 'react';
import './App.css';
import { MathJax, MathJaxContext } from "better-react-mathjax";

const Ids= [
  'AreaUnderTheCurve_901',
  'BinomialTheorem_901',
  'DifferentialCalculus2_901'
]

function App() {

  const [ques, setQues]= useState();
  const [count, setCount]= useState(0);

  useEffect(()=>{
     ques_api()
  }, [count])

  const ques_api = () => {
    let url = 'https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=' + Ids[count];
    fetch(url)
   .then(res => res.json())
   .then(result => {
       console.log(result[0]);
       setQues(result[0].Question);
     }
   )
   console.log(url);
 }
  
  const previousQues= ()=>{  
    setCount(count - 1);
  }

  const nextQues= ()=>{
    setCount( count + 1);
  }


  return (
      <MathJaxContext>
         <div className="container pt-5">
            <div className="wrap m-auto ">
                <div className="border border-warning border-radius rounded-3 p-5">
                <MathJax> <span className='ml-3 h5 mb-2'>Ques: {count + 1}</span><h5>{ques}</h5></MathJax>
                </div>
                <div className="buttons d-flex justify-content-around align-items-center pt-5">
                  <button className='btn btn-primary' onClick={()=> previousQues()} disabled= { count === 0? true : false}>Previous</button>
                  <button className='btn btn-primary' onClick={()=> nextQues()} disabled= { count === 2? true : false} >Next</button>
                </div>
            </div>
        </div>
      </MathJaxContext>
  );
}

export default App;
