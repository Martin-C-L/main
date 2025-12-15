import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

const productos = [
  {
    nombre: "Multifuncional Tinta Continua Brother",
    precio: "$186.990",
    descuento: "-31%",
    imagen: "https://serofic.cl/wp-content/uploads/2021/07/Maxify-GX-7010.jpg",
    descripcion: "InkBenefit Tank DCPT730DW WiFi-Direct",
  },
  {
    nombre: "Impresora Láser Brother",
    precio: "$69.990",
    descuento: "-16%",
    imagen: "https://serofic.cl/wp-content/uploads/2021/07/Maxify-GX-7010.jpg",
    descripcion: "Blanco y Negro HL-1212W WiFi",
  },
  {
    nombre: "Multifuncional Epson",
    precio: "$169.990",
    descuento: "-29%",
    imagen: "https://serofic.cl/wp-content/uploads/2021/07/Maxify-GX-7010.jpg",
    descripcion: "Tinta Continua EcoTank L3250 WiFi-Direct",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


const computadores = [
  {
    nombre: "Notebook Gamer ASUS TUF",
    precio: "$899.990",
    imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Notebook Gamer HP Omen",
    precio: "$1.099.990",
    imagen: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Notebook Gamer Lenovo Legion",
    precio: "$1.299.990",
    imagen: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Notebook Gamer Dell G5",
    precio: "$1.199.990",
    imagen: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Notebook Gamer Acer Nitro",
    precio: "$999.990",
    imagen: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

const juegosMesa = [
  {
    nombre: "Catan",
    precio: "$29.990",
    imagen: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Monopoly",
    precio: "$24.990",
    imagen: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Dixit",
    precio: "$19.990",
    imagen: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Carcassonne",
    precio: "$22.990",
    imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Ticket to Ride",
    precio: "$27.990",
    imagen: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  },
];

const mouses = [
  {
    nombre: "Mouse Gamer Logitech G502",
    precio: "$39.990",
    imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Mouse Gamer Razer DeathAdder",
    precio: "$49.990",
    imagen: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Mouse Gamer Corsair Harpoon",
    precio: "$29.990",
    imagen: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Mouse Gamer HyperX Pulsefire",
    precio: "$34.990",
    imagen: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    nombre: "Mouse Gamer Redragon Cobra",
    precio: "$24.990",
    imagen: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

const Ofertas = () => {
  return (
    <div className="ofertas-page">
      <h2 className="ofertas-title">Ofertas Especiales</h2>
      <Slider {...sliderSettings}>
        {productos.map((producto, idx) => (
          <div className="oferta-slide" key={idx}>
            <img src={producto.imagen} alt={producto.nombre} className="oferta-img" />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <div className="oferta-precio">{producto.precio}</div>
            <div className="oferta-descuento">{producto.descuento}</div>
          </div>
        ))}
      </Slider>

      {/* Sección Computadores Gamer */}
      <h2 className="categoria-title">Computadores Gamer</h2>
      <div className="categoria-list">
        {computadores.map((pc, idx) => (
          <div className="categoria-card" key={idx}>
            <img src={pc.imagen} alt={pc.nombre} className="categoria-img" />
            <h3>{pc.nombre}</h3>
            <div className="categoria-precio">{pc.precio}</div>
            <button className="categoria-btn">Agregar al carro</button>
          </div>
        ))}
      </div>

      {/* Sección Mouses Gamer */}
      <h2 className="categoria-title">Mouses Gamer</h2>
      <div className="categoria-list">
        {mouses.map((mouse, idx) => (
          <div className="categoria-card" key={idx}>
            <img src={mouse.imagen} alt={mouse.nombre} className="categoria-img" />
            <h3>{mouse.nombre}</h3>
            <div className="categoria-precio">{mouse.precio}</div>
            <button className="categoria-btn">Agregar al carro</button>
          </div>
        ))}
      </div>

      {/* Sección Juegos de Mesa */}
      <h2 className="categoria-title">Juegos de Mesa</h2>
      <div className="categoria-list">
        {juegosMesa.map((juego, idx) => (
          <div className="categoria-card" key={idx}>
            <img src={juego.imagen} alt={juego.nombre} className="categoria-img" />
            <h3>{juego.nombre}</h3>
            <div className="categoria-precio">{juego.precio}</div>
            <button className="categoria-btn">Agregar al carro</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ofertas;
