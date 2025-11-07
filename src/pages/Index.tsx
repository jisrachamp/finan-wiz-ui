import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, Target, BarChart3, BookOpen, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart3,
      title: "Seguimiento de Gastos",
      description: "Registra y categoriza tus transacciones fácilmente"
    },
    {
      icon: Target,
      title: "Metas de Ahorro",
      description: "Establece y alcanza tus objetivos financieros"
    },
    {
      icon: BookOpen,
      title: "Educación Financiera",
      description: "Aprende con contenido personalizado"
    },
    {
      icon: Shield,
      title: "Simuladores",
      description: "Toma decisiones informadas con nuestras herramientas"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center text-white mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingUp className="h-16 w-16" />
            <h1 className="text-5xl font-bold">FinanSmart MX</h1>
          </div>
          <p className="text-2xl mb-3 text-white/90">Tu asistente financiero personal</p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Mejora tus hábitos financieros, alcanza tus metas y toma decisiones inteligentes con FinanSmart MX
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              onClick={() => navigate("/auth")}
            >
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
            >
              <feature.icon className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">¿Listo para tomar control de tus finanzas?</h2>
            <p className="text-white/80 mb-6">
              Únete a miles de usuarios que ya están mejorando su vida financiera
            </p>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-lg px-8"
              onClick={() => navigate("/auth")}
            >
              Crear cuenta gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
