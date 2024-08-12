<script lang="ts">
  import { onMount } from 'svelte';
  import helloWorld from '../../contracts/hello_world.ts';
  import Counter from '$lib/components/Counter.svelte';

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

<svelte:head>
  <title>4m00se — Temporary contract tester page</title>
</svelte:head>

<h1>{greeting}</h1>

<section>
  <Counter />
</section>
