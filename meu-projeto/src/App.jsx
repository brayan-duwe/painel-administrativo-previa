import { useState } from "react";

const MOCK_DATA = {
  kpis: { profissionais: 2847, pedidosHoje: 34, receitaMes: 48750, avaliacaoMedia: 4.8 },
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

function Sidebar({ active, setActive }) {
  return (
    <div style={{ width: 240, minHeight: "100vh", background: "#0a0a0a", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px 0", display: "flex", flexDirection: "column", position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 50 }}>
      <div style={{ padding: "0 24px 28px", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: "#FF6B35", letterSpacing: 2 }}>REPAIR</span>
        <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: 2 }}>PRO</span>
        <span style={{ fontSize: 10, background: "rgba(255,107,53,0.2)", color: "#FF6B35", padding: "2px 8px", borderRadius: 4, fontWeight: 700, marginLeft: 4 }}>ADMIN</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 12px" }}>
        {MENU.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: active === item.id ? 700 : 500, color: active === item.id ? "#fff" : "rgba(255,255,255,0.45)", background: active === item.id ? "rgba(255,107,53,0.15)" : "transparent", transition: "all 0.15s", textAlign: "left" }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
            {active === item.id && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: "#FF6B35" }} />}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "auto", padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,107,53,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>B</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Brayan</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Administrador</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ icon, value, label, trend }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 22px", flex: 1, minWidth: 180 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        {trend && <span style={{ fontSize: 11, fontWeight: 700, color: trend > 0 ? "#4ade80" : "#f87171" }}>{trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%</span>}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function DashboardPage({ setActive }) {
  const d = MOCK_DATA;
  const ticketsAbertos = d.suporte.tickets.filter(t => t.status === "aberto").length;
  const ticketsAndamento = d.suporte.tickets.filter(t => t.status === "andamento").length;
  const ticketsResolvidos = d.suporte.tickets.filter(t => t.status === "resolvido").length;
  const ticketsUrgentes = d.suporte.tickets.filter(t => t.prioridade === "alta" && t.status !== "resolvido");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>Resumo geral da plataforma</p>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <KPICard icon="👷" value={d.kpis.profissionais.toLocaleString()} label="Profissionais ativos" trend={8} />
        <KPICard icon="📋" value={d.kpis.pedidosHoje} label="Serviços hoje" trend={12} />
        <KPICard icon="💰" value={`R$ ${(d.kpis.receitaMes / 1000).toFixed(1)}k`} label="Receita do mês" trend={15} />
        <KPICard icon="⭐" value={d.kpis.avaliacaoMedia} label="Avaliação média" trend={2} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Cadastros pendentes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {d.pendentes.map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{p.category} · {p.city}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ background: "#166534", border: "none", borderRadius: 8, padding: "6px 14px", color: "#4ade80", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Aprovar</button>
                  <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 14px", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Revisar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Denúncias recentes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {d.denuncias.map(den => (
              <div key={den.id} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{den.autor} → {den.alvo}</div>
                  <Badge status="pendente" />
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{den.motivo}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                  <button style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 8, padding: "5px 12px", color: "#FF6B35", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Analisar</button>
                  <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "5px 12px", color: "rgba(255,255,255,0.4)", fontSize: 11, cursor: "pointer" }}>Ignorar</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: "14px", background: "rgba(255,60,60,0.06)", border: "1px solid rgba(255,60,60,0.15)", borderRadius: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f87171", marginBottom: 4 }}>Serviço em disputa</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Fernanda Reis vs Anderson Rocha — Mudança residencial (R$ 950)</div>
            <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
              <button style={{ background: "#166534", border: "none", borderRadius: 8, padding: "5px 12px", color: "#4ade80", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Reembolso total</button>
              <button style={{ background: "rgba(255,190,36,0.15)", border: "1px solid rgba(255,190,36,0.3)", borderRadius: 8, padding: "5px 12px", color: "#fbbf24", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Acordo parcial</button>
              <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "5px 12px", color: "rgba(255,255,255,0.4)", fontSize: 11, cursor: "pointer" }}>Manter</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>🎧 Suporte</div>
          <button onClick={() => setActive("suporte")} style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 8, padding: "6px 14px", color: "#FF6B35", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
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
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, marginTop: 2 }}>{item.label}</div>
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
                      <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>#{t.id}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.assunto}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                      {t.autor} · {t.tipo === "cliente" ? "Cliente" : "Profissional"} · {t.categoria}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Badge status={t.status} />
                    <button onClick={() => setActive("suporte")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "5px 10px", color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer" }}>Atender</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Receita semanal</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140 }}>
          {["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map((label, i) => {
            const val = MOCK_DATA.financeiro.receitaSemanal[i];
            const max = Math.max(...MOCK_DATA.financeiro.receitaSemanal);
            const h = (val / max) * 110;
            return (
              <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>R$ {(val/1000).toFixed(1)}k</span>
                <div style={{ width: "100%", height: h, background: i === 1 ? "#FF6B35" : "rgba(255,107,53,0.25)", borderRadius: 8, transition: "height 0.4s" }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProfissionaisPage() {
  const [tab, setTab] = useState("pendentes");
  const d = MOCK_DATA;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Gestão de Profissionais</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>Cadastros, verificação e moderação</p>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[["pendentes","Cadastros Pendentes", d.pendentes.length],["ativos","Profissionais Ativos", d.profissionais.filter(p=>p.status==="ativo").length],["denuncias","Denúncias", d.denuncias.length]].map(([id, label, count]) => (
          <button key={id} onClick={() => setTab(id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, background: tab === id ? "#FF6B35" : "rgba(255,255,255,0.05)", color: tab === id ? "#fff" : "rgba(255,255,255,0.45)", transition: "all 0.15s" }}>
            {label}
            <span style={{ background: tab === id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)", borderRadius: 100, padding: "1px 8px", fontSize: 11 }}>{count}</span>
          </button>
        ))}
      </div>

      {tab === "pendentes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {d.pendentes.map(p => (
            <div key={p.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "#FF6B35", fontWeight: 600, marginTop: 2 }}>{p.category} · {p.city}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>Enviado em {p.date}</div>
                </div>
                <Badge status="pendente" />
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Documentos</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.docs.map(doc => (
                      <span key={doc} style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#60a5fa" }}>{doc}</span>
                    ))}
                  </div>
                </div>
                {p.tools.length > 0 && (
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Ferramentas</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tools.map(t => (
                        <span key={t} style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#FF6B35" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: 8, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14 }}>
                <button style={{ background: "#166534", border: "none", borderRadius: 10, padding: "9px 20px", color: "#4ade80", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Aprovar</button>
                <button style={{ background: "#7f1d1d", border: "none", borderRadius: 10, padding: "9px 20px", color: "#f87171", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Reprovar</button>
                <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "9px 20px", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer" }}>Solicitar correções</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "ativos" && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Nome","Categoria","Cidade","Avaliação","Serviços","Receita","Status","Ações"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.profissionais.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#fff" }}>{p.name}</td>
                  <td style={{ padding: "12px 16px", color: "#FF6B35" }}>{p.category}</td>
                  <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>{p.city}</td>
                  <td style={{ padding: "12px 16px", color: "#fbbf24" }}>⭐ {p.rating}</td>
                  <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>{p.jobs}</td>
                  <td style={{ padding: "12px 16px", color: "#4ade80", fontWeight: 600 }}>R$ {p.revenue.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}><Badge status={p.status} /></td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "5px 10px", color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer" }}>Ver</button>
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
            <div key={den.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{den.autor} denunciou {den.alvo}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{den.tipo === "avaliacao" ? "Denúncia de avaliação" : "Denúncia de profissional"} · {den.date}</div>
                </div>
                <Badge status="pendente" />
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 14, padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>"{den.motivo}"</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "#166534", border: "none", borderRadius: 8, padding: "8px 16px", color: "#4ade80", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{den.tipo === "avaliacao" ? "Remover avaliação" : "Suspender profissional"}</button>
                <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", color: "rgba(255,255,255,0.5)", fontSize: 12, cursor: "pointer" }}>Manter / Ignorar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ClientesPage() {
  const d = MOCK_DATA;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Gestão de Clientes</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>Base de clientes, denúncias e bloqueios</p>
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input placeholder="Buscar por nome ou email..." style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 13, outline: "none", width: 280 }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{d.clientes.length} clientes</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["Nome","Email","Serviços","Desde","Status","Ações"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.clientes.map(c => (
              <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: "#fff" }}>{c.name}</td>
                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>{c.email}</td>
                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>{c.services}</td>
                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>{c.since}</td>
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
  const [filter, setFilter] = useState("todos");
  const d = MOCK_DATA;
  const filtered = filter === "todos" ? d.pedidos : d.pedidos.filter(p => p.status === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Gestão de Serviços</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>Acompanhamento, disputas e histórico</p>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[["todos","Todos"],["andamento","Em andamento"],["concluido","Concluídos"],["disputa","Em disputa"]].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} style={{ padding: "9px 16px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, background: filter === id ? "#FF6B35" : "rgba(255,255,255,0.05)", color: filter === id ? "#fff" : "rgba(255,255,255,0.45)" }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${p.status === "disputa" ? "rgba(248,113,113,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{p.servico}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                {p.cliente} → {p.profissional} · {p.date}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>R$ {p.valor}</span>
              <Badge status={p.status} />
              {p.status === "disputa" && (
                <button style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 8, padding: "7px 14px", color: "#FF6B35", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Mediar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceiroPage() {
  const [tab, setTab] = useState("resumo");
  const d = MOCK_DATA;
  const fin = d.financeiro;

  const totalReceber = fin.contasReceber.filter(c => c.status !== "recebido").reduce((s, c) => s + c.valor, 0);
  const totalPagar = fin.contasPagar.filter(c => c.status !== "pago").reduce((s, c) => s + c.valor, 0);
  const atrasados = fin.contasReceber.filter(c => c.status === "atrasado").length + fin.contasPagar.filter(c => c.status === "atrasado").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Financeiro</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>Receita, contas a pagar, contas a receber e comissões</p>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <KPICard icon="💰" value={`R$ ${(d.kpis.receitaMes/1000).toFixed(1)}k`} label="Receita total do mês" trend={15} />
        <KPICard icon="📥" value={`R$ ${totalReceber.toFixed(0)}`} label="A receber" />
        <KPICard icon="📤" value={`R$ ${(totalPagar/1000).toFixed(1)}k`} label="A pagar" />
        <KPICard icon="⚠️" value={atrasados} label="Atrasados" />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[["resumo","Resumo"],["receber","Contas a Receber"],["pagar","Contas a Pagar"],["comissoes","Comissões"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: "10px 18px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, background: tab === id ? "#FF6B35" : "rgba(255,255,255,0.05)", color: tab === id ? "#fff" : "rgba(255,255,255,0.45)" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "resumo" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Repasses pendentes</div>
            {d.profissionais.filter(p => p.status === "ativo" && p.revenue > 2000).map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{p.category}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#4ade80" }}>R$ {p.revenue.toLocaleString()}</span>
                  <button style={{ background: "#166534", border: "none", borderRadius: 8, padding: "6px 12px", color: "#4ade80", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Aprovar</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Receita semanal</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140 }}>
              {["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map((label, i) => {
                const val = fin.receitaSemanal[i];
                const max = Math.max(...fin.receitaSemanal);
                const h = (val / max) * 110;
                return (
                  <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>R$ {(val/1000).toFixed(1)}k</span>
                    <div style={{ width: "100%", height: h, background: i === 1 ? "#FF6B35" : "rgba(255,107,53,0.25)", borderRadius: 8 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <button style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px", color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer" }}>Exportar relatório financeiro completo — PDF / Excel</button>
          </div>
        </div>
      )}

      {tab === "receber" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              Total pendente: <span style={{ color: "#4ade80", fontWeight: 800 }}>R$ {totalReceber.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Descrição","Cliente","Profissional","Vencimento","Valor","Status","Ações"].map(h => (
                    <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fin.contasReceber.map(c => (
                  <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "#fff", maxWidth: 200 }}>{c.descricao}</td>
                    <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>{c.cliente || "—"}</td>
                    <td style={{ padding: "12px 16px", color: "#FF6B35" }}>{c.profissional}</td>
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
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>—</span>
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
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              Total pendente: <span style={{ color: "#f87171", fontWeight: 800 }}>R$ {totalPagar.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
            <button style={{ background: "#FF6B35", border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ Nova conta</button>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Descrição","Fornecedor / Destino","Categoria","Vencimento","Valor","Status","Ações"].map(h => (
                    <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fin.contasPagar.map(c => (
                  <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "#fff", maxWidth: 200 }}>{c.descricao}</td>
                    <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>{c.fornecedor}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "3px 8px", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{c.categoria}</span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>{c.vencimento}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 800, color: "#f87171" }}>R$ {c.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: "12px 16px" }}><Badge status={c.status} /></td>
                    <td style={{ padding: "12px 16px" }}>
                      {c.status === "pendente" && (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button style={{ background: "#166534", border: "none", borderRadius: 6, padding: "5px 10px", color: "#4ade80", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Pagar</button>
                          <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "5px 10px", color: "rgba(255,255,255,0.4)", fontSize: 11, cursor: "pointer" }}>Adiar</button>
                        </div>
                      )}
                      {c.status === "pago" && (
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>—</span>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Taxa por categoria</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(fin.comissoes).map(([cat, pct]) => (
                <div key={cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: "#fff", fontWeight: 600, textTransform: "capitalize" }}>{cat}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 100, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                      <div style={{ width: `${pct * 6}%`, height: "100%", background: "#FF6B35", borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#FF6B35", minWidth: 35, textAlign: "right" }}>{pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Receita por comissão — mês</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(fin.comissoes).map(([cat, pct]) => {
                const pros = d.profissionais.filter(p => p.category.toLowerCase() === cat && p.status === "ativo");
                const totalCat = pros.reduce((s, p) => s + p.revenue, 0);
                const comissao = totalCat * pct / 100;
                return (
                  <div key={cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
                    <div>
                      <span style={{ fontSize: 13, color: "#fff", fontWeight: 600, textTransform: "capitalize" }}>{cat}</span>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Receita bruta: R$ {totalCat.toLocaleString()}</div>
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
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Suporte</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>Tickets, atendimento e FAQ</p>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <KPICard icon="📩" value={abertos} label="Tickets abertos" />
        <KPICard icon="⏳" value={emAndamento} label="Em atendimento" />
        <KPICard icon="✅" value={resolvidos} label="Resolvidos este mês" />
        <KPICard icon="⏱️" value="2.4h" label="Tempo médio de resposta" />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[["tickets","Tickets"],["faq","FAQ / Base de conhecimento"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: "10px 18px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, background: tab === id ? "#FF6B35" : "rgba(255,255,255,0.05)", color: tab === id ? "#fff" : "rgba(255,255,255,0.45)" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "tickets" && (
        <>
          <div style={{ display: "flex", gap: 8 }}>
            {[["todos","Todos", d.tickets.length],["aberto","Abertos", abertos],["andamento","Em atendimento", emAndamento],["resolvido","Resolvidos", resolvidos]].map(([id, label, count]) => (
              <button key={id} onClick={() => setFilter(id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, background: filter === id ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)", color: filter === id ? "#fff" : "rgba(255,255,255,0.4)" }}>
                {label}
                <span style={{ background: "rgba(255,255,255,0.08)", borderRadius: 100, padding: "1px 7px", fontSize: 11 }}>{count}</span>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredTickets.map(t => {
              const pri = PRIORITY_MAP[t.prioridade];
              return (
                <div key={t.id} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${t.prioridade === "alta" && t.status !== "resolvido" ? "rgba(248,113,113,0.15)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>#{t.id}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: t.tipo === "cliente" ? "#60a5fa" : "#FF6B35" }}>
                          {t.tipo === "cliente" ? "👤 Cliente" : "👷 Profissional"}
                        </span>
                        <span style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{t.categoria}</span>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{t.assunto}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                        Aberto por {t.autor} · {t.date} · {t.mensagens} mensagen{t.mensagens !== 1 ? "s" : ""}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                      <span style={{ background: pri.bg, border: `1px solid ${pri.border}`, color: pri.text, borderRadius: 100, padding: "3px 10px", fontSize: 10, fontWeight: 700 }}>{pri.label}</span>
                      <Badge status={t.status} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
                    {t.status === "aberto" && (
                      <button style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 8, padding: "7px 14px", color: "#FF6B35", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Assumir ticket</button>
                    )}
                    {t.status === "andamento" && (
                      <button style={{ background: "#166534", border: "none", borderRadius: 8, padding: "7px 14px", color: "#4ade80", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Marcar resolvido</button>
                    )}
                    <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 14px", color: "rgba(255,255,255,0.5)", fontSize: 12, cursor: "pointer" }}>Responder</button>
                    {t.status !== "resolvido" && (
                      <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 14px", color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer" }}>Escalar</button>
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
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Perguntas frequentes</div>
              <button style={{ background: "#FF6B35", border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ Nova pergunta</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {d.faq.map((f, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10 }}>
                  <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>{f.pergunta}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{f.views} visualizações</span>
                    <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "5px 10px", color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer" }}>Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,107,53,0.05)", border: "1px solid rgba(255,107,53,0.15)", borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#FF6B35", marginBottom: 4 }}>Respostas automáticas</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 14 }}>Configure mensagens automáticas para perguntas frequentes via chat e email</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", color: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer" }}>Gerenciar templates</button>
              <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", color: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer" }}>Configurar chatbot</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ConfigPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Configurações</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>Categorias, notificações e políticas</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { icon: "📂", title: "Gestão de categorias", desc: "Adicionar, editar categorias e serviços" },
          { icon: "🔨", title: "Ferramentas obrigatórias", desc: "Definir ferramentas exigidas por categoria" },
          { icon: "🎨", title: "Materiais e marcas", desc: "Gerenciar marcas recomendadas por categoria" },
          { icon: "🔔", title: "Notificações push", desc: "Configurar templates e gatilhos de envio" },
          { icon: "📜", title: "Termos e políticas", desc: "Termos de uso, privacidade e condições" },
          { icon: "👤", title: "Gerenciar admins", desc: "Adicionar ou remover administradores" },
        ].map(item => (
          <div key={item.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22, cursor: "pointer", transition: "all 0.15s" }}
            onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)"; e.currentTarget.style.background = "rgba(255,107,53,0.04)"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
            <span style={{ fontSize: 28 }}>{item.icon}</span>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 12, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#111", color: "#fff", fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <Sidebar active={active} setActive={setActive} />
      <div style={{ marginLeft: 240, flex: 1, padding: "32px 40px" }}>
        {active === "dashboard" && <DashboardPage setActive={setActive} />}
        {active === "profissionais" && <ProfissionaisPage />}
        {active === "clientes" && <ClientesPage />}
        {active === "pedidos" && <PedidosPage />}
        {active === "financeiro" && <FinanceiroPage />}
        {active === "suporte" && <SuportePage />}
        {active === "config" && <ConfigPage />}
      </div>
    </div>
  );
}
