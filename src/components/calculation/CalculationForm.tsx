import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  BRAZILIAN_CITIES,
  S2_CATEGORIES,
  S3_GROUPS,
  STRUCTURAL_MATERIALS,
  FOUNDATION_TYPES,
  SOIL_TYPES,
  CalculationInputs,
} from "@/lib/calculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Ruler, Wind, Building2, Layers, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  city: z.string().min(1, "Selecione uma cidade"),
  height: z.coerce.number().min(1, "Altura mínima é 1m").max(500, "Altura máxima é 500m"),
  width: z.coerce.number().min(1, "Largura mínima é 1m").max(200, "Largura máxima é 200m"),
  depth: z.coerce.number().min(1, "Profundidade mínima é 1m").max(200, "Profundidade máxima é 200m"),
  floors: z.coerce.number().min(1, "Mínimo 1 andar").max(150, "Máximo 150 andares"),
  s1: z.number().min(0.8).max(1.2),
  s2Category: z.string().min(1, "Selecione uma categoria"),
  s3Group: z.coerce.number().min(1).max(5),
  material: z.string().min(1, "Selecione um material"),
  foundation: z.string().min(1, "Selecione um tipo"),
  projectLevel: z.string().min(1, "Selecione o nível"),
  soilType: z.string().min(1, "Selecione o tipo de solo"),
  returnPeriod: z.coerce.number().min(10, "Mínimo 10 anos").max(1000, "Máximo 1000 anos"),
});

interface CalculationFormProps {
  onCalculate: (inputs: CalculationInputs) => void;
}

export function CalculationForm({ onCalculate }: CalculationFormProps) {
  const [s1Value, setS1Value] = useState(1.0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      height: 30,
      width: 15,
      depth: 15,
      floors: 10,
      s1: 1.0,
      s2Category: "III",
      s3Group: 2,
      material: "concrete",
      foundation: "estaca",
      projectLevel: "basic",
      soilType: "B",
      returnPeriod: 100,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onCalculate(values as CalculationInputs);
  };

  const selectedCity = form.watch("city");
  const cityData = selectedCity ? BRAZILIAN_CITIES[selectedCity] : null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Seção 1: Localização e Geometria */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Localização e Geometria</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="md:col-span-2 lg:col-span-1">
                  <FormLabel>Cidade</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a cidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(BRAZILIAN_CITIES).map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {cityData && (
                    <FormDescription>
                      V₀ = {cityData.v0} m/s | Zona sísmica: {cityData.seismicZone}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura (h)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="number" {...field} className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        m
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Largura (a)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="number" {...field} className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        m
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="depth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profundidade (b)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="number" {...field} className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        m
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="floors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Andares</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Seção 2: Parâmetros Normativos */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Wind className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Parâmetros Normativos (NBR 6123)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="s1"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Fator Topográfico S1</FormLabel>
                    <span className="font-mono text-sm font-medium text-primary">
                      {s1Value.toFixed(2)}
                    </span>
                  </div>
                  <FormControl>
                    <Slider
                      min={0.8}
                      max={1.2}
                      step={0.05}
                      value={[s1Value]}
                      onValueChange={(value) => {
                        setS1Value(value[0]);
                        field.onChange(value[0]);
                      }}
                      className="py-4"
                    />
                  </FormControl>
                  <FormDescription>
                    0.8 = Vale protegido | 1.0 = Terreno plano | 1.2 = Topo de morro
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="s2Category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria de Rugosidade S2</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
                    >
                      {S2_CATEGORIES.map((cat) => (
                        <Label
                          key={cat.id}
                          htmlFor={cat.id}
                          className={cn(
                            "flex cursor-pointer flex-col gap-1 rounded-lg border-2 p-4 transition-all hover:border-primary/50",
                            field.value === cat.id
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          )}
                        >
                          <RadioGroupItem
                            value={cat.id}
                            id={cat.id}
                            className="sr-only"
                          />
                          <span className="font-medium">{cat.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {cat.description}
                          </span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="s3Group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grupo de Ocupação S3</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grupo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {S3_GROUPS.map((group) => (
                        <SelectItem key={group.id} value={group.id.toString()}>
                          {group.name} - {group.description} (S3 = {group.factor})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Seção 3: Características Construtivas */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Características Construtivas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Estrutural</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid gap-3 md:grid-cols-3"
                    >
                      {STRUCTURAL_MATERIALS.map((mat) => (
                        <Label
                          key={mat.id}
                          htmlFor={mat.id}
                          className={cn(
                            "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all hover:border-primary/50",
                            field.value === mat.id
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          )}
                        >
                          <RadioGroupItem
                            value={mat.id}
                            id={mat.id}
                            className="sr-only"
                          />
                          <Building2 className="h-8 w-8 text-primary" />
                          <span className="font-medium">{mat.name}</span>
                          <span className="text-xs text-muted-foreground">
                            E = {mat.elasticity.toLocaleString()} MPa
                          </span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="foundation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Fundação</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FOUNDATION_TYPES.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name} - {type.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nível do Projeto</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Básico</SelectItem>
                        <SelectItem value="detailed">Detalhado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Seção 4: Solo e Risco */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Solo e Parâmetros de Risco</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="soilType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Solo (NBR 15421)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SOIL_TYPES.map((soil) => (
                        <SelectItem key={soil.id} value={soil.id}>
                          {soil.name} - {soil.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="returnPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-chart-flood" />
                    Período de Retorno (Inundação)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="number" {...field} className="pr-12" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        anos
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Período de retorno para cálculo do risco de inundação
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpar
          </Button>
          <Button type="submit" className="glow-primary">
            Calcular
          </Button>
        </div>
      </form>
    </Form>
  );
}
