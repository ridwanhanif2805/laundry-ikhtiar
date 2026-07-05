import { useState, useMemo } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Users,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  Pencil,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  CalendarDays,
  Wallet,
  ShoppingBag,
  UserCheck,
  Download,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────

type Layanan = "Cuci Kiloan" | "Cuci + Setrika" | "Dry Cleaning" | "Cuci Sepatu";

interface Transaksi {
  id: number;
  tanggal: string;
  nama: string;
  layanan: Layanan;
  qty: number;
  harga: number;
  total: number;
}

interface Pelanggan {
  id: number;
  nama: string;
  telp: string;
  alamat: string;
  totalTransaksi: number;
  totalBelanja: number;
  terakhirOrder: string;
}

// ─── Seed data ───────────────────────────────────────────────────────────────

const hargaLayanan: Record<Layanan, number> = {
  "Cuci Kiloan": 7000,
  "Cuci + Setrika": 12000,
  "Dry Cleaning": 35000,
  "Cuci Sepatu": 40000,
};

const initialTransaksi: Transaksi[] = [
  { id: 1, tanggal: "2026-06-18", nama: "Rina Sari", layanan: "Cuci + Setrika", qty: 3, harga: 12000, total: 36000 },
  { id: 2, tanggal: "2026-06-18", nama: "Budi Pratama", layanan: "Dry Cleaning", qty: 2, harga: 35000, total: 70000 },
  { id: 3, tanggal: "2026-06-19", nama: "Dewi Anjani", layanan: "Cuci Kiloan", qty: 5, harga: 7000, total: 35000 },
  { id: 4, tanggal: "2026-06-19", nama: "Andi Wijaya", layanan: "Cuci Sepatu", qty: 1, harga: 40000, total: 40000 },
  { id: 5, tanggal: "2026-06-20", nama: "Siti Nurhaliza", layanan: "Cuci + Setrika", qty: 4, harga: 12000, total: 48000 },
  { id: 6, tanggal: "2026-06-20", nama: "Hendra Gunawan", layanan: "Cuci Kiloan", qty: 2, harga: 7000, total: 14000 },
  { id: 7, tanggal: "2026-06-21", nama: "Maya Putri", layanan: "Dry Cleaning", qty: 1, harga: 35000, total: 35000 },
  { id: 8, tanggal: "2026-06-21", nama: "Rina Sari", layanan: "Cuci Kiloan", qty: 4, harga: 7000, total: 28000 },
  { id: 9, tanggal: "2026-06-22", nama: "Budi Pratama", layanan: "Cuci + Setrika", qty: 2, harga: 12000, total: 24000 },
  { id: 10, tanggal: "2026-06-22", nama: "Lestari Wulandari", layanan: "Cuci Sepatu", qty: 2, harga: 40000, total: 80000 },
  { id: 11, tanggal: "2026-06-23", nama: "Fajar Nugroho", layanan: "Cuci Kiloan", qty: 6, harga: 7000, total: 42000 },
  { id: 12, tanggal: "2026-06-23", nama: "Dewi Anjani", layanan: "Cuci + Setrika", qty: 3, harga: 12000, total: 36000 },
  { id: 13, tanggal: "2026-06-24", nama: "Andi Wijaya", layanan: "Cuci Kiloan", qty: 3, harga: 7000, total: 21000 },
  { id: 14, tanggal: "2026-06-24", nama: "Siti Nurhaliza", layanan: "Dry Cleaning", qty: 2, harga: 35000, total: 70000 },
];

const initialPelanggan: Pelanggan[] = [
  { id: 1, nama: "Rina Sari", telp: "081234567890", alamat: "Jl. Mawar No. 5, Jakarta", totalTransaksi: 3, totalBelanja: 92000, terakhirOrder: "2026-06-21" },
  { id: 2, nama: "Budi Pratama", telp: "082345678901", alamat: "Jl. Melati No. 12, Jakarta", totalTransaksi: 3, totalBelanja: 130000, terakhirOrder: "2026-06-22" },
  { id: 3, nama: "Dewi Anjani", telp: "083456789012", alamat: "Jl. Kenanga No. 3, Depok", totalTransaksi: 3, totalBelanja: 107000, terakhirOrder: "2026-06-23" },
  { id: 4, nama: "Andi Wijaya", telp: "084567890123", alamat: "Jl. Anggrek No. 7, Bekasi", totalTransaksi: 2, totalBelanja: 61000, terakhirOrder: "2026-06-24" },
  { id: 5, nama: "Siti Nurhaliza", telp: "085678901234", alamat: "Jl. Dahlia No. 9, Tangerang", totalTransaksi: 2, totalBelanja: 118000, terakhirOrder: "2026-06-24" },
  { id: 6, nama: "Hendra Gunawan", telp: "086789012345", alamat: "Jl. Flamboyan No. 2, Bogor", totalTransaksi: 1, totalBelanja: 14000, terakhirOrder: "2026-06-20" },
  { id: 7, nama: "Maya Putri", telp: "087890123456", alamat: "Jl. Cempaka No. 8, Jakarta", totalTransaksi: 1, totalBelanja: 35000, terakhirOrder: "2026-06-21" },
  { id: 8, nama: "Lestari Wulandari", telp: "088901234567", alamat: "Jl. Seroja No. 15, Depok", totalTransaksi: 1, totalBelanja: 80000, terakhirOrder: "2026-06-22" },
  { id: 9, nama: "Fajar Nugroho", telp: "089012345678", alamat: "Jl. Tulip No. 4, Bekasi", totalTransaksi: 1, totalBelanja: 42000, terakhirOrder: "2026-06-23" },
];

const weeklyData = [
  { day: "18 Jun", total: 106000 },
  { day: "19 Jun", total: 75000 },
  { day: "20 Jun", total: 62000 },
  { day: "21 Jun", total: 63000 },
  { day: "22 Jun", total: 104000 },
  { day: "23 Jun", total: 78000 },
  { day: "24 Jun", total: 91000 },
];

const monthlyData = [
  { bulan: "Jan", total: 1240000 },
  { bulan: "Feb", total: 980000 },
  { bulan: "Mar", total: 1420000 },
  { bulan: "Apr", total: 1650000 },
  { bulan: "Mei", total: 1890000 },
  { bulan: "Jun", total: 579000 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatRp = (n: number) => "Rp " + n.toLocaleString("id-ID");
const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

type Page = "dashboard" | "transaksi" | "pelanggan";

// ─── Custom tooltip ───────────────────────────────────────────────────────────

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-border rounded-xl px-3 py-2 shadow-lg text-sm">
        <div className="text-muted-foreground text-xs mb-0.5">{label}</div>
        <div className="font-bold text-primary">{formatRp(payload[0].value)}</div>
      </div>
    );
  }
  return null;
};

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  // Transaksi state
  const [transaksiList, setTransaksiList] = useState<Transaksi[]>(initialTransaksi);
  const [filterTanggal, setFilterTanggal] = useState("2026-06-24");
  const [formTanggal, setFormTanggal] = useState("2026-06-24");
  const [formNama, setFormNama] = useState("");
  const [formLayanan, setFormLayanan] = useState<Layanan | "">("");
  const [formQty, setFormQty] = useState("");
  const [formHargaManual, setFormHargaManual] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [nextId, setNextId] = useState(15);

  // Pelanggan state
  const [pelangganList, setPelangganList] = useState<Pelanggan[]>(initialPelanggan);
  const [searchPelanggan, setSearchPelanggan] = useState("");
  const [pelangganModal, setPelangganModal] = useState<Pelanggan | null>(null);
  const [showAddPelanggan, setShowAddPelanggan] = useState(false);
  const [pForm, setPForm] = useState({ nama: "", telp: "", alamat: "" });

  // ── Derived ────────────────────────────────────────────────────────────────

  const filteredTransaksi = useMemo(
    () => transaksiList.filter((t) => t.tanggal === filterTanggal),
    [transaksiList, filterTanggal]
  );

  const todayTotal = filteredTransaksi.reduce((s, t) => s + t.total, 0);

  const todayTransaksi = transaksiList.filter((t) => t.tanggal === "2026-06-24");
  const todayRevenue = todayTransaksi.reduce((s, t) => s + t.total, 0);
  const monthRevenue = transaksiList.reduce((s, t) => s + t.total, 0);
  const totalPelanggan = pelangganList.length;

  // Rekap harian
  const rekapHarian = useMemo(() => {
    const map: Record<string, { count: number; total: number }> = {};
    transaksiList.forEach((t) => {
      if (!map[t.tanggal]) map[t.tanggal] = { count: 0, total: 0 };
      map[t.tanggal].count++;
      map[t.tanggal].total += t.total;
    });
    return Object.entries(map)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([tanggal, v], i) => ({ no: i + 1, tanggal, ...v }));
  }, [transaksiList]);

  // ── Transaksi handlers ─────────────────────────────────────────────────────

  const syncPelanggan = (nama: string, totalDelta: number, tanggal: string, oldNama?: string) => {
    setPelangganList((prev) => {
      let list = prev;

      // Jika edit dan nama berubah, kurangi dari pelanggan lama
      if (oldNama && oldNama !== nama) {
        list = list.map((p) =>
          p.nama === oldNama
            ? { ...p, totalTransaksi: Math.max(0, p.totalTransaksi - 1), totalBelanja: Math.max(0, p.totalBelanja - totalDelta) }
            : p
        );
      }

      const exists = list.find((p) => p.nama === nama);
      if (exists) {
        return list.map((p) =>
          p.nama === nama
            ? {
                ...p,
                totalTransaksi: oldNama && oldNama === nama ? p.totalTransaksi : p.totalTransaksi + 1,
                totalBelanja: p.totalBelanja + totalDelta,
                terakhirOrder: tanggal > p.terakhirOrder ? tanggal : p.terakhirOrder,
              }
            : p
        );
      }

      // Pelanggan baru
      return [
        ...list,
        {
          id: Date.now(),
          nama,
          telp: "-",
          alamat: "-",
          totalTransaksi: 1,
          totalBelanja: totalDelta,
          terakhirOrder: tanggal,
        },
      ];
    });
  };

  const handleSimpan = () => {
    if (!formNama.trim() || !formLayanan || !formQty) return;
    const qty = parseInt(formQty);
    const harga = formHargaManual ? parseInt(formHargaManual) : hargaLayanan[formLayanan as Layanan];
    const total = harga * qty;

    if (editId !== null) {
      const oldTrx = transaksiList.find((t) => t.id === editId);
      const totalDiff = total - (oldTrx?.total ?? 0);
      setTransaksiList((prev) =>
        prev.map((t) =>
          t.id === editId
            ? { ...t, tanggal: formTanggal, nama: formNama, layanan: formLayanan as Layanan, qty, harga, total }
            : t
        )
      );
      syncPelanggan(formNama, totalDiff, formTanggal, oldTrx?.nama);
      setEditId(null);
    } else {
      setTransaksiList((prev) => [
        ...prev,
        { id: nextId, tanggal: formTanggal, nama: formNama, layanan: formLayanan as Layanan, qty, harga, total },
      ]);
      setNextId((n) => n + 1);
      syncPelanggan(formNama, total, formTanggal);
    }
    setFormNama("");
    setFormLayanan("");
    setFormQty("");
    setFormHargaManual("");
  };

  const handleEdit = (t: Transaksi) => {
    setEditId(t.id);
    setFormTanggal(t.tanggal);
    setFormNama(t.nama);
    setFormLayanan(t.layanan);
    setFormQty(String(t.qty));
    setFormHargaManual("");
  };

  const handleDelete = (id: number) => {
    setTransaksiList((prev) => prev.filter((t) => t.id !== id));
    if (editId === id) { setEditId(null); setFormNama(""); setFormLayanan(""); setFormQty(""); }
  };

  // ── Pelanggan handlers ─────────────────────────────────────────────────────

  const filteredPelanggan = pelangganList.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchPelanggan.toLowerCase()) ||
      p.telp.includes(searchPelanggan)
  );

  const handleAddPelanggan = () => {
    if (!pForm.nama.trim()) return;
    setPelangganList((prev) => [
      ...prev,
      { id: prev.length + 1, nama: pForm.nama, telp: pForm.telp, alamat: pForm.alamat, totalTransaksi: 0, totalBelanja: 0, terakhirOrder: "-" },
    ]);
    setPForm({ nama: "", telp: "", alamat: "" });
    setShowAddPelanggan(false);
  };

  const handleDeletePelanggan = (id: number) => {
    setPelangganList((prev) => prev.filter((p) => p.id !== id));
    if (pelangganModal?.id === id) setPelangganModal(null);
  };

  // ── Nav items ──────────────────────────────────────────────────────────────

  const navItems = [
    { id: "dashboard" as Page, icon: LayoutDashboard, label: "Dashboard" },
    { id: "transaksi" as Page, icon: ArrowLeftRight, label: "Transaksi" },
    { id: "pelanggan" as Page, icon: Users, label: "Pelanggan" },
  ];

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`${
        mobile
          ? "fixed inset-0 z-50 flex"
          : `hidden md:flex flex-col transition-all duration-300 ${sidebarOpen ? "w-60" : "w-16"}`
      }`}
    >
      {mobile && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileSidebar(false)} />
      )}
      <div
        className={`${
          mobile ? "relative z-50 w-64 flex flex-col" : "flex flex-col h-full"
        } bg-[#1a2540] text-white`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 h-16 border-b border-white/10 shrink-0 ${!sidebarOpen && !mobile ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {(sidebarOpen || mobile) && (
            <div>
              <div className="font-bold text-sm leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Laundry Ikhtiar
              </div>
              <div className="text-[10px] text-white/50">Admin Panel</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); if (mobile) setMobileSidebar(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-primary text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                } ${!sidebarOpen && !mobile ? "justify-center" : ""}`}
                title={!sidebarOpen && !mobile ? item.label : undefined}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {(sidebarOpen || mobile) && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Admin badge */}
        {(sidebarOpen || mobile) && (
          <div className="p-3 border-t border-white/10 shrink-0">
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold shrink-0">
                AD
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate">Administrator</div>
                <div className="text-[10px] text-white/40 truncate">admin@laundry.com</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <div
      className="flex h-screen bg-background overflow-hidden"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar */}
      {mobileSidebar && <Sidebar mobile />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-xl hover:bg-secondary transition-all md:hidden"
              onClick={() => setMobileSidebar(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              className="hidden md:flex p-2 rounded-xl hover:bg-secondary transition-all"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            <div>
              <h1 className="font-bold text-foreground text-base capitalize" style={{ fontFamily: "'DM Serif Display', serif" }}>
                {page === "dashboard" ? "Dashboard" : page === "transaksi" ? "Transaksi" : "Data Pelanggan"}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {new Date("2026-06-24").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Toko Buka
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">

          {/* ── DASHBOARD ────────────────────────────────────────────────── */}
          {page === "dashboard" && (
            <div className="space-y-6 max-w-6xl">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Pendapatan Hari Ini", value: formatRp(todayRevenue), icon: Wallet, color: "bg-blue-50 text-blue-600", trend: "+12%", up: true },
                  { label: "Transaksi Hari Ini", value: String(todayTransaksi.length), icon: ShoppingBag, color: "bg-purple-50 text-purple-600", trend: "+3", up: true },
                  { label: "Total Pelanggan", value: String(totalPelanggan), icon: UserCheck, color: "bg-emerald-50 text-emerald-600", trend: "+2", up: true },
                  { label: "Pendapatan Bulan Ini", value: formatRp(monthRevenue), icon: CalendarDays, color: "bg-amber-50 text-amber-600", trend: "-8%", up: false },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                        {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {s.trend}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-foreground" style={{ fontFamily: "'DM Serif Display', serif" }}>{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-foreground">Pemasukan 7 Hari Terakhir</h3>
                      <p className="text-xs text-muted-foreground">18 Jun – 24 Jun 2026</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={weeklyData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.18} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#5a7099" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#5a7099" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                      <Tooltip content={<ChartTooltip />} />
                      <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ r: 4, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-border">
                  <div className="mb-4">
                    <h3 className="font-bold text-foreground">Pemasukan Bulanan</h3>
                    <p className="text-xs text-muted-foreground">Januari – Juni 2026</p>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={24}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: "#5a7099" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#5a7099" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="total" fill="#2563eb" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Rekap tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Rekap Harian */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                  <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-primary" /> Rekap Harian
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/50">
                          <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wide">No</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wide">Tanggal</th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-muted-foreground uppercase tracking-wide">Transaksi</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-muted-foreground uppercase tracking-wide">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {rekapHarian.map((r) => (
                          <tr key={r.tanggal} className="hover:bg-secondary/30 transition-colors">
                            <td className="px-4 py-3 text-muted-foreground text-xs">{r.no}</td>
                            <td className="px-4 py-3 font-medium">{formatDate(r.tanggal)}</td>
                            <td className="px-4 py-3 text-center">
                              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">{r.count}</span>
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-primary">{formatRp(r.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Layanan */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                  <div className="px-5 py-4 border-b border-border">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-primary" /> Distribusi Layanan
                    </h3>
                  </div>
                  <div className="p-5 space-y-3">
                    {(["Cuci Kiloan", "Cuci + Setrika", "Dry Cleaning", "Cuci Sepatu"] as Layanan[]).map((l) => {
                      const count = transaksiList.filter((t) => t.layanan === l).length;
                      const pct = Math.round((count / transaksiList.length) * 100);
                      const colors: Record<string, string> = { "Cuci Kiloan": "bg-blue-500", "Cuci + Setrika": "bg-emerald-500", "Dry Cleaning": "bg-purple-500", "Cuci Sepatu": "bg-amber-500" };
                      return (
                        <div key={l}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-foreground">{l}</span>
                            <span className="text-muted-foreground">{count} transaksi ({pct}%)</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${colors[l]} transition-all`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TRANSAKSI ──────────────────────────────────────────────────── */}
          {page === "transaksi" && (
            <div className="space-y-5 max-w-5xl">
              {/* Filter bar */}
              <div className="bg-white rounded-2xl border border-border p-4 flex flex-wrap items-end gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Filter Tanggal</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={filterTanggal}
                      onChange={(e) => setFilterTanggal(e.target.value)}
                      className="rounded-xl border border-border bg-input-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all"
                    />
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all">
                      <Filter className="w-3.5 h-3.5" /> Tampilkan
                    </button>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredTransaksi.length}</span> transaksi ·{" "}
                    <span className="font-bold text-primary">{formatRp(todayTotal)}</span>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition-all">
                    <Download className="w-3.5 h-3.5" /> Export
                  </button>
                </div>
              </div>

              {/* Add / Edit form */}
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  {editId !== null ? <><Pencil className="w-4 h-4 text-primary" /> Edit Transaksi</> : <><Plus className="w-4 h-4 text-primary" /> Tambah Transaksi</>}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Tanggal</label>
                    <input
                      type="date"
                      value={formTanggal}
                      onChange={(e) => setFormTanggal(e.target.value)}
                      className="w-full rounded-xl border border-border bg-input-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Nama Pelanggan</label>
                    <input
                      type="text"
                      placeholder="Nama pelanggan"
                      value={formNama}
                      onChange={(e) => setFormNama(e.target.value)}
                      list="pelanggan-list"
                      className="w-full rounded-xl border border-border bg-input-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all"
                    />
                    <datalist id="pelanggan-list">
                      {pelangganList.map((p) => <option key={p.id} value={p.nama} />)}
                    </datalist>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Layanan</label>
                    <select
                      value={formLayanan}
                      onChange={(e) => setFormLayanan(e.target.value as Layanan)}
                      className="w-full rounded-xl border border-border bg-input-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all"
                    >
                      <option value="">-- Pilih --</option>
                      {Object.keys(hargaLayanan).map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                      Kg / pcs
                      {formLayanan && <span className="text-primary ml-1 font-normal">@ {formatRp(hargaLayanan[formLayanan as Layanan])}</span>}
                    </label>
                    <input
                      type="number"
                      placeholder="Jumlah"
                      min="1"
                      value={formQty}
                      onChange={(e) => setFormQty(e.target.value)}
                      className="w-full rounded-xl border border-border bg-input-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Harga Manual <span className="font-normal">(opsional)</span></label>
                    <input
                      type="number"
                      placeholder="Override harga"
                      value={formHargaManual}
                      onChange={(e) => setFormHargaManual(e.target.value)}
                      className="w-full rounded-xl border border-border bg-input-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={handleSimpan}
                    disabled={!formNama.trim() || !formLayanan || !formQty}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    {editId !== null ? "Simpan Perubahan" : "Simpan"}
                  </button>
                  {editId !== null && (
                    <button
                      onClick={() => { setEditId(null); setFormNama(""); setFormLayanan(""); setFormQty(""); setFormHargaManual(""); }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition-all"
                    >
                      <X className="w-4 h-4" /> Batal
                    </button>
                  )}
                  {formLayanan && formQty && (
                    <div className="ml-auto text-sm font-bold text-primary bg-primary/5 px-4 py-2.5 rounded-xl">
                      Estimasi: {formatRp((formHargaManual ? parseInt(formHargaManual) : hargaLayanan[formLayanan as Layanan]) * parseInt(formQty || "0"))}
                    </div>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-bold text-foreground">
                    Transaksi {filterTanggal ? formatDate(filterTanggal) : "Semua"}
                  </h3>
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full">
                    {filteredTransaksi.length} data
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/50">
                        {["No", "Nama", "Layanan", "Qty", "Harga Satuan", "Total", "Aksi"].map((h) => (
                          <th key={h} className={`px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide ${h === "Qty" || h === "Total" || h === "Harga Satuan" ? "text-right" : h === "Aksi" ? "text-center" : "text-left"}`}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredTransaksi.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground text-sm">
                            Belum ada transaksi untuk tanggal ini.
                          </td>
                        </tr>
                      ) : (
                        filteredTransaksi.map((t, i) => (
                          <tr key={t.id} className={`hover:bg-secondary/30 transition-colors ${editId === t.id ? "bg-primary/5" : ""}`}>
                            <td className="px-4 py-3 text-muted-foreground text-xs">{i + 1}</td>
                            <td className="px-4 py-3 font-semibold">{t.nama}</td>
                            <td className="px-4 py-3">
                              <LayananBadge layanan={t.layanan} />
                            </td>
                            <td className="px-4 py-3 text-right font-mono">{t.qty}</td>
                            <td className="px-4 py-3 text-right text-muted-foreground">{formatRp(t.harga)}</td>
                            <td className="px-4 py-3 text-right font-bold text-primary">{formatRp(t.total)}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-1">
                                <button onClick={() => handleEdit(t)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-all" title="Edit">
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all" title="Hapus">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                    {filteredTransaksi.length > 0 && (
                      <tfoot>
                        <tr className="bg-primary/5 font-bold">
                          <td colSpan={5} className="px-4 py-3 text-sm">Total Hari Ini</td>
                          <td className="px-4 py-3 text-right text-primary text-base">{formatRp(todayTotal)}</td>
                          <td />
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── PELANGGAN ──────────────────────────────────────────────────── */}
          {page === "pelanggan" && (
            <div className="space-y-5 max-w-5xl">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cari nama atau nomor HP..."
                    value={searchPelanggan}
                    onChange={(e) => setSearchPelanggan(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all"
                  />
                </div>
                <button
                  onClick={() => setShowAddPelanggan(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all"
                >
                  <Plus className="w-4 h-4" /> Tambah Pelanggan
                </button>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total Pelanggan", value: pelangganList.length },
                  { label: "Pelanggan Aktif", value: pelangganList.filter((p) => p.totalTransaksi > 0).length },
                  { label: "Rata-rata Belanja", value: formatRp(Math.round(pelangganList.reduce((s, p) => s + p.totalBelanja, 0) / pelangganList.length)) },
                  { label: "Pelanggan Baru (bulan ini)", value: 2 },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-4 border border-border">
                    <div className="text-xl font-bold text-primary" style={{ fontFamily: "'DM Serif Display', serif" }}>{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/50">
                        {["No", "Nama", "No. HP", "Alamat", "Total Transaksi", "Total Belanja", "Terakhir Order", "Aksi"].map((h) => (
                          <th key={h} className={`px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide whitespace-nowrap ${["Total Transaksi", "Total Belanja"].includes(h) ? "text-right" : h === "Aksi" ? "text-center" : "text-left"}`}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredPelanggan.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">Pelanggan tidak ditemukan.</td>
                        </tr>
                      ) : (
                        filteredPelanggan.map((p, i) => (
                          <tr key={p.id} className="hover:bg-secondary/30 transition-colors">
                            <td className="px-4 py-3 text-muted-foreground text-xs">{i + 1}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                  {p.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                </div>
                                <span className="font-semibold">{p.nama}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{p.telp}</td>
                            <td className="px-4 py-3 text-muted-foreground max-w-[160px] truncate">{p.alamat}</td>
                            <td className="px-4 py-3 text-right">
                              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">{p.totalTransaksi}x</span>
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-primary">{formatRp(p.totalBelanja)}</td>
                            <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                              {p.terakhirOrder !== "-" ? formatDate(p.terakhirOrder) : "-"}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-1">
                                <button onClick={() => setPelangganModal(p)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-all" title="Detail">
                                  <UserCheck className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => handleDeletePelanggan(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all" title="Hapus">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Modal: Detail Pelanggan ──────────────────────────────────────── */}
      {pelangganModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-bold text-foreground" style={{ fontFamily: "'DM Serif Display', serif" }}>Detail Pelanggan</h3>
              <button onClick={() => setPelangganModal(null)} className="p-1.5 rounded-lg hover:bg-secondary transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {pelangganModal.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">{pelangganModal.nama}</div>
                  <div className="text-sm text-muted-foreground">{pelangganModal.telp}</div>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Alamat</span><span className="font-semibold text-right max-w-[200px]">{pelangganModal.alamat}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total Transaksi</span><span className="font-bold text-primary">{pelangganModal.totalTransaksi}x</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total Belanja</span><span className="font-bold text-primary">{formatRp(pelangganModal.totalBelanja)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Terakhir Order</span><span className="font-semibold">{pelangganModal.terakhirOrder !== "-" ? formatDate(pelangganModal.terakhirOrder) : "-"}</span></div>
              </div>
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Riwayat Transaksi</div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {transaksiList.filter((t) => t.nama === pelangganModal.nama).map((t) => (
                    <div key={t.id} className="flex items-center justify-between text-sm bg-secondary/50 rounded-xl px-3 py-2">
                      <div>
                        <LayananBadge layanan={t.layanan} />
                        <div className="text-xs text-muted-foreground mt-0.5">{formatDate(t.tanggal)} · {t.qty} {t.layanan === "Cuci Kiloan" || t.layanan === "Cuci + Setrika" ? "kg" : "pcs"}</div>
                      </div>
                      <span className="font-bold text-primary">{formatRp(t.total)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Tambah Pelanggan ──────────────────────────────────────── */}
      {showAddPelanggan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-bold text-foreground" style={{ fontFamily: "'DM Serif Display', serif" }}>Tambah Pelanggan Baru</h3>
              <button onClick={() => setShowAddPelanggan(false)} className="p-1.5 rounded-lg hover:bg-secondary transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {[
                { key: "nama", label: "Nama Lengkap", placeholder: "Nama pelanggan" },
                { key: "telp", label: "No. HP", placeholder: "08xxxxxxxxxx" },
                { key: "alamat", label: "Alamat", placeholder: "Jl. ..." },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1.5">{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={pForm[f.key as keyof typeof pForm]}
                    onChange={(e) => setPForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-input-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all"
                  />
                </div>
              ))}
              <button
                onClick={handleAddPelanggan}
                disabled={!pForm.nama.trim()}
                className="w-full mt-2 py-2.5 rounded-xl bg-primary text-white font-bold text-sm disabled:opacity-40 hover:bg-primary/90 transition-all"
              >
                Simpan Pelanggan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LayananBadge ─────────────────────────────────────────────────────────────

function LayananBadge({ layanan }: { layanan: Layanan }) {
  const map: Record<Layanan, string> = {
    "Cuci Kiloan": "bg-blue-100 text-blue-700",
    "Cuci + Setrika": "bg-emerald-100 text-emerald-700",
    "Dry Cleaning": "bg-purple-100 text-purple-700",
    "Cuci Sepatu": "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${map[layanan]}`}>
      {layanan}
    </span>
  );
}
