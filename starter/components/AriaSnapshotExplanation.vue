<template>
  <div class="aria-snapshot-explanation">
    <p class="intro">Vitest Browser Mode hält Rollen, Namen und Zustände fest.</p>
    <div class="comparison">
      <section>
        <h2>Geprüfter Sollzustand</h2>
        <div class="tree">
          <header>Accessibility tree <small>Demo · Ausschnitt</small></header>
          <div class="tree-content">
            <div class="role">▾ tablist</div>
            <div class="tree-name">„Manage your account“</div>
            <div class="tree-row">├ Account</div>
            <div class="tree-row selected"><span>└ Password</span><strong>ausgewählt</strong></div>
          </div>
        </div>
      </section>
      <div class="arrow" aria-hidden="true">→</div>
      <section>
        <h2>Lesbarer ARIA-Snapshot</h2>
        <div class="snapshot" aria-label="Snapshot: Tab-Liste Manage your account, Account und Password, Password ausgewählt">
          <div>- <span class="role">tablist</span> <span class="name">"Manage your account"</span>:</div>
          <div class="child">- <span class="role">tab</span> <span class="name">"Account"</span></div>
          <div class="child">- <span class="role">tab</span> <span class="name">"Password"</span> <strong>[selected]</strong></div>
        </div>
        <div class="legend"><span class="role">Rolle</span><span class="name">Name</span><strong>Zustand</strong></div>
      </section>
    </div>
    <div class="workflow"><span>Erzeugen</span><b>→</b><span>Prüfen</span><b>→</b><span>Bei Änderungen vergleichen</span></div>
    <p class="version">ARIA Snapshots · experimentell ab Vitest 4.1.4</p>
  </div>
</template>

<style scoped>
.aria-snapshot-explanation { margin-top: 15px; }
.intro { margin: 0 0 25px; font-size: 22px; line-height: 1.4; }
.comparison { display: grid; grid-template-columns: 1fr 54px 1.12fr; align-items: center; gap: 16px; }
.comparison section { min-width: 0; }
h2 { margin: 0 0 13px; font-size: 20px; line-height: 1.3; }
.tree { border: 1px solid #51545c; border-radius: 9px; background: #202124; overflow: hidden; }
.tree header { display: flex; align-items: center; justify-content: space-between; padding: 12px; border-bottom: 1px solid #51545c; font-size: 15px; font-weight: 600; }
.tree small { font-size: 10px; color: #bdc1c6; font-weight: 400; }
.tree-content { padding: 13px; font-size: 18px; line-height: 1.5; }
.tree-name { padding-left: 17px; margin-bottom: 10px; font-size: 16px; }
.tree-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 8px; }
.selected { background: #a6e3a117; color: #a6e3a1; }
.selected strong { font-size: 13px; color: inherit; }
.arrow { color: var(--brand-accent, #ff55e7); text-align: center; font-size: 48px; }
.snapshot { padding: 20px 14px; border-left: 3px solid var(--brand-accent, #ff55e7); background: #11151e; border-radius: 0 8px 8px 0; font: 15px/2.2 ui-monospace, SFMono-Regular, Consolas, monospace; white-space: nowrap; }
.child { padding-left: 17px; }
.role { color: #a8c7fa; }.name { color: #f6aea9; }
.snapshot strong, .legend strong { color: #a6e3a1; font-weight: 600; }
.legend { display: flex; gap: 26px; margin: 17px 0 0 16px; font-size: 17px; }
.workflow { display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 31px; font-size: 23px; font-weight: 600; }
.workflow b { color: var(--brand-accent, #ff55e7); font-size: 28px; }
.version { margin: 19px 0 0; text-align: center; font-size: 14px; opacity: .75; }
</style>
