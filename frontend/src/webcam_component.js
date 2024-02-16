import React from "react";
import Webcam from "react-webcam";
import Axios from 'axios';
import Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';
import { Buffer } from "buffer";
import path from './smile.png';
import Styles from './App.css';
import Image from 'image-js';



console.log(path);

const Webcam_function = () =>{
	const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const[text, setText] = React.useState(null);
  const[name, setName] = React.useState(null);
  const[license, setLicense] = React.useState(null);
  const[expiry, setExpiry] = React.useState(null);
  const canvasRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const path = './smile.png'
  const videoConstraints = {
      //facingMode: {exact: "environment"}
      facingMode: "environment"
    };
  


  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  async function execute() {
    const image = await Image.load(imgSrc);
    const greyImage = image.grey();
    const thresholdValue = greyImage.getThreshold('shanbhag');
    const binaryImage = greyImage.mask({threshold: thresholdValue});
    setImgSrc(binaryImage.toDataURL());

  }
  
  const send = () =>{
    //Axios.post("http://localhost:3001/add", {image: imgSrc})
    //Tesseract.init("eng");
      // set image
      //Tesseract.setImage(imgSrc);
      //console.log("Before tesseract")

    
    //let preprocessed_image = preprocess();

    //const canvas = canvasRef.current;
    
    

    execute();
    

    

    
    Tesseract.recognize(
      imgSrc,'eng',
      
    )
    .catch (err => {
      console.log(err);
    })
    .then(result => {
      // Get Confidence score
      let confidence = result.data.confidence
      console.log(confidence);
      let text = result.data.text
      let first = text.split("Name");
      let second = 
      setText(text);
      console.log(text);
      
    })
    //console.log(imgSrc);
    let imageBuffer = Buffer.from(imgSrc, "base64");
    console.log(path);
    window.Buffer = window.Buffer || require("buffer").Buffer;
    }

  return (
    <>
      <div class = "webcam_class">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      
      
      <div class="button_box">
      <button onClick={capture} class="button">Capture photo</button>
      <button onClick = {send} class = "button">Scan</button>
      </div>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
      

      <p>{text}</p>
     </div> 
    </>

  );
	
}

export default Webcam_function;
