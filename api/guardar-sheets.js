const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método no permitido' });
  }

  const GOOGLE_SHEETS_WEBAPP_URL = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!GOOGLE_SHEETS_WEBAPP_URL) {
    return res.status(500).json({ success: false, error: 'No se configuró GOOGLE_SHEETS_WEBAPP_URL' });
  }

  const { nombreComercial, nombreRepresentante, celularRepresentante } = req.body;
  if (!nombreComercial || !nombreRepresentante || !celularRepresentante) {
    return res.status(400).json({ success: false, error: 'Faltan campos obligatorios' });
  }

  try {
    const response = await axios.post(GOOGLE_SHEETS_WEBAPP_URL, req.body, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000
    });
    return res.status(200).json({ success: true, message: 'Datos guardados correctamente', data: response.data });
  } catch (error) {
    // Log detallado
    console.error('❌ Error al guardar en Google Sheets:', error.message);
    if (error.response) {
      console.error('Respuesta de Google Sheets:', error.response.data);
      return res.status(500).json({
        success: false,
        error: 'Error al guardar en Google Sheets',
        details: error.response.data
      });
    }
    return res.status(500).json({ success: false, error: error.message });
  }
}
