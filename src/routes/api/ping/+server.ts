import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

/**
 * This script keeps the Render instance active by periodically pinging the server.
 * It uses the native JavaScript `fetch` API to make an HTTP request to the server
 * every 5 minutes. This prevents the server from spinning down due to inactivity.
 * (tried 14, but it's not stable)
 *
 * The URL is set to a relative path (`/api/ping`), which means it pings the same
 * endpoint within the same application. This keeps the server active and responsive.
 */

const url = '/api/ping'; // Relative URL to the same endpoint
const interval = 300000; // Interval in milliseconds (5 min)

// Reloader Function
async function reloadWebsite(): Promise<void> {
  try {
    console.log(`Pinging server at ${new Date().toISOString()}`);
    const response = await fetch(url);
    if (response.ok) {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    } else {
      console.error(`Error reloading at ${new Date().toISOString()}: Status Code ${response.status}`);
    }
  } catch (error: any) {
    console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
  }
}

setInterval(reloadWebsite, interval);

export const GET: RequestHandler = async () => {
  try {
    console.log(`GET request received at ${new Date().toISOString()}`);
    return json({ message: 'Ping successful' });
  } catch (error: any) {
    console.error(`Error handling GET request at ${new Date().toISOString()}:`, error.message);
    return json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
