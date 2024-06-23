import { useState, useEffect } from "react";

import "./App.css";
import { evaluate, typeOf } from "mathjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDeleteLeft} from "@fortawesome/free-solid-svg-icons";

function App() {

  const [display, setDisplay] = useState("");
  const [isResult, setIsResult] = useState(false);
  const [isleftBraket,setLeftBraket] = useState(true)

  const displayValues = ["C","( )","%","/",7,8,9,"X",4,5,6,"-",1,2,3,"+","+/-",0,".","="];

 
  const handleUserOperation = (value) => {
    try {
      if (value === "=") {
        try {
          setDisplay(evaluate(display));
        } catch (error) {
          alert(error.message);
        }
        setIsResult(true);
      } else if (value === "X") {
        setDisplay(display + "*");
        setIsResult(false);
      } else if (value === "C") {
        setDisplay("");
        setIsResult(false);
        setLeftBraket(true)
      } else if (value === "+/-") {
        setDisplay((prvValue) => {
          if (Number(prvValue) > 0) {
            return -+prvValue.toString();
          } else {
            return Number(prvValue) * -1;
          }
        });
       
      } 
      else if(value === '('){
          setDisplay(prvValue =>{
            return prvValue + value
          })
          setLeftBraket(false)
          setIsResult(false)
      }
      else if(value === ')'){
          setDisplay(prvValue =>{
            return prvValue + value
          })
          setLeftBraket(true)
          setIsResult(false)
      }
      
      else {
        setIsResult(false);

        setDisplay((prvValue) => {
          if (isResult && typeof value === "number") {
            return value;
          } else {
            return prvValue.toString() + value.toString();
          }
        });
      }
    } catch (error) {
      setDisplay((prvValue) => error.message);
    }
  };
  const mainDisplay = () => {
    return (
      <div className="grid-container1">
        {displayValues.map((num, index) => {
          let classN = "grid-item";
          if (num === "C") {
            classN += "C";
          }
          if (
            num === "( )" ||
            num === "%" ||
            num === "/" ||
            num === "X" ||
            num === "-" ||
            num === "+" ||
            num === "+/-"
          ) {
            classN += "U";
          }
          if (num === "=") {
            classN = "grid-item-equal";
          }
          let value = num
          if( num === '( )' && isleftBraket){
            value = "("
          }
          if( num === '( )' && !isleftBraket){
            value = ")"
          }
          return (
            <div
              key={index}
              onClick={() => handleUserOperation(value)}
              className={classN}
            >
              {num}
            </div>
          );
        })}
      </div>
    );
  };
  const handleBackSpace = () =>{
    setIsResult(false)
    if(display){
      console.log(display);
     
      setDisplay(prvValue =>{
        let values = prvValue.toString().split('');
        values.pop()
       
        console.log(values)
        return values.join('')
      })
    }
    else {
      setDisplay(display)
    }
  }

  return (
    <div id="main-container">
    
      {/* {collectUserValue.map((value,index) => <><p>{value}{` `}{userOperation[index]}</p> </>)} */}
      
      <h1 className="display-answer">{ display}</h1>
      <FontAwesomeIcon  onClick={handleBackSpace} className="back-space"  icon={faDeleteLeft} />
      
      
      {mainDisplay()}
    </div>
  );
}

export default App;
