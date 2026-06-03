/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeamMember {
  id: string;
  name: string;
  avatarColor: string; // TailWind color code
}

export interface RoleInfo {
  id: string;
  title: string;
  department: string;
  members: string[]; // names of people
  responsibilities: string[];
  performanceKPI?: string; // KPI target if exists
  bgGradient: string;
}

export interface TreeNode {
  id: string;
  title: string;
  subtitle: string;
  members: string[];
  children?: TreeNode[];
}

export interface WorkflowStep {
  id: number;
  title: string;
  role: string;
  members: string[];
  responsibilities: string[];
  kpi?: string;
  statusText?: string;
  nextStepId?: number;
  returnStepId?: number; // For feedback/rework logic
  returnLabel?: string;
}
