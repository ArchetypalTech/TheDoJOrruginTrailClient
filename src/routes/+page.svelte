<script>
	import { onMount } from "svelte";
	import Terminal from "../components/Terminal.svelte";
	import { setupThree } from "../three";
	import Wallet from "../components/Wallet.svelte";
	onMount(setupThree);
</script>

<div class="w-screen h-screen relative bg-black">
	<div
		class="absolute w-1/3 h-2/3 min-w-[350px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col"
	>
		<Wallet />
		<Terminal />
	</div>
	<div id="viewport"></div>
</div>
