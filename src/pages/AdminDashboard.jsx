import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'
import { events } from '../data/events'
import Icon from '../components/Icon'
import GoogleButton from '../components/GoogleButton'
import Footer from '../components/Footer'

const META_COLS = ['Registered At']
const COMPETITIONS = events.filter((e) => e.type === 'competition')
const fmt = (ts) => new Date(ts).toLocaleString('en-IN')

function columnsOf(displays) {
  const set = new Set(META_COLS)
  displays.forEach((d) => Object.keys(d).forEach((k) => set.add(k)))
  return [...set]
}

export default function AdminDashboard() {
  const { user, loading, configured, isAdmin, signInWithGoogle, signOut } = useAuth()
  const [records, setRecords] = useState([])
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null) // null = panels grid; event id or 'ALL'
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!supabase || !isAdmin) return
    setFetching(true)
    supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setRecords(data || [])
        setFetching(false)
      })
  }, [isAdmin])

  const countFor = (id) => records.filter((r) => r.event_id === id).length
  const total = records.length

  const selectedEvent = selected && selected !== 'ALL' ? events.find((e) => e.id === selected) : null
  const selectedTitle = selected === 'ALL' ? 'All Registrations' : selectedEvent?.title || ''

  // Visible records for the selected view (+ search), each carrying its DB id.
  const visible = useMemo(() => {
    const subset = selected === 'ALL' ? records : records.filter((r) => r.event_id === selected)
    const q = query.trim().toLowerCase()
    return subset
      .map((r) => ({
        id: r.id,
        display:
          selected === 'ALL'
            ? { 'Registered At': fmt(r.created_at), Event: r.event_title, ...(r.data || {}) }
            : { 'Registered At': fmt(r.created_at), ...(r.data || {}) },
      }))
      .filter((v) => !q || Object.values(v.display).some((x) => String(x).toLowerCase().includes(q)))
  }, [records, selected, query])

  const columns = useMemo(() => columnsOf(visible.map((v) => v.display)), [visible])

  // ---- Delete actions (admin only; RLS also enforces this server-side) ----
  const deleteOne = async (id) => {
    if (!window.confirm('Delete this registration? This cannot be undone.')) return
    setBusy(true)
    const { error } = await supabase.from('registrations').delete().eq('id', id)
    setBusy(false)
    if (error) return alert('Delete failed: ' + error.message)
    setRecords((rs) => rs.filter((r) => r.id !== id))
  }

  const deleteAllShown = async () => {
    const ids = visible.map((v) => v.id)
    if (!ids.length) return
    const what = selected === 'ALL' ? `ALL ${ids.length} registrations (every event)` : `all ${ids.length} registration(s) for ${selectedTitle}`
    if (!window.confirm(`Delete ${what}?\n\nThis permanently removes them and cannot be undone.`)) return
    if (!window.confirm('Are you absolutely sure? There is no undo.')) return
    setBusy(true)
    const { error } = await supabase.from('registrations').delete().in('id', ids)
    setBusy(false)
    if (error) return alert('Delete failed: ' + error.message)
    const idset = new Set(ids)
    setRecords((rs) => rs.filter((r) => !idset.has(r.id)))
  }

  const exportCSV = () => {
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = [columns.map(esc).join(','), ...visible.map((v) => columns.map((c) => esc(v.display[c])).join(','))].join('\n')
    downloadBlob(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' }), `esummit-${slug(selectedTitle)}-${stamp()}.csv`)
  }
  const exportPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
    doc.setFontSize(14)
    doc.text(`E-Summit DCRUST'26 — ${selectedTitle}`, 40, 36)
    doc.setFontSize(9)
    doc.text(`${visible.length} record(s) · generated ${new Date().toLocaleString('en-IN')}`, 40, 52)
    autoTable(doc, {
      startY: 64,
      head: [columns],
      body: visible.map((v) => columns.map((c) => v.display[c] ?? '')),
      styles: { fontSize: 6.5, cellPadding: 3, overflow: 'linebreak' },
      headStyles: { fillColor: [43, 75, 255], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 246, 255] },
      margin: { left: 40, right: 40 },
    })
    doc.save(`esummit-${slug(selectedTitle)}-${stamp()}.pdf`)
  }

  // ---- Gate states ----
  if (!configured)
    return <Gate title="Backend not connected yet">Add your Supabase keys in <code className="text-peach">src/config.js</code>.<BackHome /></Gate>
  if (loading) return <Gate title="Loading…" />
  if (!user)
    return (
      <Gate title="Admin sign-in">
        Sign in with your authorised Google account to view registrations.
        <div className="mt-6 flex justify-center"><GoogleButton onClick={signInWithGoogle} /></div>
        <BackHome />
      </Gate>
    )
  if (!isAdmin)
    return (
      <Gate title="Not authorised">
        <b className="text-white">{user.email}</b> doesn’t have admin access.
        <div className="mt-6 flex justify-center"><button onClick={signOut} className="rounded-xl px-5 py-2.5 glass hover:bg-white/10 text-sm font-semibold">Switch account</button></div>
        <BackHome />
      </Gate>
    )

  return (
    <>
      <section className="relative pt-28 pb-16 min-h-screen">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-2">Admin</p>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl">{selected ? selectedTitle : 'Dashboard'}</h1>
              <p className="text-white/50 text-sm mt-1">Signed in as {user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              {selected && (
                <>
                  <button onClick={exportCSV} disabled={!visible.length} className="btn-grad rounded-xl px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">Download CSV</button>
                  <button onClick={exportPDF} disabled={!visible.length} className="rounded-xl px-5 py-2.5 text-sm font-semibold glass hover:bg-white/10 disabled:opacity-50">Download PDF</button>
                </>
              )}
              <button onClick={signOut} className="rounded-xl px-4 py-2.5 text-sm text-white/70 hover:text-white">Sign out</button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm mb-4">Error: {error}</p>}

          {/* PANELS GRID */}
          {!selected ? (
            <>
              {fetching && <p className="text-white/50 mb-4">Loading registrations…</p>}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {COMPETITIONS.map((e, i) => (
                  <motion.button
                    key={e.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { setSelected(e.id); setQuery('') }}
                    className="group text-left rounded-2xl glass brand-border p-6 relative overflow-hidden hover:-translate-y-1 transition-transform"
                  >
                    <div className="absolute -top-14 -right-14 w-36 h-36 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity" style={{ background: e.accent }} />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${e.accent}22`, color: e.accent }}>
                        <Icon name={e.icon} className="w-6 h-6" />
                      </div>
                      <h3 className="font-display font-bold text-lg leading-snug">{e.title}</h3>
                      <p className="text-xs text-white/50 mt-0.5">{e.day} · {e.time}</p>
                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <div className="font-display font-extrabold text-3xl grad-text">{countFor(e.id)}</div>
                          <div className="text-[11px] uppercase tracking-wider text-white/50">registrations</div>
                        </div>
                        <span className="text-sm font-semibold text-white/70 group-hover:text-white flex items-center gap-1">
                          View <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: COMPETITIONS.length * 0.05 }}
                  onClick={() => { setSelected('ALL'); setQuery('') }}
                  className="group text-left rounded-2xl p-6 relative overflow-hidden hover:-translate-y-1 transition-transform"
                  style={{ background: 'linear-gradient(120deg, rgba(255,47,164,0.28), rgba(168,85,247,0.28), rgba(34,211,238,0.28))', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <h3 className="font-display font-bold text-lg">All Registrations</h3>
                  <p className="text-xs text-white/60 mt-0.5">Every event combined</p>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="font-display font-extrabold text-3xl text-white">{total}</div>
                      <div className="text-[11px] uppercase tracking-wider text-white/60">total</div>
                    </div>
                    <span className="text-sm font-semibold text-white flex items-center gap-1">
                      View all <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                </motion.button>
              </div>
            </>
          ) : (
            /* DETAIL: table for selected event */
            <>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <button onClick={() => setSelected(null)} className="rounded-xl px-4 py-2 glass hover:bg-white/10 text-sm font-semibold flex items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
                  All events
                </button>
                <div className="glass rounded-xl px-4 py-2 text-sm"><span className="text-white/50">Showing</span> <span className="font-semibold">{visible.length}</span></div>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, college…" className="field !w-auto flex-1 min-w-[220px] py-2" />
                <button
                  onClick={deleteAllShown}
                  disabled={!visible.length || busy}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-red-300 border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 disabled:opacity-40 flex items-center gap-1.5"
                >
                  <TrashIcon /> Delete shown ({visible.length})
                </button>
              </div>

              <div className="glass-strong rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        {columns.map((c) => (
                          <th key={c} className="px-4 py-3 font-semibold text-white/80 whitespace-nowrap border-b border-white/10 bg-white/5">{c}</th>
                        ))}
                        <th className="px-4 py-3 font-semibold text-white/80 whitespace-nowrap border-b border-white/10 bg-white/5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetching ? (
                        <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-white/50">Loading…</td></tr>
                      ) : visible.length === 0 ? (
                        <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-white/50">No registrations yet for this event.</td></tr>
                      ) : (
                        visible.map((v) => (
                          <tr key={v.id} className="hover:bg-white/5">
                            {columns.map((c) => (
                              <td key={c} className="px-4 py-3 text-white/75 whitespace-nowrap border-b border-white/5 max-w-[280px] truncate" title={v.display[c]}>{v.display[c]}</td>
                            ))}
                            <td className="px-4 py-3 border-b border-white/5 text-right">
                              <button
                                onClick={() => deleteOne(v.id)}
                                disabled={busy}
                                title="Delete this registration"
                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-red-300 hover:bg-red-500/20 disabled:opacity-40"
                              >
                                <TrashIcon />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
    <path d="M10 11v6M14 11v6" />
  </svg>
)
const stamp = () => new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}
function Gate({ title, children }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-strong brand-border rounded-3xl p-8 max-w-md w-full text-center">
        <h1 className="font-display font-bold text-2xl mb-3">{title}</h1>
        <div className="text-white/60 text-sm">{children}</div>
      </div>
    </section>
  )
}
const BackHome = () => (
  <div className="mt-6"><Link to="/" className="text-sm text-white/50 hover:text-white">← Back to site</Link></div>
)
