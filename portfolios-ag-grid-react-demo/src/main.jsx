import React from 'react'
import ReactDOM from 'react-dom/client'
import RichGridDeclarative from "./richGridDeclarative/RichGridDeclarative";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import "bootstrap/dist/css/bootstrap.css";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RichGridDeclarative/>
    </React.StrictMode>,
)
