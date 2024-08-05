import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/// строгий режим отключаем так как возможны баги в некоторых местах
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
        <App />
)