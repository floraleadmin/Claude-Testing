// Plays real lessons end to end. The app exposes the current exercise with ?e2e
// so the test can answer every exercise type correctly.
import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type Ex = Record<string, any>;

async function currentExercise(page: Page): Promise<Ex | null> {
  return page.evaluate(() => (window as any).__taalfiets?.ex ?? null);
}

const label = (w: Ex) => (w.pos === 'noun' && !w.pluralOnly ? `${w.bothArts ? 'de/het' : w.art} ${w.nl}` : w.pos === 'noun' ? `de ${w.nl}` : w.nl);
const tokens = (s: string) =>
  s
    .replace(/[.,!?;:"„“”«»()¿¡…]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

async function solve(page: Page, ex: Ex) {
  const radio = (name: string) => page.getByRole('radio', { name, exact: true });
  switch (ex.type) {
    case 'pick':
      return page.getByRole('radio', { name: new RegExp(`${label(ex.word)}`) }).click();
    case 'meaning':
      return radio(ex.answer).click();
    case 'cloze':
      return radio(ex.cloze.answer).click();
    case 'article':
      return radio(ex.word.art).click();
    case 'conjugate':
    case 'plural':
      return radio(ex.options.find((o: string) => ex.answers.includes(o))).click();
    case 'match':
      for (const p of ex.pairs) {
        await page.locator('.pairs .col').first().getByRole('button', { name: p.nl, exact: true }).click();
        await page.locator('.pairs .col').last().getByRole('button', { name: p.de, exact: true }).click();
      }
      return;
    case 'build': {
      const target = ex.listen ? ex.sentence.nl[0] : ex.dir === 'nl-de' ? ex.sentence.de[0] : ex.sentence.nl[0];
      for (const t of tokens(target)) {
        const tile = page
          .locator('.bank .tile:not(.used)')
          .filter({
            hasText: new RegExp(`^${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'),
          })
          .first();
        await tile.click();
      }
      return;
    }
    case 'write': {
      const target = ex.listen ? ex.sentence.nl[0] : ex.dir === 'nl-de' ? ex.sentence.de[0] : ex.sentence.nl[0];
      return page.locator('textarea.write').fill(target);
    }
    case 'speak':
      return page.getByRole('button', { name: 'Kann gerade nicht sprechen' }).click();
  }
}

async function playSession(page: Page, opts: { wrongFirst?: boolean } = {}) {
  const seen = new Set<string>();
  for (let step = 0; step < 60; step++) {
    if (await page.getByRole('heading', { name: /Geschafft!|Fehlerfrei!|Bestanden!/ }).isVisible()) return seen;
    const ex = await currentExercise(page);
    expect(ex, 'exercise').not.toBeNull();
    seen.add(ex!.type);
    if (opts.wrongFirst && step === 0 && ex!.type === 'write') {
      await page.locator('textarea.write').fill('dit is helemaal fout');
      await page.getByRole('button', { name: 'Prüfen' }).click();
      await expect(page.locator('.footer.wrong')).toBeVisible();
      await page.getByRole('button', { name: 'Weiter' }).click();
      continue;
    }
    await solve(page, ex!);
    if (ex!.type === 'speak') continue;
    if (ex!.type !== 'match') await page.getByRole('button', { name: 'Prüfen' }).click();
    await expect(page.locator('.footer.correct, .footer.almost')).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
  }
  throw new Error('session did not finish');
}

test('first lesson: onboarding, all exercises, XP and the next lesson unlocks', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto('/?e2e');
  await page.getByRole('button', { name: 'Ganz von vorn beginnen' }).click();
  await page.getByRole('button', { name: /Hallo!, Lektion 1 von/ }).click();
  await page.getByRole('button', { name: /Starten/ }).click();
  await playSession(page);
  await expect(page.getByText('XP', { exact: true })).toBeVisible();
  expect(await a11y(page, 'Ergebnis')).toEqual([]);
  await page.getByRole('button', { name: 'Weiter' }).click();
  await expect(page.getByRole('button', { name: /Hallo!, Lektion 1 von \d+, erledigt/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Hallo!, Lektion 2 von \d+$/ })).toBeVisible();
  // XP and streak show up.
  await expect(page.locator('[aria-label="1 Tage Serie"]:visible').first()).toBeVisible();
  expect(errors).toEqual([]);
});

/** Plays every node of the chapter the learner is in: lessons, story and chapter test. */
async function playChapter(page: Page, title: string): Promise<Set<string>> {
  const types = new Set<string>();
  for (let i = 0; i < 12; i++) {
    const node = page.locator('.node.current');
    if (!(await node.count())) break;
    const name = (await node.getAttribute('aria-label')) ?? '';
    if (!name.startsWith(title)) break;
    await node.click();
    await page.locator('.popover .btn').click();
    if (name.includes('Geschichte')) {
      if (title === 'Hallo!') expect(await a11y(page, 'Geschichte')).toEqual([]);
      for (let k = 0; k < 40; k++) {
        if (await page.getByRole('heading', { name: 'Geschichte gelesen!' }).isVisible()) break;
        const q = page.locator('.card.fade-in .choices').last();
        const finish = page.getByRole('button', { name: /^(Weiter|Fertig)$/ });
        if (await finish.isDisabled()) {
          // Try the options until the right one is found.
          const opts = q.getByRole('radio');
          for (let o = 0; o < (await opts.count()); o++) {
            if (await finish.isEnabled()) break;
            await opts.nth(o).click();
          }
        }
        await finish.click();
      }
      await page.getByRole('button', { name: 'Weiter' }).click();
      continue;
    }
    for (const t of await playSession(page)) types.add(t);
    await page.getByRole('button', { name: 'Weiter' }).click();
  }
  return types;
}

test('a whole chapter including story and chapter test; progress survives a reload', async ({ page }) => {
  test.setTimeout(240_000);
  await page.goto('/?e2e');
  await page.getByRole('button', { name: 'Ganz von vorn beginnen' }).click();
  const types = await playChapter(page, 'Hallo!');
  await expect(page.getByRole('button', { name: /Hallo!, Kapiteltest, erledigt/ })).toBeVisible();
  for (const t of ['meaning', 'match', 'build', 'write', 'cloze']) expect(types, t).toContain(t);
  await page.reload();
  await expect(page.getByRole('button', { name: /Hallo!, Kapiteltest, erledigt/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Wer bist du\?, Lektion 1 von \d+$/ })).toBeVisible();
});

test('a wrong answer comes back and counts as a mistake to practise', async ({ page }) => {
  await page.goto('/?e2e');
  await page.getByRole('button', { name: 'Ganz von vorn beginnen' }).click();
  await page.getByRole('button', { name: /Hallo!, Lektion 1 von/ }).click();
  await page.getByRole('button', { name: /Starten/ }).click();
  // Answer the first tile exercise wrongly on purpose.
  for (let step = 0; step < 40; step++) {
    const ex = await currentExercise(page);
    if (ex!.type === 'build') {
      await page.locator('.bank .tile').first().click();
      await page.getByRole('button', { name: 'Prüfen' }).click();
      if (await page.locator('.footer.wrong').isVisible()) {
        await expect(page.getByText('Richtige Lösung:')).toBeVisible();
        await page.getByRole('button', { name: 'Weiter' }).click();
        break;
      }
      await page.getByRole('button', { name: 'Weiter' }).click();
      continue;
    }
    await solve(page, ex!);
    if (ex!.type !== 'match') await page.getByRole('button', { name: 'Prüfen' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
  }
  await playSession(page);
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: 'Üben' }).first().click();
  await expect(page.getByRole('button', { name: /Fehler wiederholen/ })).toBeEnabled();
  await page.getByRole('button', { name: /Fehler wiederholen/ }).click();
  await playSession(page);
  await page.getByRole('button', { name: 'Weiter' }).click();
  await expect(page.getByRole('button', { name: /Fehler wiederholen/ })).toBeDisabled();
});

/** Serious and critical accessibility problems on the current screen (axe-core, WCAG 2.1 AA). */
async function a11y(page: Page, screen: string) {
  // Let entry animations finish so colours are measured at rest.
  await page.waitForTimeout(400);
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  return r.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map(
      (v) =>
        `${screen}: ${v.id} – ${v.nodes
          .slice(0, 3)
          .map((n) => `${n.target.join(' ')} (${n.any[0]?.message ?? ''})`)
          .join(' | ')}`,
    );
}

for (const scheme of ['light', 'dark'] as const)
  test(`main screens open without errors and pass an accessibility scan (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    const errors: string[] = [];
    const problems: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/?e2e');
    problems.push(...(await a11y(page, 'Willkommen')));
    await page.getByRole('button', { name: 'Ganz von vorn beginnen' }).click();
    problems.push(...(await a11y(page, 'Lernen')));
    for (const name of ['Üben', 'Wörter', 'Profil']) {
      await page.getByRole('button', { name, exact: true }).first().click();
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
      problems.push(...(await a11y(page, name)));
    }
    await page
      .getByRole('button', { name: /^(Einstellungen|Optionen)$/ })
      .first()
      .click();
    await expect(page.getByRole('heading', { name: 'Einstellungen' })).toBeVisible();
    problems.push(...(await a11y(page, 'Einstellungen')));
    await page
      .getByRole('button', { name: /^(Lernen)$/ })
      .first()
      .click();
    await page.getByRole('button', { name: /Grammatik und Wörter: Hallo!/ }).click();
    await expect(page.getByRole('heading', { name: 'Hallo!' })).toBeVisible();
    problems.push(...(await a11y(page, 'Grammatik')));
    await page
      .getByRole('button', { name: /Zurück|Schließen/ })
      .first()
      .click();
    await page.getByRole('button', { name: /Hallo!, Lektion 1 von/ }).click();
    await page.getByRole('button', { name: /Starten/ }).click();
    problems.push(...(await a11y(page, 'Übung')));
    const ex = await currentExercise(page);
    await solve(page, ex!);
    if (ex!.type !== 'match') await page.getByRole('button', { name: 'Prüfen' }).click();
    problems.push(...(await a11y(page, 'Feedback')));
    expect(errors).toEqual([]);
    expect(problems).toEqual([]);
  });

test('placement test into section 5, then its first chapter', async ({ page }) => {
  test.setTimeout(300_000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('/?e2e');
  await page.getByRole('button', { name: 'Ich kann schon etwas Niederländisch' }).click();
  await page.getByRole('button', { name: /^Abschnitt 5:/ }).click();
  await playSession(page);
  await page.getByRole('button', { name: 'Weiter' }).click();
  await expect(page.getByRole('button', { name: /Relativsätze, Lektion 1 von \d+$/ })).toBeVisible();
  const types = await playChapter(page, 'Relativsätze');
  await expect(page.getByRole('button', { name: /Relativsätze, Kapiteltest, erledigt/ })).toBeVisible();
  expect(types.size).toBeGreaterThanOrEqual(5);
  expect(errors).toEqual([]);
});

test('without a Dutch voice nothing is read aloud and listening tasks are left out', async ({ page }) => {
  await page.addInitScript(() => {
    const german = {
      lang: 'de-DE',
      name: 'Deutsch',
      voiceURI: 'de-DE',
      localService: true,
      default: true,
    };
    Object.defineProperty(speechSynthesis, 'getVoices', {
      value: () => [german],
    });
    (window as any).__spoken = [];
    Object.defineProperty(speechSynthesis, 'speak', {
      value: (u: SpeechSynthesisUtterance) => (window as any).__spoken.push(u.text),
    });
  });
  await page.goto('/?e2e');
  await page.getByRole('button', { name: 'Ganz von vorn beginnen' }).click();
  await page.getByRole('button', { name: /Hallo!, Lektion 1 von/ }).click();
  await page.getByRole('button', { name: /Starten/ }).click();
  for (let step = 0; step < 60; step++) {
    if (await page.getByRole('heading', { name: /Geschafft!|Fehlerfrei!/ }).isVisible()) break;
    const ex = await currentExercise(page);
    expect(ex!.listen ?? false, `${ex!.type} without listening`).toBe(false);
    await solve(page, ex!);
    if (ex!.type === 'speak') continue;
    if (ex!.type !== 'match') await page.getByRole('button', { name: 'Prüfen' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
  }
  expect(await page.evaluate(() => (window as any).__spoken)).toEqual([]);
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page
    .getByRole('button', { name: /^Wörter$/ })
    .first()
    .click();
  await page.getByRole('button', { name: 'Keine niederländische Stimme – Hilfe' }).first().click();
  await expect(page.getByRole('dialog', { name: 'Keine niederländische Stimme' })).toBeVisible();
  await page.getByRole('button', { name: 'Verstanden' }).click();
  expect(await page.evaluate(() => (window as any).__spoken)).toEqual([]);
  await page
    .getByRole('button', { name: /Einstellungen|Optionen/ })
    .first()
    .click();
  await expect(page.getByText(/Keine niederländische Stimme gefunden/)).toBeVisible();
  await expect(page.getByText(/Windows: Einstellungen/)).toBeVisible();
});
