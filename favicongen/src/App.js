import React from "react";
import "./App.css";
import axios from "axios";
import fileDownload from "js-file-download";
import b64toBlob from "b64-to-blob";


function App() {
  return (
    <div className="App">
      <div className="container">
        <form method="post" action="upload/post" encType="multipart/form-data">
        <input type="file" name="image" id="input"/> <br/>
        <label htmlFor="input">
          <div className="label">
            <div className="h1">
              <h1 id="h1">Add file</h1>
            </div>
            <button type="submit" name="upload" className="button">Send image</button>
          </div>
        </label>
        </form>
      </div>
    </div>
  );
}

export default App;
