import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Plus, Menu, Calculator, BookOpen, Target, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAB from "@/components/FAB";
import BottomNav from "@/components/BottomNav";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const stats = {
    income: 25000,
    expenses: 18500,
    balance: 6500,
    savingsGoal: 50000,
    currentSavings: 15000,
  };

  const recentTransactions = [
    { id: 1, type: "expense", description: "Supermercado", amount: 850, category: "Alimentación" },
    { id: 2, type: "income", description: "Salario", amount: 25000, category: "Ingresos" },
    { id: 3, type: "expense", description: "Gasolina", amount: 600, category: "Transporte" },
    { id: 4, type: "expense", description: "Netflix", amount: 279, category: "Entretenimiento" },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">¡Hola, Usuario!</h1>
            <p className="text-white/80">Resumen de Diciembre 2024</p>
          </div>
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setShowMenu(!showMenu)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm text-white/80">Ingresos</span>
              </div>
              <p className="text-2xl font-bold">${stats.income.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <ArrowDownRight className="h-4 w-4" />
                <span className="text-sm text-white/80">Gastos</span>
              </div>
              <p className="text-2xl font-bold">${stats.expenses.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 bg-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-foreground/80">Balance del mes</p>
                <p className="text-3xl font-bold text-secondary-foreground">${stats.balance.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-secondary-foreground/80" />
            </div>
          </CardContent>
        </Card>
      </header>

      {/* Quick Actions */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="flex-col h-auto py-4 gap-2"
            onClick={() => navigate("/transactions")}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">Agregar</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex-col h-auto py-4 gap-2"
            onClick={() => navigate("/simulators")}
          >
            <Calculator className="h-5 w-5" />
            <span className="text-xs">Simular</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex-col h-auto py-4 gap-2"
            onClick={() => navigate("/education")}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs">Aprender</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex-col h-auto py-4 gap-2"
            onClick={() => navigate("/analytics")}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Análisis</span>
          </Button>
        </div>

        {/* Savings Goal */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Meta de Ahorro</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate("/goals")}>
                Ver más
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progreso</span>
                <span className="font-medium">${stats.currentSavings.toLocaleString()} / ${stats.savingsGoal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-gradient-primary h-3 rounded-full transition-all"
                  style={{ width: `${(stats.currentSavings / stats.savingsGoal) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.currentSavings / stats.savingsGoal) * 100)}% completado
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Transacciones Recientes</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")}>
                Ver todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === "income" ? "bg-success/10" : "bg-destructive/10"
                    }`}>
                      {transaction.type === "income" ? (
                        <ArrowUpRight className={`h-4 w-4 text-success`} />
                      ) : (
                        <ArrowDownRight className={`h-4 w-4 text-destructive`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${
                    transaction.type === "income" ? "text-success" : "text-destructive"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <FAB />
      <BottomNav />
    </div>
  );
};

export default Dashboard;
