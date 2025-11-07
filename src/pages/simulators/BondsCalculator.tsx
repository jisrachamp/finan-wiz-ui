import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const BondsCalculator = () => {
  const navigate = useNavigate();
  const [purchasePrice, setPurchasePrice] = useState("");
  const [nominalValue, setNominalValue] = useState("");
  const [daysToMaturity, setDaysToMaturity] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateYield = () => {
    const price = parseFloat(purchasePrice);
    const nominal = parseFloat(nominalValue);
    const days = parseFloat(daysToMaturity);

    if (!price || !nominal || !days) return;

    // Simple return: (Nominal - Price) / Price * 100
    const simpleReturn = ((nominal - price) / price) * 100;

    // Annualized return: ((Nominal / Price) - 1) * (360 / days) * 100
    const annualizedReturn = ((nominal / price) - 1) * (360 / days) * 100;

    const totalProfit = nominal - price;

    setResult({
      simpleReturn,
      annualizedReturn,
      totalProfit
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
          <TrendingUp className="h-8 w-8" />
          <h1 className="text-2xl font-bold">CETES y Bonos</h1>
        </div>
        <p className="text-white/80 ml-14">Calcula rendimientos de inversiones</p>
      </header>

      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Datos del instrumento</CardTitle>
            <CardDescription>Ingresa la información de tu inversión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Precio de compra ($)</Label>
              <Input
                id="purchasePrice"
                type="number"
                step="0.01"
                placeholder="9850.00"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nominalValue">Valor nominal ($)</Label>
              <Input
                id="nominalValue"
                type="number"
                step="0.01"
                placeholder="10000.00"
                value={nominalValue}
                onChange={(e) => setNominalValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daysToMaturity">Días al vencimiento</Label>
              <Input
                id="daysToMaturity"
                type="number"
                placeholder="28"
                value={daysToMaturity}
                onChange={(e) => setDaysToMaturity(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                CETES común: 28, 91, 182 o 364 días
              </p>
            </div>

            <Button onClick={calculateYield} className="w-full">
              Calcular rendimiento
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-secondary">
            <CardHeader>
              <CardTitle>Análisis de rendimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Rendimiento anualizado</p>
                <p className="text-3xl font-bold text-secondary">
                  {result.annualizedReturn.toFixed(2)}%
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Rendimiento simple</span>
                  <span className="font-semibold">{result.simpleReturn.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Ganancia total</span>
                  <span className="font-semibold text-success">${result.totalProfit.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg text-xs">
                <p className="font-semibold mb-1">📊 Sobre CETES:</p>
                <p className="text-muted-foreground">
                  Los CETES son instrumentos de inversión gubernamental de bajo riesgo. El rendimiento anualizado te permite comparar con otras inversiones.
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

export default BondsCalculator;
