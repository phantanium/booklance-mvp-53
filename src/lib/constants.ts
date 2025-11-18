export const ACCOUNTING_SERVICES = [
  { value: 'financial_accountant', label: 'Financial Accountant' },
  { value: 'tax_accountant', label: 'Tax Accountant' },
  { value: 'bookkeeper', label: 'Bookkeeper' },
  { value: 'management_accountant', label: 'Management Accountant' },
  { value: 'cost_accountant', label: 'Cost Accountant' },
  { value: 'auditor', label: 'Auditor' },
  { value: 'accounting_software_specialist', label: 'Accounting Software Specialist' },
  { value: 'accounting_consultant', label: 'Accounting Consultant' },
  { value: 'financial_analyst', label: 'Financial Analyst' },
  { value: 'accounting_trainer', label: 'Accounting Trainer' },
  { value: 'payroll_specialist', label: 'Payroll Specialist' },
  { value: 'accounting_data_entry', label: 'Accounting Data Entry' },
  { value: 'accounting_assistant', label: 'Accounting Assistant' },
] as const;

export const CLIENT_TYPES = [
  { value: 'umkm', label: 'UMKM' },
  { value: 'corporate', label: 'Corporate' },
] as const;

export const DURATION_TYPES = [
  { value: 'once_off', label: 'Once-off' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'project_based', label: 'Project Based' },
] as const;

export const JOB_STATUS = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
] as const;
