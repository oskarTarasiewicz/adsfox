import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';


import Edit from './components/Edit';
import Charts from './components/Charts';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Charts />} />
                <Route path="/edit" element={<Edit />} />
            </Routes>
        </Router>
    );
};

const rootElement = document.getElementById('app');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}
