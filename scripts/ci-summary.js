// Builds the CI feedback report from the test + coverage reports.
//  - writes reports/feedback.txt (full report: result, build info, every test, failures, coverage)
//  - prints a one-line summary (used for the Jenkins build description and GitHub status)
// Usage: node scripts/ci-summary.js
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const JUNIT = 'reports/junit.xml';
const COBERTURA = 'reports/coverage/cobertura-coverage.xml';
const FEEDBACK = 'reports/feedback.txt';

const decode = (s = '') =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? decode(m[1]) : '';
};

// ---------- read test results ----------
const suites = [];
if (existsSync(JUNIT)) {
  const xml = readFileSync(JUNIT, 'utf8');
  for (const s of xml.matchAll(/<testsuite\b([^>]*)>([\s\S]*?)<\/testsuite>/g)) {
    const tests = [];
    for (const t of s[2].matchAll(/<testcase\b([^>]*?)(\/>|>([\s\S]*?)<\/testcase>)/g)) {
      const body = t[3] || '';
      const failure = body.match(/<(failure|error)\b([^>]*)>?([\s\S]*?)(<\/\1>|$)/);
      tests.push({
        name: attr(t[1], 'name'),
        time: Number(attr(t[1], 'time')) || 0,
        status: failure ? 'FAIL' : /<skipped/.test(body) ? 'SKIP' : 'PASS',
        message: failure ? decode(attr(failure[2], 'message') || failure[3]).trim().split('\n')[0] : '',
      });
    }
    suites.push({ file: attr(s[1], 'name'), time: Number(attr(s[1], 'time')) || 0, tests });
  }
}

const all = suites.flatMap((s) => s.tests);
const count = (st) => all.filter((t) => t.status === st).length;
const passed = count('PASS');
const failed = count('FAIL');
const skipped = count('SKIP');
const filesFailed = suites.filter((s) => s.tests.some((t) => t.status === 'FAIL')).length;
const duration = suites.reduce((sum, s) => sum + s.time, 0);

// ---------- read coverage ----------
let coverage = null;
if (existsSync(COBERTURA)) {
  const tag = (readFileSync(COBERTURA, 'utf8').match(/<coverage\b[^>]*>/) || [''])[0];
  coverage = {
    lines: Number(attr(tag, 'line-rate')) * 100,
    branches: Number(attr(tag, 'branch-rate')) * 100,
    linesCovered: attr(tag, 'lines-covered'),
    linesValid: attr(tag, 'lines-valid'),
  };
}

// ---------- one-line summary ----------
const summary =
  (suites.length ? `Tests: ${passed} passed, ${failed} failed, ${skipped} skipped` : 'Tests: no report') +
  (coverage ? ` | Coverage: ${coverage.lines.toFixed(1)}% lines` : '');

// ---------- feedback.txt ----------
const env = process.env;
const result = !suites.length ? 'NO TEST REPORT' : failed ? 'FAILED' : 'PASSED';
const line = '='.repeat(64);
const out = [];

out.push(line, '  AgriSathi - CI Test Feedback Report', line);
out.push(`  Result      : ${result}${suites.length ? `  (${passed}/${all.length} tests passed)` : ''}`);
out.push(`  Job         : ${env.JOB_NAME || 'local run'}`);
out.push(`  Build       : ${env.BUILD_NUMBER ? '#' + env.BUILD_NUMBER : '-'}`);
out.push(`  Branch      : ${env.BRANCH_NAME || env.GIT_BRANCH || '-'}`);
out.push(`  Commit      : ${env.GIT_COMMIT ? env.GIT_COMMIT.slice(0, 7) : '-'}`);
out.push(`  Build URL   : ${env.BUILD_URL || '-'}`);
out.push(`  Generated   : ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);
out.push('');
out.push('SUMMARY');
out.push(`  Test files  : ${suites.length - filesFailed} passed, ${filesFailed} failed (${suites.length} total)`);
out.push(`  Tests       : ${passed} passed, ${failed} failed, ${skipped} skipped (${all.length} total)`);
out.push(`  Duration    : ${duration.toFixed(1)} s`);
if (coverage) {
  out.push(`  Coverage    : ${coverage.lines.toFixed(1)}% lines (${coverage.linesCovered}/${coverage.linesValid}), ${coverage.branches.toFixed(1)}% branches`);
}
out.push('');
out.push('RESULTS BY FILE');
for (const s of suites) {
  const bad = s.tests.filter((t) => t.status === 'FAIL').length;
  out.push('', `  [${bad ? 'FAIL' : 'PASS'}] ${s.file}  (${s.tests.length} tests, ${s.time.toFixed(2)} s)`);
  for (const t of s.tests) out.push(`      ${t.status === 'PASS' ? '[ok]  ' : t.status === 'SKIP' ? '[skip]' : '[FAIL]'} ${t.name}`);
}
out.push('', 'FAILURES');
if (failed) {
  for (const s of suites) {
    for (const t of s.tests.filter((x) => x.status === 'FAIL')) out.push(`  - ${s.file} > ${t.name}`, `      ${t.message}`);
  }
} else {
  out.push('  None - all tests passed.');
}
out.push('', line);

mkdirSync('reports', { recursive: true });
writeFileSync(FEEDBACK, out.join('\n') + '\n');

console.log(summary);
