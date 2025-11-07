import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, CreditCard, PiggyBank, Target, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import FAB from "@/components/FAB";

const Simulators = () => {
  const navigate = useNavigate();

  const simulators = [
    {
      icon: PiggyBank,
      title: "Plan de Ahorro",
      description: "Calcula cuánto necesitas ahorrar mensualmente",
      color: "text-success",
      bgColor: "bg-success/10",
      path: "/simulators/savings"
    },
    {
      icon: Percent,
      title: "Interés Compuesto",
      description: "Simula el crecimiento de tu inversión",
      color: "text-primary",
      bgColor: "bg-primary/10",
      path: "/simulators/compound"
    },
    {
      icon: TrendingUp,
      title: "CETES y Bonos",
      description: "Calcula rendimientos de inversiones",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      path: "/simulators/bonds"
    },
    {
      icon: CreditCard,
      title: "Tarjeta de Crédito",
      description: "Analiza el costo de tu tarjeta",
      color: "text-warning",
      bgColor: "bg-warning/10",
      path: "/simulators/credit-card"
    },
    {
      icon: Calculator,
      title: "Préstamo Personal",
      description: "Calcula tu pago mensual y costo total",
      color: "text-accent",
      bgColor: "bg-accent/10",
      path: "/simulators/loan"
    },
    {
      icon: Target,
      title: "Pago de Deudas",
      description: "Optimiza tu estrategia de pago",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      path: "/simulators/debt-payoff"
    },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      <header className="bg-gradient-primary text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold">Simuladores Financieros</h1>
        <p className="text-white/80 mt-1">Toma decisiones informadas</p>
      </header>

      <div className="p-6 space-y-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Ahorro e Inversión</h2>
          <div className="space-y-3">
            {simulators.slice(0, 3).map((simulator, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(simulator.path)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${simulator.bgColor}`}>
                    <simulator.icon className={`h-6 w-6 ${simulator.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{simulator.title}</h3>
                    <p className="text-sm text-muted-foreground">{simulator.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Crédito y Deudas</h2>
          <div className="space-y-3">
            {simulators.slice(3).map((simulator, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(simulator.path)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${simulator.bgColor}`}>
                    <simulator.icon className={`h-6 w-6 ${simulator.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{simulator.title}</h3>
                    <p className="text-sm text-muted-foreground">{simulator.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <FAB />
      <BottomNav />
    </div>
  );
};

export default Simulators;
