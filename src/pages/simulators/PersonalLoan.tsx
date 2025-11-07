import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PersonalLoan = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState("");
  const [months, setMonths] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [openingFee, setOpeningFee] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const n = parseInt(months);
    const r = parseFloat(annualRate) / 100 / 12; // Monthly rate
    const fee = parseFloat(openingFee) || 0;

    if (!P || !n || !r) return;

    // French system (fixed payment): M = P * [r * (1 + r)^n] / [(1 + r)^n - 1]
    const monthlyPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - P;
    const totalCost = totalPaid + fee;

    // Generate first 6 rows of amortization table
    const amortizationTable = [];
    let balance = P;
    for (let i = 1; i <= Math.min(6, n); i++) {
      const interest = balance * r;
      const principal = monthlyPayment - interest;
      balance -= principal;
      amortizationTable.push({
        month: i,
        payment: monthlyPayment,
        principal,
        interest,
        balance: Math.max(0, balance)
      });
    }

    setResult({
      monthlyPayment,
      totalPaid,
      totalInterest,
      totalCost,
      openingFee: fee,
      amortizationTable
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
          <Calculator className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Préstamo Personal</h1>
        </div>
        <p className="text-white/80 ml-14">Calcula tu pago mensual y costo total</p>
      </header>

      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Datos del préstamo</CardTitle>
            <CardDescription>Sistema de amortización francés</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Monto del préstamo ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="months">Plazo (meses)</Label>
              <Input
                id="months"
                type="number"
                placeholder="24"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRate">Tasa de interés anual (%)</Label>
              <Input
                id="annualRate"
                type="number"
                step="0.1"
                placeholder="18.0"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="openingFee">Comisión por apertura ($)</Label>
              <Input
                id="openingFee"
                type="number"
                placeholder="0"
                value={openingFee}
                onChange={(e) => setOpeningFee(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Típicamente 3-5% del monto del préstamo
              </p>
            </div>

            <Button onClick={calculateLoan} className="w-full">
              Calcular
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            <Card className="border-accent">
              <CardHeader>
                <CardTitle>Resumen del préstamo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Pago mensual</p>
                  <p className="text-3xl font-bold text-accent">
                    ${result.monthlyPayment.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Monto prestado</span>
                    <span className="font-semibold">${parseFloat(loanAmount).toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Comisión por apertura</span>
                    <span className="font-semibold">${result.openingFee.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Intereses totales</span>
                    <span className="font-semibold text-warning">${result.totalInterest.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-lg pt-2 border-t">
                    <span className="font-semibold">Costo total</span>
                    <span className="font-bold">${result.totalCost.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tabla de amortización</CardTitle>
                <CardDescription>Primeros 6 meses del préstamo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Mes</TableHead>
                        <TableHead className="text-right">Pago</TableHead>
                        <TableHead className="text-right">Capital</TableHead>
                        <TableHead className="text-right">Interés</TableHead>
                        <TableHead className="text-right">Saldo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.amortizationTable.map((row: any) => (
                        <TableRow key={row.month}>
                          <TableCell className="text-center font-medium">{row.month}</TableCell>
                          <TableCell className="text-right">${row.payment.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</TableCell>
                          <TableCell className="text-right text-success">${row.principal.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</TableCell>
                          <TableCell className="text-right text-warning">${row.interest.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</TableCell>
                          <TableCell className="text-right font-semibold">${row.balance.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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

export default PersonalLoan;
