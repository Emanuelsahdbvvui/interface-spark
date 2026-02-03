
# Plano: Calculadora de Engenharia Estrutural

## Visão Geral
Recriar a aplicação Flask como uma interface web moderna com React, utilizando um design **Dark Mode Técnico** focado em dashboards de engenharia. Incluirá autenticação de usuários, histórico de cálculos e geração de PDF.

---

## Fase 1: Interface Base e Design System

### Layout Principal
- **Header fixo** com logo, navegação e botão de perfil/logout
- **Sidebar colapsável** com navegação: Novo Cálculo, Histórico, Configurações
- **Área principal** com cards e gráficos em grid responsivo

### Design Dark Mode Técnico
- Fundo escuro (#0a0a0c) com acentos em azul elétrico (#2962ff)
- Cards com bordas sutis e efeito de glass morphism
- Tipografia técnica e números monospace para dados
- Animações suaves em hover e transições

---

## Fase 2: Formulário de Cálculo

### Seção 1: Localização e Geometria
- **Cidade**: Dropdown com todas as capitais brasileiras (com V0 e zona sísmica automáticos)
- **Dimensões**: Altura (h), Largura (a), Profundidade (b) com inputs numéricos
- **Número de andares**

### Seção 2: Parâmetros Normativos (NBR 6123)
- **Fator S1**: Slider de 0.8 a 1.2
- **Categoria S2**: Seletor visual com descrições (I-V: Superfície lisa a Floresta)
- **Grupo S3**: Seletor de ocupação (Residencial a Edificações críticas)

### Seção 3: Características Construtivas
- **Material estrutural**: Cards visuais (Concreto Armado, Aço, Alvenaria)
- **Tipo de fundação**: Sapatas, Estacas, Radier
- **Nível do projeto**: Básico ou Detalhado
- **Tipo de solo**: A-D com descrições

### Seção 4: Parâmetros de Risco
- **Tempo de retorno** para cálculo de inundação (input numérico)

---

## Fase 3: Visualização de Resultados

### Painel de Velocidade do Vento
- Card com velocidade característica (Vk) em destaque
- Pressão dinâmica no topo (q)

### Gráfico: Perfil de Vento por Altura
- Gráfico de área mostrando a pressão dinâmica em 20 pontos de altura
- Interativo com tooltip ao passar o mouse

### Análise de Deslocamento (ELS)
- Card mostrando:
  - Deslocamento calculado no topo (cm)
  - Limite normativo (H/400)
  - **Status visual**: ✅ Atende ou ⚠️ Verificar

### Gráfico de Pizza: Vulnerabilidades
- Distribuição visual entre Vento, Sismo e Inundação
- Cores temáticas: Azul (vento), Vermelho (sismo), Amarelo (inundação)

### Indicador de Resiliência
- Gauge/meter visual de 0-100
- Cores gradientes: Vermelho → Amarelo → Verde
- Breakdown dos fatores contribuintes

### Comparativo Histórico (quando houver dados)
- Gráfico de barras comparando cálculos anteriores
- Seletor para escolher quais cálculos comparar

---

## Fase 4: Autenticação de Usuários

### Páginas de Auth
- **Login**: Email + senha com opção "Lembrar-me"
- **Cadastro**: Nome, email, senha, confirmação
- **Recuperação de senha**: Via email

### Perfil do Usuário
- Informações básicas
- Histórico de uso
- Configurações de preferência

---

## Fase 5: Histórico de Cálculos (Backend)

### Banco de Dados (Lovable Cloud + Supabase)
- Tabela de perfis de usuários
- Tabela de cálculos salvos com todos os parâmetros e resultados
- Políticas RLS para segurança (usuário só vê seus dados)

### Interface de Histórico
- Lista com cards mostrando: cidade, data, status
- Filtros por data, cidade, status
- Busca por nome do projeto
- Ações: Visualizar, Duplicar, Excluir

---

## Fase 6: Geração de PDF

### Relatório Técnico
- Capa profissional com logo e informações do projeto
- Seção de dados de entrada
- Seção de resultados com gráficos
- Memorial de cálculo resumido
- Rodapé com data e página

### Funcionalidade
- Botão "Baixar PDF" na tela de resultados
- Botão no histórico para regenerar PDF

---

## Resumo de Tecnologias

| Componente | Tecnologia |
|------------|------------|
| Frontend | React + TypeScript + Tailwind |
| UI Components | shadcn/ui |
| Gráficos | Recharts |
| Backend | Lovable Cloud (Supabase) |
| Autenticação | Supabase Auth |
| PDF | jsPDF ou react-pdf |
| Estado | React Query + Context |
