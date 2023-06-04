import "../draw.css";
import React, { useRef, useEffect, useState } from "react";
import {saveAs} from "file-saver";



export default function Draw() {

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (event) => {
    if (event.button !== 0) {
      return; // Only draw on left mouse button
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    isDrawing.current = true; 
  };

  const draw = (event) => {
    if (!isDrawing.current) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const resetCanvas = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };



//   function uploadImage(event) {
//     event.preventDefault();
//     fetch("http://localhost:5000/upload-image", {
//         method: "POST",
//         crossDomain: true,
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//             base64: imgURL
//         })
//     }).then((res) => res.json()).then((data) => console.log(data))
// }


 
function uploadImage(event) {
  event.preventDefault();

    fetch("http://localhost:5000/upload-image", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            base64: imageUrl
        })
    }).then((res) => res.json()).then((data) => console.log(data))

    alert("Image Saved!");
}


const logOut = (e) => {
  e.preventDefault();
  window.localStorage.clear();
  window.location.href = "./sign-in";
};


const displayImages = (e) => {
  e.preventDefault();
  window.location.href = "./imageUpload";
};

const displayUser = (e) => {
  e.preventDefault();
  window.location.href = "./userDetails";
};

  function handleSubmit(event) {
    event.preventDefault();

    const canvas = document.getElementById("myCanvas");
    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append("image", blob, "image.png");

      fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
          console.log(imageUrl);
        })
        .catch((error) => console.error(error));
    });
  }
  const handleClick = ()=>{
    saveAs(imageUrl, "img");
   }
  return (
    <div className="mainn">
      <header className="headd">
      
        <div className="headingg">
          <h1 className="mHeading">FABIY - Fabricate It Yourself!</h1>
        </div>
      </header>
      <div className="App">
        <div className="formInputImage">
          <form onSubmit={handleSubmit}>
            <canvas
              id="myCanvas"
              ref={canvasRef}
              width={256}
              height={256}
              style={{
                backgroundColor: "white",
                border: "1px solid black",
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
            />
            <div className="submit-btn">
              <button className="btn-grad" type="submit" onClick={handleSubmit}>Generate Fabric</button>
            </div>
            <div className="submit-btn">
              <button className="btn-grad" type="submit" onClick={resetCanvas}>Reset</button>
            </div>
          </form>
        </div>

        <div className="formOutputImage">
        <form >
          <div className="outputImage">
            <img className="generatedImg" src={imageUrl}/>
          </div>
          <button className="btn-gradd" type="submit" onClick={uploadImage}>Save</button>
          <button className="btn-graddd" type="submit" onClick={handleClick}>Download</button>
        
        </form>

        
        </div>
        
        <div className="formButtons">
        <form >
        <button className="btn-graadd" onClick={displayUser}>User Details</button>

              <button className="btn-graddd" onClick={displayImages}>SHOW ALL IMAGES</button>
          <button onClick={logOut} className="btn-grdd" type="submit" value="Submit request" >Log Out</button>
        </form>
        </div>
        
        
              
        
      </div>
    </div>
  );
}