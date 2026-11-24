const COPY = {
  pt: {
    pilot: 'AMBIENTE PILOTO', eyebrow: 'SEGURANÇA CONTÍNUA, COM PROVAS', heroTitle: 'Encontre brechas.<br><em>Comprove a recuperação.</em>',
    heroLede: 'Uma primeira camada prática para verificar exposição e preparar a recuperação. Cada análise fica limitada a um domínio que você comprova controlar.', startScan: 'Verificar um domínio', planRecovery: 'Planejar recuperação', scopeStamp: 'ESCOPO VERIFICADO',
    workspaceEyebrow: 'ESPAÇO DE TRABALHO', workspaceTitle: 'Prontidão de segurança', localStorageLabel: 'ESPAÇO LOCAL', localStorageValue: 'Relatórios ficam neste navegador', metricScope: 'ESCOPO VERIFICADO', metricScopeFoot: 'Domínios analisados com prova de controle', metricFindings: 'ACHADOS ABERTOS', noScanYet: 'Nenhuma análise ainda', metricRecovery: 'PLANO DE RECUPERAÇÃO', notStarted: 'Não iniciado', noServices: 'Nenhum serviço crítico listado',
    tabScan: 'Exposição externa', tabRecovery: 'Prontidão de recuperação', tabScope: 'Escopo e limites', scanKicker: 'SOMENTE LEITURA · DOMÍNIO VERIFICADO', scanTitle: 'Verifique a superfície pública', scanIntro: 'Política de e-mail DNS, certificado TLS e cabeçalhos HTTPS selecionados. Sem tentativas de exploração.', domainLabel: 'Domínio que você possui ou está autorizado a avaliar', domainHelp: 'Digite somente o nome do host. Uma verificação por domínio confirmado.', generateProof: 'Gerar prova de propriedade', proofTitle: 'Adicione este registro TXT no DNS', proofSub: 'Isso confirma que você controla o domínio.', copy: 'Copiar', verifyScan: 'Confirmar e analisar', proofNote: 'Você pode remover o TXT depois da confirmação. A atualização de DNS pode levar alguns minutos.', whyProof: 'Por que confirmar primeiro?', whyProofBody: 'O scanner só faz verificações de leitura no host depois de confirmar o controle do domínio. Ele não aceita IPs brutos, endereços privados ou caminhos arbitrários de URL.', checkDns: 'SPF, DMARC e roteamento de e-mail', checkTls: 'Certificado TLS público', checkHeaders: 'Cabeçalhos de resposta HTTPS', scopeLock: 'Um host confirmado · somente leitura · sem payloads de exploração',
    recoveryKicker: 'PREPARAR · MEDIR · VALIDAR', recoveryTitle: 'Planeje o caminho de volta', recoveryIntro: 'Defina metas de recuperação para serviços críticos. Salvar este plano não executa nem comprova uma restauração.', criticalServices: 'Serviços críticos', maxFive: 'MÁX. 5', addService: 'Adicionar serviço crítico', rtoLabel: 'Meta de tempo de recuperação (RTO)', hours: 'horas', rtoHelp: 'Por quanto tempo este serviço pode ficar indisponível?', rpoLabel: 'Meta de perda de dados (RPO)', minutes: 'minutos', rpoHelp: 'Quanto dado recente você poderia perder?', restoreDateLabel: 'Último teste de restauração concluído', restoreDateHelp: 'Informe uma data somente se a restauração foi concluída.', restoreNoteLabel: 'O que foi restaurado?', restoreNoteHelp: 'Uma descrição curta para seu registro.', savePlan: 'Salvar plano de recuperação', proofOfRecovery: 'EVIDÊNCIA DE RECUPERAÇÃO', days: 'dias', restoreAgeLabel: 'desde o último teste de restauração registrado', recoveryWarning: 'Um plano salvo não comprova a recuperação. A prova exige uma restauração real, testes de integridade e tempo medido.',
    scopeKicker: 'ESCOPO DO MVP', scopeTitle: 'O que esta versão consegue comprovar', scopeIntro: 'Esta versão verifica a postura externa e registra metas de recuperação. Ainda não é um serviço de detecção de endpoints ou resposta a incidentes.', includedTitle: 'Incluído agora', included1: 'Host público confirmado por DNS', included2: 'Verificações de SPF, DMARC, MX e IPv4 público', included3: 'Certificado TLS e cabeçalhos HTTPS selecionados', included4: 'Metas de recuperação e registro de teste', included5: 'Exportação de relatório no navegador', nextTitle: 'Próximas integrações', next1: 'Nuclei para templates de vulnerabilidade com escopo', next2: 'Wazuh ou telemetria de endpoint equivalente', next3: 'Conectores de nuvem e identidade', next4: 'Contenção por parceiro e fluxo de restauração limpa', excludedTitle: 'Não prometemos', excluded1: 'Detectar todo ataque com uso de IA', excluded2: 'Encontrar toda vulnerabilidade desconhecida / zero-day', excluded3: 'Garantir recuperação a 100%', excluded4: 'Analisar ativos sem prova de autorização', licenseNote: 'Motores de código aberto podem acelerar as próximas fases, mas código, feeds de vulnerabilidade e templates têm licenças próprias. Este MVP não os inclui nem redistribui.', footerScope: 'Versão piloto · Somente superfície externa · Sem garantia de segurança', exportReport: 'Exportar relatório', printReport: 'Imprimir / PDF',
    scanRunning: 'Confirmando a propriedade e verificando DNS, TLS e cabeçalhos HTTPS…', scanSaved: 'Análise concluída. Os resultados ficam salvos neste navegador.', planSaved: 'Plano salvo neste navegador. Nenhum backup foi restaurado.', noPlanData: 'Adicione um serviço crítico para começar.', servicePlaceholder: 'Serviço (ex.: faturamento)', ownerPlaceholder: 'Responsável', rtoPlaceholder: 'RTO h', rpoPlaceholder: 'RPO min', removeService: 'Remover serviço', invalidDomain: 'Digite um domínio válido antes de gerar a prova.', copyDone: 'Copiado', noReport: 'Não há dados para exportar ainda.', findingLabel: 'ACHADO', findingsLabel: 'ACHADOS', externalScore: 'Índice de postura externa', scanAt: 'Analisado em', limitations: 'Limites desta análise', noFinding: 'Nenhum achado com prioridade foi gerado pelas verificações executadas.', planCompleteness: 'Completude do registro de recuperação', recoveryChecklist1: 'Serviços críticos definidos', recoveryChecklist2: 'Meta de tempo (RTO) definida', recoveryChecklist3: 'Meta de dados (RPO) definida', recoveryChecklist4: 'Teste de restauração registrado', incomplete: 'Em preparação', complete: 'Plano preenchido', notRecorded: 'Não registrado', remove: 'Remover',
  },
  en: {
    pilot: 'PILOT ENVIRONMENT', eyebrow: 'CONTINUOUS SECURITY, WITH PROOF', heroTitle: 'Find the gaps.<br><em>Prove recovery.</em>',
    heroLede: 'A practical first layer for exposure checks and recovery readiness. Every scan is limited to a domain you verify.', startScan: 'Start a domain check', planRecovery: 'Plan recovery', scopeStamp: 'VERIFIED SCOPE',
    workspaceEyebrow: 'WORKSPACE', workspaceTitle: 'Security readiness', localStorageLabel: 'LOCAL WORKSPACE', localStorageValue: 'Reports stay in this browser', metricScope: 'VERIFIED SCOPES', metricScopeFoot: 'Domains checked with proof of control', metricFindings: 'OPEN FINDINGS', noScanYet: 'No scan yet', metricRecovery: 'RECOVERY PLAN', notStarted: 'Not started', noServices: 'No critical services listed',
    tabScan: 'External exposure', tabRecovery: 'Recovery readiness', tabScope: 'Scope & limits', scanKicker: 'READ-ONLY · VERIFIED DOMAIN', scanTitle: 'Check the public edge', scanIntro: 'DNS mail policy, TLS certificate and selected HTTPS security headers. No exploit attempts.', domainLabel: 'Domain you own or are authorized to assess', domainHelp: 'Enter a hostname only. One verified hostname per scan.', generateProof: 'Generate ownership proof', proofTitle: 'Add this DNS TXT record', proofSub: 'This proves you control the domain.', copy: 'Copy', verifyScan: 'Verify and scan', proofNote: 'You can remove the TXT record after verification. DNS propagation can take a few minutes.', whyProof: 'Why verify first?', whyProofBody: 'The scanner only makes read-only requests to a hostname after it proves domain control. It will not accept raw IPs, private addresses or arbitrary URL paths.', checkDns: 'SPF, DMARC and mail routing', checkTls: 'Public TLS certificate', checkHeaders: 'HTTPS response headers', scopeLock: 'One verified hostname · read-only · no exploit payloads',
    recoveryKicker: 'PREPARE · MEASURE · VERIFY', recoveryTitle: 'Map the way back', recoveryIntro: 'Set recovery targets for critical services. Saving this plan does not run or verify a restore.', criticalServices: 'Critical services', maxFive: 'MAX 5', addService: 'Add a critical service', rtoLabel: 'Recovery time target (RTO)', hours: 'hours', rtoHelp: 'How long can this service be unavailable?', rpoLabel: 'Data loss target (RPO)', minutes: 'minutes', rpoHelp: 'How much recent data could you lose?', restoreDateLabel: 'Last successful restore test', restoreDateHelp: 'Enter a date only if a restore actually completed.', restoreNoteLabel: 'What was restored?', restoreNoteHelp: 'A short description for your own records.', savePlan: 'Save recovery plan', proofOfRecovery: 'RECOVERY EVIDENCE', days: 'days', restoreAgeLabel: 'since the last recorded restore test', recoveryWarning: 'A saved plan is not proof of recovery. Proof requires a real restore, integrity checks and measured time.',
    scopeKicker: 'MVP SCOPE', scopeTitle: 'What this release can prove', scopeIntro: 'The current build is a working external posture check and recovery planner. It is not an endpoint detection or incident response service yet.', includedTitle: 'Included now', included1: 'Verified public hostname', included2: 'SPF, DMARC, MX and public IPv4 checks', included3: 'TLS certificate and selected HTTPS headers', included4: 'Recovery targets and restore-test record', included5: 'Browser-local report export', nextTitle: 'Next integrations', next1: 'Nuclei for scoped vulnerability templates', next2: 'Wazuh or equivalent endpoint telemetry', next3: 'Cloud and identity connectors', next4: 'Partner-led containment and clean restore workflow', excludedTitle: 'Not claimed', excluded1: 'Detect every AI-assisted attack', excluded2: 'Find every unknown / zero-day vulnerability', excluded3: 'Guarantee 100% recovery', excluded4: 'Scan assets without ownership proof', licenseNote: 'Open-source engines can accelerate later phases, but their code, vulnerability feeds and templates have separate license terms. CICLO does not bundle or redistribute them in this MVP.', footerScope: 'Pilot release · External scope only · No guarantee of security', exportReport: 'Export report', printReport: 'Print / PDF',
    scanRunning: 'Verifying ownership and checking DNS, TLS and HTTPS headers…', scanSaved: 'Scan complete. Results are saved in this browser.', planSaved: 'Plan saved in this browser. No backup was restored.', noPlanData: 'Add a critical service to get started.', servicePlaceholder: 'Service (e.g. billing)', ownerPlaceholder: 'Owner', rtoPlaceholder: 'RTO h', rpoPlaceholder: 'RPO min', removeService: 'Remove service', invalidDomain: 'Enter a valid domain before generating proof.', copyDone: 'Copied', noReport: 'There is no data to export yet.', findingLabel: 'FINDING', findingsLabel: 'FINDINGS', externalScore: 'External posture score', scanAt: 'Scanned', limitations: 'Limits of this scan', noFinding: 'No prioritized finding was produced by the checks that ran.', planCompleteness: 'Recovery record completeness', recoveryChecklist1: 'Critical services defined', recoveryChecklist2: 'Recovery time target (RTO) set', recoveryChecklist3: 'Data loss target (RPO) set', recoveryChecklist4: 'Restore test recorded', incomplete: 'In preparation', complete: 'Plan filled', notRecorded: 'Not recorded', remove: 'Remove',
  },
};

// Keep the pilot's DNS gate language precise: public TXT data is not caller authentication.
Object.assign(COPY.pt, {
  metricScope: 'ESCOPO CONFIRMADO POR DNS', metricScopeFoot: 'Domínios com desafio TXT publicado',
  scanKicker: 'SOMENTE LEITURA · DESAFIO DNS', generateProof: 'Gerar desafio DNS',
  proofSub: 'O servidor verifica se este token foi publicado neste hostname.',
  proofNote: 'Registros DNS são públicos. O desafio limita o escopo, mas não autentica quem chama o scanner. A propagação pode levar alguns minutos.',
  whyProof: 'Por que confirmar o DNS?',
  whyProofBody: 'Antes das verificações, este hostname precisa publicar o token informado. Como o DNS é público, isso não autentica quem chama a API nem comprova titularidade legal. O scanner só faz verificações de leitura e rejeita IPs privados e caminhos arbitrários.',
  authorization: 'Confirmo que sou responsável por este domínio ou tenho autorização para avaliá-lo.',
  authorizationRequired: 'Confirme que você possui autorização para avaliar este domínio.',
  scanRunning: 'Verificando sua confirmação de autorização e consultando DNS, TLS e cabeçalhos HTTPS…',
});
Object.assign(COPY.en, {
  metricScope: 'DNS-CONFIRMED SCOPES', metricScopeFoot: 'Domains with a published TXT challenge',
  scanKicker: 'READ-ONLY · DNS CHALLENGE', generateProof: 'Generate DNS challenge',
  proofSub: 'The server checks whether this token is published on the hostname.',
  proofNote: 'DNS records are public. This challenge limits scope but does not authenticate the person calling the scanner. Propagation can take a few minutes.',
  whyProof: 'Why confirm DNS first?',
  whyProofBody: 'Before checks run, this hostname must publish the provided token. DNS is public, so this does not authenticate the caller or establish legal ownership. The scanner only makes read-only checks and rejects private IPs and arbitrary URL paths.',
  authorization: 'I confirm I own this domain or have authorization to assess it.',
  authorizationRequired: 'Confirm that you are authorized to assess this domain.',
  scanRunning: 'Checking your authorization confirmation and DNS, TLS and HTTPS headers…',
});

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const SCAN_KEY = 'ciclo.scan.v1';
const PLAN_KEY = 'ciclo.plan.v1';
let language = localStorage.getItem('ciclo.language') || 'en';
let proofToken = '';

function t(key) { return COPY[language][key] || COPY.en[key] || key; }
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
function safeRead(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function setLanguage(next) {
  language = next;
  localStorage.setItem('ciclo.language', language);
  document.documentElement.lang = language;
  $$('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (COPY[language][key]) element.innerHTML = COPY[language][key];
  });
  $('#language-toggle').textContent = language === 'pt' ? 'EN' : 'PT';
  $('#domain-input').placeholder = language === 'pt' ? 'sua-empresa.com' : 'your-company.com';
  $('#rto-input').placeholder = language === 'pt' ? '8' : '8';
  $('#rpo-input').placeholder = language === 'pt' ? '60' : '60';
  renderServices(readServicesFromDom());
  renderDashboard();
  renderSavedResults();
  renderRecoverySummary();
}

function goToPanel(name) {
  $$('.tab-button').forEach((button) => {
    const active = button.dataset.panel === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  $$('.workspace-panel').forEach((panel) => {
    const active = panel.id === `panel-${name}`;
    panel.classList.toggle('active', active);
    panel.hidden = !active;
  });
  document.querySelector('.workspace-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function normalizeClientDomain(value) {
  const domain = String(value || '').trim().toLowerCase().replace(/\.$/, '');
  return /^[a-z0-9.-]+\.[a-z]{2,63}$/.test(domain) && !domain.includes('..') && !domain.startsWith('.') && !domain.endsWith('.') ? domain : '';
}

function setScanStatus(message, type = '') {
  const box = $('#scan-status');
  box.className = `scan-status${type ? ` ${type}` : ''}`;
  box.textContent = message;
  box.classList.remove('hidden');
}

function renderDashboard() {
  const scan = safeRead(SCAN_KEY);
  const plan = safeRead(PLAN_KEY);
  $('#scope-count').textContent = scan && scan.domain ? '1' : '0';
  if (scan && Array.isArray(scan.findings)) {
    $('#finding-count').textContent = scan.findings.filter((item) => item.severity !== 'info').length;
    const date = new Date(scan.scannedAt);
    $('#last-scan-label').textContent = `${t('scanAt')} ${Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}`;
  } else {
    $('#finding-count').textContent = '—';
    $('#last-scan-label').textContent = t('noScanYet');
  }
  const services = plan && Array.isArray(plan.services) ? plan.services.filter((service) => service.name) : [];
  $('#recovery-status').textContent = plan && services.length && plan.rto && plan.rpo ? t('complete') : (services.length ? t('incomplete') : t('notStarted'));
  $('#service-count-label').textContent = services.length ? `${services.length} ${language === 'pt' ? (services.length === 1 ? 'serviço listado' : 'serviços listados') : (services.length === 1 ? 'service listed' : 'services listed')}` : t('noServices');
}

function renderFindings(result) {
  const root = $('#results');
  const activeCount = result.findings.filter((item) => item.severity !== 'info').length;
  const severityLabels = language === 'pt'
    ? { critical: 'CRÍTICO', high: 'ALTO', medium: 'MÉDIO', low: 'BAIXO', info: 'INFO' }
    : { critical: 'CRITICAL', high: 'HIGH', medium: 'MEDIUM', low: 'LOW', info: 'INFO' };
  const findingRows = result.findings.map((item) => `
    <article class="finding">
      <span class="severity severity-${escapeHtml(item.severity)}">${escapeHtml(severityLabels[item.severity] || 'INFO')}</span>
      <div class="finding-body"><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.detail)}</p><p class="recommendation"><strong>${language === 'pt' ? 'Ação sugerida:' : 'Suggested action:'}</strong> ${escapeHtml(item.recommendation)}</p>${item.evidence ? `<span class="finding-evidence">${escapeHtml(item.evidence)}</span>` : ''}</div>
    </article>`).join('');
  const limitations = Array.isArray(result.limitations) ? result.limitations : [];
  root.innerHTML = `
    <div class="results-head"><div class="results-title"><div class="score-ring">${escapeHtml(result.score)}</div><div><h3>${escapeHtml(result.domain)}</h3><p>${escapeHtml(t('externalScore'))}</p></div></div><div class="results-summary"><strong>${activeCount}</strong>${escapeHtml(activeCount === 1 ? t('findingLabel') : t('findingsLabel'))}</div></div>
    <div class="finding-list">${findingRows || `<div class="limitations">${escapeHtml(t('noFinding'))}</div>`}</div>
    <div class="limitations"><strong>${escapeHtml(t('limitations'))}:</strong><ul>${limitations.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>`;
  root.classList.remove('hidden');
}

function renderSavedResults() {
  const result = safeRead(SCAN_KEY);
  if (result && Array.isArray(result.findings)) renderFindings(result);
  else $('#results').classList.add('hidden');
}

function generateProof() {
  const domain = normalizeClientDomain($('#domain-input').value);
  if (!domain) {
    setScanStatus(t('invalidDomain'), 'error');
    return;
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  proofToken = `ciclo-${[...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('')}`;
  $('#proof-host').textContent = `_ciclo-verify.${domain}`;
  $('#proof-value').textContent = proofToken;
  $('#proof-box').classList.remove('hidden');
  $('#scan-status').classList.add('hidden');
}

async function runScan() {
  const domain = normalizeClientDomain($('#domain-input').value);
  if (!domain || !proofToken) {
    setScanStatus(t('invalidDomain'), 'error');
    return;
  }
  if (!$('#authorized-confirmation').checked) {
    setScanStatus(t('authorizationRequired'), 'error');
    return;
  }
  const button = $('#run-scan');
  button.disabled = true;
  setScanStatus(t('scanRunning'));
  try {
    const response = await fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain, token: proofToken, authorized: true }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'The scan could not complete.');
    localStorage.setItem(SCAN_KEY, JSON.stringify(payload));
    renderFindings(payload);
    renderDashboard();
    setScanStatus(t('scanSaved'), 'success');
    $('#results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    setScanStatus(error.message || 'The scan could not complete.', 'error');
  } finally {
    button.disabled = false;
  }
}

function readServicesFromDom() {
  return $$('.service-row', $('#services-list')).map((row) => ({
    name: $('[data-field="name"]', row).value.trim(),
    owner: $('[data-field="owner"]', row).value.trim(),
    rto: $('[data-field="rto"]', row).value,
    rpo: $('[data-field="rpo"]', row).value,
  }));
}

function serviceMarkup(service = {}, index = 0) {
  return `<div class="service-row" data-index="${index}">
    <input data-field="name" type="text" maxlength="80" placeholder="${escapeHtml(t('servicePlaceholder'))}" value="${escapeHtml(service.name || '')}" aria-label="${escapeHtml(t('servicePlaceholder'))}">
    <input data-field="owner" type="text" maxlength="80" placeholder="${escapeHtml(t('ownerPlaceholder'))}" value="${escapeHtml(service.owner || '')}" aria-label="${escapeHtml(t('ownerPlaceholder'))}">
    <input class="service-rto" data-field="rto" type="number" min="1" max="720" placeholder="${escapeHtml(t('rtoPlaceholder'))}" value="${escapeHtml(service.rto || '')}" aria-label="${escapeHtml(t('rtoLabel'))}">
    <input class="service-rpo" data-field="rpo" type="number" min="0" max="10080" placeholder="${escapeHtml(t('rpoPlaceholder'))}" value="${escapeHtml(service.rpo || '')}" aria-label="${escapeHtml(t('rpoLabel'))}">
    <button class="remove-service" type="button" data-remove="${index}" aria-label="${escapeHtml(t('removeService'))}">×</button>
  </div>`;
}

function renderServices(services) {
  const filtered = (services || []).slice(0, 5);
  $('#services-list').innerHTML = filtered.map((service, index) => serviceMarkup(service, index)).join('');
  $('#add-service').disabled = filtered.length >= 5;
  $('#add-service').classList.toggle('disabled', filtered.length >= 5);
}

function renderRecoverySummary() {
  const plan = safeRead(PLAN_KEY) || { services: [] };
  const services = Array.isArray(plan.services) ? plan.services.filter((service) => service.name) : [];
  const checks = [
    { key: 'recoveryChecklist1', done: services.length > 0 },
    { key: 'recoveryChecklist2', done: Boolean(plan.rto) },
    { key: 'recoveryChecklist3', done: Boolean(plan.rpo || plan.rpo === 0) },
    { key: 'recoveryChecklist4', done: Boolean(plan.restoreDate) },
  ];
  $('#recovery-checklist').innerHTML = checks.map((item) => `<div class="recovery-item ${item.done ? 'done' : ''}"><span class="mini-check">${item.done ? '✓' : '○'}</span><span>${escapeHtml(t(item.key))}</span></div>`).join('');
  const complete = checks.filter((item) => item.done).length;
  $('#recovery-meter-fill').style.width = `${complete * 25}%`;
  if (plan.restoreDate) {
    const delta = Math.max(0, Math.floor((Date.now() - new Date(`${plan.restoreDate}T00:00:00`).getTime()) / 86_400_000));
    $('#restore-age').innerHTML = `${delta}<span>${escapeHtml(t('days'))}</span>`;
  } else {
    $('#restore-age').innerHTML = `—<span>${escapeHtml(t('days'))}</span>`;
  }
}

function loadPlanIntoForm() {
  const plan = safeRead(PLAN_KEY) || {};
  renderServices(plan.services || []);
  $('#rto-input').value = plan.rto || '';
  $('#rpo-input').value = plan.rpo === 0 ? '0' : (plan.rpo || '');
  $('#restore-date').value = plan.restoreDate || '';
  $('#restore-note').value = plan.restoreNote || '';
}

function savePlan() {
  const services = readServicesFromDom().filter((service) => service.name || service.owner);
  const plan = {
    services,
    rto: $('#rto-input').value ? Number($('#rto-input').value) : null,
    rpo: $('#rpo-input').value !== '' ? Number($('#rpo-input').value) : null,
    restoreDate: $('#restore-date').value,
    restoreNote: $('#restore-note').value.trim(),
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  $('#plan-status').textContent = t('planSaved');
  renderDashboard();
  renderRecoverySummary();
}

function exportReport() {
  const report = { product: 'CICLO pilot', exportedAt: new Date().toISOString(), scan: safeRead(SCAN_KEY), recoveryPlan: safeRead(PLAN_KEY) };
  if (!report.scan && !report.recoveryPlan) {
    window.alert(t('noReport'));
    return;
  }
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `ciclo-security-report-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function copyValue(elementId, button) {
  const text = $(`#${elementId}`).textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const node = document.createElement('textarea');
    node.value = text;
    document.body.appendChild(node);
    node.select();
    document.execCommand('copy');
    node.remove();
  }
  button.textContent = t('copyDone');
  setTimeout(() => { button.textContent = t('copy'); }, 1300);
}

$$('.tab-button').forEach((button) => button.addEventListener('click', () => goToPanel(button.dataset.panel)));
$$('[data-go]').forEach((button) => button.addEventListener('click', () => goToPanel(button.dataset.go)));
$('#language-toggle').addEventListener('click', () => setLanguage(language === 'pt' ? 'en' : 'pt'));
$('#generate-proof').addEventListener('click', generateProof);
$('#run-scan').addEventListener('click', runScan);
$('#domain-input').addEventListener('input', () => {
  proofToken = '';
  $('#proof-box').classList.add('hidden');
  $('#authorized-confirmation').checked = false;
  $('#scan-status').classList.add('hidden');
});
$$('.copy-button').forEach((button) => button.addEventListener('click', () => copyValue(button.dataset.copy, button)));
$('#add-service').addEventListener('click', () => {
  const services = readServicesFromDom();
  if (services.length < 5) services.push({});
  renderServices(services);
});
$('#services-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove]');
  if (!button) return;
  const index = Number(button.dataset.remove);
  const services = readServicesFromDom();
  services.splice(index, 1);
  renderServices(services);
});
$('#save-plan').addEventListener('click', savePlan);
$('#export-report').addEventListener('click', exportReport);
$('#print-report').addEventListener('click', () => window.print());

loadPlanIntoForm();
renderDashboard();
renderSavedResults();
renderRecoverySummary();
setLanguage(language);
