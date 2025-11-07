import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Debt {
  id: number;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

const DebtPayoff = () => {
  const navigate = useNavigate();
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: "", balance: 0, rate: 0, minPayment: 0 }
  ]);
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [result, setResult] = useState<any>(null);

  const addDebt = () => {
    setDebts([...debts, { id: Date.now(), name: "", balance: 0, rate: 0, minPayment: 0 }]);
  };

  const removeDebt = (id: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter(d => d.id !== id));
    }
  };

  const updateDebt = (id: number, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const calculatePayoff = () => {
    const budget = parseFloat(monthlyBudget);
    const validDebts = debts.filter(d => d.balance > 0 && d.rate >= 0 && d.minPayment > 0);
    
    if (!budget || validDebts.length === 0) return;

    // Avalanche method: highest rate first
    const avalanche = [...validDebts].sort((a, b) => b.rate - a.rate);
    const avalancheResult = simulatePayoff(avalanche, budget);

    // Snowball method: lowest balance first
    const snowball = [...validDebts].sort((a, b) => a.balance - b.balance);
    const snowballResult = simulatePayoff(snowball, budget);

    setResult({
      avalanche: avalancheResult,
      snowball: snowballResult,
      totalDebt: validDebts.reduce((sum, d) => sum + d.balance, 0)
    });
  };

  const simulatePayoff = (orderedDebts: Debt[], budget: number) => {
    let debtsRemaining = orderedDebts.map(d => ({ ...d }));
    let months = 0;
    let totalInterest = 0;
    const maxMonths = 600;

    while (debtsRemaining.length > 0 && months < maxMonths) {
      months++;
      let remainingBudget = budget;

      // Pay minimum on all debts
      debtsRemaining.forEach(debt => {
        const monthlyRate = debt.rate / 100 / 12;
        const interest = debt.balance * monthlyRate;
        totalInterest += interest;
        
        const payment = Math.min(debt.minPayment, debt.balance + interest);
        debt.balance = debt.balance + interest - payment;
        remainingBudget -= payment;
      });

      // Apply extra to first debt
      if (remainingBudget > 0 && debtsRemaining.length > 0) {
        const firstDebt = debtsRemaining[0];
        const extraPayment = Math.min(remainingBudget, firstDebt.balance);
        firstDebt.balance -= extraPayment;
      }

      // Remove paid debts
      debtsRemaining = debtsRemaining.filter(d => d.balance > 0.01);
    }

    return {
      months: months >= maxMonths ? "No se completa" : months,
      totalInterest,
      order: orderedDebts.map(d => d.name || "Deuda")
    };
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
          <Target className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Pago de Deudas</h1>
        </div>
        <p className="text-white/80 ml-14">Optimiza tu estrategia de pago</p>
      </header>

      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Tus deudas</CardTitle>
            <CardDescription>Registra todas tus deudas pendientes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {debts.map((debt, index) => (
              <Card key={debt.id} className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Deuda #{index + 1}</span>
                  {debts.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDebt(debt.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Nombre (ej: Tarjeta Bancomer)"
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Saldo ($)"
                    value={debt.balance || ''}
                    onChange={(e) => updateDebt(debt.id, 'balance', parseFloat(e.target.value) || 0)}
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Tasa anual (%)"
                    value={debt.rate || ''}
                    onChange={(e) => updateDebt(debt.id, 'rate', parseFloat(e.target.value) || 0)}
                  />
                  <Input
                    type="number"
                    placeholder="Pago mínimo ($)"
                    value={debt.minPayment || ''}
                    onChange={(e) => updateDebt(debt.id, 'minPayment', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </Card>
            ))}

            <Button onClick={addDebt} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Agregar otra deuda
            </Button>

            <div className="space-y-2 pt-4 border-t">
              <Label htmlFor="monthlyBudget">Presupuesto mensual total ($)</Label>
              <Input
                id="monthlyBudget"
                type="number"
                placeholder="5000"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Cantidad total que puedes destinar al pago de deudas cada mes
              </p>
            </div>

            <Button onClick={calculatePayoff} className="w-full">
              Calcular estrategia
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle>Estrategias de pago</CardTitle>
              <CardDescription>Compara ambos métodos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded-lg mb-4">
                <p className="text-sm font-semibold">Deuda total</p>
                <p className="text-2xl font-bold">${result.totalDebt.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</p>
              </div>

              <Tabs defaultValue="avalanche" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="avalanche">Avalancha</TabsTrigger>
                  <TabsTrigger value="snowball">Bola de nieve</TabsTrigger>
                </TabsList>
                
                <TabsContent value="avalanche" className="space-y-3">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Tiempo de pago</p>
                    <p className="text-2xl font-bold text-primary">{result.avalanche.months} meses</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Intereses totales</span>
                    <span className="font-semibold">${result.avalanche.totalInterest.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-xs">
                    <p className="font-semibold mb-1">📊 Método Avalancha:</p>
                    <p className="text-muted-foreground mb-2">
                      Paga primero las deudas con mayor tasa de interés. Es el método matemáticamente óptimo para minimizar intereses.
                    </p>
                    <p className="font-semibold text-xs">Orden de pago:</p>
                    <ol className="list-decimal list-inside text-muted-foreground">
                      {result.avalanche.order.map((name: string, i: number) => (
                        <li key={i}>{name}</li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>

                <TabsContent value="snowball" className="space-y-3">
                  <div className="bg-secondary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Tiempo de pago</p>
                    <p className="text-2xl font-bold text-secondary">{result.snowball.months} meses</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Intereses totales</span>
                    <span className="font-semibold">${result.snowball.totalInterest.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-xs">
                    <p className="font-semibold mb-1">⛄ Método Bola de Nieve:</p>
                    <p className="text-muted-foreground mb-2">
                      Paga primero las deudas más pequeñas. Genera victorias rápidas y motivación psicológica.
                    </p>
                    <p className="font-semibold text-xs">Orden de pago:</p>
                    <ol className="list-decimal list-inside text-muted-foreground">
                      {result.snowball.order.map((name: string, i: number) => (
                        <li key={i}>{name}</li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default DebtPayoff;
