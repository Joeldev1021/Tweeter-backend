import { config as dotenvConfig } from 'dotenv';
import { startApp } from './app';


dotenvConfig();

const PORT = process.env.PORT || 3000
const app = startApp();
app.listen(PORT, () => console.log('server listening in port 🔥 ', PORT))