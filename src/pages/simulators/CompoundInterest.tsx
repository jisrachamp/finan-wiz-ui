import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CompoundInterest = () => {
  const navigate = useNavigate();
  const [initialCapital, setInitialCapital] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState<any>(null);

  const calculateCompound = () => {
    const P = parseFloat(initialCapital) || 0;
    const PMT = parseFloat(monthlyDeposit) || 0;
    const r = parseFloat(annualRate) / 100;
    const t = parseFloat(years);
    const n = parseInt(frequency);

    if (!t || !r) return;

    // Future value of principal: FV = P * (1 + r/n)^(n*t)
    const futureValuePrincipal = P * Math.pow(1 + r / n, n * t);

    // Future value of annuity (monthly deposits)
    // FV = PMT * [((1 + r/n)^(n*t) - 1) / (r/n)] * (1 + r/n)
    const monthsPerYear = 12;
    const totalMonths = t * monthsPerYear;
    const monthlyRate = r / monthsPerYear;
    const futureValueAnnuity = PMT > 0 
      ? PMT * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate))
      : 0;

    const totalValue = futureValuePrincipal + futureValueAnnuity;
    const totalDeposited = P + (PMT * totalMonths);
    const totalInterest = totalValue - totalDeposited;
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

    setResult({
      totalValue,
      totalDeposited,
      totalInterest,
      effectiveRate
    });
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      <header className="bg-gradient-primary text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/simulators")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Percent className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Interés Compuesto</h1>
        </div>
        <p className="text-white/80 ml-14">Simula el crecimiento de tu inversión</p>
      </header>

      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Parámetros de inversión</CardTitle>
            <CardDescription>Ingresa los datos de tu inversión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="initialCapital">Capital inicial ($)</Label>
              <Input
                id="initialCapital"
                type="number"
                placeholder="10000"
                value={initialCapital}
                onChange={(e) => setInitialCapital(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyDeposit">Depósito mensual ($)</Label>
              <Input
                id="monthlyDeposit"
                type="number"
                placeholder="1000"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRate">Tasa de interés anual (%)</Label>
              <Input
                id="annualRate"
                type="number"
                step="0.1"
                placeholder="8.0"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Plazo (años)</Label>
              <Input
                id="years"
                type="number"
                placeholder="5"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frecuencia de capitalización</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Anual</SelectItem>
                  <SelectItem value="2">Semestral</SelectItem>
                  <SelectItem value="4">Trimestral</SelectItem>
                  <SelectItem value="12">Mensual</SelectItem>
                  <SelectItem value="365">Diaria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateCompound} className="w-full">
              Calcular
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-success">
            <CardHeader>
              <CardTitle>Resultados de la inversión</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-success/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Valor futuro</p>
                <p className="text-3xl font-bold text-success">
                  ${result.totalValue.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total depositado</span>
                  <span className="font-semibold">${result.totalDeposited.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Intereses ganados</span>
                  <span className="font-semibold text-success">${result.totalInterest.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tasa efectiva anual</span>
                  <span className="font-semibold">{result.effectiveRate.toFixed(2)}%</span>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg text-xs">
                <p className="font-semibold mb-1">💡 Tip:</p>
                <p className="text-muted-foreground">
                  El interés compuesto hace que tu dinero crezca exponencialmente. Mientras más tiempo dejes tu inversión, mayor será el rendimiento.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default CompoundInterest;
