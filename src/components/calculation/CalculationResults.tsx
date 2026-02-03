import { 
  CalculationInputs, 
  CalculationResults as Results,
  BRAZILIAN_CITIES,
} from "@/lib/calculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Activity, Droplets, Shield, Download, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface CalculationResultsProps {
  results: Results;
  inputs: CalculationInputs;
}

export function CalculationResults({ results, inputs }: CalculationResultsProps) {
  const cityData = BRAZILIAN_CITIES[inputs.city];

  const vulnerabilityData = [
    { name: "Vento", value: results.vulnerability.wind, color: "hsl(217, 91%, 60%)" },
    { name: "Sismo", value: results.vulnerability.seismic, color: "hsl(0, 84%, 60%)" },
    { name: "Inundação", value: results.vulnerability.flood, color: "hsl(38, 92%, 50%)" },
  ];

  const getStatusIcon = (status: "ok" | "warning" | "fail") => {
    switch (status) {
      case "ok":
        return <CheckCircle className="h-5 w-5" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "fail":
        return <XCircle className="h-5 w-5" />;
    }
  };

  const getStatusClass = (status: "ok" | "warning" | "fail") => {
    switch (status) {
      case "ok":
        return "status-success";
      case "warning":
        return "status-warning";
      case "fail":
        return "status-danger";
    }
  };

  const getResilienceColor = (value: number) => {
    if (value >= 70) return "text-success";
    if (value >= 40) return "text-warning";
    return "text-destructive";
  };

  const getResilienceGradient = (value: number) => {
    if (value >= 70) return "from-success to-success/50";
    if (value >= 40) return "from-warning to-warning/50";
    return "from-destructive to-destructive/50";
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho dos resultados */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Resultados da Análise</h2>
          <p className="text-muted-foreground">
            {inputs.city} | Altura: {inputs.height}m | {inputs.floors} pavimentos
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Cards principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Velocidade Característica
              </CardTitle>
              <Wind className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="value-highlight">{results.vk.toFixed(1)}</div>
            <p className="text-sm text-muted-foreground">m/s (Vk no topo)</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pressão Dinâmica
              </CardTitle>
              <Activity className="h-5 w-5 text-chart-seismic" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="value-highlight">{results.pressure.toFixed(0)}</div>
            <p className="text-sm text-muted-foreground">N/m² (q no topo)</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Força de Vento
              </CardTitle>
              <Wind className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="value-highlight">{results.windForce.toFixed(1)}</div>
            <p className="text-sm text-muted-foreground">kN (força total)</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Força Sísmica
              </CardTitle>
              <Activity className="h-5 w-5 text-chart-seismic" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="value-highlight">{results.seismicForce.toFixed(1)}</div>
            <p className="text-sm text-muted-foreground">
              kN {cityData?.seismicZone === 0 ? "(zona 0)" : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ELS Status */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Análise de Deslocamento (ELS)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Deslocamento no Topo</p>
              <p className="font-mono text-3xl font-bold">
                {results.displacement.toFixed(2)} <span className="text-lg">cm</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Limite Normativo (H/400)</p>
              <p className="font-mono text-3xl font-bold">
                {results.elsLimit.toFixed(2)} <span className="text-lg">cm</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Status</p>
              <div className={cn(getStatusClass(results.elsStatus))}>
                {getStatusIcon(results.elsStatus)}
                <span>
                  {results.elsStatus === "ok" && "Atende"}
                  {results.elsStatus === "warning" && "Verificar"}
                  {results.elsStatus === "fail" && "Não Atende"}
                </span>
                <span className="ml-2 font-mono">
                  ({(results.elsRatio * 100).toFixed(0)}%)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Perfil de Vento */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-primary" />
              Perfil de Vento por Altura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={results.windProfile}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <YAxis 
                    dataKey="height" 
                    type="number" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${value.toFixed(0)}m`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number, name: string) => [
                      name === "pressure" 
                        ? `${value.toFixed(0)} N/m²` 
                        : `${value.toFixed(1)} m/s`,
                      name === "pressure" ? "Pressão (q)" : "Velocidade (Vk)"
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="pressure"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Vulnerabilidades */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-chart-flood" />
              Distribuição de Vulnerabilidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vulnerabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {vulnerabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "Contribuição"]}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => (
                      <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Índice de Resiliência */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-chart-resilience" />
            Índice de Resiliência Estrutural
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative flex h-40 w-40 items-center justify-center">
              <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={
                    results.resilienceIndex >= 70 
                      ? "hsl(var(--success))" 
                      : results.resilienceIndex >= 40 
                        ? "hsl(var(--warning))" 
                        : "hsl(var(--destructive))"
                  }
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${results.resilienceIndex * 2.83} 283`}
                />
              </svg>
              <div className="text-center">
                <span className={cn(
                  "font-mono text-4xl font-bold",
                  getResilienceColor(results.resilienceIndex)
                )}>
                  {results.resilienceIndex.toFixed(0)}
                </span>
                <span className="text-muted-foreground">/100</span>
              </div>
            </div>
            <p className="mt-4 text-center text-muted-foreground">
              {results.resilienceIndex >= 70 && "Estrutura com alta resiliência"}
              {results.resilienceIndex >= 40 && results.resilienceIndex < 70 && "Estrutura com resiliência moderada"}
              {results.resilienceIndex < 40 && "Estrutura com baixa resiliência - verificar medidas de reforço"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
