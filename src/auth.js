export function isAuthenticated() {
    const token = localStorage.getItem('token');
    // Você pode adicionar mais lógica para verificar a validade do token, se necessário
    return !!token; // Retorna true se o token existir
}