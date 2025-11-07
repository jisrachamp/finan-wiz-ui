import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight, ArrowDownRight, Calculator, Target, BookOpen, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FAB = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: ArrowUpRight, label: "Ingreso", color: "bg-success", action: () => {
      toast.info("Agregar ingreso");
      setIsOpen(false);
    }},
    { icon: ArrowDownRight, label: "Gasto", color: "bg-destructive", action: () => {
      toast.info("Agregar gasto");
      setIsOpen(false);
    }},
    { icon: Calculator, label: "Simular", color: "bg-primary", action: () => {
      navigate("/simulators");
      setIsOpen(false);
    }},
    { icon: Target, label: "Metas", color: "bg-secondary", action: () => {
      navigate("/goals");
      setIsOpen(false);
    }},
    { icon: BookOpen, label: "Aprender", color: "bg-accent", action: () => {
      navigate("/education");
      setIsOpen(false);
    }},
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Action Menu */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 z-50 space-y-3">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-sm font-medium bg-card px-3 py-1 rounded-lg shadow-md">
                {action.label}
              </span>
              <Button
                size="lg"
                className={`${action.color} rounded-full h-12 w-12 shadow-lg`}
                onClick={action.action}
              >
                <action.icon className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="lg"
        className={`fixed bottom-24 right-6 z-50 rounded-full h-16 w-16 shadow-xl transition-transform ${
          isOpen ? "rotate-45 bg-destructive" : "bg-gradient-primary"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </>
  );
};

export default FAB;
