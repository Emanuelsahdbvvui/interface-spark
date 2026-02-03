// Funções de cálculo estrutural baseadas nas normas brasileiras NBR 6123

export interface CityData {
  name: string;
  v0: number;
  seismicZone: number;
}

export const BRAZILIAN_CITIES: Record<string, CityData> = {
  "Aracaju": { name: "Aracaju", v0: 30, seismicZone: 0 },
  "Belém": { name: "Belém", v0: 30, seismicZone: 0 },
  "Belo Horizonte": { name: "Belo Horizonte", v0: 35, seismicZone: 0 },
  "Boa Vista": { name: "Boa Vista", v0: 30, seismicZone: 0 },
  "Brasília": { name: "Brasília", v0: 35, seismicZone: 0 },
  "Campo Grande": { name: "Campo Grande", v0: 35, seismicZone: 0 },
  "Cuiabá": { name: "Cuiabá", v0: 30, seismicZone: 0 },
  "Curitiba": { name: "Curitiba", v0: 45, seismicZone: 0 },
  "Florianópolis": { name: "Florianópolis", v0: 45, seismicZone: 0 },
  "Fortaleza": { name: "Fortaleza", v0: 30, seismicZone: 0 },
  "Goiânia": { name: "Goiânia", v0: 35, seismicZone: 0 },
  "João Pessoa": { name: "João Pessoa", v0: 30, seismicZone: 0 },
  "Macapá": { name: "Macapá", v0: 30, seismicZone: 0 },
  "Maceió": { name: "Maceió", v0: 30, seismicZone: 0 },
  "Manaus": { name: "Manaus", v0: 30, seismicZone: 1 },
  "Natal": { name: "Natal", v0: 30, seismicZone: 0 },
  "Palmas": { name: "Palmas", v0: 30, seismicZone: 0 },
  "Porto Alegre": { name: "Porto Alegre", v0: 45, seismicZone: 0 },
  "Porto Velho": { name: "Porto Velho", v0: 30, seismicZone: 1 },
  "Recife": { name: "Recife", v0: 30, seismicZone: 0 },
  "Rio Branco": { name: "Rio Branco", v0: 30, seismicZone: 2 },
  "Rio de Janeiro": { name: "Rio de Janeiro", v0: 35, seismicZone: 0 },
  "Salvador": { name: "Salvador", v0: 30, seismicZone: 0 },
  "São Luís": { name: "São Luís", v0: 35, seismicZone: 0 },
  "São Paulo": { name: "São Paulo", v0: 40, seismicZone: 0 },
  "Teresina": { name: "Teresina", v0: 30, seismicZone: 0 },
  "Vitória": { name: "Vitória", v0: 35, seismicZone: 0 },
};

export const S2_CATEGORIES = [
  { id: "I", name: "Categoria I", description: "Mar aberto, lagos, áreas planas sem obstáculos" },
  { id: "II", name: "Categoria II", description: "Terreno aberto com poucos obstáculos isolados" },
  { id: "III", name: "Categoria III", description: "Subúrbios, bosques, muitos obstáculos" },
  { id: "IV", name: "Categoria IV", description: "Zonas industriais, subúrbios densamente construídos" },
  { id: "V", name: "Categoria V", description: "Centros de grandes cidades, florestas" },
];

export const S3_GROUPS = [
  { id: 1, name: "Grupo 1", description: "Edificações de baixo fator de ocupação", factor: 0.95 },
  { id: 2, name: "Grupo 2", description: "Hotéis, residências, comércio", factor: 1.00 },
  { id: 3, name: "Grupo 3", description: "Edificações essenciais (hospitais, bombeiros)", factor: 1.10 },
  { id: 4, name: "Grupo 4", description: "Edificações de segurança (usinas)", factor: 1.15 },
  { id: 5, name: "Grupo 5", description: "Estruturas críticas", factor: 1.20 },
];

export const STRUCTURAL_MATERIALS = [
  { id: "concrete", name: "Concreto Armado", elasticity: 25000, density: 2500 },
  { id: "steel", name: "Aço", elasticity: 200000, density: 7850 },
  { id: "masonry", name: "Alvenaria", elasticity: 5000, density: 1800 },
];

export const FOUNDATION_TYPES = [
  { id: "sapata", name: "Sapatas", description: "Fundação superficial isolada" },
  { id: "estaca", name: "Estacas", description: "Fundação profunda" },
  { id: "radier", name: "Radier", description: "Fundação superficial contínua" },
];

export const SOIL_TYPES = [
  { id: "A", name: "Solo A", description: "Rocha sã ou solo muito rígido", factor: 1.0 },
  { id: "B", name: "Solo B", description: "Solo rígido", factor: 1.2 },
  { id: "C", name: "Solo C", description: "Solo moderadamente mole", factor: 1.5 },
  { id: "D", name: "Solo D", description: "Solo mole", factor: 2.0 },
];

// Parâmetros S2 conforme NBR 6123
const S2_PARAMS: Record<string, { b: number; Fr: number; p: number }> = {
  "I": { b: 1.10, Fr: 1.00, p: 0.06 },
  "II": { b: 1.00, Fr: 0.98, p: 0.085 },
  "III": { b: 0.94, Fr: 0.95, p: 0.10 },
  "IV": { b: 0.86, Fr: 0.88, p: 0.12 },
  "V": { b: 0.74, Fr: 0.79, p: 0.15 },
};

/**
 * Calcula o fator S2 conforme NBR 6123
 */
export function calculateS2(height: number, category: string): number {
  const params = S2_PARAMS[category] || S2_PARAMS["III"];
  return params.b * params.Fr * Math.pow(height / 10, params.p);
}

/**
 * Calcula a velocidade característica do vento (Vk)
 */
export function calculateVk(v0: number, s1: number, s2: number, s3: number): number {
  return v0 * s1 * s2 * s3;
}

/**
 * Calcula a pressão dinâmica do vento (q)
 */
export function calculateDynamicPressure(vk: number): number {
  return 0.613 * Math.pow(vk, 2);
}

/**
 * Calcula o coeficiente de arrasto (Ca) para edificações retangulares
 */
export function calculateCa(height: number, depth: number, width: number): number {
  const l1_l2 = width / depth;
  const h_l1 = height / width;
  
  // Simplificação da tabela 4 da NBR 6123
  if (l1_l2 <= 1) return 1.2;
  if (l1_l2 <= 2) return 1.3;
  return 1.4;
}

/**
 * Calcula o perfil de vento ao longo da altura
 */
export function calculateWindProfile(
  height: number,
  v0: number,
  s1: number,
  s3: number,
  category: string,
  numPoints: number = 20
): { height: number; vk: number; pressure: number }[] {
  const profile: { height: number; vk: number; pressure: number }[] = [];
  
  for (let i = 1; i <= numPoints; i++) {
    const z = (height / numPoints) * i;
    const s2 = calculateS2(z, category);
    const vk = calculateVk(v0, s1, s2, s3);
    const pressure = calculateDynamicPressure(vk);
    profile.push({ height: z, vk, pressure });
  }
  
  return profile;
}

/**
 * Calcula a força total de vento na estrutura
 */
export function calculateWindForce(
  height: number,
  width: number,
  depth: number,
  v0: number,
  s1: number,
  s3: number,
  category: string
): number {
  const s2 = calculateS2(height, category);
  const vk = calculateVk(v0, s1, s2, s3);
  const q = calculateDynamicPressure(vk);
  const ca = calculateCa(height, depth, width);
  const area = height * width;
  
  return q * ca * area / 1000; // kN
}

/**
 * Calcula o deslocamento no topo (ELS)
 */
export function calculateTopDisplacement(
  height: number,
  windForce: number,
  material: string,
  width: number,
  depth: number
): number {
  const materialData = STRUCTURAL_MATERIALS.find(m => m.id === material);
  const E = materialData?.elasticity || 25000; // MPa
  
  // Momento de inércia simplificado (seção retangular)
  const I = (width * Math.pow(depth, 3)) / 12;
  
  // Deslocamento por fórmula simplificada (engaste perfeito)
  const F = windForce * 1000; // Converter para N
  const L = height * 1000; // Converter para mm
  const displacement = (F * Math.pow(L, 3)) / (3 * E * I * 1e12);
  
  return displacement * 100; // cm
}

/**
 * Verifica ELS - Limite de deslocamento H/400
 */
export function checkELS(height: number, displacement: number): { 
  status: "ok" | "warning" | "fail"; 
  limit: number; 
  ratio: number 
} {
  const limit = (height * 100) / 400; // H/400 em cm
  const ratio = displacement / limit;
  
  if (ratio <= 0.8) return { status: "ok", limit, ratio };
  if (ratio <= 1.0) return { status: "warning", limit, ratio };
  return { status: "fail", limit, ratio };
}

/**
 * Calcula a força sísmica equivalente (NBR 15421)
 */
export function calculateSeismicForce(
  seismicZone: number,
  height: number,
  width: number,
  depth: number,
  floors: number,
  soilType: string
): number {
  if (seismicZone === 0) return 0;
  
  // ag0 baseado na zona sísmica
  const ag0Map: Record<number, number> = { 0: 0, 1: 0.025, 2: 0.05, 3: 0.10, 4: 0.15 };
  const ag0 = ag0Map[seismicZone] || 0;
  
  const soil = SOIL_TYPES.find(s => s.id === soilType);
  const S = soil?.factor || 1.0;
  
  // Peso estimado da estrutura
  const weight = width * depth * height * 2500 * 9.81 / 1000; // kN
  
  // Cs simplificado
  const Cs = ag0 * S * 2.5;
  
  return Cs * weight;
}

/**
 * Calcula o índice de vulnerabilidade
 */
export function calculateVulnerability(
  windForce: number,
  seismicForce: number,
  floodRisk: number
): { wind: number; seismic: number; flood: number; total: number } {
  const total = windForce + seismicForce + floodRisk;
  
  if (total === 0) {
    return { wind: 33, seismic: 33, flood: 34, total: 100 };
  }
  
  return {
    wind: (windForce / total) * 100,
    seismic: (seismicForce / total) * 100,
    flood: (floodRisk / total) * 100,
    total: 100,
  };
}

/**
 * Calcula o risco de inundação baseado no tempo de retorno
 */
export function calculateFloodRisk(returnPeriod: number, height: number): number {
  // Fórmula simplificada baseada no período de retorno
  const baseRisk = 100 / returnPeriod;
  const heightFactor = Math.max(0, 1 - height / 100);
  return baseRisk * heightFactor * 100;
}

/**
 * Calcula o índice de resiliência estrutural
 */
export function calculateResilienceIndex(
  elsStatus: "ok" | "warning" | "fail",
  vulnerabilityTotal: number,
  material: string,
  foundation: string,
  projectLevel: string
): number {
  let score = 50;
  
  // Bônus/penalidade por ELS
  if (elsStatus === "ok") score += 20;
  else if (elsStatus === "warning") score += 5;
  else score -= 15;
  
  // Bônus por material
  if (material === "steel") score += 10;
  else if (material === "concrete") score += 5;
  
  // Bônus por fundação
  if (foundation === "estaca") score += 10;
  else if (foundation === "radier") score += 5;
  
  // Bônus por nível do projeto
  if (projectLevel === "detailed") score += 15;
  
  return Math.min(100, Math.max(0, score));
}

export interface CalculationInputs {
  city: string;
  height: number;
  width: number;
  depth: number;
  floors: number;
  s1: number;
  s2Category: string;
  s3Group: number;
  material: string;
  foundation: string;
  projectLevel: string;
  soilType: string;
  returnPeriod: number;
}

export interface CalculationResults {
  vk: number;
  pressure: number;
  windForce: number;
  displacement: number;
  elsStatus: "ok" | "warning" | "fail";
  elsLimit: number;
  elsRatio: number;
  seismicForce: number;
  floodRisk: number;
  vulnerability: { wind: number; seismic: number; flood: number };
  resilienceIndex: number;
  windProfile: { height: number; vk: number; pressure: number }[];
}

/**
 * Executa todos os cálculos estruturais
 */
export function runFullCalculation(inputs: CalculationInputs): CalculationResults {
  const cityData = BRAZILIAN_CITIES[inputs.city];
  const v0 = cityData?.v0 || 35;
  const seismicZone = cityData?.seismicZone || 0;
  
  const s3Data = S3_GROUPS.find(g => g.id === inputs.s3Group);
  const s3 = s3Data?.factor || 1.0;
  
  const s2 = calculateS2(inputs.height, inputs.s2Category);
  const vk = calculateVk(v0, inputs.s1, s2, s3);
  const pressure = calculateDynamicPressure(vk);
  
  const windForce = calculateWindForce(
    inputs.height, inputs.width, inputs.depth,
    v0, inputs.s1, s3, inputs.s2Category
  );
  
  const displacement = calculateTopDisplacement(
    inputs.height, windForce, inputs.material,
    inputs.width, inputs.depth
  );
  
  const els = checkELS(inputs.height, displacement);
  
  const seismicForce = calculateSeismicForce(
    seismicZone, inputs.height, inputs.width, inputs.depth,
    inputs.floors, inputs.soilType
  );
  
  const floodRisk = calculateFloodRisk(inputs.returnPeriod, inputs.height);
  
  const vulnerability = calculateVulnerability(windForce, seismicForce, floodRisk);
  
  const resilienceIndex = calculateResilienceIndex(
    els.status, vulnerability.total, inputs.material,
    inputs.foundation, inputs.projectLevel
  );
  
  const windProfile = calculateWindProfile(
    inputs.height, v0, inputs.s1, s3, inputs.s2Category
  );
  
  return {
    vk,
    pressure,
    windForce,
    displacement,
    elsStatus: els.status,
    elsLimit: els.limit,
    elsRatio: els.ratio,
    seismicForce,
    floodRisk,
    vulnerability: {
      wind: vulnerability.wind,
      seismic: vulnerability.seismic,
      flood: vulnerability.flood,
    },
    resilienceIndex,
    windProfile,
  };
}
