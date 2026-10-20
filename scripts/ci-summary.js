// Prints a one-line summary of the test + coverage reports for Jenkins feedback
// (build description, email body). Usage: node scripts/ci-summary.js
import { existsSync, readFileSync } from 'node:fs';

const JUNIT = 'reports/junit.xml';
const COBERTURA = 'reports/coverage/cobertura-coverage.xml';

const attr = (xml, tag, name) => {
  const m = xml.match(new RegExp(`<${tag}\\b[^>]*\\b${name}="([^"]*)"`));
  return m ? m[1] : null;
};

const parts = [];

if (existsSync(JUNIT)) {
  const xml = readFileSync(JUNIT, 'utf8');
  const total = Number(attr(xml, 'testsuites', 'tests') ?? 0);
  const failed = Number(attr(xml, 'testsuites', 'failures') ?? 0) + Number(attr(xml, 'testsuites', 'errors') ?? 0);
  const skipped = Number(attr(xml, 'testsuites', 'skipped') ?? 0);
  parts.push(`Tests: ${total - failed - skipped} passed, ${failed} failed, ${skipped} skipped`);
} else {
  parts.push('Tests: no report');
}

if (existsSync(COBERTURA)) {
  const lineRate = Number(attr(readFileSync(COBERTURA, 'utf8'), 'coverage', 'line-rate') ?? 0);
  parts.push(`Coverage: ${(lineRate * 100).toFixed(1)}% lines`);
}

console.log(parts.join(' | '));
