<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();

	let countdown = $state({ days: 0, hours: 0, minutes: 0, seconds: 0 });
	let targetDate = $state(new Date('2026-08-15T23:59:59'));

	onMount(() => {
		const tick = () => {
			const now = new Date();
			const diff = targetDate.getTime() - now.getTime();
			if (diff <= 0) {
				countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
				return;
			}
			countdown = {
				days:    Math.floor(diff / 86400000),
				hours:   Math.floor((diff % 86400000) / 3600000),
				minutes: Math.floor((diff % 3600000) / 60000),
				seconds: Math.floor((diff % 60000) / 1000),
			};
		};
		tick();
		const interval = setInterval(tick, 1000);
		return () => clearInterval(interval);
	});

	const keunggulan = [
		{
			icon: '⚡',
			color: 'blue',
			title: 'Pendaftaran Instan',
			desc: 'Daftar tim dalam hitungan menit. Tidak ada antrian, tidak ada formulir kertas — semua online dari mana saja.',
		},
		{
			icon: '🛡️',
			color: 'green',
			title: 'Terverifikasi & Aman',
			desc: 'Setiap tim diverifikasi langsung oleh panitia. Status pendaftaran dan pembayaran bisa dipantau real-time.',
		},
		{
			icon: '📊',
			color: 'orange',
			title: 'Manajemen Terpusat',
			desc: 'Admin mengelola seluruh pendaftaran, verifikasi, dan data peserta dalam satu dashboard yang efisien.',
		},
	];

	const juri = [
		{ nama: 'Letkol Inf. Ahmad Fauzi', jabatan: 'Ketua Dewan Juri', initials: 'AF' },
		{ nama: 'Mayor Inf. Siti Rahayu', jabatan: 'Juri Teknis', initials: 'SR' },
		{ nama: 'Kapten Inf. Budi Santoso', jabatan: 'Juri Kreativitas', initials: 'BS' },
	];

	const stats = [
		{ value: '200+', label: 'Tim Peserta' },
		{ value: '50+', label: 'Sekolah' },
		{ value: '3', label: 'Kategori' },
		{ value: '2026', label: 'Tahun Ini' },
	];

</script>

<svelte:head>
	<title>LKBB Arunika — Lomba Keterampilan Baris-Berbaris</title>
	<meta name="description" content="Platform resmi pendaftaran Lomba Keterampilan Baris-Berbaris Arunika. Daftarkan tim Anda sekarang." />
</svelte:head>

<section class="hero">
	<div class="hero-overlay"></div>
	<div class="hero-bg-pattern"></div>

	<div class="container-arunika hero-content">
		<div class="hero-badge">
			<span class="badge badge-red">Pendaftaran Dibuka</span>
		</div>

		<h1 class="hero-title heading-display">
			Buktikan Kualitas<br />
			<em>Pasukanmu</em>
		</h1>

		<p class="hero-desc">
			LKBB Arunika adalah ajang bergengsi Lomba Keterampilan Baris-Berbaris
			antar pelajar. Daftarkan timmu, tunjukkan kedisiplinan, dan raih juara.
		</p>

		<div class="hero-cta">
			{#if data?.user}
				<a href="/dashboard" class="btn btn-lg btn-primary">Lihat Dashboard</a>
			{:else}
				<a href="/register" class="btn btn-lg btn-primary">Daftar Sekarang</a>
				<a href="#tentang" class="btn btn-lg btn-outline-white">Pelajari Lebih</a>
			{/if}
		</div>

		<div class="countdown-wrap">
			<p class="countdown-label">Penutupan pendaftaran dalam</p>
			<div class="countdown">
				{#each [
					{ val: countdown.days,    label: 'Hari' },
					{ val: countdown.hours,   label: 'Jam' },
					{ val: countdown.minutes, label: 'Menit' },
					{ val: countdown.seconds, label: 'Detik' },
				] as item}
					<div class="countdown-item">
						<span class="countdown-val">{String(item.val).padStart(2, '0')}</span>
						<span class="countdown-unit">{item.label}</span>
					</div>
					{#if item.label !== 'Detik'}
						<span class="countdown-sep">:</span>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<div class="stats-bar">
		<div class="container-arunika stats-inner">
			{#each stats as stat}
				<div class="stat-item">
					<span class="stat-value">{stat.value}</span>
					<span class="stat-label">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="keunggulan" class="section-pad" style="background: var(--color-gray-50);">
	<div class="container-arunika">
		<div class="section-header">
			<p class="section-eyebrow">Mengapa Arunika?</p>
			<h2 class="section-title heading-section">
				Platform yang Dirancang<br />untuk Peserta & Panitia
			</h2>
			<p class="section-desc">
				Kami menggantikan proses manual dengan sistem digital yang efisien,
				transparan, dan mudah digunakan oleh semua pihak.
			</p>
		</div>

		<div class="keunggulan-grid">
			{#each keunggulan as item, i}
				<div class="card keunggulan-card" style="animation-delay: {i * 80}ms">
					<div class="keunggulan-icon badge-{item.color}">{item.icon}</div>
					<h3 class="keunggulan-title">{item.title}</h3>
					<p class="keunggulan-desc">{item.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="tentang" class="section-pad" style="background: var(--color-white);">
	<div class="container-arunika">
		<div class="tentang-grid">
			<div class="tentang-visual">
				<div class="tentang-img-wrap">
					<div class="tentang-img-placeholder">
						<span class="tentang-img-icon">🎖️</span>
					</div>
					<div class="tentang-badge-float badge badge-gold">
						Est. 2025
					</div>
				</div>
			</div>

			<div class="tentang-content">
				<p class="section-eyebrow">Tentang Kami</p>
				<h2 class="section-title heading-section">
					Tradisi Disiplin,<br />Spirit Juara
				</h2>
				<p class="tentang-text">
					LKBB Arunika lahir dari semangat untuk mengangkat budaya baris-berbaris
					sebagai pembentuk karakter pelajar Indonesia. Sejak 2020, kami telah
					mempertemukan ratusan tim terbaik dari berbagai sekolah.
				</p>
				<p class="tentang-text">
					Platform ini hadir sebagai wujud komitmen kami terhadap transparansi
					dan kemudahan — karena proses yang baik mencerminkan nilai lomba itu sendiri.
				</p>
				<div class="tentang-highlights">
					<div class="highlight-item">
						<span class="highlight-icon badge-green">✓</span>
						<span>Verifikasi pembayaran transparan</span>
					</div>
					<div class="highlight-item">
						<span class="highlight-icon badge-blue">✓</span>
						<span>Data peserta terkelola dengan baik</span>
					</div>
					<div class="highlight-item">
						<span class="highlight-icon badge-orange">✓</span>
						<span>Update status pendaftaran real-time</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="juri" class="section-pad" style="background: var(--color-gray-50);">
	<div class="container-arunika">
		<div class="section-header">
			<p class="section-eyebrow">Dewan Juri</p>
			<h2 class="section-title heading-section">Dinilai oleh Para Ahli</h2>
			<p class="section-desc">
				Tim juri berpengalaman dari kalangan militer dan akademisi
				yang kompeten di bidang baris-berbaris.
			</p>
		</div>

		<div class="juri-grid">
			{#each juri as j, i}
				<div class="card juri-card" style="animation-delay: {i * 100}ms">
					<div class="juri-avatar">
						<span>{j.initials}</span>
					</div>
					<h3 class="juri-nama">{j.nama}</h3>
					<p class="juri-jabatan">
						<span class="badge badge-purple">{j.jabatan}</span>
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="cta-section">
	<div class="container-arunika cta-content">
		<h2 class="cta-title heading-display">Siap Bergabung?</h2>
		<p class="cta-desc">
			Jangan lewatkan kesempatan membawa nama sekolahmu ke podium juara.
			Daftarkan tim sekarang sebelum pendaftaran ditutup.
		</p>
		<div class="cta-actions">
			{#if data?.user}
				<a href="/dashboard" class="btn btn-lg btn-primary">Lihat Dashboard →</a>
			{:else}
				<a href="/register" class="btn btn-lg btn-primary">Daftar Tim Sekarang →</a>
				<a href="/login" class="btn btn-lg btn-secondary">Sudah Punya Akun</a>
			{/if}
		</div>
	</div>
</section>

<footer class="footer">
	<div class="container-arunika footer-inner">
		<div class="footer-brand">
			<div class="footer-logo">
				<div class="logo-mark" style="width:28px;height:28px;font-size:15px;">A</div>
				<span style="font-weight:700;font-size:var(--text-lg);color:var(--color-black);">Arunika</span>
			</div>
			<p class="footer-tagline">Platform resmi LKBB Arunika</p>
		</div>
		<p class="footer-copy">© 2026 LKBB Arunika. All rights reserved.</p>
	</div>
</footer>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		background: linear-gradient(135deg, #0f0f0f 0%, #1a0505 50%, #0f0f0f 100%);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.hero-overlay {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 30% 50%, rgba(204,31,31,0.15) 0%, transparent 60%),
		            radial-gradient(ellipse at 70% 20%, rgba(212,160,23,0.08) 0%, transparent 50%);
		pointer-events: none;
	}
	.hero-bg-pattern {
		position: absolute;
		inset: 0;
		background-image: repeating-linear-gradient(
			0deg, transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 61px
		), repeating-linear-gradient(
			90deg, transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 61px
		);
		pointer-events: none;
	}
	.hero-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 80px;
		padding-bottom: 48px;
		position: relative;
		z-index: 1;
	}
	.hero-badge { margin-bottom: 24px; }
	.hero-title {
		font-size: clamp(2.5rem, 7vw, 4.5rem);
		color: white;
		margin-bottom: 20px;
		max-width: 700px;
	}
	.hero-title em {
		font-style: italic;
		color: var(--color-primary);
	}
	.hero-desc {
		font-size: var(--text-lg);
		color: rgba(255,255,255,0.72);
		max-width: 560px;
		line-height: 1.7;
		margin-bottom: 36px;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-bottom: 48px;
	}

	.countdown-wrap {
		display: inline-flex;
		flex-direction: column;
		gap: 10px;
	}
	.countdown-label {
		font-size: var(--text-sm);
		color: rgba(255,255,255,0.5);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	.countdown {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.countdown-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgba(255,255,255,0.08);
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: var(--radius-md);
		padding: 10px 16px;
		min-width: 64px;
	}
	.countdown-val {
		font-family: var(--font-mono);
		font-size: var(--text-2xl);
		font-weight: 600;
		color: white;
		line-height: 1;
	}
	.countdown-unit {
		font-size: var(--text-xs);
		color: rgba(255,255,255,0.45);
		margin-top: 4px;
	}
	.countdown-sep {
		font-size: var(--text-2xl);
		color: rgba(255,255,255,0.3);
		font-weight: 300;
		margin-bottom: 12px;
	}

	.stats-bar {
		position: relative;
		z-index: 1;
		border-top: 1px solid rgba(255,255,255,0.08);
		background: rgba(255,255,255,0.04);
		backdrop-filter: blur(10px);
	}
	.stats-inner {
		display: flex;
		justify-content: space-around;
		padding: 24px 0;
	}
	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}
	.stat-value {
		font-size: var(--text-3xl);
		font-weight: 700;
		color: white;
		letter-spacing: -0.02em;
		line-height: 1;
	}
	.stat-label {
		font-size: var(--text-xs);
		color: rgba(255,255,255,0.45);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.section-header {
		text-align: center;
		margin-bottom: 48px;
	}
	.section-eyebrow {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 12px;
	}
	.section-title {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		color: var(--color-black);
		margin-bottom: 16px;
	}
	.section-desc {
		font-size: var(--text-lg);
		color: var(--color-gray-500);
		max-width: 560px;
		margin: 0 auto;
		line-height: 1.7;
	}

	.keunggulan-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
	}
	@media (min-width: 768px) {
		.keunggulan-grid { grid-template-columns: repeat(3, 1fr); }
	}
	.keunggulan-card { text-align: center; }
	.keunggulan-icon {
		width: 56px;
		height: 56px;
		border-radius: var(--radius-lg);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 26px;
		margin-bottom: 16px;
	}
	.badge-blue  { background: var(--color-accent-blue-light);   color: var(--color-accent-blue); }
	.badge-green { background: var(--color-accent-green-light);  color: var(--color-accent-green); }
	.badge-orange{ background: var(--color-accent-orange-light); color: var(--color-accent-orange); }
	.keunggulan-title {
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-black);
		margin-bottom: 10px;
	}
	.keunggulan-desc {
		font-size: var(--text-base);
		color: var(--color-gray-500);
		line-height: 1.7;
	}

	.tentang-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
		align-items: center;
	}
	@media (min-width: 1024px) {
		.tentang-grid { grid-template-columns: 1fr 1fr; }
	}
	.tentang-visual { display: flex; justify-content: center; }
	.tentang-img-wrap { position: relative; display: inline-block; }
	.tentang-img-placeholder {
		width: 360px;
		height: 400px;
		max-width: 100%;
		background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-50) 100%);
		border-radius: var(--radius-xl);
		border: 1px solid var(--color-gray-200);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 80px;
	}
	.tentang-badge-float {
		position: absolute;
		bottom: -12px;
		right: -12px;
		font-size: var(--text-sm) !important;
		padding: 8px 16px !important;
		box-shadow: var(--shadow-md);
	}
	.tentang-text {
		color: var(--color-gray-700);
		line-height: 1.75;
		margin-bottom: 16px;
	}
	.tentang-highlights { margin-top: 24px; display: flex; flex-direction: column; gap: 12px; }
	.highlight-item {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: var(--text-base);
		color: var(--color-gray-700);
	}
	.highlight-icon {
		width: 24px;
		height: 24px;
		border-radius: var(--radius-full);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
		flex-shrink: 0;
	}

	.juri-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
	}
	@media (min-width: 640px) { .juri-grid { grid-template-columns: repeat(3, 1fr); } }
	.juri-card { text-align: center; }
	.juri-avatar {
		width: 80px;
		height: 80px;
		border-radius: var(--radius-full);
		background: var(--color-gray-100);
		border: 3px solid var(--color-gray-200);
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 16px;
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-gray-500);
		font-family: var(--font-display);
	}
	.juri-nama {
		font-size: var(--text-base);
		font-weight: 700;
		color: var(--color-black);
		margin-bottom: 8px;
	}

	.cta-section {
		background: var(--color-black);
		padding: 80px 0;
	}
	.cta-content { text-align: center; }
	.cta-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		color: white;
		margin-bottom: 16px;
	}
	.cta-desc {
		font-size: var(--text-lg);
		color: rgba(255,255,255,0.6);
		max-width: 520px;
		margin: 0 auto 36px;
		line-height: 1.7;
	}
	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: center;
	}

	.footer {
		background: var(--color-white);
		border-top: 1px solid var(--color-gray-200);
		padding: 32px 0;
	}
	.footer-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}
	.footer-brand { display: flex; flex-direction: column; gap: 4px; }
	.footer-logo  { display: flex; align-items: center; gap: 8px; }
	.logo-mark {
		width: 32px; height: 32px;
		background: var(--color-primary);
		color: white;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 18px;
	}
	.footer-tagline { font-size: var(--text-sm); color: var(--color-gray-500); }
	.footer-copy    { font-size: var(--text-sm); color: var(--color-gray-500); }
</style>
