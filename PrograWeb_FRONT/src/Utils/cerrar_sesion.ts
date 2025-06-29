export const cerrarSesion = () => {
  sessionStorage.removeItem("user");
};