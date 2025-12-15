import Ofertas from './components/Ofertas';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import LoginRegister from './components/LoginRegister'; 
import Registro from './components/Registro'; 
import Header from './components/Header'; 
import Producto from './components/Producto'; 
import PaymentResult from './components/PaymentResult';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/producto/:nombre" element={<Producto />} />
            <Route path="/payment/result" element={<PaymentResult />} />
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;