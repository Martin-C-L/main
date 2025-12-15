const API_URL = "http://localhost:8080/api/productos";

class ProductService {
  
  async getAllProductos() {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al cargar los productos");
    }
    return await response.json();
  }
}

export default new ProductService();