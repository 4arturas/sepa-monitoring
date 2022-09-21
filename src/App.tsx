import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import AppRouter from "./routes/AppRouter";
import {AppLayout} from "./layouts/AppLayout";

function App() {
  return (
    <AppLayout/>
  );
}

export default App;
