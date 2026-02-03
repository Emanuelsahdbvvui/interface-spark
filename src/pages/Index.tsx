import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "./Dashboard";

const Index = () => {
  return (
    <MainLayout userName="Usuário">
      <Dashboard />
    </MainLayout>
  );
};

export default Index;
