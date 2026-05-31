<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { user = null }: { user?: { username: string; role: string } | null } = $props();

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	onMount(() => {
		const handler = () => (scrolled = window.scrollY > 50);
		window.addEventListener('scroll', handler, { passive: true });
		return () => window.removeEventListener('scroll', handler);
	});

	$effect(() => {
		$page.url.pathname;
		mobileOpen = false;
	});
</script>

<nav class="navbar" class:scrolled>
	<a href="/" class="logo">
		<div class="logo-mark">A</div>
		<span class="logo-text">Arunika</span>
	</a>

	<div class="nav-links">
		<a href="/#tentang" class="nav-link">Tentang</a>
		<a href="/#keunggulan" class="nav-link">Keunggulan</a>
		<a href="/#juri" class="nav-link">Dewan Juri</a>
	</div>

	<div class="nav-actions">
		{#if user}
			<a href={user.role === 'admin' ? '/admin' : '/dashboard'} class="btn btn-md btn-ghost">
				Dashboard
			</a>
		{:else}
			<a href="/login" class="btn btn-md btn-ghost">Masuk</a>
			<a href="/register" class="btn btn-md btn-primary">Daftar</a>
		{/if}
	</div>

	<button
		class="mobile-toggle"
		onclick={() => (mobileOpen = !mobileOpen)}
		aria-label="Toggle menu"
	>
		<span class="bar" class:open={mobileOpen}></span>
		<span class="bar" class:open={mobileOpen}></span>
		<span class="bar" class:open={mobileOpen}></span>
	</button>
</nav>

{#if mobileOpen}
	<div class="mobile-menu">
		<a href="/#tentang" class="mobile-link">Tentang</a>
		<a href="/#keunggulan" class="mobile-link">Keunggulan</a>
		<a href="/#juri" class="mobile-link">Dewan Juri</a>
		<div class="mobile-divider"></div>
		{#if user}
			<a href={user.role === 'admin' ? '/admin' : '/dashboard'} class="mobile-link">Dashboard</a>
		{:else}
			<a href="/login" class="mobile-link">Masuk</a>
			<a href="/register" class="mobile-cta btn btn-md btn-primary">Daftar Sekarang</a>
		{/if}
	</div>
{/if}

<!-- Spacer -->
<div style="height: 88px;"></div>

<style>
	.navbar {
		position: fixed;
		top: 16px;
		left: 50%;
		transform: translateX(-50%);
		width: calc(100% - 48px);
		max-width: 1200px;
		z-index: 9999;

		background: rgba(255, 255, 255, 0.72);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);

		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.6);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(0, 0, 0, 0.08);

		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		height: 56px;

		transition: background 0.3s ease, box-shadow 0.3s ease;
	}

	.navbar.scrolled {
		background: rgba(255, 255, 255, 0.92);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.10), 0 0 0 0.5px rgba(0, 0, 0, 0.08);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		flex-shrink: 0;
	}
	.logo-mark {
		width: 32px;
		height: 32px;
		background: var(--color-primary);
		color: white;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 18px;
		line-height: 1;
	}
	.logo-text {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--text-lg);
		color: var(--color-black);
		letter-spacing: -0.01em;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.nav-link {
		padding: 6px 12px;
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-gray-700);
		text-decoration: none;
		transition: color 0.15s, background 0.15s;
	}
	.nav-link:hover {
		color: var(--color-black);
		background: var(--color-gray-100);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.mobile-toggle {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
	}
	.bar {
		width: 22px;
		height: 2px;
		background: var(--color-gray-900);
		border-radius: 2px;
		transition: transform 0.25s ease, opacity 0.25s ease;
	}

	.mobile-menu {
		position: fixed;
		top: 84px;
		left: 50%;
		transform: translateX(-50%);
		width: calc(100% - 48px);
		max-width: 1200px;
		z-index: 9998;
		background: rgba(255, 255, 255, 0.96);
		backdrop-filter: blur(20px);
		border-radius: 14px;
		border: 1px solid rgba(0,0,0,0.08);
		box-shadow: var(--shadow-lg);
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		animation: slideDown 0.2s var(--ease-out);
	}
	.mobile-link {
		padding: 10px 14px;
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		font-weight: 500;
		color: var(--color-gray-700);
		text-decoration: none;
		transition: background 0.15s;
	}
	.mobile-link:hover { background: var(--color-gray-100); }
	.mobile-divider {
		height: 1px;
		background: var(--color-gray-200);
		margin: 6px 0;
	}
	.mobile-cta {
		margin-top: 4px;
		width: 100%;
		justify-content: center;
	}

	@keyframes slideDown {
		from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
		to   { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	@media (max-width: 767px) {
		.nav-links, .nav-actions { display: none; }
		.mobile-toggle { display: flex; }
	}
</style>
