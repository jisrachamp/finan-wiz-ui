import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Settings, label: "Configuración", path: "/settings" },
    { icon: Bell, label: "Notificaciones", path: "/notifications" },
    { icon: Shield, label: "Privacidad y seguridad", path: "/privacy" },
    { icon: HelpCircle, label: "Ayuda y soporte", path: "/help" },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      <header className="bg-gradient-primary text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white">
            <AvatarFallback className="bg-white text-primary text-xl font-bold">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Juan Pérez</h1>
            <p className="text-white/80">juan.perez@email.com</p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resumen de perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Miembro desde</span>
              <span className="text-sm font-semibold">Enero 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Transacciones registradas</span>
              <span className="text-sm font-semibold">127</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Metas activas</span>
              <span className="text-sm font-semibold">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Cápsulas completadas</span>
              <span className="text-sm font-semibold">8 de 24</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preferencias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-sm">
                Notificaciones push
              </Label>
              <Switch id="notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="reminders" className="text-sm">
                Recordatorios de ahorro
              </Label>
              <Switch id="reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="newsletter" className="text-sm">
                Boletín semanal
              </Label>
              <Switch id="newsletter" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-destructive/50">
          <CardContent className="p-4">
            <Button
              variant="ghost"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => navigate("/auth")}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar sesión
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground pt-4">
          <p>FinanSmart MX v1.0.0</p>
          <p className="mt-1">© 2025 Todos los derechos reservados</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
