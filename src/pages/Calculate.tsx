import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { CalculationForm } from "@/components/calculation/CalculationForm";
import { CalculationResults } from "@/components/calculation/CalculationResults";
import { 
  CalculationInputs, 
  CalculationResults as Results, 
  runFullCalculation 
} from "@/lib/calculations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Calculate() {
  const [results, setResults] = useState<Results | null>(null);
  const [inputs, setInputs] = useState<CalculationInputs | null>(null);

  const handleCalculate = (formInputs: CalculationInputs) => {
    setInputs(formInputs);
    const calculationResults = runFullCalculation(formInputs);
    setResults(calculationResults);
  };

  return (
    <MainLayout userName="Usuário">
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Novo Cálculo</h1>
          <p className="text-muted-foreground">
            Preencha os parâmetros para realizar a análise estrutural completa.
          </p>
        </div>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="form">Parâmetros</TabsTrigger>
            <TabsTrigger value="results" disabled={!results}>
              Resultados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="mt-6">
            <CalculationForm onCalculate={handleCalculate} />
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            {results && inputs && (
              <CalculationResults results={results} inputs={inputs} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
