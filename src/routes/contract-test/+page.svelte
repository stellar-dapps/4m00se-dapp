<script lang="ts">
  import { onMount } from 'svelte';
  import helloWorld from '../../contracts/hello_world.ts';

  let greeting = '';

  onMount(async () => {
    try {
      const { result } = await helloWorld.hello({ to: '4m00se' });
      greeting = result.join(' ');
    } catch (error) {
      console.error('Error fetching greeting:', error);
    }
  });
</script>

<h1>{greeting}</h1>
