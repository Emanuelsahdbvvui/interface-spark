import { Calculator, History, TrendingUp, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Cálculos Realizados",
    value: "0",
    description: "Este mês",
    icon: Calculator,
    trend: "+0%",
  },
  {
    title: "Projetos Aprovados",
    value: "0",
    description: "ELS atendido",
    icon: TrendingUp,
    trend: "+0%",
  },
  {
    title: "Velocidade Média",
    value: "0 m/s",
    description: "Vk característica",
    icon: Wind,
    trend: "—",
  },
  {
    title: "Resiliência Média",
    value: "0%",
    description: "Índice geral",
    icon: History,
    trend: "—",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Bem-vindo à Calculadora Estrutural
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Realize análises de vento conforme NBR 6123, verificações sísmicas pela NBR 15421 
            e avalie a resiliência estrutural de edificações.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/calculate">
              <Button size="lg" className="gap-2 glow-primary">
                <Calculator className="h-5 w-5" />
                Novo Cálculo
              </Button>
            </Link>
            <Link to="/history">
              <Button size="lg" variant="outline" className="gap-2">
                <History className="h-5 w-5" />
                Ver Histórico
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
                <span className="ml-2 text-success">{stat.trend}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Ações Rápidas</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glass-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Wind className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Análise de Vento</CardTitle>
              <CardDescription>
                Cálculo de pressões dinâmicas e velocidade característica conforme NBR 6123.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/calculate">
                <Button variant="ghost" className="w-full justify-start">
                  Iniciar análise →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-seismic/10">
                <TrendingUp className="h-6 w-6 text-chart-seismic" />
              </div>
              <CardTitle className="mt-4">Verificação Sísmica</CardTitle>
              <CardDescription>
                Análise de forças sísmicas equivalentes segundo a NBR 15421.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/calculate">
                <Button variant="ghost" className="w-full justify-start">
                  Verificar estrutura →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-resilience/10">
                <Calculator className="h-6 w-6 text-chart-resilience" />
              </div>
              <CardTitle className="mt-4">Índice de Resiliência</CardTitle>
              <CardDescription>
                Avaliação completa da capacidade de resistência da edificação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/calculate">
                <Button variant="ghost" className="w-full justify-start">
                  Calcular índice →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Calculations - Placeholder */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Cálculos Recentes</h2>
          <Link to="/history">
            <Button variant="ghost" size="sm">
              Ver todos
            </Button>
          </Link>
        </div>
        <Card className="mt-4 glass-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <History className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-center text-muted-foreground">
              Nenhum cálculo realizado ainda.
              <br />
              <Link to="/calculate" className="text-primary hover:underline">
                Faça seu primeiro cálculo
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
