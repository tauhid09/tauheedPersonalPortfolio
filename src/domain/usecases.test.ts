import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  getProjectBySlug,
  getAdjacentProjects,
  extractUniqueTags,
  validateContactSubmission,
  estimateReadingTimeMinutes,
} from './usecases.ts';
import type { Project } from './entities.ts';

const mockProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'distributed-kv-store',
    title: 'Distributed KV Store',
    tagline: 'High-throughput Raft consensus store',
    year: 2025,
    clientOrContext: 'Core Infrastructure',
    role: 'Lead Architect',
    problem: 'Existing datastore struggled with write throughput and partition recovery.',
    approach: 'Implemented pipelined Raft log replication and memory mapped storage.',
    solution: 'Engineered a multi-node Go consensus cluster.',
    stack: ['Go', 'Raft', 'gRPC', 'RocksDB'],
    tags: ['Distributed Systems', 'Go', 'Performance'],
    outcome: 'Achieved 420,000 writes/sec with sub-2ms P99 latency.',
    metrics: [{ label: 'Throughput', value: '420k ops/sec', context: 'Peak bench' }],
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: 'proj-2',
    slug: 'cloud-telemetry-engine',
    title: 'Cloud Telemetry Engine',
    tagline: 'Real-time metrics streaming pipeline',
    year: 2024,
    clientOrContext: 'Fintech Platform',
    role: 'Principal Engineer',
    problem: 'Telemetry ingest dropped 14% of events during market opens.',
    approach: 'Zero-allocation ring buffers and Kafka partition balancing.',
    solution: 'Built high-scale stream ingestor in Rust and TypeScript.',
    stack: ['Rust', 'TypeScript', 'Kafka', 'ClickHouse'],
    tags: ['Data Engineering', 'Streaming', 'Rust'],
    outcome: 'Zero packet loss during 10x traffic surges.',
    metrics: [{ label: 'Loss rate', value: '0.00%', context: 'Peak market events' }],
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: 'proj-3',
    slug: 'internal-draft-project',
    title: 'Draft Project',
    tagline: 'Work in progress',
    year: 2024,
    clientOrContext: 'Internal',
    role: 'Engineer',
    problem: 'Draft',
    approach: 'Draft',
    solution: 'Draft',
    stack: ['Python'],
    tags: ['AI'],
    outcome: 'Draft',
    metrics: [],
    featured: false,
    published: false,
    order: 3,
  },
];

test('filterProjects excludes unpublished projects', () => {
  const result = filterProjects(mockProjects, 'all');
  assert.equal(result.length, 2);
  assert.equal(result.some((p) => p.slug === 'internal-draft-project'), false);
});

test('filterProjects filters by tag correctly', () => {
  const result = filterProjects(mockProjects, 'Go');
  assert.equal(result.length, 1);
  assert.equal(result[0].slug, 'distributed-kv-store');
});

test('filterProjects search query finds matches in title or stack', () => {
  const searchResult = filterProjects(mockProjects, 'all', 'kafka');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].slug, 'cloud-telemetry-engine');
});

test('getProjectBySlug retrieves matching project', () => {
  const project = getProjectBySlug(mockProjects, 'distributed-kv-store');
  assert.ok(project);
  assert.equal(project?.title, 'Distributed KV Store');
});

test('getAdjacentProjects returns proper prev and next', () => {
  const { prev, next } = getAdjacentProjects(mockProjects, 'distributed-kv-store');
  assert.equal(prev, undefined);
  assert.equal(next?.slug, 'cloud-telemetry-engine');
});

test('extractUniqueTags aggregates all unique published tags', () => {
  const tags = extractUniqueTags(mockProjects);
  assert.deepEqual(tags, ['Data Engineering', 'Distributed Systems', 'Go', 'Performance', 'Rust', 'Streaming']);
});

test('validateContactSubmission validates clean input', () => {
  const res = validateContactSubmission({
    name: 'Sarah Connor',
    email: 'sarah@skynet-defense.com',
    company: 'Resistance Inc',
    message: 'We would love to discuss a distributed systems consulting engagement.',
    honeypot: '',
    submitTimeDelta: 3000,
  });
  assert.equal(res.success, true);
  assert.equal(res.data?.name, 'Sarah Connor');
});

test('validateContactSubmission rejects honeypot spam and invalid email', () => {
  const spamRes = validateContactSubmission({
    name: 'Bot',
    email: 'bot@spam.com',
    message: 'Buy crypto now!',
    honeypot: 'filled_by_bot',
  });
  assert.equal(spamRes.success, false);
  assert.ok(spamRes.errors?.honeypot);

  const emailRes = validateContactSubmission({
    name: 'Real Person',
    email: 'not-an-email',
    message: 'Hello there developer friend',
    honeypot: '',
  });
  assert.equal(emailRes.success, false);
  assert.ok(emailRes.errors?.email);
});

test('estimateReadingTimeMinutes calculates realistic read time', () => {
  const shortText = 'One two three four five';
  assert.equal(estimateReadingTimeMinutes(shortText), 1);
  const longText = new Array(600).fill('word').join(' ');
  assert.equal(estimateReadingTimeMinutes(longText), 3);
});

test('resolveTheme respects user preference and falls back to system scheme', async () => {
  const { resolveTheme, getNextTheme } = await import('./theme.ts');
  assert.equal(resolveTheme('dark', false), 'dark');
  assert.equal(resolveTheme('light', true), 'light');
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme(null, false), 'light');
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme('dark'), 'light');
});

