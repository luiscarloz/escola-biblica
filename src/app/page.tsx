"use client";

import Image from "next/image";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { RevealText } from "@/components/ui/reveal-text";

const ENCONTROS = [
  "08/04", "15/04", "22/04", "29/04",
  "06/05", "13/05", "20/05", "27/05",
  "03/06", "10/06", "17/06", "24/06",
];

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    data_nascimento: "",
    tem_membresia: "",
    tempo_congrega: "",
    voluntario: "",
    area_voluntario: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: supabaseError } = await getSupabase()
      .from("inscricoes")
      .insert([
        {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          data_nascimento: formData.data_nascimento,
          tem_membresia: formData.tem_membresia,
          tempo_congrega: formData.tempo_congrega,
          voluntario: formData.voluntario,
          area_voluntario:
            formData.voluntario === "Sim" ? formData.area_voluntario : null,
        },
      ]);

    setLoading(false);

    if (supabaseError) {
      setError("Erro ao enviar inscrição. Tente novamente.");
      console.error(supabaseError);
    } else {
      setSuccess(true);
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative bg-olive-bg">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Escola Bíblica IIR Brasil"
            width={160}
            height={160}
            className="mb-10 drop-shadow-lg"
            priority
          />

          <h1 className="text-4xl md:text-6xl font-bold text-navy mb-3 tracking-tight">
            <RevealText text="Escola Bíblica" letterDelay={0.05} />
          </h1>

          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-olive/40" />
            <p className="text-olive text-lg md:text-xl font-semibold tracking-[0.25em] uppercase">
              IIR Brasil
            </p>
            <div className="h-px w-12 bg-olive/40" />
          </div>

          <p className="text-navy/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            12 semanas de estudo presencial da Palavra de Deus.
            <br className="hidden md:block" />
            De 8 de abril a 24 de junho, todas as quartas-feiras.
          </p>

          <a
            href="#inscricao"
            className="bg-navy text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-navy-light transition-all duration-300 shadow-lg shadow-navy/20"
          >
            Inscreva-se agora — é gratuito
          </a>
        </div>
      </section>

      {/* Sobre */}
      <section className="max-w-3xl mx-auto px-6 py-20 md:py-24">
        <div className="text-center mb-12">
          <p className="text-olive font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            Conheça o projeto
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            Sobre a Escola Bíblica
          </h2>
        </div>
        <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
          <p>
            A IIR é uma igreja que reconhece a Bíblia como a Palavra de Deus — o
            meio pelo qual Ele se revelou à humanidade. Acreditamos que as
            Escrituras são nossa única regra de fé e conduta, sendo interpretadas
            por si mesmas por meio do Espírito Santo, e não por opiniões humanas.
          </p>
          <p>
            Como comunidade, compreendemos que o relacionamento com Deus é a base
            para uma vida perseverante em Cristo; e a melhor forma de conhecê-Lo
            é através de Sua Palavra.
          </p>
          <p>
            Diante disso, apresentamos a{" "}
            <strong className="text-navy">Escola Bíblica IIR Brasil</strong>. A
            primeira etapa desta jornada começará no dia{" "}
            <strong>8 de abril</strong>, com duração de{" "}
            <strong>12 semanas</strong>. Nossos encontros presenciais ocorrerão
            todas as quartas-feiras, na igreja, das{" "}
            <strong>19h30 às 21h30</strong>.
          </p>
          <p>
            Estudar a Bíblia vai além de obter informações: trata-se de
            estabelecer um relacionamento com Aquele que a inspirou. Uma igreja
            que domina as Escrituras é uma igreja firmada sobre a Rocha, que não
            se deixa levar por ventos de doutrina.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-olive-bg/60 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-black/5">
              <div className="w-14 h-14 bg-navy/5 rounded-xl flex items-center justify-center mx-auto mb-5 text-2xl">
                📅
              </div>
              <h3 className="text-navy font-bold text-lg mb-2">Período</h3>
              <p className="text-foreground/60">08 de abril a 24 de junho</p>
              <p className="text-olive font-semibold text-sm mt-1">12 semanas</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-black/5">
              <div className="w-14 h-14 bg-navy/5 rounded-xl flex items-center justify-center mx-auto mb-5 text-2xl">
                🕖
              </div>
              <h3 className="text-navy font-bold text-lg mb-2">Horário</h3>
              <p className="text-foreground/60">Quartas-feiras</p>
              <p className="text-olive font-semibold text-sm mt-1">19h30 às 21h30</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-black/5">
              <div className="w-14 h-14 bg-navy/5 rounded-xl flex items-center justify-center mx-auto mb-5 text-2xl">
                📍
              </div>
              <h3 className="text-navy font-bold text-lg mb-2">Local</h3>
              <p className="text-foreground/60">IIR Brasil</p>
              <p className="text-olive font-semibold text-sm mt-1">Presencial</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendário */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-24">
        <div className="text-center mb-12">
          <p className="text-olive font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            Programação
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            Calendário de Encontros
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {ENCONTROS.map((data, i) => (
            <div
              key={data}
              className="bg-white border border-black/5 rounded-xl p-5 text-center shadow-sm hover:shadow-md hover:border-olive/30 transition-all duration-300"
            >
              <span className="text-olive font-bold text-xs tracking-wider uppercase">
                Semana {i + 1}
              </span>
              <p className="text-navy font-bold text-xl mt-2">{data}</p>
              <p className="text-foreground/40 text-sm mt-1">Quarta-feira</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulário de Inscrição */}
      <section id="inscricao" className="relative bg-navy py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-light/10 to-transparent" />
        <div className="relative max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Inscrição
            </h2>
            <p className="text-white/50 text-lg">
              Preencha o formulário abaixo para garantir sua vaga
            </p>
          </div>

          {success ? (
            <div className="bg-olive/15 border border-olive/30 rounded-2xl p-10 text-center backdrop-blur-sm">
              <div className="w-16 h-16 bg-olive/20 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
                ✅
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">
                Inscrição realizada!
              </h3>
              <p className="text-white/70 text-lg">
                Sua inscrição foi enviada com sucesso. Nos vemos no dia 8 de
                abril!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Nome completo *
                </label>
                <input
                  type="text"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-olive/60 focus:ring-1 focus:ring-olive/60 transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-olive/60 focus:ring-1 focus:ring-olive/60 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    required
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-olive/60 focus:ring-1 focus:ring-olive/60 transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Data de nascimento *
                  </label>
                  <input
                    type="date"
                    name="data_nascimento"
                    required
                    value={formData.data_nascimento}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-olive/60 focus:ring-1 focus:ring-olive/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Tem curso de membresia? *
                  </label>
                  <select
                    name="tem_membresia"
                    required
                    value={formData.tem_membresia}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-olive/60 focus:ring-1 focus:ring-olive/60 transition-colors"
                  >
                    <option value="" className="text-gray-900">Selecione</option>
                    <option value="Sim" className="text-gray-900">Sim</option>
                    <option value="Não" className="text-gray-900">Não</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Há quanto tempo congrega na IIR? *
                  </label>
                  <select
                    name="tempo_congrega"
                    required
                    value={formData.tempo_congrega}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-olive/60 focus:ring-1 focus:ring-olive/60 transition-colors"
                  >
                    <option value="" className="text-gray-900">Selecione</option>
                    <option value="Menos de 1 ano" className="text-gray-900">Menos de 1 ano</option>
                    <option value="1 a 2 anos" className="text-gray-900">1 a 2 anos</option>
                    <option value="3 a 5 anos" className="text-gray-900">3 a 5 anos</option>
                    <option value="Mais de 5 anos" className="text-gray-900">Mais de 5 anos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Você é voluntário? *
                  </label>
                  <select
                    name="voluntario"
                    required
                    value={formData.voluntario}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-olive/60 focus:ring-1 focus:ring-olive/60 transition-colors"
                  >
                    <option value="" className="text-gray-900">Selecione</option>
                    <option value="Sim" className="text-gray-900">Sim</option>
                    <option value="Não" className="text-gray-900">Não</option>
                  </select>
                </div>
              </div>

              {formData.voluntario === "Sim" && (
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    De qual área? *
                  </label>
                  <input
                    type="text"
                    name="area_voluntario"
                    required
                    value={formData.area_voluntario}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-olive/60 focus:ring-1 focus:ring-olive/60 transition-colors"
                    placeholder="Ex: Louvor, Kids, Mídia..."
                  />
                </div>
              )}

              {error && (
                <p className="text-red-300 text-sm bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-olive text-white py-4 rounded-xl text-lg font-semibold hover:bg-olive-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-lg shadow-black/20"
              >
                {loading ? "Enviando..." : "Confirmar inscrição"}
              </button>

              <p className="text-white/30 text-center text-xs mt-2">
                Suas informações estão seguras e não serão compartilhadas.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/30 text-sm">
            &copy; 2026 Escola Bíblica IIR Brasil. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
