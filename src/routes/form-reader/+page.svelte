<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth.store.ts';
  import type { FormSubmissionListPageData } from '$lib/models/page-data.model.ts';
  import { StellarConfig } from '$lib/content/mocks/stellar-config.ts';
  import { initFormWidget } from '../../widget/init-form-widget.ts';

  export let data: FormSubmissionListPageData;
  const { formSubmissions } = data;

  onMount(() => {
    let isAuthenticated;

    authStore.subscribe((value) => {
      isAuthenticated = value.isAuthenticated;
    });

    if (!isAuthenticated) {
      goto('/');
    }

    // initFormWidget({
    //   container: 'form-widget-container',
    //   config: StellarConfig,
    //   onSubmit: (data) => {
    //     console.log('Form submitted:', data);
    //     alert('Form submitted successfully!');
    //   }
    // });
  });
</script>

<svelte:head>
  <title>4m00se — Form Submission Reader</title>
</svelte:head>

<h1>Form Submission Reader</h1>

<ul>
  {#each formSubmissions as submission}
    <li><code>{JSON.stringify(submission, null, 4)}</code></li>
  {/each}
</ul>

<!--<div id="form-widget-container"></div>-->
