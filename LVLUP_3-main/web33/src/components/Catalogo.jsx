import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService'; // 1. Importar el servicio

function Catalogo() {
  // 2. Estado inicial vacío (se llenará con datos del backend)
  const [productos, setProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const navigate = useNavigate();

  // 3. Cargar productos desde Spring Boot al iniciar
  useEffect(() => {
    ProductService.getAllProductos()
      .then(data => {
        setProductos(data);
        setProductosFiltrados(data); // Inicialmente mostramos todo
        console.log("Catálogo cargado:", data);
      })
      .catch(error => {
        console.error("Error conectando al servidor:", error);
      });
  }, []);

  // Lógica de filtrado (se mantiene igual, pero reacciona al estado 'productos')
  useEffect(() => {
    if (filtroCategoria === 'todos') {
      setProductosFiltrados(productos);
    } else {
      // Asegúrate de que tu BD tenga los mismos nombres de categoría ("juegos", "sillas", etc.)
      const filtrados = productos.filter(p => p.categoria === filtroCategoria);
      setProductosFiltrados(filtrados);
    }
  }, [filtroCategoria, productos]);

  // Función para agregar al carrito (integrada dentro del componente)
  const agregarAlCarrito = (producto) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Buscamos por ID si existe, si no por nombre (para compatibilidad)
    const identificador = producto.id || producto.nombre;
    const index = carrito.findIndex(item => (item.id || item.nombre) === identificador);
    
    if (index >= 0) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    // Opcional: Podrías usar una alerta más bonita o un toast aquí
    alert(`¡${producto.nombre} agregado al carrito!`); 
  };

  const handleVerProducto = (producto) => {
    navigate(`/producto/${producto.nombre}`, { state: { producto } });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Catálogo de Productos</h1>
      
      {/* Filtros */}
      <div className="filtros d-flex justify-content-center mb-4">
        <select 
          id="categoriaFiltro" 
          className="form-select w-auto" 
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="todos">Todas las categorías</option>
          <option value="juegos">Juegos de mesa</option>
          <option value="accesorios">Accesorios</option>
          <option value="consolas">Consolas</option>
          <option value="computadores">Computadores gamers</option>
          <option value="sillas">Sillas gamers</option>
          <option value="mouse">Mouse</option>
          <option value="mousepad">Mousepad</option>
          <option value="poleras">Poleras personalizadas</option>
          <option value="polerones">Polerones gamers personalizados</option>
          <option value="servicio">Servicio técnico</option>
        </select>
      </div>

      {/* Grilla de productos */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center mt-5">
          {productos.length === 0 ? (
             // Mensaje si aún está cargando o no hay conexión
            <p>Cargando catálogo desde el servidor... (Asegúrate que Spring Boot esté corriendo)</p>
          ) : (
            <p>No se encontraron productos en esta categoría.</p>
          )}
        </div>
      ) : (
        <div className="productos">
          {productosFiltrados.map((producto, index) => (
            // Usamos producto.id como key si existe, es más seguro que el index
            <div key={producto.id || index} className="producto" onClick={() => handleVerProducto(producto)} style={{ cursor: 'pointer' }}>
              {/* Validación por si la imagen viene nula de la BD */}
              <img 
                src={producto.imagen || "https://placehold.co/250x150?text=Sin+Imagen"} 
                alt={producto.nombre} 
                className="img-fluid" 
              />
              <h3 className="mt-2">{producto.nombre}</h3>
              <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>
                ${producto.precio ? producto.precio.toLocaleString() : 0}
              </p>
              <button className="btn btn-dark w-100" onClick={(e) => { e.stopPropagation(); agregarAlCarrito(producto); }}>
                <i className="bi bi-cart" style={{ marginRight: '5px' }}></i>
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogo;