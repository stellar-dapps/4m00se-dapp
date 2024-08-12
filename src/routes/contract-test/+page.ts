import type { PageLoad } from './$types.js';
import helloWorld from '../../contracts/hello_world.ts';

export const load: PageLoad = async () => {
  try {
    const { result } = await helloWorld.hello({ to: '4m00se' });
    const greeting = result.join(' ');
    return { greeting };
  } catch (error) {
    console.error('Error fetching greeting:', error);
    return { greeting: 'Error fetching greeting' };
  }
};
