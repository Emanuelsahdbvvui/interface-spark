import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Palette, Shield } from "lucide-react";

export default function Settings() {
  return (
    <MainLayout userName="Usuário">
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações de conta.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Perfil */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Perfil</CardTitle>
                  <CardDescription>Informações da sua conta</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Seu nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" placeholder="Nome da empresa" />
              </div>
              <Button className="w-full">Salvar alterações</Button>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Preferências de notificação</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações por email
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de cálculos</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre seus cálculos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novidades do sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Atualizações e novos recursos
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Aparência */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Aparência</CardTitle>
                  <CardDescription>Personalize a interface</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo escuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Tema dark mode técnico
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animações</Label>
                  <p className="text-sm text-muted-foreground">
                    Efeitos de transição
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>Proteja sua conta</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Alterar senha
              </Button>
              <Button variant="outline" className="w-full">
                Autenticação em dois fatores
              </Button>
              <Button variant="destructive" className="w-full">
                Excluir conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
