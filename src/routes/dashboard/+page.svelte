<script lang="ts">
	let { data } = $props();

	const { user, tim, anggota, activeEvent } = data;
	const pelatih  = anggota.filter((a) => a.jenisPersonil === 'pelatih');
	const official = anggota.filter((a) => a.jenisPersonil === 'official');
	const danton   = anggota.filter((a) => a.jenisPersonil === 'danton');
	const pasukan  = anggota.filter((a) => a.jenisPersonil === 'pasukan');

	const statusConfig = {
		pending: {
			label: 'Menunggu Verifikasi',
			badge: 'badge-orange',
			icon: '⏳',
			desc: 'Pembayaran sedang diperiksa oleh panitia. Harap tunggu konfirmasi.',
		},
		terverifikasi: {
			label: 'Terverifikasi',
			badge: 'badge-green',
			icon: '✅',
			desc: 'Pembayaran telah dikonfirmasi. Tim kamu resmi terdaftar!',
		},
		ditolak: {
			label: 'Ditolak',
			badge: 'badge-red',
			icon: '❌',
			desc: 'Pembayaran ditolak. Lihat catatan admin di bawah.',
		},
	} as const;

	const status = tim ? statusConfig[tim.statusPembayaran] : null;

	function formatDate(date: Date | string) {
		return new Date(date).toLocaleDateString('id-ID', {
			day: 'numeric', month: 'long', year: 'numeric',
		});
	}
</script>

<svelte:head>
	<title>Dashboard — LKBB Arunika</title>
</svelte:head>

<div class="dashboard-page">
	<div class="container-arunika dashboard-inner">
		<div class="dash-header">
			<div>
				<p class="dash-welcome">Halo, <strong>{user.username}</strong> 👋</p>
				<h1 class="dash-title heading-section">Dashboard Peserta</h1>
			</div>
			<div class="dash-header-actions">
				<form method="POST" action="/logout">
					<button type="submit" class="btn btn-md btn-secondary">Keluar</button>
				</form>
			</div>
		</div>

		{#if !tim}
			<div class="empty-state">
				<div class="empty-icon">🏆</div>
				<h2 class="empty-title">Belum Ada Pendaftaran</h2>
				<p class="empty-desc">
					Kamu belum mendaftarkan tim untuk event apapun.
					{#if activeEvent}
						Event <strong>{activeEvent.namaEvent}</strong> sedang membuka pendaftaran!
					{/if}
				</p>
				{#if activeEvent}
					<a href="/daftar/{activeEvent.id}" class="btn btn-lg btn-primary">
						Daftar Sekarang →
					</a>
				{:else}
					<p class="empty-note">Belum ada event yang membuka pendaftaran saat ini.</p>
				{/if}
			</div>

		{:else}
			{#if tim.statusPembayaran === 'ditolak'}
				<div class="banner-ditolak">
					<div class="banner-icon">❌</div>
					<div class="banner-body">
						<p class="banner-title">Pembayaran Ditolak</p>
						{#if tim.catatanAdmin}
							<p class="banner-note">Catatan admin: <em>"{tim.catatanAdmin}"</em></p>
						{/if}
						<p class="banner-action-text">
							Silakan hubungi panitia atau upload ulang bukti pembayaran yang benar.
						</p>
					</div>
				</div>
			{/if}

			<div class="dash-grid">
				<div class="dash-sidebar">
					<div class="card status-card">
						<p class="card-label">Status Pembayaran</p>
						<div class="status-main">
							<span class="status-icon">{status?.icon}</span>
							<span class="badge {status?.badge} badge-lg">{status?.label}</span>
						</div>
						<p class="status-desc">{status?.desc}</p>

						{#if tim.buktiPembayaranUrl}
							<div class="bukti-wrap">
								<p class="bukti-label">Bukti Pembayaran</p>
								<a
									href={tim.buktiPembayaranUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="bukti-link"
								>
									<span>🖼️</span> Lihat Bukti Transfer
								</a>
							</div>
						{/if}
					</div>

					<div class="card">
						<p class="card-label">Informasi Tim</p>
						<div class="info-list">
							<div class="info-row">
								<span class="info-key">Event</span>
								<span class="info-val">
									{tim.namaEvent}
									<span class="badge badge-blue" style="margin-left:6px;font-size:11px;">
										{tim.tahunEvent}
									</span>
								</span>
							</div>
							<div class="info-row">
								<span class="info-key">Asal Sekolah</span>
								<span class="info-val">{tim.asalSekolah}</span>
							</div>
							<div class="info-row">
								<span class="info-key">Nama Satuan</span>
								<span class="info-val">{tim.namaSatuan}</span>
							</div>
							<div class="info-row">
								<span class="info-key">Nama Pasukan</span>
								<span class="info-val">{tim.namaPasukan}</span>
							</div>
							<div class="info-row">
								<span class="info-key">Jumlah Pasukan</span>
								<span class="info-val">
									<span class="badge badge-gray">{tim.jumlahPasukan} orang</span>
								</span>
							</div>
							<div class="info-row">
								<span class="info-key">Terdaftar</span>
								<span class="info-val">{formatDate(tim.createdAt)}</span>
							</div>
						</div>
					</div>

					<div class="card">
						<p class="card-label">Akun</p>
						<div class="info-list">
							<div class="info-row">
								<span class="info-key">Username</span>
								<span class="info-val">{user.username}</span>
							</div>
							<div class="info-row">
								<span class="info-key">Email</span>
								<span class="info-val">{user.email}</span>
							</div>
						</div>
						<a href="/profil" class="btn btn-md btn-secondary" style="margin-top:16px;width:100%;justify-content:center;">
							Edit Profil
						</a>
					</div>
				</div>

				<div class="dash-main">
					<div class="card">
						<div class="personil-header">
							<p class="card-label">Data Personil</p>
							<span class="badge badge-gray">{anggota.length} orang total</span>
						</div>

						{#if pelatih.length || official.length}
							<div class="personil-section">
								<h3 class="personil-section-title">Staff Pendamping</h3>
								<div class="personil-grid">
									{#each [...pelatih, ...official] as p}
										<div class="personil-card">
											<div class="personil-avatar">
												{#if p.fotoFormalUrl}
													<img src={p.fotoFormalUrl} alt={p.namaLengkap} />
												{:else}
													<span>{p.namaLengkap.charAt(0).toUpperCase()}</span>
												{/if}
											</div>
											<div class="personil-info">
												<p class="personil-nama">{p.namaLengkap}</p>
												<div class="personil-badges">
													<span class="badge {p.jenisPersonil === 'pelatih' ? 'badge-purple' : 'badge-blue'}">
														{p.jenisPersonil}
													</span>
													{#if p.kartuPelajarUrl}
														<span class="badge badge-green">KTP ✓</span>
													{/if}
												</div>
												{#if p.nomorTelepon}
													<p class="personil-telp">📱 {p.nomorTelepon}</p>
												{/if}
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}

						{#if danton.length}
							<div class="personil-section">
								<h3 class="personil-section-title">Komandan Pleton</h3>
								<div class="personil-grid">
									{#each danton as p}
										<div class="personil-card personil-card-highlight">
											<div class="personil-avatar">
												{#if p.fotoFormalUrl}
													<img src={p.fotoFormalUrl} alt={p.namaLengkap} />
												{:else}
													<span>{p.namaLengkap.charAt(0).toUpperCase()}</span>
												{/if}
											</div>
											<div class="personil-info">
												<p class="personil-nama">{p.namaLengkap}</p>
												<div class="personil-badges">
													<span class="badge badge-gold">Danton</span>
													{#if p.kartuPelajarUrl}
														<span class="badge badge-green">KP ✓</span>
													{/if}
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}

						{#if pasukan.length}
							<div class="personil-section">
								<h3 class="personil-section-title">
									Anggota Pasukan
									<span class="badge badge-gray" style="margin-left:8px;">{pasukan.length} orang</span>
								</h3>
								<div class="pasukan-table-wrap">
									<table class="pasukan-table">
										<thead>
											<tr>
												<th>#</th>
												<th>Nama Lengkap</th>
												<th>Foto</th>
												<th>Kartu Pelajar</th>
											</tr>
										</thead>
										<tbody>
											{#each pasukan as p, i}
												<tr>
													<td class="td-num">{i + 1}</td>
													<td class="td-nama">{p.namaLengkap}</td>
													<td>
														{#if p.fotoFormalUrl}
															<a href={p.fotoFormalUrl} target="_blank" class="doc-link">Lihat ↗</a>
														{:else}
															<span class="td-empty">—</span>
														{/if}
													</td>
													<td>
														{#if p.kartuPelajarUrl}
															<a href={p.kartuPelajarUrl} target="_blank" class="doc-link">Lihat ↗</a>
														{:else}
															<span class="td-empty">—</span>
														{/if}
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.dashboard-page {
		min-height: 100vh;
		background: var(--color-gray-50);
		padding-bottom: 64px;
	}
	.dashboard-inner {
		padding-top: 40px;
	}

	.dash-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 32px;
		flex-wrap: wrap;
	}
	.dash-welcome {
		font-size: var(--text-base);
		color: var(--color-gray-500);
		margin-bottom: 4px;
	}
	.dash-title {
		font-size: var(--text-3xl);
		color: var(--color-black);
	}

	.empty-state {
		background: var(--color-white);
		border: 1px solid var(--color-gray-200);
		border-radius: var(--radius-xl);
		padding: 64px 32px;
		text-align: center;
		box-shadow: var(--shadow-sm);
	}
	.empty-icon { font-size: 56px; margin-bottom: 20px; }
	.empty-title {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-black);
		margin-bottom: 12px;
	}
	.empty-desc {
		font-size: var(--text-lg);
		color: var(--color-gray-500);
		max-width: 480px;
		margin: 0 auto 28px;
		line-height: 1.7;
	}
	.empty-note {
		font-size: var(--text-sm);
		color: var(--color-gray-500);
		margin-top: 12px;
	}

	.banner-ditolak {
		background: var(--color-primary-light);
		border: 1px solid var(--color-primary-muted);
		border-radius: var(--radius-lg);
		padding: 20px 24px;
		display: flex;
		gap: 16px;
		align-items: flex-start;
		margin-bottom: 24px;
	}
	.banner-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
	.banner-title {
		font-weight: 700;
		color: var(--color-primary);
		margin-bottom: 4px;
	}
	.banner-note {
		font-size: var(--text-sm);
		color: var(--color-gray-700);
		margin-bottom: 6px;
	}
	.banner-action-text {
		font-size: var(--text-sm);
		color: var(--color-gray-500);
	}

	.dash-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
	}
	@media (min-width: 1024px) {
		.dash-grid { grid-template-columns: 320px 1fr; align-items: start; }
	}
	.dash-sidebar { display: flex; flex-direction: column; gap: 16px; }
	.dash-main    { display: flex; flex-direction: column; gap: 16px; }

	.card-label {
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-gray-500);
		text-transform: uppercase;
		letter-spacing: 0.07em;
		margin-bottom: 14px;
	}

	.status-card { border-top: 3px solid var(--color-primary); }
	.status-main {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 10px;
	}
	.status-icon { font-size: 28px; }
	.badge-lg { font-size: var(--text-sm) !important; padding: 5px 14px !important; }
	.status-desc {
		font-size: var(--text-sm);
		color: var(--color-gray-500);
		line-height: 1.6;
		margin-bottom: 16px;
	}
	.bukti-wrap {
		border-top: 1px solid var(--color-gray-200);
		padding-top: 14px;
	}
	.bukti-label {
		font-size: var(--text-xs);
		color: var(--color-gray-500);
		margin-bottom: 8px;
	}
	.bukti-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-accent-blue);
		text-decoration: none;
	}
	.bukti-link:hover { text-decoration: underline; }

	.info-list { display: flex; flex-direction: column; gap: 0; }
	.info-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 12px;
		padding: 10px 0;
		border-bottom: 1px solid var(--color-gray-100);
		font-size: var(--text-sm);
	}
	.info-row:last-child { border-bottom: none; }
	.info-key { color: var(--color-gray-500); flex-shrink: 0; }
	.info-val { color: var(--color-gray-900); font-weight: 500; text-align: right; }

	.personil-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0;
	}
	.personil-section { margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--color-gray-100); }
	.personil-section-title {
		display: flex;
		align-items: center;
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--color-gray-700);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 14px;
	}
	.personil-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 12px;
	}
	.personil-card {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px;
		background: var(--color-gray-50);
		border: 1px solid var(--color-gray-200);
		border-radius: var(--radius-md);
	}
	.personil-card-highlight {
		background: var(--color-accent-gold-light);
		border-color: rgba(212,160,23,0.3);
	}
	.personil-avatar {
		width: 44px;
		height: 44px;
		border-radius: var(--radius-full);
		background: var(--color-gray-200);
		flex-shrink: 0;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: var(--text-base);
		color: var(--color-gray-500);
	}
	.personil-avatar img { width: 100%; height: 100%; object-fit: cover; }
	.personil-nama {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-black);
		margin-bottom: 4px;
	}
	.personil-badges { display: flex; gap: 4px; flex-wrap: wrap; }
	.personil-telp {
		font-size: var(--text-xs);
		color: var(--color-gray-500);
		margin-top: 4px;
	}

	.pasukan-table-wrap { overflow-x: auto; }
	.pasukan-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}
	.pasukan-table th {
		text-align: left;
		padding: 8px 12px;
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-gray-500);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-bottom: 1px solid var(--color-gray-200);
		background: var(--color-gray-50);
	}
	.pasukan-table td {
		padding: 10px 12px;
		border-bottom: 1px solid var(--color-gray-100);
		color: var(--color-gray-700);
	}
	.pasukan-table tr:nth-child(even) td { background: var(--color-gray-50); }
	.pasukan-table tr:last-child td { border-bottom: none; }
	.td-num { color: var(--color-gray-400); font-family: var(--font-mono); width: 40px; }
	.td-nama { font-weight: 500; color: var(--color-black); }
	.td-empty { color: var(--color-gray-300); }
	.doc-link {
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-accent-blue);
		text-decoration: none;
	}
	.doc-link:hover { text-decoration: underline; }
</style>
