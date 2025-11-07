import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Target, Bell, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleComplete = () => {
    toast.success("¡Perfil configurado! Bienvenido a FinanSmart MX");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-primary">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-10 w-10 text-white" />
            <h1 className="text-3xl font-bold text-white">FinanSmart MX</h1>
          </div>
          <p className="text-white/90">Configuremos tu perfil financiero</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Paso {step} de 2</CardTitle>
            <CardDescription>
              {step === 1 ? "¿Cuál es tu objetivo financiero principal?" : "Configura tus notificaciones"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Target className="h-5 w-5" />
                  <span className="font-medium">Objetivo Principal</span>
                </div>
                
                <RadioGroup value={goal} onValueChange={setGoal}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
                    <RadioGroupItem value="save" id="save" />
                    <Label htmlFor="save" className="flex-1 cursor-pointer">
                      <div className="font-medium">Ahorrar dinero</div>
                      <div className="text-sm text-muted-foreground">Construir un fondo de emergencia</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
                    <RadioGroupItem value="debt" id="debt" />
                    <Label htmlFor="debt" className="flex-1 cursor-pointer">
                      <div className="font-medium">Salir de deudas</div>
                      <div className="text-sm text-muted-foreground">Reducir y eliminar deudas</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
                    <RadioGroupItem value="invest" id="invest" />
                    <Label htmlFor="invest" className="flex-1 cursor-pointer">
                      <div className="font-medium">Invertir</div>
                      <div className="text-sm text-muted-foreground">Hacer crecer mi patrimonio</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
                    <RadioGroupItem value="budget" id="budget" />
                    <Label htmlFor="budget" className="flex-1 cursor-pointer">
                      <div className="font-medium">Controlar gastos</div>
                      <div className="text-sm text-muted-foreground">Mejorar mis hábitos de consumo</div>
                    </Label>
                  </div>
                </RadioGroup>

                <Button
                  className="w-full mt-6"
                  onClick={() => setStep(2)}
                  disabled={!goal}
                >
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">Notificaciones</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <Checkbox
                      id="expenses"
                      checked={notifications.includes("expenses")}
                      onCheckedChange={(checked) =>
                        setNotifications(
                          checked
                            ? [...notifications, "expenses"]
                            : notifications.filter((n) => n !== "expenses")
                        )
                      }
                    />
                    <Label htmlFor="expenses" className="flex-1 cursor-pointer">
                      <div className="font-medium">Recordatorios de gastos</div>
                      <div className="text-sm text-muted-foreground">Te avisaremos para registrar transacciones</div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <Checkbox
                      id="goals"
                      checked={notifications.includes("goals")}
                      onCheckedChange={(checked) =>
                        setNotifications(
                          checked
                            ? [...notifications, "goals"]
                            : notifications.filter((n) => n !== "goals")
                        )
                      }
                    />
                    <Label htmlFor="goals" className="flex-1 cursor-pointer">
                      <div className="font-medium">Progreso de objetivos</div>
                      <div className="text-sm text-muted-foreground">Actualizaciones sobre tus metas</div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <Checkbox
                      id="tips"
                      checked={notifications.includes("tips")}
                      onCheckedChange={(checked) =>
                        setNotifications(
                          checked
                            ? [...notifications, "tips"]
                            : notifications.filter((n) => n !== "tips")
                        )
                      }
                    />
                    <Label htmlFor="tips" className="flex-1 cursor-pointer">
                      <div className="font-medium">Consejos financieros</div>
                      <div className="text-sm text-muted-foreground">Recomendaciones personalizadas</div>
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Atrás
                  </Button>
                  <Button onClick={handleComplete} className="flex-1">
                    Completar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
