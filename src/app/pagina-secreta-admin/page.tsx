"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

interface Inscricao {
  id: number;
  created_at: string;
  nome: string;
  email: string;
  telefone: string;
  data_nascimento: string;
  tem_membresia: string;
  tempo_congrega: string;
  voluntario: string;
  area_voluntario: string | null;
}

export default function AdminPage() {
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await getSupabase()
        .from("inscricoes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Erro ao carregar inscrições.");
        console.error(error);
      } else {
        setInscricoes(data || []);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const totalInscritos = inscricoes.length;
  const comMembresia = inscricoes.filter((i) => i.tem_membresia === "Sim").length;
  const semMembresia = totalInscritos - comMembresia;
  const voluntarios = inscricoes.filter((i) => i.voluntario === "Sim").length;

  const porTempo: Record<string, number> = {};
  inscricoes.forEach((i) => {
    porTempo[i.tempo_congrega] = (porTempo[i.tempo_congrega] || 0) + 1;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-navy text-lg">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
          Painel de Inscrições
        </h1>
        <p className="text-foreground/50 mb-10">Escola Bíblica IIR Brasil</p>

        {/* Resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <p className="text-foreground/50 text-sm mb-1">Total de inscritos</p>
            <p className="text-navy text-3xl font-bold">{totalInscritos}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <p className="text-foreground/50 text-sm mb-1">Com membresia</p>
            <p className="text-olive text-3xl font-bold">{comMembresia}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <p className="text-foreground/50 text-sm mb-1">Sem membresia</p>
            <p className="text-navy text-3xl font-bold">{semMembresia}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <p className="text-foreground/50 text-sm mb-1">Voluntários</p>
            <p className="text-olive text-3xl font-bold">{voluntarios}</p>
          </div>
        </div>

        {/* Tempo na igreja */}
        {Object.keys(porTempo).length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm mb-12">
            <h2 className="text-lg font-bold text-navy mb-4">Tempo que congrega na IIR</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(porTempo).map(([tempo, count]) => (
                <div key={tempo} className="bg-olive-bg/60 rounded-xl p-4 text-center">
                  <p className="text-navy font-bold text-xl">{count}</p>
                  <p className="text-foreground/50 text-sm">{tempo}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabela */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-black/5">
            <h2 className="text-lg font-bold text-navy">
              Todos os inscritos ({totalInscritos})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-olive-bg/40 text-navy">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">E-mail</th>
                  <th className="px-4 py-3 font-semibold">Telefone</th>
                  <th className="px-4 py-3 font-semibold">Nascimento</th>
                  <th className="px-4 py-3 font-semibold">Membresia</th>
                  <th className="px-4 py-3 font-semibold">Tempo na IIR</th>
                  <th className="px-4 py-3 font-semibold">Voluntário</th>
                  <th className="px-4 py-3 font-semibold">Área</th>
                  <th className="px-4 py-3 font-semibold">Inscrito em</th>
                </tr>
              </thead>
              <tbody>
                {inscricoes.map((i, idx) => (
                  <tr
                    key={i.id}
                    className="border-b border-black/5 hover:bg-olive-bg/20 transition-colors"
                  >
                    <td className="px-4 py-3 text-foreground/40">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-navy">{i.nome}</td>
                    <td className="px-4 py-3 text-foreground/70">{i.email}</td>
                    <td className="px-4 py-3 text-foreground/70">{i.telefone}</td>
                    <td className="px-4 py-3 text-foreground/70">
                      {i.data_nascimento
                        ? new Date(i.data_nascimento + "T12:00:00").toLocaleDateString("pt-BR")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          i.tem_membresia === "Sim"
                            ? "bg-olive/10 text-olive"
                            : "bg-navy/10 text-navy"
                        }`}
                      >
                        {i.tem_membresia}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground/70">{i.tempo_congrega}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          i.voluntario === "Sim"
                            ? "bg-olive/10 text-olive"
                            : "bg-foreground/5 text-foreground/50"
                        }`}
                      >
                        {i.voluntario}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground/70">
                      {i.area_voluntario || "—"}
                    </td>
                    <td className="px-4 py-3 text-foreground/50 text-xs">
                      {new Date(i.created_at).toLocaleDateString("pt-BR")}{" "}
                      {new Date(i.created_at).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
                {inscricoes.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-foreground/40">
                      Nenhuma inscrição encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
