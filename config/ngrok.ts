import ngrok from '@ngrok/ngrok';
import dotenv from 'dotenv';

export async function startNgrok() {
    dotenv.config();
    try {
        const authtoken = process.env.NGROK_AUTH_TOKEN;
        await ngrok.authtoken(authtoken!);

        const url = await ngrok.connect(3000);
        console.log(`ngrok tunnel established at: ${url.url()}`);
    } catch (error) {
        console.error('Error establishing ngrok tunnel:', error);
    }
}