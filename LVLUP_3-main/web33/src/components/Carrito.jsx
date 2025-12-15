import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaymentService from '../services/PaymentService'; // 1. Importamos el servicio de pagos

const linkStyle = {
  background: '#222',
  color: '#fff',
  fontFamily: 'Roboto, Arial, sans-serif',
  padding: '10px 22px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  // Mantenemos este estado solo para mensajes de error o carrito vacío
  const [mensajeSistema, setMensajeSistema] = useState(null);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  };

  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setMensajeSistema(null); 
  };

  const cambiarCantidad = (index, cambio) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += cambio;
    
    if (nuevoCarrito[index].cantidad < 1) {
      nuevoCarrito[index].cantidad = 1;
    }
    
    actualizarCarrito(nuevoCarrito);
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    actualizarCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    if (window.confirm("¿Seguro que quieres vaciar el carrito?")) {
      actualizarCarrito([]);
    }
  };

  // --- LÓGICA DE WEBPAY PLUS ---
  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      setMensajeSistema(
        <div className="resumen-card"><p>El carrito está vacío.</p></div>
      );
      return;
    }

    const total = calcularTotal();

    try {
      // 1. Pedimos al Backend que inicie la transacción
      // (Esto conecta con tu PaymentController en Java)
      const data = await PaymentService.iniciarPago(total);
      const { url, token } = data;

      // 2. Creamos un formulario invisible para redirigir a Transbank
      const form = document.createElement("form");
      form.action = url;
      form.method = "POST";

      const inputToken = document.createElement("input");
      inputToken.type = "hidden";
      inputToken.name = "token_ws";
      inputToken.value = token;

      form.appendChild(inputToken);
      document.body.appendChild(form);
      
      // 3. ¡Enviamos al usuario a pagar!
      form.submit(); 

    } catch (error) {
      console.error("Error iniciando pago:", error);
      alert("Hubo un error al conectar con Webpay. Revisa que el Backend esté corriendo.");
    }
  };

  const total = calcularTotal();

  return (
    <div className="container mt-5">
      
      {/* Botón de navegación */}
      <div className="d-flex justify-content-center justify-content-md-end mb-4">
        <Link to="/catalogo" className="btn" style={linkStyle}>Atras</Link>
      </div>

      <h1 className="mb-4">Carrito de Compras</h1>

      {/* Mensajes del sistema (Carrito vacío) */}
      {carrito.length === 0 && (
        <center>
            <p className="text-white">El carrito está vacío.</p>
            {mensajeSistema}
        </center>
      )}

      {/* Tabla de productos */}
      {carrito.length > 0 && (
        <div id="carritoContainer" className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, i) => {
                const subtotal = item.precio * item.cantidad;
                return (
                  <tr key={i}>
                    <td><img src={item.imagen} alt={item.nombre} style={{ width: '60px' }} /></td>
                    <td>{item.nombre}</td>
                    <td>{item.categoria}</td>
                    <td>${item.precio.toLocaleString()}</td>
                    <td>{item.cantidad}</td>
                    <td>${subtotal.toLocaleString()}</td>
                    <td className="acciones">
                      <button className="btn btn-sm btn-info me-1" onClick={() => cambiarCantidad(i, 1)}>+</button>
                      <button className="btn btn-sm btn-info me-1" onClick={() => cambiarCantidad(i, -1)}>-</button>
                      <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(i)}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="total text-end text-white p-3">
            Total: <strong className="h5">${total.toLocaleString()}</strong>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      {carrito.length > 0 && (
        <div className="text-center mt-4">
          <button className="vaciar btn btn-danger me-2" onClick={vaciarCarrito}>Vaciar carrito</button>
          {/* Este botón ahora inicia el flujo de Webpay */}
          <button className="finalizar btn btn-success" onClick={finalizarCompra}>Pagar con Webpay</button>
        </div>
      )}
    </div>
  );
}

export default Carrito;