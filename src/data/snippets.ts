export interface CodeSnippet {
  id: string;
  category: 'Apex' | 'LWC JS' | 'LWC HTML' | 'SOQL' | 'REST' | 'Security';
  fileName: string;
  code: string;
  altCode: string;
}

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 's-1',
    category: 'Apex',
    fileName: 'OpportunityTrigger.trigger',
    code: `trigger OpportunityTrigger on Opportunity (before insert, after update) {\n  TriggerHandler.execute(OpportunityHandler.class);\n}`,
    altCode: `trigger LeadTrigger on Lead (after insert, after update) {\n  LeadHandler.routeLeads(Trigger.newMap);\n}`,
  },
  {
    id: 's-2',
    category: 'Apex',
    fileName: 'LeadService.cls',
    code: `public with sharing class LeadService {\n  Database.executeBatch(new LeadBatch(), 200);\n}`,
    altCode: `public with sharing class BatchOrchestrator {\n  System.enqueueJob(new SyncQueueable());\n}`,
  },
  {
    id: 's-3',
    category: 'LWC JS',
    fileName: 'propertyExplorer.js',
    code: `@wire(getRecord, { recordId: '$recordId', fields })\nrecord;`,
    altCode: `@wire(getRelatedListRecords, { parentRecordId: '$id' })\nrelatedRecords;`,
  },
  {
    id: 's-4',
    category: 'LWC HTML',
    fileName: 'propertyExplorer.html',
    code: `<lightning-datatable\n  data={rows}\n  columns={cols}>\n</lightning-datatable>`,
    altCode: `<lightning-card title="CRM Pipeline" icon="standard:opportunity">\n  <c-opportunity-view></c-opportunity-view>\n</lightning-card>`,
  },
  {
    id: 's-5',
    category: 'SOQL',
    fileName: 'pipelineQuery.soql',
    code: `SELECT Id, Name, StageName\nFROM Opportunity\nWHERE IsClosed = false`,
    altCode: `SELECT Id, Name, AnnualRevenue\nFROM Account\nWITH USER_MODE LIMIT 50`,
  },
  {
    id: 's-6',
    category: 'REST',
    fileName: 'openAiBridge.cls',
    code: `callout:OpenAI_Named_Credential/\nv1/chat/completions`,
    altCode: `HttpRequest req = new HttpRequest();\nreq.setEndpoint('callout:MCP_Server/tools');`,
  },
  {
    id: 's-7',
    category: 'Security',
    fileName: 'securityCheck.cls',
    code: `Security.stripInaccessible(\n  AccessType.READABLE, records\n);`,
    altCode: `if (!Schema.sObjectType.Contact.isAccessible()) {\n  throw new AuraHandledException('No Access');\n}`,
  },
];

export interface Token {
  text: string;
  color: string;
}

const KEYWORDS = new Set([
  'trigger',
  'on',
  'before',
  'insert',
  'after',
  'update',
  'public',
  'with',
  'sharing',
  'class',
  'new',
  'SELECT',
  'FROM',
  'WHERE',
  'WITH',
  'USER_MODE',
  'LIMIT',
  'GROUP',
  'BY',
  'if',
  'throw',
  'static',
  'void',
  'return',
  'wire',
  'import',
  'export',
  'false',
  'true',
]);

const CORAL = '#D92D20';
const GREEN = '#10B981';
const WHITE = '#E5E5E5';
const GREY = '#999999';

export function tokenizeCode(code: string): Token[] {
  const tokens: Token[] = [];
  // Simple regex tokenizer for keywords, strings, tags, and words
  const regex = /('(?:\\'|[^'])*'|"(?:\\"|[^"])*"|<[^>]+>|\b[A-Za-z_][A-Za-z0-9_]*\b|[^\sA-Za-z0-9_'"<>]+|\s+)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    const word = match[0];
    if (word.startsWith("'") || word.startsWith('"')) {
      tokens.push({ text: word, color: GREEN });
    } else if (word.startsWith('<') && word.endsWith('>')) {
      tokens.push({ text: word, color: CORAL });
    } else if (word.startsWith('callout:')) {
      tokens.push({ text: word, color: GREEN });
    } else if (KEYWORDS.has(word)) {
      tokens.push({ text: word, color: CORAL });
    } else if (/^[A-Z][A-Za-z0-9_]*$/.test(word)) {
      tokens.push({ text: word, color: WHITE });
    } else {
      tokens.push({ text: word, color: GREY });
    }
  }

  return tokens;
}
