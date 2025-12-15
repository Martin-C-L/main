const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  
  // Función para registrar usuario
  async register(usuario) {
    const response = await fetch(API_URL + "registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || "Error en el registro");
    }
    return await response.json(); // Devuelve el mensaje de éxito
  }

  // Función para iniciar sesión
  async login(email, password) {
    const response = await fetch(API_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }
    
    const data = await response.json();
    // Guardamos el usuario en la memoria del navegador para no perder la sesión
    if (data.id) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  }

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem("user");
  }

  // Obtener usuario actual
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();