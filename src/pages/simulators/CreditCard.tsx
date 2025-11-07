import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard as CreditCardIcon, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CreditCard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [minimumPayment, setMinimumPayment] = useState("");
  const [fixedPayment, setFixedPayment] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateCreditCard = () => {
    const bal = parseFloat(balance);
    const rate = parseFloat(annualRate) / 100 / 12; // Monthly rate
    const minPay = parseFloat(minimumPayment);
    const fixPay = parseFloat(fixedPayment) || 0;

    if (!bal || !rate || !minPay) return;

    // Calculate interest for one month
    const monthlyInterest = bal * rate;

    // Scenario 1: Paying minimum
    let balanceMin = bal;
    let monthsMin = 0;
    let totalPaidMin = 0;
    const maxIterations = 600; // 50 years max

    while (balanceMin > 0.01 && monthsMin < maxIterations) {
      const interest = balanceMin * rate;
      const payment = Math.max(minPay, balanceMin + interest);
      totalPaidMin += payment;
      balanceMin = balanceMin + interest - payment;
      monthsMin++;
    }

    // Scenario 2: Fixed payment
    let balanceFix = bal;
    let monthsFix = 0;
    let totalPaidFix = 0;

    if (fixPay > monthlyInterest) {
      while (balanceFix > 0.01 && monthsFix < maxIterations) {
        const interest = balanceFix * rate;
        const payment = Math.min(fixPay, balanceFix + interest);
        totalPaidFix += payment;
        balanceFix = balanceFix + interest - payment;
        monthsFix++;
      }
    }

    const warning = fixPay > 0 && fixPay <= monthlyInterest;

    setResult({
      monthlyInterest,
      monthsMin: monthsMin >= maxIterations ? "No se pagará" : monthsMin,
      totalPaidMin,
      monthsFix: warning ? "N/A" : (monthsFix >= maxIterations ? "No se pagará" : monthsFix),
      totalPaidFix: warning ? 0 : totalPaidFix,
      savings: warning ? 0 : (totalPaidMin - totalPaidFix),
      warning
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
          <CreditCardIcon className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Tarjeta de Crédito</h1>
        </div>
        <p className="text-white/80 ml-14">Analiza el costo de tu tarjeta</p>
      </header>

      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Datos de tu tarjeta</CardTitle>
            <CardDescription>Ingresa tu saldo actual y condiciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="balance">Saldo actual ($)</Label>
              <Input
                id="balance"
                type="number"
                placeholder="15000"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRate">Tasa de interés anual (%)</Label>
              <Input
                id="annualRate"
                type="number"
                step="0.1"
                placeholder="45.0"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Típicamente entre 30% y 80% anual en México
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimumPayment">Pago mínimo mensual ($)</Label>
              <Input
                id="minimumPayment"
                type="number"
                placeholder="300"
                value={minimumPayment}
                onChange={(e) => setMinimumPayment(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fixedPayment">Pago fijo propuesto ($)</Label>
              <Input
                id="fixedPayment"
                type="number"
                placeholder="2000"
                value={fixedPayment}
                onChange={(e) => setFixedPayment(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Cantidad que planeas pagar mensualmente
              </p>
            </div>

            <Button onClick={calculateCreditCard} className="w-full">
              Analizar
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            {result.warning && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  ⚠️ El pago fijo es menor o igual a los intereses mensuales. Tu deuda nunca se pagará con este monto.
                </AlertDescription>
              </Alert>
            )}

            <Card className="border-warning">
              <CardHeader>
                <CardTitle>Análisis de pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-warning/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Interés mensual</p>
                  <p className="text-2xl font-bold text-warning">
                    ${result.monthlyInterest.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <p className="text-xs text-muted-foreground mb-2">Pago mínimo</p>
                      <p className="text-lg font-bold">{result.monthsMin} meses</p>
                      <p className="text-xs text-muted-foreground mt-1">Costo total:</p>
                      <p className="font-semibold text-destructive">${result.totalPaidMin.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</p>
                    </CardContent>
                  </Card>

                  {!result.warning && (
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-xs text-muted-foreground mb-2">Pago fijo</p>
                        <p className="text-lg font-bold">{result.monthsFix} meses</p>
                        <p className="text-xs text-muted-foreground mt-1">Costo total:</p>
                        <p className="font-semibold text-success">${result.totalPaidFix.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {!result.warning && result.savings > 0 && (
                  <div className="bg-success/10 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Ahorro con pago fijo</p>
                    <p className="text-2xl font-bold text-success">
                      ${result.savings.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                )}

                <div className="bg-muted p-3 rounded-lg text-xs">
                  <p className="font-semibold mb-1">💳 Recomendación:</p>
                  <p className="text-muted-foreground">
                    Siempre paga más del mínimo. Los intereses de las tarjetas son muy altos y pueden duplicar o triplicar tu deuda si solo pagas el mínimo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default CreditCard;
