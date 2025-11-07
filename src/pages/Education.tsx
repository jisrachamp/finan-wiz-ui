import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, ThumbsUp, ThumbsDown, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import FAB from "@/components/FAB";
import { Badge } from "@/components/ui/badge";

const Education = () => {
  const navigate = useNavigate();

  const topics = [
    {
      title: "Fundamentos del ahorro",
      description: "Aprende cómo crear un fondo de emergencia",
      level: "Principiante",
      duration: "10 min",
      color: "bg-success/10 text-success"
    },
    {
      title: "Inversión para principiantes",
      description: "Conoce los instrumentos básicos de inversión",
      level: "Principiante",
      duration: "15 min",
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Manejo de deudas",
      description: "Estrategias para salir de deudas efectivamente",
      level: "Intermedio",
      duration: "12 min",
      color: "bg-warning/10 text-warning"
    },
    {
      title: "Tarjetas de crédito",
      description: "Usa tu tarjeta inteligentemente y evita sobreendeudarte",
      level: "Principiante",
      duration: "8 min",
      color: "bg-secondary/10 text-secondary"
    }
  ];

  const guides = [
    {
      title: "Crea tu primer presupuesto",
      steps: 5,
      description: "Guía paso a paso para organizar tus finanzas",
      icon: "📊"
    },
    {
      title: "Sal de deudas en 6 meses",
      steps: 8,
      description: "Plan completo para liberarte de deudas",
      icon: "💪"
    },
    {
      title: "Invierte tus primeros $1,000",
      steps: 6,
      description: "Comienza a invertir de forma segura",
      icon: "💰"
    }
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      <header className="bg-gradient-primary text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Educación Financiera</h1>
        </div>
        <p className="text-white/80">Aprende a tu ritmo</p>
      </header>

      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Cápsulas educativas</h2>
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-3">
            {topics.map((topic, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {topic.level}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {topic.duration}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground hover:text-success cursor-pointer transition-colors" />
                      <ThumbsDown className="h-4 w-4 text-muted-foreground hover:text-destructive cursor-pointer transition-colors" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Guías paso a paso</h2>
          <div className="space-y-3">
            {guides.map((guide, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{guide.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-base mb-1">{guide.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {guide.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Badge variant="outline" className="text-xs">
                    {guide.steps} pasos
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-primary text-white border-0">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-90" />
            <h3 className="text-xl font-bold mb-2">¿Sabías que...?</h3>
            <p className="text-white/90 text-sm">
              Solo el 32% de los mexicanos tiene educación financiera formal. 
              ¡Estás en el camino correcto para mejorar tu futuro financiero!
            </p>
          </CardContent>
        </Card>
      </div>

      <FAB />
      <BottomNav />
    </div>
  );
};

export default Education;
