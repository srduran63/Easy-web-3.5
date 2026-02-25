
// enviarAGoogleSheets.js
async function enviarAGoogleSheets(datos) {
    try {
        console.log('📤 Enviando a Google Sheets:', datos);
        
        // Usar localhost para desarrollo
        // Si subes a producción, cambia esta URL
        const backendURL = 'http://localhost:3001/api/guardar-sheets';
        
        const response = await fetch(backendURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        const resultado = await response.json();
        
        if (resultado.success) {
            console.log('✅ Guardado exitoso:', resultado);
            return true;
        } else {
            console.error('❌ Error:', resultado.error);
            return false;
        }
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        return false;
    }
}