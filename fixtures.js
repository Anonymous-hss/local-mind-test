/**
 * fixtures.js — Backend protocol knowledge for LocalMind UI tests
 * 
 * Every fixture here matches the real IPC protocol message shapes
 * that dashboard.js, sidebar.js, and memory.js consume via
 * window.addEventListener('message', ...).
 * 
 * Source of truth: shared/protocol/messages.schema.json
 *                  + provider .ts files that transform backend responses
 */

// =============================================================================
// Dashboard & Sidebar: status messages
// =============================================================================

const STATUS_ONLINE = {
    type: 'status',
    status: 'online',
    model: 'qwen2.5-coder:7b',
    ollamaStatus: 'connected',
    modelCount: 3,
};

const STATUS_OFFLINE = {
    type: 'status',
    status: 'offline',
};

const STATUS_OLLAMA_OFFLINE = {
    type: 'status',
    status: 'ollama_offline',
    model: null,
    ollamaStatus: 'disconnected',
    modelCount: 0,
};

const PLAN_ACTIVE = {
    type: 'updatePlan',
    plan: {
        steps: [
            { description: 'Analyze existing codebase structure', status: 'done' },
            { description: 'Identify refactoring targets in auth module', status: 'done' },
            { description: 'Refactor login handler to use middleware', status: 'active' },
            { description: 'Update unit tests for new middleware', status: '' },
            { description: 'Run integration tests', status: '' },
        ],
    },
};

const PLAN_COMPLETED = {
    type: 'updatePlan',
    plan: {
        steps: [
            { description: 'Analyze existing codebase structure', status: 'done' },
            { description: 'Identify refactoring targets in auth module', status: 'done' },
            { description: 'Refactor login handler to use middleware', status: 'done' },
            { description: 'Update unit tests for new middleware', status: 'done' },
            { description: 'Run integration tests', status: 'done' },
        ],
    },
};

const PLAN_WITH_FAILURE = {
    type: 'updatePlan',
    plan: {
        steps: [
            { description: 'Analyze existing codebase structure', status: 'done' },
            { description: 'Apply code transformation', status: 'failed' },
            { description: 'Rollback changes', status: '' },
        ],
    },
};

// =============================================================================
// Dashboard & Sidebar: log messages
// =============================================================================

const LOG_INFO = { type: 'log', text: 'Planning task: Refactor auth loop @login.go', level: 'info' };
const LOG_SUCCESS = { type: 'log', text: 'Plan generated with 5 steps', level: 'success' };
const LOG_WARNING = { type: 'log', text: 'Rejected step — rollback pending', level: 'warning' };
const LOG_ERROR = { type: 'log', text: 'Error: Model timed out after 30000ms', level: 'error' };

// =============================================================================
// Dashboard & Sidebar: stream chunks
// =============================================================================

const STREAM_CHUNKS = [
    { type: 'stream', requestId: 'req-001', chunk: 'Analyzing ' },
    { type: 'stream', requestId: 'req-001', chunk: 'the login handler... ' },
    { type: 'stream', requestId: 'req-001', chunk: 'Found 3 potential improvements:\n' },
    { type: 'stream', requestId: 'req-001', chunk: '1. Extract validation logic\n' },
    { type: 'stream', requestId: 'req-001', chunk: '2. Use middleware pattern\n' },
    { type: 'stream', requestId: 'req-001', chunk: '3. Add error boundary' },
];

// =============================================================================
// Dashboard: historyData
// =============================================================================

const HISTORY_DATA = {
    type: 'historyData',
    data: [
        {
            description: 'Refactor authentication middleware',
            status: 'completed',
            steps: 5,
            duration_ms: 12500,
            created_at: Math.floor(Date.now() / 1000) - 3600, // 1h ago
        },
        {
            description: 'Add rate limiting to API endpoints',
            status: 'completed',
            steps: 3,
            duration_ms: 8200,
            created_at: Math.floor(Date.now() / 1000) - 7200, // 2h ago
        },
        {
            description: 'Optimize database queries in user service',
            status: 'failed',
            steps: 4,
            duration_ms: 45000,
            created_at: Math.floor(Date.now() / 1000) - 86400, // 1d ago
        },
        {
            description: 'Fix memory leak in WebSocket handler',
            status: 'running',
            steps: 2,
            duration_ms: null,
            created_at: Math.floor(Date.now() / 1000) - 120, // 2m ago
        },
    ],
};

const HISTORY_EMPTY = { type: 'historyData', data: [] };

// =============================================================================
// Dashboard: scoresData
// =============================================================================

const SCORES_HIGH = {
    type: 'scoresData',
    data: {
        overall: 8.5,
        completeness: 9.0,
        efficiency: 7.8,
        quality: 8.7,
    },
};

const SCORES_LOW = {
    type: 'scoresData',
    data: {
        overall: 3.2,
        completeness: 4.0,
        efficiency: 2.5,
        quality: 3.1,
    },
};

const SCORES_EMPTY = { type: 'scoresData', data: {} };

// =============================================================================
// Dashboard: strategiesData
// =============================================================================

const STRATEGIES_DATA = {
    type: 'strategiesData',
    data: [
        { task_type: 'Refactoring', use_count: 12, success_rate: 0.92, avg_score: 8.3 },
        { task_type: 'Bug Fix', use_count: 8, success_rate: 0.75, avg_score: 7.1 },
        { task_type: 'Feature Implementation', use_count: 5, success_rate: 0.60, avg_score: 6.2 },
        { task_type: 'Code Review', use_count: 3, success_rate: 1.0, avg_score: 9.1 },
    ],
};

const STRATEGIES_EMPTY = { type: 'strategiesData', data: [] };

// =============================================================================
// Dashboard: lessonsData
// =============================================================================

const LESSONS_DATA = {
    type: 'lessonsData',
    data: [
        { category: 'error', pattern: 'Timeout on large files', lesson: 'Split files >500 lines before processing to avoid model timeouts.' },
        { category: 'performance', pattern: 'Slow completion in Go', lesson: 'Use treesitter context extraction instead of full-file context for Go files.' },
        { category: 'pattern', pattern: 'Test generation', lesson: 'Table-driven tests work better than individual test functions for Go.' },
        { category: 'general', pattern: 'User preferences', lesson: 'User prefers concise output without verbose explanations.' },
        { category: 'error', pattern: 'Null pointer in agent', lesson: 'Always check workspace folder exists before passing to agent requests.' },
    ],
};

const LESSONS_EMPTY = { type: 'lessonsData', data: [] };

// =============================================================================
// Memory: updateStats
// =============================================================================

const MEMORY_STATS_LOADED = {
    type: 'updateStats',
    stats: {
        techStack: ['Go', 'TypeScript', 'Node.js', 'SQLite'],
        architecture: 'cmd → internal → pkg',
        entryPoints: ['cmd/localmind/main.go', 'src/extension.ts'],
        conventions: [
            { key: 'File Naming', value: 'snake_case', confidence: 0.95 },
            { key: 'Function Naming', value: 'camelCase', confidence: 0.90 },
            { key: 'Structure', value: 'layered (cmd/internal/pkg)', confidence: 0.85 },
            { key: 'Imports', value: 'grouped (stdlib, external, internal)', confidence: 0.70 },
        ],
        confidenceSummary: { detected: 4, inferred: 2, override: 1, unknown: 0 },
        totalFiles: 47,
        lastScan: new Date().toLocaleString(),
    },
};

const MEMORY_STATS_ERROR = {
    type: 'updateStats',
    stats: {
        techStack: [],
        architecture: 'Error loading',
        entryPoints: [],
        conventions: [{ key: 'Status', value: 'Connection refused', confidence: 0 }],
        confidenceSummary: {},
        totalFiles: 0,
        lastScan: 'Failed',
    },
};

// Memory: updateProgress
const MEMORY_PROGRESS_0 = { type: 'updateProgress', progress: 0 };
const MEMORY_PROGRESS_50 = { type: 'updateProgress', progress: 50 };
const MEMORY_PROGRESS_100 = { type: 'updateProgress', progress: 100 };

// =============================================================================
// Exports
// =============================================================================

const ALL_FIXTURES = {
    STATUS_ONLINE, STATUS_OFFLINE, STATUS_OLLAMA_OFFLINE,
    PLAN_ACTIVE, PLAN_COMPLETED, PLAN_WITH_FAILURE,
    LOG_INFO, LOG_SUCCESS, LOG_WARNING, LOG_ERROR,
    STREAM_CHUNKS,
    HISTORY_DATA, HISTORY_EMPTY,
    SCORES_HIGH, SCORES_LOW, SCORES_EMPTY,
    STRATEGIES_DATA, STRATEGIES_EMPTY,
    LESSONS_DATA, LESSONS_EMPTY,
    MEMORY_STATS_LOADED, MEMORY_STATS_ERROR,
    MEMORY_PROGRESS_0, MEMORY_PROGRESS_50, MEMORY_PROGRESS_100,
};

// Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ALL_FIXTURES;
}
// Browser
if (typeof window !== 'undefined') {
    window.__FIXTURES = ALL_FIXTURES;
}
