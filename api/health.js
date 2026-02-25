export default function handler(req, res) {
  res.status(200).json({ status: 'OK', message: 'Servidor funcionando', googleSheetsUrl: process.env.GOOGLE_SHEETS_WEBAPP_URL ? 'Configurada' : 'No configurada' });
}
