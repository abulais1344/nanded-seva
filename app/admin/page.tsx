'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, LogOut, Download, RefreshCw,
  Users, Clock, CheckCircle, XCircle, PhoneCall,
  Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Loader2,
} from 'lucide-react';
import { supabase, type Lead, type Service, type LeadStatus } from '@/lib/supabase';
import { ICON_OPTIONS, getIcon, getColor } from '@/lib/services';

// ─── Constants ───────────────────────────────
const STATUS_OPTIONS: LeadStatus[] = ['New', 'Contacted', 'Assigned', 'Completed', 'Cancelled'];

const STATUS_STYLES: Record<LeadStatus, { bg: string; text: string }> = {
  New:       { bg: '#EFF6FF', text: '#1D4ED8' },
  Contacted: { bg: '#FFF7ED', text: '#C2410C' },
  Assigned:  { bg: '#F5F3FF', text: '#7C3AED' },
  Completed: { bg: '#F0FDF4', text: '#15803D' },
  Cancelled: { bg: '#FEF2F2', text: '#B91C1C' },
};

const STATUS_ICONS: Record<LeadStatus, React.ElementType> = {
  New: Clock, Contacted: PhoneCall, Assigned: Users,
  Completed: CheckCircle, Cancelled: XCircle,
};

const ALL_SERVICES_FILTER = [
  'All Services',
  'Electrician','AC Repair & Installation','Plumbing','RO Water Filter Service',
  'Mistri Work','Painting','Washing Machine Repair',
  'Driver for a Day','Car Rental','Outstation Taxi Booking',
  'Airport Pickup & Drop','Nanded to Hyderabad Taxi','Nanded to Pune Taxi',
];

function todayIST() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

// ─── Main Component ───────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'leads' | 'services'>('leads');

  // Leads state
  const [leads, setLeads]         = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [search, setSearch]       = useState('');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [statusFilter, setStatusFilter]   = useState<LeadStatus | 'All'>('All');
  const [updating, setUpdating]   = useState<string | null>(null);

  // Services state
  const [services, setServices]   = useState<Service[]>([]);
  const [svcLoading, setSvcLoading] = useState(true);
  const [editService, setEditService] = useState<Service | null | 'new'>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [saveLoading, setSaveLoading]   = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const checkAuth = useCallback(async () => {
    const res = await fetch('/api/admin/login', { method: 'GET' });
    if (!res.ok) router.replace('/admin/login');
  }, [router]);

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data as Lead[]);
    setLeadsLoading(false);
  }, []);

  const fetchServices = useCallback(async () => {
    setSvcLoading(true);
    const { data } = await supabase.from('services').select('*').order('sort_order');
    if (data) setServices(data as Service[]);
    setSvcLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
    fetchLeads();
    fetchServices();
  }, [checkAuth, fetchLeads, fetchServices]);

  const handleSignOut = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.replace('/admin/login');
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    setUpdating(id);
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    setUpdating(null);
  };

  const exportCSV = () => {
    const header = ['Name','Mobile','Service','Address','Taluka','Date','Message','Status','Language','Created At'];
    const rows = filteredLeads.map(l => [
      l.name, l.mobile, l.service, l.address, l.taluka ?? '',
      l.preferred_date ?? '', l.message ?? '',
      l.status, l.language,
      new Date(l.created_at).toLocaleString('en-IN'),
    ]);
    const csv = [header, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `nandedseva-leads-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleServiceActive = async (svc: Service) => {
    const next = !svc.is_active;
    await supabase.from('services').update({ is_active: next }).eq('id', svc.id);
    setServices(prev => prev.map(s => s.id === svc.id ? { ...s, is_active: next } : s));
  };

  const handleSaveService = async (data: Partial<Service>) => {
    setSaveLoading(true);
    if (editService === 'new') {
      const { data: inserted } = await supabase.from('services').insert(data).select().single();
      if (inserted) setServices(prev => [...prev, inserted as Service].sort((a, b) => a.sort_order - b.sort_order));
    } else if (editService) {
      await supabase.from('services').update({ ...data, updated_at: new Date().toISOString() }).eq('id', editService.id);
      setServices(prev => prev.map(s => s.id === editService.id ? { ...s, ...data } : s));
    }
    setSaveLoading(false);
    setEditService(null);
  };

  const handleDeleteService = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    await supabase.from('services').delete().eq('id', deleteTarget.id);
    setServices(prev => prev.filter(s => s.id !== deleteTarget.id));
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  const today = todayIST();
  const filteredLeads = leads.filter(l => {
    const q = search.toLowerCase();
    const matchSearch  = !q || l.name.toLowerCase().includes(q) || l.mobile.includes(q);
    const matchService = serviceFilter === 'All Services' || l.service === serviceFilter;
    const matchStatus  = statusFilter  === 'All'          || l.status  === statusFilter;
    return matchSearch && matchService && matchStatus;
  });

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length;
    return acc;
  }, {} as Record<LeadStatus, number>);
  const todayCount = leads.filter(l => l.created_at.startsWith(today)).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="font-heading font-bold text-lg tracking-tight">
            <span style={{ color: '#0F3460' }}>Nanded</span><span style={{ color: '#34C77B' }}>Seva</span>
            <span className="ml-2 text-xs font-normal text-gray-400">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { fetchLeads(); fetchServices(); }}
              className="p-2 text-gray-500 hover:text-[#0F3460] transition-colors" title="Refresh">
              <RefreshCw size={16} />
            </button>
            <button onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors px-3 py-1.5">
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Summary cards — only on leads tab */}
        {activeTab === 'leads' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
            <SummaryCard label="Today's Leads" value={todayCount} color="#34C77B" highlight />
            {STATUS_OPTIONS.map(s => {
              const Icon  = STATUS_ICONS[s];
              const style = STATUS_STYLES[s];
              return (
                <motion.button key={s} whileHover={{ scale: 1.02 }}
                  onClick={() => setStatusFilter(statusFilter === s ? 'All' : s)}
                  className={`rounded-xl p-3 text-left border transition-all ${statusFilter === s ? 'ring-2 ring-[#0F3460]' : ''}`}
                  style={{ background: style.bg, borderColor: `${style.text}30` }}>
                  <Icon size={16} color={style.text} className="mb-1" />
                  <div className="font-bold text-lg" style={{ color: style.text }}>{counts[s]}</div>
                  <div className="text-xs font-medium" style={{ color: style.text }}>{s}</div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Tab switcher */}
        <div className="flex gap-1 mb-5 bg-white border border-gray-200 rounded-xl p-1 w-fit shadow-sm">
          {(['leads', 'services'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                activeTab === tab ? 'text-white shadow-sm' : 'text-gray-600 hover:text-[#0F3460]'
              }`}
              style={activeTab === tab ? { background: '#0F3460' } : {}}>
              {tab} {tab === 'leads' ? `(${leads.length})` : `(${services.length})`}
            </button>
          ))}
        </div>

        {/* ── LEADS TAB ── */}
        {activeTab === 'leads' && (
          <>
            <div className="bg-white rounded-xl p-4 mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center shadow-sm">
              <div className="relative flex-1 min-w-0">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name or mobile..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F3460]/20" />
              </div>
              <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}
                className="py-2 px-3 rounded-lg border border-gray-200 text-sm outline-none bg-white">
                {ALL_SERVICES_FILTER.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as LeadStatus | 'All')}
                className="py-2 px-3 rounded-lg border border-gray-200 text-sm outline-none bg-white">
                <option value="All">All Status</option>
                {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
              <button onClick={exportCSV}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg text-white shrink-0"
                style={{ background: '#0F3460' }}>
                <Download size={14} /> Export CSV
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-3">
              Showing <span className="font-semibold text-gray-800">{filteredLeads.length}</span> of {leads.length} leads
            </p>

            {leadsLoading ? (
              <LoadingState label="Loading leads..." />
            ) : filteredLeads.length === 0 ? (
              <EmptyState icon={<Users size={40} />} label="No leads found" />
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-left">
                        {['Name & Mobile','Service','Address','Taluka','Date','Received','Status'].map(h => (
                          <th key={h} className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map(lead => {
                        const isToday = lead.created_at.startsWith(today);
                        return (
                          <tr key={lead.id}
                            className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${isToday ? 'bg-green-50/30' : ''}`}>
                            <td className="px-4 py-3">
                              <div className="font-semibold text-gray-900">{lead.name}</div>
                              <a href={`tel:+91${lead.mobile}`} className="text-xs text-[#0F3460] hover:underline">
                                {lead.mobile}
                              </a>
                              {isToday && <span className="ml-2 text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full">TODAY</span>}
                            </td>
                            <td className="px-4 py-3 text-gray-700 max-w-[140px]"><div className="truncate">{lead.service}</div></td>
                            <td className="px-4 py-3 text-gray-500 max-w-[160px]"><div className="truncate">{lead.address}</div></td>
                            <td className="px-4 py-3 text-gray-500 text-xs">{lead.taluka ?? '—'}</td>
                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{lead.preferred_date ?? '—'}</td>
                            <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                              {new Date(lead.created_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="px-4 py-3">
                              <StatusSelect value={lead.status} disabled={updating === lead.id}
                                onChange={s => updateLeadStatus(lead.id, s)} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {filteredLeads.map(lead => {
                    const isToday = lead.created_at.startsWith(today);
                    return (
                      <div key={lead.id}
                        className={`bg-white rounded-xl p-4 shadow-sm border ${isToday ? 'border-green-200' : 'border-transparent'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                              {lead.name}
                              {isToday && <span className="text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full">TODAY</span>}
                            </div>
                            <a href={`tel:+91${lead.mobile}`} className="text-xs text-[#0F3460]">{lead.mobile}</a>
                          </div>
                          <StatusSelect value={lead.status} disabled={updating === lead.id}
                            onChange={s => updateLeadStatus(lead.id, s)} />
                        </div>
                        <p className="text-xs text-gray-600 mb-1"><span className="font-medium">Service:</span> {lead.service}</p>
                        {lead.taluka && <p className="text-xs text-gray-500 mb-1"><span className="font-medium">Taluka:</span> {lead.taluka}</p>}
                        <p className="text-xs text-gray-500 mb-1">{lead.address}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(lead.created_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        {/* ── SERVICES TAB ── */}
        {activeTab === 'services' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading font-bold text-[#0F3460] text-lg">Service Management</h2>
                <p className="text-xs text-gray-500 mt-0.5">Changes reflect on the website immediately.</p>
              </div>
              <button onClick={() => setEditService('new')}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl text-white"
                style={{ background: '#34C77B' }}>
                <Plus size={16} /> Add Service
              </button>
            </div>

            {svcLoading ? (
              <LoadingState label="Loading services..." />
            ) : services.length === 0 ? (
              <EmptyState icon={<Plus size={40} />} label="No services yet. Add your first one." />
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {['Name','Category','Price','Visit Charge','Status','Actions'].map(h => (
                          <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {services.map(svc => {
                        const Icon  = getIcon(svc.icon);
                        const color = getColor(svc.icon);
                        return (
                          <tr key={svc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                  style={{ background: `${color}15` }}>
                                  <Icon size={16} color={color} />
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{svc.name}</div>
                                  <div className="text-xs text-gray-400 truncate max-w-[200px]">{svc.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                svc.category === 'home' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                              }`}>{svc.category === 'home' ? 'Home' : 'Travel'}</span>
                            </td>
                            <td className="px-4 py-3 text-gray-700 text-xs font-medium">{svc.price ?? '—'}</td>
                            <td className="px-4 py-3 text-gray-500 text-xs">{svc.visit_charge ?? '—'}</td>
                            <td className="px-4 py-3">
                              <button onClick={() => toggleServiceActive(svc)}
                                className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                                style={{ color: svc.is_active ? '#15803D' : '#9CA3AF' }}>
                                {svc.is_active
                                  ? <><ToggleRight size={20} color="#15803D" /> Active</>
                                  : <><ToggleLeft size={20} color="#9CA3AF" /> Inactive</>
                                }
                              </button>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button onClick={() => setEditService(svc)}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#0F3460] hover:bg-gray-100 transition-colors">
                                  <Pencil size={15} />
                                </button>
                                <button onClick={() => setDeleteTarget(svc)}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {services.map(svc => {
                    const Icon  = getIcon(svc.icon);
                    const color = getColor(svc.icon);
                    return (
                      <div key={svc.id} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                              style={{ background: `${color}15` }}>
                              <Icon size={18} color={color} />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">{svc.name}</div>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                svc.category === 'home' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                              }`}>{svc.category}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => setEditService(svc)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#0F3460]"><Pencil size={14} /></button>
                            <button onClick={() => setDeleteTarget(svc)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{svc.price ?? '—'} {svc.visit_charge ? `• ${svc.visit_charge} visit` : ''}</span>
                          <button onClick={() => toggleServiceActive(svc)}
                            className="flex items-center gap-1 font-medium"
                            style={{ color: svc.is_active ? '#15803D' : '#9CA3AF' }}>
                            {svc.is_active
                              ? <><ToggleRight size={18} /> Active</>
                              : <><ToggleLeft size={18} /> Inactive</>
                            }
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* ── Add/Edit Modal ── */}
      <AnimatePresence>
        {editService !== null && (
          <ServiceModal
            service={editService === 'new' ? null : editService}
            loading={saveLoading}
            onClose={() => setEditService(null)}
            onSave={handleSaveService}
          />
        )}
      </AnimatePresence>

      {/* ── Delete Confirm Modal ── */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            name={deleteTarget.name}
            loading={deleteLoading}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDeleteService}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sub-components ───────────────────────────
function SummaryCard({ label, value, color, highlight }: { label: string; value: number; color: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl p-3 border"
      style={{ background: highlight ? `${color}15` : 'white', borderColor: highlight ? `${color}40` : '#e5e7eb' }}>
      <div className="font-bold text-2xl" style={{ color }}>{value}</div>
      <div className="text-xs font-medium text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

function StatusSelect({ value, onChange, disabled }: { value: LeadStatus; onChange: (s: LeadStatus) => void; disabled?: boolean }) {
  const style = STATUS_STYLES[value];
  return (
    <select value={value} disabled={disabled} onChange={e => onChange(e.target.value as LeadStatus)}
      className="text-xs font-semibold rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer disabled:opacity-60"
      style={{ background: style.bg, color: style.text }}>
      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}

function LoadingState({ label }: { label: string }) {
  return (
    <div className="text-center py-20 text-gray-400">
      <RefreshCw size={28} className="animate-spin mx-auto mb-3" />
      <p>{label}</p>
    </div>
  );
}

function EmptyState({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="text-center py-20 text-gray-400">
      <div className="mx-auto mb-3 opacity-30 flex justify-center">{icon}</div>
      <p className="text-lg font-medium">{label}</p>
    </div>
  );
}

// ─── Service Modal (Add / Edit) ───────────────
interface ServiceForm {
  name: string;
  description: string;
  category: 'home' | 'travel';
  price: string;
  visit_charge: string;
  visit_charge_adjusted: boolean;
  icon: string;
  is_active: boolean;
  sort_order: number;
}

function ServiceModal({ service, loading, onClose, onSave }: {
  service: Service | null;
  loading: boolean;
  onClose: () => void;
  onSave: (data: Partial<Service>) => void;
}) {
  const [form, setForm] = useState<ServiceForm>({
    name:                   service?.name                   ?? '',
    description:            service?.description            ?? '',
    category:               service?.category               ?? 'home',
    price:                  service?.price                  ?? '',
    visit_charge:           service?.visit_charge           ?? '',
    visit_charge_adjusted:  service?.visit_charge_adjusted  ?? true,
    icon:                   service?.icon                   ?? 'zap',
    is_active:              service?.is_active              ?? true,
    sort_order:             service?.sort_order             ?? 0,
  });

  const set = <K extends keyof ServiceForm>(k: K, v: ServiceForm[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({
      ...form,
      visit_charge: form.visit_charge.trim() || null,
      description:  form.description.trim()  || null,
      price:        form.price.trim()         || null,
    });
  };

  const PreviewIcon = getIcon(form.icon);
  const previewColor = getColor(form.icon);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-6"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
          <h2 className="font-heading font-bold text-[#0F3460]">{service ? 'Edit Service' : 'Add New Service'}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Icon preview */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${previewColor}15` }}>
              <PreviewIcon size={20} color={previewColor} />
            </div>
            <span className="text-sm text-gray-500">Icon preview</span>
          </div>

          <ModalField label="Service Name *">
            <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
              placeholder="e.g. AC Repair & Installation" required
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F3460]/20" />
          </ModalField>

          <ModalField label="Description">
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              rows={2} placeholder="Brief description of the service"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F3460]/20 resize-none" />
          </ModalField>

          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Category">
              <select value={form.category} onChange={e => set('category', e.target.value as 'home' | 'travel')}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none bg-white focus:ring-2 focus:ring-[#0F3460]/20">
                <option value="home">Home Services</option>
                <option value="travel">Travel Services</option>
              </select>
            </ModalField>
            <ModalField label="Icon">
              <select value={form.icon ?? ''} onChange={e => set('icon', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none bg-white focus:ring-2 focus:ring-[#0F3460]/20">
                {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </ModalField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Starting Price">
              <input type="text" value={form.price} onChange={e => set('price', e.target.value)}
                placeholder="e.g. ₹200 onwards"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F3460]/20" />
            </ModalField>
            <ModalField label="Visit Charge">
              <input type="text" value={form.visit_charge} onChange={e => set('visit_charge', e.target.value)}
                placeholder="e.g. ₹100 or Free visit"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F3460]/20" />
            </ModalField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Sort Order">
              <input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F3460]/20" />
            </ModalField>
            <div className="flex flex-col gap-2 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.visit_charge_adjusted}
                  onChange={e => set('visit_charge_adjusted', e.target.checked)}
                  className="w-4 h-4 accent-[#0F3460]" />
                <span className="text-sm text-gray-700">Visit charge adjusted in bill</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_active}
                  onChange={e => set('is_active', e.target.checked)}
                  className="w-4 h-4 accent-[#34C77B]" />
                <span className="text-sm text-gray-700">Active (visible on website)</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: '#0F3460' }}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : (service ? 'Save Changes' : 'Add Service')}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function ModalField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────
function DeleteModal({ name, loading, onCancel, onConfirm }: {
  name: string; loading: boolean; onCancel: () => void; onConfirm: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} color="#DC2626" />
        </div>
        <h3 className="font-heading font-bold text-gray-900 text-center mb-2">Delete Service</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to delete <span className="font-semibold text-gray-800">{name}</span>?
          This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ background: '#DC2626' }}>
            {loading ? <><Loader2 size={16} className="animate-spin" /> Deleting...</> : 'Delete'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
