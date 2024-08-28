# Widget SDK reference

Typically, the form widget code snippet for a form you had built will look like the following:

```html
<!-- Add link to the script to you page’s head part -->
<script src="https://4m.lol/widget/4m00s.js"></script>
…
<!-- Add a container element with the specific ID, and an init script inside you page’s body part -->
<div id="4m00se-widget-container"></div>
…
<script>
  formWidgetSDK.initFormWidget({
    configUrl:
      'https://coffee-deliberate-beetle-660.mypinata.cloud/ipfs/bafkreie3zyljomhehxhf4on4ns2bxpieyq3mlctfaovwg7tkpjhbwpycn4'
  });
</script>
```

where the `configUrl` represents the unique identifier used by the **4m00se** script to compile the form on your website.
