import React from 'react';
import FileUpload from './components/FileUpload';


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <h2>Uploader</h2>
        </div>
          <FileUpload />
      </div>
    );

  }
}

export default App;
