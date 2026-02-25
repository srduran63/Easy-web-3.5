

// backend.js - Versión final con todas las mejoras
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Validar configuración
const GOOGLE_SHEETS_WEBAPP_URL = process.env.GOOGLE_SHEETS_WEBAPP_URL;
if (!GOOGLE_SHEETS_WEBAPP_URL) {
    console.error('❌ ERROR CRÍTICO: No se encontró GOOGLE_SHEETS_WEBAPP_URL en .env');
    console.error('📝 Crea un archivo .env con: GOOGLE_SHEETS_WEBAPP_URL=tu_url_de_google_sheets');
    process.exit(1);
}

console.log('✅ Configuración cargada correctamente');
console.log('📊 Google Sheets URL:', GOOGLE_SHEETS_WEBAPP_URL);

// Endpoint para guardar en Google Sheets
app.post('/api/guardar-sheets', async (req, res) => {
    try {
        console.log('📥 Recibida solicitud para guardar en Sheets:', req.body);

        // Validar datos mínimos
        const { nombreComercial, nombreRepresentante, celularRepresentante } = req.body;
        if (!nombreComercial || !nombreRepresentante || !celularRepresentante) {
            return res.status(400).json({
                success: false,
                error: 'Faltan campos obligatorios'
            });
        }

        // Enviar a Google Sheets
        const response = await axios.post(GOOGLE_SHEETS_WEBAPP_URL, req.body, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000 // 10 segundos máximo
        });

        console.log('✅ Google Sheets respondió:', response.data);

        res.json({
            success: true,
            message: 'Datos guardados correctamente',
            data: response.data
        });

    } catch (error) {
        console.error('❌ Error al enviar a Google Sheets:', error.message);
        
        // Si hay respuesta de Google Sheets, mostrarla
        if (error.response) {
            console.error('Respuesta de Google Sheets:', error.response.data);
        }

        res.status(500).json({
            success: false,
            error: 'Error al guardar en Google Sheets'
        });
    }
});

// Endpoint de prueba
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servidor funcionando',
        googleSheetsUrl: GOOGLE_SHEETS_WEBAPP_URL ? 'Configurada' : 'No configurada'
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor backend iniciado!`);
    console.log(`📡 Puerto: ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📝 Endpoint Sheets: http://localhost:${PORT}/api/guardar-sheets`);
    console.log(`\n✨ Listo para recibir datos del formulario\n`);
});