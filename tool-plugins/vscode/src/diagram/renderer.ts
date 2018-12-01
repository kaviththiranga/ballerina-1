import { ExtendedLangClient } from '../core/extended-language-client';
import { Uri, ExtensionContext } from 'vscode';
import { getLibraryWebViewContent } from '../utils';

export function render (context: ExtensionContext, langClient: ExtendedLangClient, docUri: Uri, retries: number = 1)
        : string {       
   return renderDiagram(context, docUri);
}

function renderDiagram(context: ExtensionContext, docUri: Uri): string {

    const body = `
    <svg width="600" height="1000" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 800 1000">
    <rect width="600" height="1000" rx="10"></rect>
    <rect  x="400" y="180" width="50" height="20" fill="white" />
    <foreignObject x="400" y="200" width="50px" height="20px">
        <div class="dropdown">
          <button class="dropbtn">+</button>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
   </foreignObject>
</svg>
    `;

    const styles = `
        body {
            background: #f1f1f1;
        }
        /* Dropdown Button */

.dropbtn {
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */

.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */

.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */

.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

    `;

    const script = `
    `;

    return getLibraryWebViewContent(context, body, script, styles);
}

export function renderError() {
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    <div>
        Could not connect to the parser service. Please try again after restarting vscode.
        <a href="command:workbench.action.reloadWindow">Restart</a>
    </div>
    </body>
    </html>
    `;
}