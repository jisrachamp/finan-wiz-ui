import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import FAB from "@/components/FAB";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-muted pb-20">
      <header className="bg-gradient-primary text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold">Análisis Financiero</h1>
        <p className="text-white/80 mt-1">Visualiza tus patrones de gasto</p>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-xs text-muted-foreground">Ingresos</span>
              </div>
              <p className="text-2xl font-bold">$25,430</p>
              <p className="text-xs text-success">+12% vs mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-xs text-muted-foreground">Gastos</span>
              </div>
              <p className="text-2xl font-bold">$18,250</p>
              <p className="text-xs text-destructive">+8% vs mes anterior</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Balance mensual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-success/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Disponible</p>
              <p className="text-3xl font-bold text-success">$7,180</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Gastos por categoría
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { category: "Vivienda", amount: 6500, percent: 36, color: "bg-primary" },
              { category: "Alimentos", amount: 4200, percent: 23, color: "bg-secondary" },
              { category: "Transporte", amount: 3100, percent: 17, color: "bg-accent" },
              { category: "Entretenimiento", amount: 2450, percent: 13, color: "bg-warning" },
              { category: "Otros", amount: 2000, percent: 11, color: "bg-muted" }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">
                    ${item.amount.toLocaleString('es-MX')} ({item.percent}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendencia mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Ene", "Feb", "Mar", "Abr", "May", "Jun"].map((month, i) => {
                const income = 22000 + Math.random() * 5000;
                const expenses = 16000 + Math.random() * 4000;
                const maxValue = 30000;
                
                return (
                  <div key={month}>
                    <p className="text-xs text-muted-foreground mb-1">{month}</p>
                    <div className="flex gap-2">
                      <div
                        className="bg-success/20 border-l-4 border-success rounded px-2 py-1"
                        style={{ width: `${(income / maxValue) * 100}%` }}
                      >
                        <span className="text-xs font-semibold text-success">
                          ${Math.round(income / 1000)}k
                        </span>
                      </div>
                      <div
                        className="bg-destructive/20 border-l-4 border-destructive rounded px-2 py-1"
                        style={{ width: `${(expenses / maxValue) * 100}%` }}
                      >
                        <span className="text-xs font-semibold text-destructive">
                          ${Math.round(expenses / 1000)}k
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded" />
                <span>Ingresos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded" />
                <span>Gastos</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <FAB />
      <BottomNav />
    </div>
  );
};

export default Analytics;
