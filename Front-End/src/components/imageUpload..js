import React, { useEffect, useState } from 'react'

function ImageUpload() {
    


    const [image, setImage] = useState("");
    const [allImage, setAllImage] = useState([]);

    const logOut = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        window.location.href = "./sign-in";
      };
      
      
      const displayImages = (e) => {
        e.preventDefault();
        window.location.href = "./draw";
      };
    function covertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); //base64encoded string  
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }
    useEffect(()=>{
        getImage()
    },[])

    function uploadImage() {
        fetch("http://localhost:5000/upload-image", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                base64: image
                
            })
        }).then((res) => res.json()).then((data) => console.log(data))
    }

    function getImage() {
        fetch("http://localhost:5000/get-image", {
            method: "GET",
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setAllImage(data.data)
        })
    }
    return (
        <div className="auth-wrapper" >
            <div className="auth-inner" style={{ width: "auto" }}>
                {image == "" || image == null ? "" : <img width={100} height={100} src={image} />}
                <h1>Your Saved Designs!</h1>
                          


<br/>
                {allImage.map(data=>{
                    return(
                        <img width={256} height={256} src={data.image} /> 
                        
                    )
                })}
                <button className="btn-grad" onClick={displayImages}>Back to Drawing</button>
                <button onClick={logOut} className="btn-graad" type="submit" value="Submit request" >Log Out</button>
            
            </div>
            
        </div>
    )
}

export default ImageUpload;