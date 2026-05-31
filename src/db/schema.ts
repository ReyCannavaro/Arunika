import { pgTable, serial, varchar, text, integer, date, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum       = pgEnum('role', ['admin', 'user']);
export const statusEventEnum = pgEnum('status_event', ['draf', 'aktif', 'selesai']);
export const statusBayarEnum = pgEnum('status_pembayaran', ['pending', 'terverifikasi', 'ditolak']);
export const jenisPersonilEnum = pgEnum('jenis_personil', ['pelatih', 'official', 'danton', 'pasukan']);
export const jumlahPasukanEnum = pgEnum('jumlah_pasukan', ['12', '15']);

export const users = pgTable('users', {
  id:           varchar('id', { length: 255 }).primaryKey(),
  email:        varchar('email', { length: 255 }).notNull().unique(),
  username:     varchar('username', { length: 100 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role:         roleEnum('role').default('user').notNull(),
  createdAt:    timestamp('created_at').defaultNow().notNull(),
  updatedAt:    timestamp('updated_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id:        varchar('id', { length: 255 }).primaryKey(),
  userId:    varchar('user_id', { length: 255 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
});

export const events = pgTable('events', {
  id:                       serial('id').primaryKey(),
  namaEvent:                varchar('nama_event', { length: 255 }).notNull(),
  tahun:                    integer('tahun').notNull(),
  tanggalMulaiPendaftaran:  date('tanggal_mulai_pendaftaran').notNull(),
  tanggalSelesaiPendaftaran:date('tanggal_selesai_pendaftaran').notNull(),
  status:                   statusEventEnum('status').default('draf').notNull(),
  createdAt:                timestamp('created_at').defaultNow().notNull(),
  updatedAt:                timestamp('updated_at').defaultNow().notNull(),
});

export const tims = pgTable('tims', {
  id:                  serial('id').primaryKey(),
  eventId:             integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  userId:              varchar('user_id', { length: 255 }).references(() => users.id, { onDelete: 'set null' }),
  asalSekolah:         varchar('asal_sekolah', { length: 255 }).notNull(),
  namaSatuan:          varchar('nama_satuan', { length: 255 }).notNull(),
  namaPasukan:         varchar('nama_pasukan', { length: 255 }).notNull(),
  jumlahPasukan:       jumlahPasukanEnum('jumlah_pasukan').notNull(),
  statusPembayaran:    statusBayarEnum('status_pembayaran').default('pending').notNull(),
  buktiPembayaranUrl:  text('bukti_pembayaran_url'),
  catatanAdmin:        text('catatan_admin'),
  createdAt:           timestamp('created_at').defaultNow().notNull(),
});

export const personils = pgTable('personils', {
  id:             serial('id').primaryKey(),
  timId:          integer('tim_id').notNull().references(() => tims.id, { onDelete: 'cascade' }),
  jenisPersonil:  jenisPersonilEnum('jenis_personil').notNull(),
  namaLengkap:    varchar('nama_lengkap', { length: 255 }).notNull(),
  nomorTelepon:   varchar('nomor_telepon', { length: 20 }),
  fotoFormalUrl:  text('foto_formal_url'),
  kartuPelajarUrl:text('kartu_pelajar_url'),
});

export const judges = pgTable('judges', {
  id:               serial('id').primaryKey(),
  eventId:          integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  namaLengkap:      varchar('nama_lengkap', { length: 255 }).notNull(),
  jabatanJuri:      varchar('jabatan_juri', { length: 255 }),
  fotoUrl:          text('foto_url'),
  deskripsiSingkat: text('deskripsi_singkat'),
});