import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";

const SavingsPlan = () => {
  const navigate = useNavigate();
  const [goalAmount, setGoalAmount] = useState("");
  const [months, setMonths] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateSavingsPlan = () => {
    const goal = parseFloat(goalAmount);
    const term = parseInt(months);
    const initial = parseFloat(initialAmount) || 0;
    const rate = parseFloat(annualRate) / 100 / 12;

    if (!goal || !term) return;

    // Future value of annuity formula: FV = P * [((1 + r)^n - 1) / r] + PV * (1 + r)^n
    // Solving for P (periodic payment): P = (FV - PV * (1 + r)^n) / [((1 + r)^n - 1) / r]
    
    const futureValueOfInitial = initial * Math.pow(1 + rate, term);
    const remainingGoal = goal - futureValueOfInitial;
    
    let monthlyDeposit = 0;
    if (rate > 0) {
      monthlyDeposit = remainingGoal / (((Math.pow(1 + rate, term) - 1) / rate));
    } else {
      monthlyDeposit = remainingGoal / term;
    }

    const totalDeposited = initial + (monthlyDeposit * term);
    const totalReturn = goal - totalDeposited;

    setResult({
      monthlyDeposit: monthlyDeposit > 0 ? monthlyDeposit : 0,
      totalDeposited,
      totalReturn: totalReturn > 0 ? totalReturn : 0,
      achievable: monthlyDeposit > 0
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
          <PiggyBank className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Plan de Ahorro</h1>
        </div>
        <p className="text-white/80 ml-14">Calcula cuánto necesitas ahorrar mensualmente</p>
      </header>

      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configura tu meta</CardTitle>
            <CardDescription>Ingresa los datos de tu objetivo de ahorro</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goalAmount">Monto de la meta ($)</Label>
              <Input
                id="goalAmount"
                type="number"
                placeholder="50000"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="months">Plazo (meses)</Label>
              <Input
                id="months"
                type="number"
                placeholder="12"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialAmount">Ahorro inicial ($)</Label>
              <Input
                id="initialAmount"
                type="number"
                placeholder="0"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRate">Tasa anual esperada (%)</Label>
              <Input
                id="annualRate"
                type="number"
                step="0.1"
                placeholder="5.0"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Rendimiento anual esperado de tu inversión
              </p>
            </div>

            <Button onClick={calculateSavingsPlan} className="w-full">
              Calcular
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Depósito mensual requerido</p>
                <p className="text-3xl font-bold text-primary">
                  ${result.monthlyDeposit.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total depositado</span>
                  <span className="font-semibold">${result.totalDeposited.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Rendimiento estimado</span>
                  <span className="font-semibold text-success">${result.totalReturn.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Meta final</span>
                  <span className="font-bold">${parseFloat(goalAmount).toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <Progress value={100} className="h-2" />
              
              {result.achievable && (
                <p className="text-sm text-success text-center">
                  ✓ Meta alcanzable con este plan
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default SavingsPlan;
