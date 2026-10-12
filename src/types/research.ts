/**
 * Types for Super Investing Intelligence — AI Stock Research Agent
 */

export type SourceType = 
  | 'official_filing'
  | 'earnings_transcript'
  | 'regulatory_disclosure'
  | 'financial_news'
  | 'promotional_blog'
  | 'local_news'
  | 'broker_report'
  | 'other';

export type AuthorityTier = 
  | 1 // Official exchange filings & regulatory disclosures (Highest)
  | 2 // Earnings-call transcripts & IR material
  | 3 // Reputable financial press & news
  | 4 // Promotional blogs, stock tips, unverified forums (Lowest)

export interface DocumentMetadata {
  id: string; // e.g., 'S1', 'S2'
  filename: string;
  sourceName: string;
  sourceType: SourceType;
  authorityTier: AuthorityTier;
  publicationDate: string; // ISO or YYYY-MM-DD
  reportingPeriod?: string; // e.g., 'Q1 FY27'
  url?: string;
  content: string;
  characterCount: number;
  isUntrusted?: boolean;
}

export type ClaimCategory = 
  | 'financial_result'
  | 'management_guidance'
  | 'operational_metric'
  | 'risk'
  | 'ownership'
  | 'legal_disclosure'
  | 'third_party_opinion'
  | 'inference';

export interface EvidenceRecord {
  id: string;
  claim: string;
  companyMentioned: string;
  metric?: string;
  value?: string | number;
  currency?: string;
  unit?: string;
  period?: string;
  category: ClaimCategory;
  sourceId: string;
  quotation: string;
  publicationDate: string;
  confidence: 'high' | 'medium' | 'low';
  limitations?: string;
}

export interface ContradictionRecord {
  id: string;
  metric: string;
  reportingPeriod: string;
  claimA: {
    value: string;
    sourceId: string;
    sourceName: string;
    authorityTier: AuthorityTier;
  };
  claimB: {
    value: string;
    sourceId: string;
    sourceName: string;
    authorityTier: AuthorityTier;
  };
  nature: 'numerical_discrepancy' | 'temporal_mismatch' | 'promotional_distortion';
  status: 'unresolved' | 'reconciled' | 'flagged_promotional';
  resolutionExplanation: string;
}

export interface EntityResolutionRecord {
  id: string;
  documentSourceId: string;
  entityMentioned: string;
  targetEntityName: string;
  isTargetCompany: boolean;
  confidence: number; // 0 - 1
  rationale: string;
}

export interface InjectionDefenseRecord {
  id: string;
  sourceId: string;
  detectedPayload: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  manipulativeIntent: string;
  actionTaken: 'sanitized_and_isolated' | 'quarantined' | 'flagged';
  timestamp: string;
}

export interface CitationVerificationRecord {
  citationId: string; // e.g. '[S1]'
  sourceId: string;
  sourceExists: boolean;
  sourceTitle: string;
  claimedFact: string;
  matchedPassage: string;
  verified: boolean;
  verificationNote: string;
}

export interface CitationQualitySummary {
  totalCitations: number;
  verifiedCount: number;
  unverifiedCount: number;
  unresolvedDiscrepanciesReported: boolean;
  entityConflationPrevented: boolean;
  injectionNeutralized: boolean;
  overallQualityScore: number; // 0 - 100
  auditNotes: string[];
}

export interface ResearchBriefData {
  companyName: string;
  ticker: string;
  exchange: string;
  asOfDate: string;
  snapshot: string;
  bullCase: string[];
  bearCase: string[];
  openQuestions: string[];
  sources: Array<{
    sourceId: string;
    filename: string;
    sourceName: string;
    publicationDate: string;
    url?: string;
  }>;
  fullMarkdown: string;
  wordCount: number;
  generatedAt: string;
  modelUsed: string;
  promptVersion: 'A_baseline' | 'B_contradiction_aware' | 'C_hardened_agent';
  isRealModelCall: boolean;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCostUsd: number;
  estimatedCostInr: number;
}

export interface EvaluationCriterionScore {
  criterion: string;
  criterionKey: 
    | 'numerical_accuracy'
    | 'citation_traceability'
    | 'contradiction_detection'
    | 'entity_resolution'
    | 'injection_resistance'
    | 'balanced_risk'
    | 'format_adherence'
    | 'open_questions';
  score: 0 | 1 | 2; // 0 = failed, 1 = partial, 2 = successful
  maxScore: 2;
  observation: string;
  supportingEvidence: string;
}

export interface EvaluationRunResult {
  runId: string;
  promptVersion: 'A_baseline' | 'B_contradiction_aware' | 'C_hardened_agent';
  versionName: string;
  description: string;
  modelName: string;
  timestamp: string;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCostUsd: number;
  brief: ResearchBriefData;
  evidenceCount: number;
  contradictionsFound: number;
  injectionBlocked: boolean;
  conflationPrevented: boolean;
  scores: EvaluationCriterionScore[];
  totalScore: number; // 0 - 16
  maxTotalScore: number; // 16
  successPercentage: number;
  isRealApiCall: boolean;
  failureLog: string[];
}

export interface EvaluationLabComparison {
  runs: {
    runA: EvaluationRunResult;
    runB: EvaluationRunResult;
    runC: EvaluationRunResult;
  };
  summary: {
    keyImprovements: string[];
    riskVulnerabilitiesMitigated: string[];
    avgLatencyMs: number;
    totalTokens: number;
    totalCostUsd: number;
    recommendedProductionVersion: 'C_hardened_agent';
  };
}
