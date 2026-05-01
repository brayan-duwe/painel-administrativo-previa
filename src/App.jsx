import { useState, createContext, useContext } from "react";

const THEMES = {
  dark: {
    bg: "#111", bgSurface: "#0a0a0a", bgCard: "rgba(255,255,255,0.03)", bgCardHover: "rgba(255,107,53,0.04)",
    bgInput: "rgba(255,255,255,0.04)", bgRow: "rgba(255,255,255,0.02)", bgTag: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.06)", borderHover: "rgba(255,107,53,0.3)", borderInput: "rgba(255,255,255,0.08)",
    text: "#fff", textSecondary: "rgba(255,255,255,0.5)", textTertiary: "rgba(255,255,255,0.35)", textHint: "rgba(255,255,255,0.4)",
    accent: "#FF6B35", accentBg: "rgba(255,107,53,0.15)", accentBorder: "rgba(255,107,53,0.3)",
    sidebarBg: "#0a0a0a", sidebarBorder: "rgba(255,255,255,0.06)",
    kpiValue: "#fff", chartBar: "rgba(255,107,53,0.25)", chartBarActive: "#FF6B35",
  },
  light: {
    bg: "#f5f5f0", bgSurface: "#fff", bgCard: "#fff", bgCardHover: "rgba(255,107,53,0.04)",
    bgInput: "#f0efe9", bgRow: "#fafaf7", bgTag: "#f0efe9",
    border: "#e5e4de", borderHover: "rgba(255,107,53,0.4)", borderInput: "#d5d4ce",
    text: "#1a1a1a", textSecondary: "#6b6b65", textTertiary: "#9a9a93", textHint: "#8a8a83",
    accent: "#E8551A", accentBg: "rgba(232,85,26,0.08)", accentBorder: "rgba(232,85,26,0.25)",
    sidebarBg: "#fff", sidebarBorder: "#e5e4de",
    kpiValue: "#1a1a1a", chartBar: "rgba(232,85,26,0.15)", chartBarActive: "#E8551A",
  }
};

const ThemeContext = createContext(THEMES.dark);
const useTheme = () => useContext(ThemeContext);

const MOCK_DATA = {
  kpis: { profissionais: 2847, pedidosHoje: 34, receitaMes: 48750, receitaDia: 2340, avaliacaoMedia: 4.8 },
  pendentes: [
    { id: 1, name: "Roberto Lima", category: "Pedreiro", city: "São Paulo", date: "2026-04-28", docs: ["CPF","RG","Comprovante"], tools: ["Betoneira 150L","Martelete","Nível a Laser","Serra Mármore"], status: "pendente" },
    { id: 2, name: "Carla Mendes", category: "Diarista", city: "Campinas", date: "2026-04-29", docs: ["CPF","RG"], tools: [], status: "pendente" },
    { id: 3, name: "Diego Farias", category: "Eletricista", city: "Guarulhos", date: "2026-04-30", docs: ["CPF","RG","CREA"], tools: ["Multímetro","Alicate Amperímetro"], status: "pendente" },
  ],
  profissionais: [
    { id: 10, name: "Carlos Mendes", category: "Eletricista", rating: 4.9, jobs: 142, city: "São Paulo", status: "ativo", revenue: 4200 },
    { id: 11, name: "Maria Souza", category: "Diarista", rating: 4.9, jobs: 312, city: "São Paulo", status: "ativo", revenue: 3800 },
    { id: 12, name: "Marcos Silva", category: "Pedreiro", rating: 4.7, jobs: 210, city: "São Paulo", status: "suspenso", revenue: 0 },
    { id: 13, name: "Ana Lima", category: "Pintor", rating: 5.0, jobs: 76, city: "São Paulo", status: "ativo", revenue: 2100 },
    { id: 14, name: "Anderson Rocha", category: "Frete", rating: 4.9, jobs: 245, city: "São Paulo", status: "ativo", revenue: 5600 },
  ],
  clientes: [
    { id: 20, name: "Fernanda Reis", email: "fernanda@email.com", services: 8, since: "2025-11", status: "ativo" },
    { id: 21, name: "Tiago Martins", email: "tiago@email.com", services: 3, since: "2026-01", status: "ativo" },
    { id: 22, name: "Luciana Porto", email: "luciana@email.com", services: 12, since: "2025-08", status: "bloqueado" },
  ],
  pedidos: [
    { id: 100, cliente: "Fernanda Reis", profissional: "Carlos Mendes", servico: "Instalação elétrica", valor: 480, status: "andamento", date: "2026-04-30" },
    { id: 101, cliente: "Tiago Martins", profissional: "Maria Souza", servico: "Faxina completa", valor: 180, status: "concluido", date: "2026-04-28" },
    { id: 102, cliente: "Fernanda Reis", profissional: "Anderson Rocha", servico: "Mudança residencial", valor: 950, status: "disputa", date: "2026-04-25" },
    { id: 103, cliente: "Tiago Martins", profissional: "Ana Lima", servico: "Pintura interna", valor: 1200, status: "andamento", date: "2026-04-29" },
  ],
  denuncias: [
    { id: 200, tipo: "avaliacao", autor: "Fernanda Reis", alvo: "Marcos Silva", motivo: "Avaliação falsa / spam", date: "2026-04-27", status: "pendente" },
    { id: 201, tipo: "profissional", autor: "Tiago Martins", alvo: "Anderson Rocha", motivo: "Cobrou valor diferente do orçamento", date: "2026-04-25", status: "pendente" },
  ],
  financeiro: {
    receitaSemanal: [12400, 15200, 9800, 11350],
    comissoes: { pedreiro: 12, eletricista: 12, pintor: 10, diarista: 8, frete: 15 },
    repassesPendentes: 3,
    totalRepasses: 8420,
    contasReceber: [
      { id: 400, descricao: "Comissão — Instalação elétrica", cliente: "Fernanda Reis", profissional: "Carlos Mendes", valor: 57.60, vencimento: "2026-05-05", status: "pendente" },
      { id: 401, descricao: "Comissão — Faxina completa", cliente: "Tiago Martins", profissional: "Maria Souza", valor: 14.40, vencimento: "2026-05-02", status: "recebido" },
      { id: 402, descricao: "Comissão — Mudança residencial", cliente: "Fernanda Reis", profissional: "Anderson Rocha", valor: 142.50, vencimento: "2026-04-30", status: "atrasado" },
      { id: 403, descricao: "Comissão — Pintura interna", cliente: "Tiago Martins", profissional: "Ana Lima", valor: 120.00, vencimento: "2026-05-08", status: "pendente" },
      { id: 404, descricao: "Taxa de destaque — Carlos Mendes", cliente: null, profissional: "Carlos Mendes", valor: 29.90, vencimento: "2026-05-01", status: "pendente" },
    ],
    contasPagar: [
      { id: 500, descricao: "Repasse — Carlos Mendes", fornecedor: "Carlos Mendes", categoria: "Repasse profissional", valor: 4200, vencimento: "2026-05-05", status: "pendente" },
      { id: 501, descricao: "Repasse — Maria Souza", fornecedor: "Maria Souza", categoria: "Repasse profissional", valor: 3800, vencimento: "2026-05-05", status: "pendente" },
      { id: 502, descricao: "Servidor e infraestrutura", fornecedor: "Supabase", categoria: "Infraestrutura", valor: 150, vencimento: "2026-05-01", status: "pago" },
      { id: 503, descricao: "Gateway de pagamento — Abril", fornecedor: "Pagar.me", categoria: "Taxas", valor: 487.30, vencimento: "2026-05-03", status: "pendente" },
      { id: 504, descricao: "Google Maps API — Abril", fornecedor: "Google Cloud", categoria: "Infraestrutura", valor: 210, vencimento: "2026-05-10", status: "pendente" },
      { id: 505, descricao: "Reembolso — Mudança (disputa)", fornecedor: "Fernanda Reis", categoria: "Reembolso", valor: 950, vencimento: "2026-05-02", status: "pendente" },
    ],
  },
  suporte: {
    tickets: [
      { id: 300, autor: "Fernanda Reis", tipo: "cliente", assunto: "Não consigo cancelar um serviço agendado", categoria: "Serviço", prioridade: "alta", status: "aberto", date: "2026-04-30", mensagens: 3 },
      { id: 301, autor: "Carlos Mendes", tipo: "profissional", assunto: "Pagamento não caiu na minha conta", categoria: "Financeiro", prioridade: "alta", status: "aberto", date: "2026-04-29", mensagens: 5 },
      { id: 302, autor: "Tiago Martins", tipo: "cliente", assunto: "App travando na tela de orçamento", categoria: "Bug", prioridade: "media", status: "andamento", date: "2026-04-28", mensagens: 2 },
      { id: 303, autor: "Ana Lima", tipo: "profissional", assunto: "Como altero minha categoria?", categoria: "Conta", prioridade: "baixa", status: "resolvido", date: "2026-04-27", mensagens: 4 },
      { id: 304, autor: "Sandra Oliveira", tipo: "profissional", assunto: "Cliente não estava no endereço combinado", categoria: "Serviço", prioridade: "media", status: "aberto", date: "2026-04-30", mensagens: 1 },
      { id: 305, autor: "Diego Farias", tipo: "profissional", assunto: "Meu cadastro foi reprovado sem motivo claro", categoria: "Conta", prioridade: "alta", status: "andamento", date: "2026-04-29", mensagens: 6 },
    ],
    faq: [
      { pergunta: "Como cancelo um serviço?", views: 342 },
      { pergunta: "Quando recebo meu pagamento?", views: 289 },
      { pergunta: "Como altero meus dados cadastrais?", views: 215 },
      { pergunta: "O que fazer se o profissional não aparecer?", views: 198 },
      { pergunta: "Como funciona a avaliação?", views: 156 },
    ],
  }
};

const STATUS_MAP = {
  ativo: { bg: "#0d3320", border: "#166534", text: "#4ade80", label: "Ativo" },
  suspenso: { bg: "#3b1414", border: "#7f1d1d", text: "#f87171", label: "Suspenso" },
  bloqueado: { bg: "#3b1414", border: "#7f1d1d", text: "#f87171", label: "Bloqueado" },
  pendente: { bg: "#362006", border: "#713f12", text: "#fbbf24", label: "Pendente" },
  andamento: { bg: "#0c2d48", border: "#1e4976", text: "#60a5fa", label: "Em andamento" },
  concluido: { bg: "#0d3320", border: "#166534", text: "#4ade80", label: "Concluído" },
  disputa: { bg: "#3b1414", border: "#7f1d1d", text: "#f87171", label: "Em disputa" },
  aberto: { bg: "#362006", border: "#713f12", text: "#fbbf24", label: "Aberto" },
  resolvido: { bg: "#0d3320", border: "#166534", text: "#4ade80", label: "Resolvido" },
  recebido: { bg: "#0d3320", border: "#166534", text: "#4ade80", label: "Recebido" },
  pago: { bg: "#0d3320", border: "#166534", text: "#4ade80", label: "Pago" },
  atrasado: { bg: "#3b1414", border: "#7f1d1d", text: "#f87171", label: "Atrasado" },
};

const Badge = ({ status }) => {
  const s = STATUS_MAP[status] || STATUS_MAP.pendente;
  return <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text, borderRadius: 100, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>{s.label}</span>;
};

const MENU = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "profissionais", icon: "👷", label: "Profissionais" },
  { id: "clientes", icon: "👥", label: "Clientes" },
  { id: "pedidos", icon: "📋", label: "Serviços" },
  { id: "financeiro", icon: "💰", label: "Financeiro" },
  { id: "suporte", icon: "🎧", label: "Suporte" },
  { id: "config", icon: "⚙️", label: "Configurações" },
];

function Sidebar({ active, setActive, darkMode, setDarkMode, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const t = useTheme();
  const w = collapsed ? 68 : 240;

  const handleNav = (id) => { setActive(id); setMobileOpen(false); };

  return (
    <>
      {mobileOpen && <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 49 }} />}
      <div style={{ width: w, minHeight: "100vh", background: t.sidebarBg, borderRight: `1px solid ${t.sidebarBorder}`, padding: "20px 0", display: "flex", flexDirection: "column", position: "fixed", left: mobileOpen ? 0 : undefined, top: 0, bottom: 0, zIndex: 50, transition: "width 0.2s", overflow: "hidden" }}>

        <div style={{ padding: collapsed ? "0 12px 20px" : "0 24px 28px", display: "flex", alignItems: "center", gap: 6, justifyContent: collapsed ? "center" : "flex-start" }}>
          {collapsed ? (
            <span style={{ fontSize: 20, fontWeight: 800, color: t.accent }}>R</span>
          ) : (
            <>
              <span style={{ fontSize: 20, fontWeight: 800, color: t.accent, letterSpacing: 2, whiteSpace: "nowrap" }}>REPAIR</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: t.text, letterSpacing: 2, whiteSpace: "nowrap" }}>PRO</span>
              <span style={{ fontSize: 10, background: t.accentBg, color: t.accent, padding: "2px 8px", borderRadius: 4, fontWeight: 700, marginLeft: 4, whiteSpace: "nowrap" }}>ADMIN</span>
            </>
          )}
        </div>

        {!mobileOpen && (
          <button onClick={() => setCollapsed(c => !c)} style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: collapsed ? "0 auto 12px" : "0 12px 12px 12px", width: collapsed ? 40 : "auto", padding: "6px 10px", border: `1px solid ${t.border}`, borderRadius: 8, cursor: "pointer", fontSize: 14, color: t.textTertiary, background: t.bgCard }}>
            {collapsed ? "→" : "← Recolher"}
          </button>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: collapsed ? "0 8px" : "0 12px" }}>
          {MENU.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)} title={collapsed ? item.label : undefined}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: collapsed ? "11px 0" : "11px 14px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: active === item.id ? 700 : 500, color: active === item.id ? t.text : t.textHint, background: active === item.id ? t.accentBg : "transparent", transition: "all 0.15s", textAlign: "left", justifyContent: collapsed ? "center" : "flex-start" }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {!collapsed && item.label}
              {!collapsed && active === item.id && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: t.accent }} />}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ padding: collapsed ? "0 8px" : "0 24px" }}>
            <button onClick={() => setDarkMode(m => !m)} title={collapsed ? (darkMode ? "Modo claro" : "Modo escuro") : undefined}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", padding: collapsed ? "10px 0" : "10px 14px", border: `1px solid ${t.border}`, borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, color: t.textSecondary, background: t.bgCard }}>
              <span>{collapsed ? (darkMode ? "🌙" : "☀️") : (darkMode ? "🌙 Escuro" : "☀️ Claro")}</span>
              {!collapsed && (
                <div style={{ width: 36, height: 20, borderRadius: 10, background: darkMode ? t.accent : t.borderInput, position: "relative", transition: "background 0.2s" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: darkMode ? 18 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                </div>
              )}
            </button>
          </div>
          <div style={{ padding: collapsed ? "14px 8px" : "14px 24px", borderTop: `1px solid ${t.sidebarBorder}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: t.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: t.accent, fontWeight: 700, flexShrink: 0 }}>B</div>
              {!collapsed && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.text, whiteSpace: "nowrap" }}>Brayan</div>
                  <div style={{ fontSize: 11, color: t.textTertiary, whiteSpace: "nowrap" }}>Administrador</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileHeader({ setMobileOpen }) {
  const t = useTheme();
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 40, background: t.bg, borderBottom: `1px solid ${t.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
      <button onClick={() => setMobileOpen(true)} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 22, cursor: "pointer", color: t.text, padding: "6px 10px", lineHeight: 1 }}>☰</button>
      <span style={{ fontSize: 16, fontWeight: 800, color: t.accent }}>REPAIR</span>
      <span style={{ fontSize: 16, fontWeight: 800, color: t.text }}>PRO</span>
      <span style={{ fontSize: 9, background: t.accentBg, color: t.accent, padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>ADMIN</span>
    </div>
  );
}

function KPICard({ icon, value, label, trend }) {
  const t = useTheme();
  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "20px 22px", flex: 1, minWidth: 180 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        {trend && <span style={{ fontSize: 11, fontWeight: 700, color: trend > 0 ? "#4ade80" : "#f87171" }}>{trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%</span>}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: t.kpiValue, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: t.textHint, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function DashboardPage({ setActive }) {
  const d = MOCK_DATA;
  const t = useTheme();
  const ticketsAbertos = d.suporte.tickets.filter(tk => tk.status === "aberto").length;
  const ticketsAndamento = d.suporte.tickets.filter(tk => tk.status === "andamento").length;
  const ticketsResolvidos = d.suporte.tickets.filter(tk => tk.status === "resolvido").length;
  const ticketsUrgentes = d.suporte.tickets.filter(tk => tk.prioridade === "alta" && tk.status !== "resolvido");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 4px" }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: t.textHint, margin: 0 }}>Resumo geral da plataforma</p>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="kpi-grid">
        <KPICard icon="👷" value={d.kpis.profissionais.toLocaleString()} label="Profissionais ativos" trend={8} />
        <KPICard icon="📋" value={d.kpis.pedidosHoje} label="Serviços hoje" trend={12} />
        <KPICard icon="💵" value={`R$ ${d.kpis.receitaDia.toLocaleString()}`} label="Receita do dia" trend={5} />
        <KPICard icon="💰" value={`R$ ${(d.kpis.receitaMes / 1000).toFixed(1)}k`} label="Receita do mês" trend={15} />
        <KPICard icon="⭐" value={d.kpis.avaliacaoMedia} label="Avaliação média" trend={2} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2col">
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>Cadastros pendentes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {d.pendentes.map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: t.bgRow, border: `1px solid ${t.border}`, borderRadius: 10 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: t.textHint }}>{p.category} · {p.city}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ background: "#166534", border: "none", borderRadius: 8, padding: "6px 14px", color: "#4ade80", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Aprovar</button>
                  <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 8, padding: "6px 14px", color: t.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Revisar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>Denúncias recentes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {d.denuncias.map(den => (
              <div key={den.id} style={{ padding: "12px 14px", background: t.bgRow, border: `1px solid ${t.border}`, borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{den.autor} → {den.alvo}</div>
                  <Badge status="pendente" />
                </div>
                <div style={{ fontSize: 12, color: t.textHint }}>{den.motivo}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                  <button style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}`, borderRadius: 8, padding: "5px 12px", color: t.accent, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Analisar</button>
                  <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 8, padding: "5px 12px", color: t.textHint, fontSize: 11, cursor: "pointer" }}>Ignorar</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: "14px", background: "rgba(255,60,60,0.06)", border: "1px solid rgba(255,60,60,0.15)", borderRadius: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f87171", marginBottom: 4 }}>Serviço em disputa</div>
            <div style={{ fontSize: 12, color: t.textSecondary }}>Fernanda Reis vs Anderson Rocha — Mudança residencial (R$ 950)</div>
            <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
              <button style={{ background: "#166534", border: "none", borderRadius: 8, padding: "5px 12px", color: "#4ade80", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Reembolso total</button>
              <button style={{ background: "rgba(255,190,36,0.15)", border: "1px solid rgba(255,190,36,0.3)", borderRadius: 8, padding: "5px 12px", color: "#fbbf24", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Acordo parcial</button>
              <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 8, padding: "5px 12px", color: t.textHint, fontSize: 11, cursor: "pointer" }}>Manter</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>🎧 Suporte</div>
          <button onClick={() => setActive("suporte")} style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}`, borderRadius: 8, padding: "6px 14px", color: t.accent, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            Ver todos os tickets →
          </button>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {[
            { label: "Abertos", value: ticketsAbertos, color: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
            { label: "Em atendimento", value: ticketsAndamento, color: "#60a5fa", bg: "rgba(96,165,250,0.08)" },
            { label: "Resolvidos", value: ticketsResolvidos, color: "#4ade80", bg: "rgba(74,222,128,0.08)" },
          ].map(item => (
            <div key={item.label} style={{ flex: 1, background: item.bg, border: `1px solid ${item.color}22`, borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: 11, color: t.textHint, fontWeight: 600, marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {ticketsUrgentes.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#f87171", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Tickets urgentes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ticketsUrgentes.map(t => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.12)", borderRadius: 10 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary }}>#{t.id}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{t.assunto}</span>
                    </div>
                    <div style={{ fontSize: 11, color: t.textTertiary, marginTop: 2 }}>
                      {t.autor} · {t.tipo === "cliente" ? "Cliente" : "Profissional"} · {t.categoria}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Badge status={t.status} />
                    <button onClick={() => setActive("suporte")} style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 6, padding: "5px 10px", color: t.textSecondary, fontSize: 11, cursor: "pointer" }}>Atender</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>Receita semanal</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140 }}>
          {["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map((label, i) => {
            const val = MOCK_DATA.financeiro.receitaSemanal[i];
            const max = Math.max(...MOCK_DATA.financeiro.receitaSemanal);
            const h = (val / max) * 110;
            return (
              <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary }}>R$ {(val/1000).toFixed(1)}k</span>
                <div style={{ width: "100%", height: h, background: i === 1 ? "#FF6B35" : "rgba(255,107,53,0.25)", borderRadius: 8, transition: "height 0.4s" }} />
                <span style={{ fontSize: 11, color: t.textTertiary }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProfissionaisPage() {
  const t = useTheme();
  const [tab, setTab] = useState("pendentes");
  const d = MOCK_DATA;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 4px" }}>Gestão de Profissionais</h1>
        <p style={{ fontSize: 14, color: t.textHint, margin: 0 }}>Cadastros, verificação e moderação</p>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[["pendentes","Cadastros Pendentes", d.pendentes.length],["ativos","Profissionais Ativos", d.profissionais.filter(p=>p.status==="ativo").length],["denuncias","Denúncias", d.denuncias.length]].map(([id, label, count]) => (
          <button key={id} onClick={() => setTab(id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, background: tab === id ? t.accent : t.bgTag, color: tab === id ? t.text : t.textSecondary, transition: "all 0.15s" }}>
            {label}
            <span style={{ background: tab === id ? "rgba(255,255,255,0.2)" : t.bgTag, borderRadius: 100, padding: "1px 8px", fontSize: 11 }}>{count}</span>
          </button>
        ))}
      </div>

      {tab === "pendentes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {d.pendentes.map(p => (
            <div key={p.id} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: t.text }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: t.accent, fontWeight: 600, marginTop: 2 }}>{p.category} · {p.city}</div>
                  <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 4 }}>Enviado em {p.date}</div>
                </div>
                <Badge status="pendente" />
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: t.textTertiary, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Documentos</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.docs.map(doc => (
                      <span key={doc} style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#60a5fa" }}>{doc}</span>
                    ))}
                  </div>
                </div>
                {p.tools.length > 0 && (
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: t.textTertiary, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Ferramentas</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tools.map(t => (
                        <span key={t} style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: t.accent }}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: 8, borderTop: `1px solid ${t.border}`, paddingTop: 14 }}>
                <button style={{ background: "#166534", border: "none", borderRadius: 10, padding: "9px 20px", color: "#4ade80", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Aprovar</button>
                <button style={{ background: "#7f1d1d", border: "none", borderRadius: 10, padding: "9px 20px", color: "#f87171", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Reprovar</button>
                <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 10, padding: "9px 20px", color: t.textSecondary, fontSize: 13, cursor: "pointer" }}>Solicitar correções</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "ativos" && (
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                {["Nome","Categoria","Cidade","Avaliação","Serviços","Receita","Status","Ações"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: t.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.profissionais.map(p => (
                <tr key={p.id} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: t.text }}>{p.name}</td>
                  <td style={{ padding: "12px 16px", color: t.accent }}>{p.category}</td>
                  <td style={{ padding: "12px 16px", color: t.textSecondary }}>{p.city}</td>
                  <td style={{ padding: "12px 16px", color: "#fbbf24" }}>⭐ {p.rating}</td>
                  <td style={{ padding: "12px 16px", color: t.textSecondary }}>{p.jobs}</td>
                  <td style={{ padding: "12px 16px", color: "#4ade80", fontWeight: 600 }}>R$ {p.revenue.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}><Badge status={p.status} /></td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 6, padding: "5px 10px", color: t.textSecondary, fontSize: 11, cursor: "pointer" }}>Ver</button>
                      <button style={{ background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.2)", borderRadius: 6, padding: "5px 10px", color: "#f87171", fontSize: 11, cursor: "pointer" }}>{p.status === "ativo" ? "Suspender" : "Reativar"}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "denuncias" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {d.denuncias.map(den => (
            <div key={den.id} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{den.autor} denunciou {den.alvo}</div>
                  <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 2 }}>{den.tipo === "avaliacao" ? "Denúncia de avaliação" : "Denúncia de profissional"} · {den.date}</div>
                </div>
                <Badge status="pendente" />
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 14, padding: "10px 14px", background: t.bgRow, borderRadius: 8 }}>"{den.motivo}"</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "#166534", border: "none", borderRadius: 8, padding: "8px 16px", color: "#4ade80", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{den.tipo === "avaliacao" ? "Remover avaliação" : "Suspender profissional"}</button>
                <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 8, padding: "8px 16px", color: t.textSecondary, fontSize: 12, cursor: "pointer" }}>Manter / Ignorar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ClientesPage() {
  const t = useTheme();
  const d = MOCK_DATA;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 4px" }}>Gestão de Clientes</h1>
        <p style={{ fontSize: 14, color: t.textHint, margin: 0 }}>Base de clientes, denúncias e bloqueios</p>
      </div>

      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input placeholder="Buscar por nome ou email..." style={{ background: t.bgInput, border: `1px solid ${t.borderInput}`, borderRadius: 8, padding: "8px 14px", color: t.text, fontSize: 13, outline: "none", width: 280 }} />
          <span style={{ fontSize: 12, color: t.textTertiary }}>{d.clientes.length} clientes</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}` }}>
              {["Nome","Email","Serviços","Desde","Status","Ações"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: t.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.clientes.map(c => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${t.border}` }}>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: t.text }}>{c.name}</td>
                <td style={{ padding: "12px 16px", color: t.textSecondary }}>{c.email}</td>
                <td style={{ padding: "12px 16px", color: t.textSecondary }}>{c.services}</td>
                <td style={{ padding: "12px 16px", color: t.textSecondary }}>{c.since}</td>
                <td style={{ padding: "12px 16px" }}><Badge status={c.status} /></td>
                <td style={{ padding: "12px 16px" }}>
                  <button style={{ background: c.status === "bloqueado" ? "rgba(74,222,128,0.1)" : "rgba(255,60,60,0.1)", border: `1px solid ${c.status === "bloqueado" ? "rgba(74,222,128,0.2)" : "rgba(255,60,60,0.2)"}`, borderRadius: 6, padding: "5px 10px", color: c.status === "bloqueado" ? "#4ade80" : "#f87171", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                    {c.status === "bloqueado" ? "Desbloquear" : "Bloquear"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PedidosPage() {
  const t = useTheme();
  const [filter, setFilter] = useState("todos");
  const d = MOCK_DATA;
  const filtered = filter === "todos" ? d.pedidos : d.pedidos.filter(p => p.status === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 4px" }}>Gestão de Serviços</h1>
        <p style={{ fontSize: 14, color: t.textHint, margin: 0 }}>Acompanhamento, disputas e histórico</p>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[["todos","Todos"],["andamento","Em andamento"],["concluido","Concluídos"],["disputa","Em disputa"]].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} style={{ padding: "9px 16px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, background: filter === id ? t.accent : t.bgTag, color: filter === id ? t.text : t.textSecondary }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: t.bgCard, border: `1px solid ${p.status === "disputa" ? "rgba(248,113,113,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{p.servico}</div>
              <div style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>
                {p.cliente} → {p.profissional} · {p.date}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: t.text }}>R$ {p.valor}</span>
              <Badge status={p.status} />
              {p.status === "disputa" && (
                <button style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}`, borderRadius: 8, padding: "7px 14px", color: t.accent, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Mediar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceiroPage() {
  const t = useTheme();
  const [tab, setTab] = useState("resumo");
  const d = MOCK_DATA;
  const fin = d.financeiro;

  const totalReceber = fin.contasReceber.filter(c => c.status !== "recebido").reduce((s, c) => s + c.valor, 0);
  const totalPagar = fin.contasPagar.filter(c => c.status !== "pago").reduce((s, c) => s + c.valor, 0);
  const atrasados = fin.contasReceber.filter(c => c.status === "atrasado").length + fin.contasPagar.filter(c => c.status === "atrasado").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 4px" }}>Financeiro</h1>
        <p style={{ fontSize: 14, color: t.textHint, margin: 0 }}>Receita, contas a pagar, contas a receber e comissões</p>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="kpi-grid">
        <KPICard icon="💰" value={`R$ ${(d.kpis.receitaMes/1000).toFixed(1)}k`} label="Receita total do mês" trend={15} />
        <KPICard icon="📥" value={`R$ ${totalReceber.toFixed(0)}`} label="A receber" />
        <KPICard icon="📤" value={`R$ ${(totalPagar/1000).toFixed(1)}k`} label="A pagar" />
        <KPICard icon="⚠️" value={atrasados} label="Atrasados" />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[["resumo","Resumo"],["receber","Contas a Receber"],["pagar","Contas a Pagar"],["comissoes","Comissões"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: "10px 18px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, background: tab === id ? t.accent : t.bgTag, color: tab === id ? t.text : t.textSecondary }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "resumo" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2col">
          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>Repasses pendentes</div>
            {d.profissionais.filter(p => p.status === "ativo" && p.revenue > 2000).map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: t.bgRow, borderRadius: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: t.textTertiary }}>{p.category}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#4ade80" }}>R$ {p.revenue.toLocaleString()}</span>
                  <button style={{ background: "#166534", border: "none", borderRadius: 8, padding: "6px 12px", color: "#4ade80", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Aprovar</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>Receita semanal</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140 }}>
              {["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map((label, i) => {
                const val = fin.receitaSemanal[i];
                const max = Math.max(...fin.receitaSemanal);
                const h = (val / max) * 110;
                return (
                  <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary }}>R$ {(val/1000).toFixed(1)}k</span>
                    <div style={{ width: "100%", height: h, background: i === 1 ? "#FF6B35" : "rgba(255,107,53,0.25)", borderRadius: 8 }} />
                    <span style={{ fontSize: 11, color: t.textTertiary }}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <button style={{ width: "100%", background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 10, padding: "12px", color: t.textHint, fontSize: 13, cursor: "pointer" }}>Exportar relatório financeiro completo — PDF / Excel</button>
          </div>
        </div>
      )}

      {tab === "receber" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 14, color: t.textSecondary }}>
              Total pendente: <span style={{ color: "#4ade80", fontWeight: 800 }}>R$ {totalReceber.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                  {["Descrição","Cliente","Profissional","Vencimento","Valor","Status","Ações"].map(h => (
                    <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: t.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fin.contasReceber.map(c => (
                  <tr key={c.id} style={{ borderBottom: `1px solid ${t.border}` }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: t.text, maxWidth: 200 }}>{c.descricao}</td>
                    <td style={{ padding: "12px 16px", color: t.textSecondary }}>{c.cliente || "—"}</td>
                    <td style={{ padding: "12px 16px", color: t.accent }}>{c.profissional}</td>
                    <td style={{ padding: "12px 16px", color: c.status === "atrasado" ? "#f87171" : "rgba(255,255,255,0.5)", fontWeight: c.status === "atrasado" ? 700 : 400 }}>{c.vencimento}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 800, color: "#4ade80" }}>R$ {c.valor.toFixed(2)}</td>
                    <td style={{ padding: "12px 16px" }}><Badge status={c.status} /></td>
                    <td style={{ padding: "12px 16px" }}>
                      {c.status === "pendente" && (
                        <button style={{ background: "#166534", border: "none", borderRadius: 6, padding: "5px 10px", color: "#4ade80", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Confirmar</button>
                      )}
                      {c.status === "atrasado" && (
                        <button style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 6, padding: "5px 10px", color: "#f87171", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Cobrar</button>
                      )}
                      {c.status === "recebido" && (
                        <span style={{ fontSize: 11, color: t.textTertiary }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "pagar" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 14, color: t.textSecondary }}>
              Total pendente: <span style={{ color: "#f87171", fontWeight: 800 }}>R$ {totalPagar.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
            <button style={{ background: t.accent, border: "none", borderRadius: 8, padding: "8px 16px", color: t.text, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ Nova conta</button>
          </div>

          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                  {["Descrição","Fornecedor / Destino","Categoria","Vencimento","Valor","Status","Ações"].map(h => (
                    <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: t.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fin.contasPagar.map(c => (
                  <tr key={c.id} style={{ borderBottom: `1px solid ${t.border}` }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: t.text, maxWidth: 200 }}>{c.descricao}</td>
                    <td style={{ padding: "12px 16px", color: t.textSecondary }}>{c.fornecedor}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: t.bgTag, borderRadius: 6, padding: "3px 8px", fontSize: 11, color: t.textSecondary }}>{c.categoria}</span>
                    </td>
                    <td style={{ padding: "12px 16px", color: t.textSecondary }}>{c.vencimento}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 800, color: "#f87171" }}>R$ {c.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: "12px 16px" }}><Badge status={c.status} /></td>
                    <td style={{ padding: "12px 16px" }}>
                      {c.status === "pendente" && (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button style={{ background: "#166534", border: "none", borderRadius: 6, padding: "5px 10px", color: "#4ade80", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Pagar</button>
                          <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 6, padding: "5px 10px", color: t.textHint, fontSize: 11, cursor: "pointer" }}>Adiar</button>
                        </div>
                      )}
                      {c.status === "pago" && (
                        <span style={{ fontSize: 11, color: t.textTertiary }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "comissoes" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2col">
          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>Taxa por categoria</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(fin.comissoes).map(([cat, pct]) => (
                <div key={cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: t.bgRow, borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: t.text, fontWeight: 600, textTransform: "capitalize" }}>{cat}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 100, height: 6, background: t.bgTag, borderRadius: 3 }}>
                      <div style={{ width: `${pct * 6}%`, height: "100%", background: t.accent, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: t.accent, minWidth: 35, textAlign: "right" }}>{pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>Receita por comissão — mês</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(fin.comissoes).map(([cat, pct]) => {
                const pros = d.profissionais.filter(p => p.category.toLowerCase() === cat && p.status === "ativo");
                const totalCat = pros.reduce((s, p) => s + p.revenue, 0);
                const comissao = totalCat * pct / 100;
                return (
                  <div key={cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: t.bgRow, borderRadius: 8 }}>
                    <div>
                      <span style={{ fontSize: 13, color: t.text, fontWeight: 600, textTransform: "capitalize" }}>{cat}</span>
                      <div style={{ fontSize: 11, color: t.textTertiary }}>Receita bruta: R$ {totalCat.toLocaleString()}</div>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#4ade80" }}>R$ {comissao.toFixed(0)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SuportePage() {
  const t = useTheme();
  const [tab, setTab] = useState("tickets");
  const [filter, setFilter] = useState("todos");
  const d = MOCK_DATA.suporte;

  const PRIORITY_MAP = {
    alta: { bg: "#3b1414", border: "#7f1d1d", text: "#f87171", label: "Alta" },
    media: { bg: "#362006", border: "#713f12", text: "#fbbf24", label: "Média" },
    baixa: { bg: "#0c2d48", border: "#1e4976", text: "#60a5fa", label: "Baixa" },
  };

  const filteredTickets = filter === "todos" ? d.tickets : d.tickets.filter(t => t.status === filter);
  const abertos = d.tickets.filter(t => t.status === "aberto").length;
  const emAndamento = d.tickets.filter(t => t.status === "andamento").length;
  const resolvidos = d.tickets.filter(t => t.status === "resolvido").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 4px" }}>Suporte</h1>
        <p style={{ fontSize: 14, color: t.textHint, margin: 0 }}>Tickets, atendimento e FAQ</p>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="kpi-grid">
        <KPICard icon="📩" value={abertos} label="Tickets abertos" />
        <KPICard icon="⏳" value={emAndamento} label="Em atendimento" />
        <KPICard icon="✅" value={resolvidos} label="Resolvidos este mês" />
        <KPICard icon="⏱️" value="2.4h" label="Tempo médio de resposta" />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[["tickets","Tickets"],["faq","FAQ / Base de conhecimento"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: "10px 18px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, background: tab === id ? t.accent : t.bgTag, color: tab === id ? t.text : t.textSecondary }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "tickets" && (
        <>
          <div style={{ display: "flex", gap: 8 }}>
            {[["todos","Todos", d.tickets.length],["aberto","Abertos", abertos],["andamento","Em atendimento", emAndamento],["resolvido","Resolvidos", resolvidos]].map(([id, label, count]) => (
              <button key={id} onClick={() => setFilter(id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, background: filter === id ? t.bgTag : t.bgCard, color: filter === id ? t.text : t.textHint }}>
                {label}
                <span style={{ background: t.bgTag, borderRadius: 100, padding: "1px 7px", fontSize: 11 }}>{count}</span>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredTickets.map(t => {
              const pri = PRIORITY_MAP[t.prioridade];
              return (
                <div key={t.id} style={{ background: t.bgCard, border: `1px solid ${t.prioridade === "alta" && t.status !== "resolvido" ? "rgba(248,113,113,0.15)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: t.text }}>#{t.id}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: t.tipo === "cliente" ? "#60a5fa" : "#FF6B35" }}>
                          {t.tipo === "cliente" ? "👤 Cliente" : "👷 Profissional"}
                        </span>
                        <span style={{ background: t.bgTag, borderRadius: 6, padding: "2px 8px", fontSize: 11, color: t.textSecondary }}>{t.categoria}</span>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 }}>{t.assunto}</div>
                      <div style={{ fontSize: 12, color: t.textTertiary }}>
                        Aberto por {t.autor} · {t.date} · {t.mensagens} mensagen{t.mensagens !== 1 ? "s" : ""}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                      <span style={{ background: pri.bg, border: `1px solid ${pri.border}`, color: pri.text, borderRadius: 100, padding: "3px 10px", fontSize: 10, fontWeight: 700 }}>{pri.label}</span>
                      <Badge status={t.status} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, borderTop: `1px solid ${t.border}`, paddingTop: 12 }}>
                    {t.status === "aberto" && (
                      <button style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}`, borderRadius: 8, padding: "7px 14px", color: t.accent, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Assumir ticket</button>
                    )}
                    {t.status === "andamento" && (
                      <button style={{ background: "#166534", border: "none", borderRadius: 8, padding: "7px 14px", color: "#4ade80", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Marcar resolvido</button>
                    )}
                    <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 8, padding: "7px 14px", color: t.textSecondary, fontSize: 12, cursor: "pointer" }}>Responder</button>
                    {t.status !== "resolvido" && (
                      <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 8, padding: "7px 14px", color: t.textHint, fontSize: 12, cursor: "pointer" }}>Escalar</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === "faq" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Perguntas frequentes</div>
              <button style={{ background: t.accent, border: "none", borderRadius: 8, padding: "8px 16px", color: t.text, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ Nova pergunta</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {d.faq.map((f, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: t.bgRow, border: `1px solid ${t.border}`, borderRadius: 10 }}>
                  <div style={{ fontSize: 14, color: t.text, fontWeight: 500 }}>{f.pergunta}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, color: t.textTertiary }}>{f.views} visualizações</span>
                    <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 6, padding: "5px 10px", color: t.textSecondary, fontSize: 11, cursor: "pointer" }}>Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,107,53,0.05)", border: "1px solid rgba(255,107,53,0.15)", borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.accent, marginBottom: 4 }}>Respostas automáticas</div>
            <div style={{ fontSize: 13, color: t.textSecondary, marginBottom: 14 }}>Configure mensagens automáticas para perguntas frequentes via chat e email</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 8, padding: "8px 16px", color: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer" }}>Gerenciar templates</button>
              <button style={{ background: t.bgTag, border: `1px solid ${t.borderInput}`, borderRadius: 8, padding: "8px 16px", color: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer" }}>Configurar chatbot</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ConfigPage() {
  const t = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 4px" }}>Configurações</h1>
        <p style={{ fontSize: 14, color: t.textHint, margin: 0 }}>Categorias, notificações e políticas</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2col">
        {[
          { icon: "📂", title: "Gestão de categorias", desc: "Adicionar, editar categorias e serviços" },
          { icon: "🔨", title: "Ferramentas obrigatórias", desc: "Definir ferramentas exigidas por categoria" },
          { icon: "🎨", title: "Materiais e marcas", desc: "Gerenciar marcas recomendadas por categoria" },
          { icon: "🔔", title: "Notificações push", desc: "Configurar templates e gatilhos de envio" },
          { icon: "📜", title: "Termos e políticas", desc: "Termos de uso, privacidade e condições" },
          { icon: "👤", title: "Gerenciar admins", desc: "Adicionar ou remover administradores" },
        ].map(item => (
          <div key={item.title} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22, cursor: "pointer", transition: "all 0.15s" }}
            onMouseOver={e => { e.currentTarget.style.borderColor = t.accentBorder; e.currentTarget.style.background = t.bgCardHover; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.bgCard; }}>
            <span style={{ fontSize: 28 }}>{item.icon}</span>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginTop: 12, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: t.textHint }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = darkMode ? THEMES.dark : THEMES.light;
  const sidebarWidth = collapsed ? 68 : 240;

  return (
    <ThemeContext.Provider value={theme}>
      <style>{`
        .mobile-header { display: none; }
        .mobile-overlay-bg { display: none; }
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .mobile-header { display: block !important; }
          .mobile-overlay-bg { display: block !important; }
          .main-content { margin-left: 0 !important; padding: 16px !important; }
          .main-content table { font-size: 12px !important; }
          .main-content table th, .main-content table td { padding: 8px 10px !important; }
          .kpi-grid { flex-direction: column !important; }
          .grid-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: theme.bg, color: theme.text, fontFamily: "'DM Sans',system-ui,sans-serif", transition: "background 0.3s, color 0.3s" }}>
        <div className="sidebar-desktop">
          <Sidebar active={active} setActive={setActive} darkMode={darkMode} setDarkMode={setDarkMode} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={false} setMobileOpen={setMobileOpen} />
        </div>
        {mobileOpen && (
          <div className="mobile-overlay-bg" style={{ position: "fixed", inset: 0, zIndex: 48, background: "rgba(0,0,0,0.5)" }} onClick={() => setMobileOpen(false)}>
            <div onClick={e => e.stopPropagation()} style={{ width: 240, height: "100%" }}>
              <Sidebar active={active} setActive={setActive} darkMode={darkMode} setDarkMode={setDarkMode} collapsed={false} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            </div>
          </div>
        )}
        <div className="main-content" style={{ marginLeft: sidebarWidth, flex: 1, padding: "32px 40px", transition: "margin-left 0.2s" }}>
          <div className="mobile-header">
            <MobileHeader setMobileOpen={setMobileOpen} />
          </div>
          {active === "dashboard" && <DashboardPage setActive={setActive} />}
          {active === "profissionais" && <ProfissionaisPage />}
          {active === "clientes" && <ClientesPage />}
          {active === "pedidos" && <PedidosPage />}
          {active === "financeiro" && <FinanceiroPage />}
          {active === "suporte" && <SuportePage />}
          {active === "config" && <ConfigPage />}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}