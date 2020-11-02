import React, { useState, useRef } from 'react';
import axios from 'axios';


const FileUpload = (props) => {

  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  let uploadInput = useRef(null)

  const handleChange = () => {
    setSuccess(false);
    setUrl('');
    setKey('');
  }

  const handleUpload = (ev) => {
    let file = uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    axios.post("/api/sign_s3/addPhoto",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {

      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      var splitUrl = url.split('/')
      var key = splitUrl[splitUrl.length - 1]

      setUrl(url)
      setKey(key)

     // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };

      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        setSuccess(true);
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }

  const SuccessMessage = () => (
    <div style={{padding:50}}>
      <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
      <a href={url}>Access the file here</a>
      <br/>
    </div>
  )


  return (
    <div className="App">
      <center>
        <h1>UPLOAD A FILE</h1>
        {success ? <SuccessMessage/> : null}
        <input onChange={handleChange} ref={(ref) => { uploadInput = ref; }} type="file"/>
        <br/>
        <button onClick={handleUpload}>UPLOAD</button>
      </center>
    </div>
  );


}

export default FileUpload;