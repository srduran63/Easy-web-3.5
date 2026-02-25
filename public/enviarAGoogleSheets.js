
// enviarAGoogleSheets.js
async function enviarAGoogleSheets(datos) {
    try {
        console.log('📤 Enviando a Google Sheets:', datos);
        
        // Detectar entorno y usar la URL correcta
        let backendURL = '';
        if (window.location.hostname === 'localhost') {
            backendURL = 'http://localhost:3001/api/guardar-sheets';
        } else {
            backendURL = window.location.origin + '/api/guardar-sheets';
        }
        
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