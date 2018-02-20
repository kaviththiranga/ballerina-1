import React, { Component } from 'react';
import CodeEditor from './editor/CodeEditor';
import './BallerinaWidget.css';

class BallerinaWidget extends Component {
  render() {
    return (
      <div className="ballerina-widget">
          <div className="ballerina-code-editor">
              <CodeEditor />
          </div>
      </div>
    );
  }
}

export default BallerinaWidget;
