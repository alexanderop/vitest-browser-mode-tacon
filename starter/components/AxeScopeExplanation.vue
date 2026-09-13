<template>
  <section class="axe-scope">
    <h1>Was prüft axe?</h1>
    <p class="intro"><strong>axe-core</strong> ist eine Bibliothek für automatische Accessibility-Regeln.<br>Sie untersucht den aktuellen DOM-Zustand und meldet Regelverstöße.</p>
    <table>
      <thead><tr><th>Beispiel für einen Fehler</th><th>axe + JSDOM</th><th>axe + Browser Mode</th></tr></thead>
      <tbody>
        <tr><td>Button oder Dialog ohne zugänglichen Namen</td><td class="yes">✓ prüfbar</td><td class="yes">✓ prüfbar</td></tr>
        <tr><td>Eingabefeld ohne Beschriftung</td><td class="yes">✓ prüfbar</td><td class="yes">✓ prüfbar</td></tr>
        <tr><td>Ungültige ARIA-Attribute oder Rollen</td><td class="yes">✓ prüfbar</td><td class="yes">✓ prüfbar</td></tr>
        <tr><td>Text mit zu wenig Farbkontrast</td><td class="missing">kein echtes Layout</td><td class="yes">✓ mit echtem Rendering</td></tr>
      </tbody>
    </table>
    <p class="example"><span>Reka-UI-Migration · AlertDialog</span><br>JSDOM: kein Kontrastbefund → Chromium: Kontrastfehler am Aktionsbutton.</p>
    <p class="limit">Tastaturabläufe, Fokus und die gewünschte Tab-Auswahl: eigene Tests.<br>axe kennt die beabsichtigte Bedienung nicht. Ein grüner Audit reicht dafür nicht.</p>
  </section>
</template>

<style scoped>
.axe-scope .intro { margin: 16px 0 14px; font-size: 21px; line-height: 1.45; }
.axe-scope table { width: 100%; border-collapse: collapse; font-size: 17px; line-height: 1.35; }
.axe-scope th { text-align: left; font-weight: 600; color: var(--brand-accent); }
.axe-scope th, .axe-scope td { padding: 8px 8px; border-bottom: 1px solid #ffffff26; }
.axe-scope th:first-child, .axe-scope td:first-child { padding-left: 0; width: 49%; }
.axe-scope .yes { color: #a6e3a1; white-space: nowrap; }
.axe-scope .missing { color: #f9e2af; white-space: nowrap; }
.axe-scope .example { margin: 16px 0 12px; padding-left: 14px; border-left: 3px solid var(--brand-accent); font-size: 18px; line-height: 1.5; }
.axe-scope .example span { color: var(--brand-accent); }
.axe-scope .limit { font-size: 17px; line-height: 1.5; opacity: .85; }
</style>
