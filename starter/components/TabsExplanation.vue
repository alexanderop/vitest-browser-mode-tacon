<script setup lang="ts">
defineProps<{ step: 'mismatch' | 'narrow' | 'contract' | 'fixed' }>()
</script>

<template>
  <div class="tabs-explanation" :class="`step-${step}`">
    <template v-if="step === 'contract'">
      <div class="keyboard-action"><span>Account</span><kbd>→</kbd><strong>Password</strong></div>
      <div class="checks">
        <section>
          <h2>Fokus</h2>
          <div class="focus-demo">Password</div>
          <p>Wo geht die nächste<br>Tastatureingabe hin?</p>
          <strong class="pass">✓ Password</strong>
        </section>
        <section>
          <h2>Auswahl</h2>
          <div class="selection-demo"><span>Account</span><span class="selected">Password</span></div>
          <p>Welcher Tab wird als<br>ausgewählt gemeldet?</p>
          <strong class="fail">× Account</strong>
        </section>
        <section>
          <h2>Panel-Name</h2>
          <div class="panel-demo"><span>Bereich</span><strong>„Account“</strong></div>
          <p>Wie heißt der<br>zugehörige Bereich?</p>
          <strong class="fail">× Account</strong>
        </section>
      </div>
      <p class="takeaway">Erwartet: dreimal Password.</p>
    </template>

    <template v-else>
      <template v-if="step === 'fixed'">
        <div class="shared-state">Eine Auswahl: <strong>Password</strong></div>
        <div class="branches" aria-hidden="true"><span>↓</span><span>↓</span></div>
      </template>
      <div class="views">
        <section>
          <h2>{{ step === 'narrow' ? 'Der Test schaut hierhin' : 'Sichtbare Oberfläche' }}</h2>
          <div class="shop-excerpt">
            <header>Claw &amp; Chew <img src="/shop/plush-card-actual.png" alt="" /></header>
            <div class="shop-content">
              <div class="shop-tabs"><span>Account</span><strong>Password</strong></div>
              <h3>Password</h3>
              <p class="password-copy" :class="{ highlighted: step === 'narrow' }">Change your password here.<span v-if="step === 'narrow'" class="text-check" aria-label="Text gefunden">✓</span></p>
              <div class="input-label">New password</div>
              <div class="password-input" aria-hidden="true">••••••••••</div>
            </div>
          </div>
        </section>
        <section v-if="step === 'narrow'" class="test-question">
          <svg class="magnifier" viewBox="0 0 80 80" aria-hidden="true"><circle cx="32" cy="32" r="23" /><path d="M49 49 72 72" /><path class="tick" d="m21 32 8 8 15-17" /></svg>
          <h2>„Ist der Text da?“</h2>
          <strong class="pass answer">✓ Ja. Test grün.</strong>
          <p>Auswahl und Panel-Name?<br>Gar nicht geprüft.</p>
        </section>
        <section v-else>
          <h2>Gemeldete Bedeutung</h2>
          <div class="tree-excerpt" :class="{ repaired: step === 'fixed' }">
            <header>Accessibility tree <small>Demo · Ausschnitt</small></header>
            <div class="tree-body">
              <div class="tree-root">▾ Tab-Liste</div>
              <div class="tree-row" :class="{ wrong: step === 'mismatch' }"><span>├ Account</span><strong v-if="step === 'mismatch'">ausgewählt</strong></div>
              <div class="tree-row" :class="{ right: step === 'fixed' }"><span>└ Password</span><strong v-if="step === 'fixed'">ausgewählt</strong></div>
              <div class="tree-panel"><span>Bereich heißt</span><strong :class="step === 'fixed' ? 'pass' : 'fail'">„{{ step === 'fixed' ? 'Password' : 'Account' }}“</strong></div>
            </div>
          </div>
        </section>
      </div>
      <p v-if="step === 'mismatch'" class="takeaway"><span>Password</span><b class="fail">≠</b><span>Account</span></p>
      <p v-else-if="step === 'narrow'" class="takeaway">Der Text stimmt. Die Bedeutung bleibt falsch.</p>
      <p v-else class="takeaway pass">✓ Oberfläche und Bedeutung stimmen überein.</p>
    </template>
  </div>
</template>

<style scoped>
.tabs-explanation { margin-top: 22px; --green: #a6e3a1; --red: #f38ba8; color: var(--brand-text, #e4e7ef); }
.tabs-explanation h2 { margin: 0 0 12px; font: 600 19px/1.3 ui-sans-serif, sans-serif; color: inherit; }
.views { display: grid; grid-template-columns: 1fr 1fr; gap: 46px; }
.views > section { min-width: 0; }
.shop-excerpt { border-radius: 10px; overflow: hidden; background: #f4eee3; color: #2c2925; text-align: left; }
.shop-excerpt header { display: flex; align-items: center; justify-content: space-between; padding: 10px 18px; background: #fffaf1; border-bottom: 1px solid #d8cdbd; font: 23px/1.2 Georgia, serif; }
.shop-excerpt header img { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; }
.shop-content { padding: 12px 18px 18px; }
.shop-tabs { display: flex; gap: 25px; border-bottom: 1px solid #b5a999; font-size: 17px; color: #716a61; }
.shop-tabs > * { padding: 0 2px 8px; }
.shop-tabs strong { color: #2c2925; border-bottom: 3px solid #805533; }
.shop-content h3 { margin: 13px 0 4px; font-size: 23px; line-height: 1.2; color: #2c2925; }
.password-copy { position: relative; margin: 0 0 13px; font-size: 15px; line-height: 1.5; color: #655f57; }
.input-label { font-size: 12px; margin-bottom: 4px; }
.password-input { padding: 5px 10px; border: 1px solid #b5a999; border-radius: 4px; background: #fffaf1; font-size: 17px; }
.tree-excerpt { min-height: 251px; border: 1px solid #51545c; border-radius: 10px; background: #202124; overflow: hidden; }
.tree-excerpt header { display: flex; align-items: center; justify-content: space-between; padding: 15px; border-bottom: 1px solid #51545c; font-size: 16px; font-weight: 600; }
.tree-excerpt small { font-size: 10px; color: #bdc1c6; font-weight: 400; }
.tree-body { padding: 15px; font-size: 17px; }
.tree-root { color: #a8c7fa; margin-bottom: 6px; }
.tree-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 8px; }
.tree-row strong { font-size: 13px; color: inherit; }
.tree-row.wrong { color: var(--red); background: #f38ba817; }
.tree-row.right { color: var(--green); background: #a6e3a117; }
.tree-panel { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #51545c; margin-top: 12px; padding-top: 12px; }
.tree-panel > span { font-size: 14px; }
.pass { color: var(--green); }.fail { color: var(--red); }
.takeaway { display: flex; align-items: center; justify-content: center; gap: 32px; margin: 23px 0 0; font-size: 24px; line-height: 1.3; font-weight: 600; }
.takeaway b { font-size: 38px; font-weight: 500; }
.highlighted { outline: 3px solid #47783b; outline-offset: 5px; border-radius: 2px; background: #deebcb; color: #233d1d; }
.text-check { position: absolute; right: 0; top: -17px; display: grid; place-items: center; width: 25px; height: 25px; border-radius: 50%; background: #47783b; color: #fff; font-size: 18px; }
.test-question { padding-top: 24px; }.test-question h2 { font-size: 28px; margin-bottom: 10px; }
.magnifier { float: right; width: 73px; height: 73px; margin: 0 4px 0 8px; fill: none; stroke: var(--brand-accent, #ff55e7); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }.magnifier .tick { stroke: var(--green); }
.answer { font-size: 25px; }.test-question p { font-size: 21px; margin: 26px 0 0; line-height: 1.5; }
.keyboard-action { display: flex; align-items: center; justify-content: center; gap: 28px; font-size: 23px; margin-bottom: 29px; }
kbd { display: grid; place-items: center; width: 67px; height: 52px; border: 2px solid #a6adbb; border-bottom-width: 6px; border-radius: 9px; font: 36px/1 ui-sans-serif, sans-serif; }
.checks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; text-align: center; }
.checks section + section { border-left: 1px solid #51545c; padding-left: 26px; }
.checks h2 { font-size: 25px; margin-bottom: 22px; }
.checks p { font-size: 17px; line-height: 1.5; margin: 22px 0 16px; }.checks > section > strong { font-size: 24px; }
.focus-demo { width: max-content; margin: 0 auto; outline: 3px solid var(--brand-accent, #ff55e7); outline-offset: 5px; padding: 7px 13px; border-radius: 2px; font-size: 18px; }
.selection-demo { display: flex; align-items: center; justify-content: center; gap: 13px; height: 41px; font-size: 15px; }.selection-demo .selected { padding: 7px 0; border-bottom: 3px solid var(--brand-accent, #ff55e7); }
.panel-demo { display: flex; align-items: center; justify-content: center; gap: 8px; height: 41px; font-size: 17px; }.panel-demo span { color: #a8c7fa; }.panel-demo strong { color: var(--red); }
.step-contract .takeaway { margin-top: 30px; }
.step-fixed { margin-top: 14px; }.shared-state { width: max-content; margin: 0 auto; padding: 8px 24px; border: 2px solid var(--green); border-radius: 6px; font-size: 21px; }.shared-state strong { color: var(--green); }
.branches { position: relative; display: flex; justify-content: space-around; height: 35px; padding-top: 1px; color: var(--green); font-size: 29px; line-height: 1; }.branches::before { content: ''; position: absolute; top: 0; left: 25%; right: 25%; border-top: 2px solid var(--green); }.step-fixed .views h2 { font-size: 16px; margin-bottom: 7px; }.step-fixed .takeaway { margin-top: 17px; font-size: 23px; }

.step-fixed .shop-excerpt header { padding: 7px 18px; }
.step-fixed .shop-content { padding: 8px 18px 10px; }
.step-fixed .shop-content h3 { margin-top: 8px; }
.step-fixed .password-copy { margin-bottom: 8px; }
.step-fixed .tree-excerpt { min-height: 222px; }
.step-fixed .tree-excerpt header { padding: 12px 15px; }
.step-fixed .tree-body { padding: 11px 15px; }
.step-fixed .tree-panel { margin-top: 8px; padding-top: 8px; }
</style>
