import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ThemeContext from "./context/ThemeContext";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {createMuiTheme, ThemeProvider} from "@mui/material";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            "'Inter', sans-serif",
            "'Carrois Gothic', sans-serif"
        ].join(','),
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ThemeContext.Provider value={{
                        primaryColor: '#C4924E',
                        secondaryColor: '#932012',
                        backgroundColor: '#2F2F2F',
                        textColor: '#0E0E0E',
                        elevationColor: '#75757C',
                        secondaryFont: '"Inter", sans-serif'
                    }}>
                        <MainLayout>
                            <App/>
                        </MainLayout>
                    </ThemeContext.Provider>
                </LocalizationProvider>
            </BrowserRouter>
        </React.StrictMode>
    </ThemeProvider>
);

reportWebVitals();
