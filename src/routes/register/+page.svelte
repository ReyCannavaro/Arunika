<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loading = $state(false);
	let showPass = $state(false);
</script>

<svelte:head>
	<title>Daftar Akun — LKBB Arunika</title>
</svelte:head>

<div class="auth-page">
	<div class="auth-panel">
		<div class="panel-inner">
			<div class="panel-logo">
				<div class="logo-mark-lg">A</div>
				<span class="logo-name">Arunika</span>
			</div>

			<div class="panel-body">
				<h2 class="panel-title heading-display">
					Mulai<br />Perjalananmu
				</h2>
				<p class="panel-desc">
					Buat akun gratis dan daftarkan tim sekolahmu
					untuk berkompetisi di LKBB Arunika.
				</p>

				<div class="panel-steps">
					{#each [
						{ num: '01', text: 'Buat akun dengan email' },
						{ num: '02', text: 'Isi data tim dan personil' },
						{ num: '03', text: 'Upload bukti pembayaran' },
					] as step}
						<div class="step-item">
							<span class="step-num">{step.num}</span>
							<span class="step-text">{step.text}</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="panel-quote">
				<p class="quote-text">"Satu tim, satu semangat, satu tujuan."</p>
			</div>
		</div>
	</div>

	<div class="auth-form-wrap">
		<div class="auth-form-inner">
			<div class="auth-header">
				<h1 class="auth-title">Buat Akun Baru</h1>
				<p class="auth-subtitle">
					Sudah punya akun?
					<a href="/login" class="auth-link">Masuk di sini</a>
				</p>
			</div>

			{#if form?.errors?.email}
				<div class="alert-error">
					<span>⚠️</span>
					{form.errors.email[0]}
				</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
				class="auth-form"
			>
				<div class="form-group">
					<label class="form-label" for="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						class="input"
						class:error={form?.errors?.email}
						placeholder="nama@sekolah.com"
						autocomplete="email"
						required
					/>
					{#if form?.errors?.email}
						<span class="field-error">{form.errors.email[0]}</span>
					{/if}
				</div>

				<div class="form-group">
					<label class="form-label" for="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						class="input"
						class:error={form?.errors?.username}
						placeholder="username_tim"
						autocomplete="username"
						required
					/>
					{#if form?.errors?.username}
						<span class="field-error">{form.errors.username[0]}</span>
					{/if}
					<span class="field-hint">Minimal 3 karakter, maksimal 30 karakter</span>
				</div>

				<div class="form-group">
					<label class="form-label" for="password">Password</label>
					<div class="input-wrap">
						<input
							id="password"
							name="password"
							type={showPass ? 'text' : 'password'}
							class="input"
							class:error={form?.errors?.password}
							placeholder="Minimal 8 karakter"
							autocomplete="new-password"
							required
						/>
						<button
							type="button"
							class="input-toggle"
							onclick={() => (showPass = !showPass)}
							aria-label="Toggle password visibility"
						>
							{showPass ? '🙈' : '👁️'}
						</button>
					</div>
					{#if form?.errors?.password}
						<span class="field-error">{form.errors.password[0]}</span>
					{/if}
				</div>

				<div class="terms-note">
					Dengan mendaftar, kamu menyetujui penggunaan data untuk keperluan
					administrasi LKBB Arunika.
				</div>

				<button type="submit" class="btn btn-lg btn-primary submit-btn" disabled={loading}>
					{#if loading}
						<span class="spinner"></span> Membuat Akun...
					{:else}
						Buat Akun →
					{/if}
				</button>
			</form>

			<div class="auth-divider"><span>atau</span></div>

			<a href="/login" class="btn btn-lg btn-secondary" style="width:100%;justify-content:center;">
				Masuk ke Akun Existing
			</a>
		</div>
	</div>
</div>

<style>
	.auth-page {
		min-height: 100vh;
		display: grid;
		grid-template-columns: 1fr;
	}
	@media (min-width: 1024px) {
		.auth-page { grid-template-columns: 480px 1fr; }
	}

	.auth-panel {
		background: var(--color-black);
		display: none;
		position: relative;
		overflow: hidden;
	}
	@media (min-width: 1024px) { .auth-panel { display: flex; } }
	.auth-panel::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 80% 20%, rgba(204,31,31,0.18) 0%, transparent 60%),
		            radial-gradient(ellipse at 20% 80%, rgba(22,163,74,0.08) 0%, transparent 50%);
	}
	.panel-inner {
		position: relative;
		z-index: 1;
		padding: 48px;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.panel-logo { display: flex; align-items: center; gap: 12px; margin-bottom: auto; }
	.logo-mark-lg {
		width: 40px; height: 40px;
		background: var(--color-primary);
		color: white;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 22px;
	}
	.logo-name { font-weight: 700; font-size: var(--text-xl); color: white; }
	.panel-body { margin: auto 0; }
	.panel-title {
		font-size: clamp(2rem, 4vw, 3rem);
		color: white;
		margin-bottom: 16px;
		line-height: 1.15;
	}
	.panel-desc {
		font-size: var(--text-lg);
		color: rgba(255,255,255,0.55);
		line-height: 1.7;
		margin-bottom: 32px;
	}
	.panel-steps { display: flex; flex-direction: column; gap: 16px; }
	.step-item { display: flex; align-items: center; gap: 14px; }
	.step-num {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-primary);
		background: rgba(204,31,31,0.15);
		border: 1px solid rgba(204,31,31,0.25);
		border-radius: var(--radius-sm);
		padding: 2px 8px;
		flex-shrink: 0;
	}
	.step-text { font-size: var(--text-base); color: rgba(255,255,255,0.65); }
	.panel-quote {
		border-top: 1px solid rgba(255,255,255,0.1);
		padding-top: 24px;
		margin-top: auto;
	}
	.quote-text { font-style: italic; color: rgba(255,255,255,0.4); font-size: var(--text-sm); line-height: 1.6; }

	.auth-form-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 48px 24px;
		background: var(--color-white);
	}
	.auth-form-inner { width: 100%; max-width: 420px; }
	.auth-header { margin-bottom: 32px; }
	.auth-title {
		font-size: var(--text-3xl);
		font-weight: 700;
		color: var(--color-black);
		letter-spacing: -0.02em;
		margin-bottom: 8px;
	}
	.auth-subtitle { font-size: var(--text-base); color: var(--color-gray-500); }
	.auth-link { color: var(--color-primary); font-weight: 600; text-decoration: none; }
	.auth-link:hover { text-decoration: underline; }

	.alert-error {
		background: var(--color-primary-light);
		border: 1px solid var(--color-primary-muted);
		color: var(--color-primary);
		padding: 12px 16px;
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 20px;
	}

	.auth-form { display: flex; flex-direction: column; gap: 20px; margin-bottom: 20px; }
	.form-group { display: flex; flex-direction: column; }
	.input-wrap { position: relative; }
	.input-wrap .input { padding-right: 44px; }
	.input-toggle {
		position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
		background: none; border: none; cursor: pointer; font-size: 16px;
		color: var(--color-gray-500); line-height: 1;
	}
	.field-error {
		margin-top: 6px;
		font-size: var(--text-xs);
		color: var(--color-primary);
	}
	.field-hint {
		margin-top: 5px;
		font-size: var(--text-xs);
		color: var(--color-gray-500);
	}
	.terms-note {
		font-size: var(--text-xs);
		color: var(--color-gray-500);
		line-height: 1.6;
		padding: 12px;
		background: var(--color-gray-50);
		border-radius: var(--radius-md);
	}

	.submit-btn { width: 100%; justify-content: center; margin-top: 4px; }
	.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

	.spinner {
		width: 16px; height: 16px;
		border: 2px solid rgba(255,255,255,0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
		display: inline-block;
	}
	@keyframes spin { to { transform: rotate(360deg); } }

	.auth-divider {
		text-align: center; position: relative;
		margin: 20px 0; color: var(--color-gray-300); font-size: var(--text-sm);
	}
	.auth-divider::before, .auth-divider::after {
		content: ''; position: absolute; top: 50%;
		width: calc(50% - 24px); height: 1px; background: var(--color-gray-200);
	}
	.auth-divider::before { left: 0; }
	.auth-divider::after  { right: 0; }
</style>
