<template>
  <div class="browser-comparison">
    <div class="comparison-columns">
      <section>
        <h2>Weniger Mocks</h2>
        <svg viewBox="0 0 280 196" role="img" aria-label="Pointer- und Resize-Mocks werden durch native Browser-APIs ersetzt">
          <path d="M13 44h23c-10-27 30-27 20 0h23v26c26-9 26 29 0 20v25H53c9 26-29 26-20 0H13V91c-26 9-26-29 0-20Z" fill="#454c62" stroke="#919bb2" stroke-width="1.5" transform="translate(8 0) scale(.87)" />
          <text x="48" y="69" class="svg-small" text-anchor="middle">Pointer</text>
          <rect x="17" y="114" width="65" height="38" rx="5" fill="#454c62" stroke="#919bb2" transform="rotate(-7 49 133)" />
          <text x="49" y="138" class="svg-small" text-anchor="middle">Resize</text>
          <path d="M97 98h25m-8-8 8 8-8 8" class="arrow" />
          <rect x="139" y="38" width="133" height="124" rx="7" class="window" />
          <path d="M139 61h133" class="window-rule" />
          <circle cx="150" cy="50" r="3" fill="#f38ba8"/><circle cx="161" cy="50" r="3" fill="#f9e2af"/><circle cx="172" cy="50" r="3" fill="#a6e3a1"/>
          <g fill="none" stroke="#a6e3a1" stroke-width="2.5"><path d="m151 82 4 4 7-8m-11 31 4 4 7-8m-11 31 4 4 7-8"/></g>
          <g class="svg-small"><text x="170" y="87">Pointer Events</text><text x="170" y="114">ResizeObserver</text><text x="170" y="141">Browser-APIs</text></g>
          <text x="48" y="187" class="svg-label" text-anchor="middle">jsdom</text><text x="205" y="187" class="svg-label bright" text-anchor="middle">Browser</text>
        </svg>
        <div class="comparison-copy"><span>Pointer-/Resize-Mocks</span><b>Native Browser-APIs</b></div>
      </section>
      <section v-click="1">
        <h2>Echte Bedienung</h2>
        <svg viewBox="0 0 280 196" role="img" aria-label="Synthetische Events im Vergleich zu einem Slider mit echtem Browser-Input und Fokus">
          <rect x="3" y="63" width="111" height="86" rx="6" fill="#272c3b" stroke="#737e97"/>
          <g class="svg-code"><text x="12" y="87">dispatchEvent(</text><text x="19" y="106">MouseEvent(</text><text x="27" y="125" fill="#89b4fa">'click'</text><text x="12" y="141">))</text></g>
          <path d="M119 101h20m-8-8 8 8-8 8" class="arrow"/>
          <rect x="147" y="38" width="127" height="124" rx="7" class="window"/>
          <path d="M147 61h127" class="window-rule"/>
          <circle cx="158" cy="50" r="3" fill="#f38ba8"/><circle cx="169" cy="50" r="3" fill="#f9e2af"/><circle cx="180" cy="50" r="3" fill="#a6e3a1"/>
          <path d="M162 100h95" stroke="#737e97" stroke-width="6" stroke-linecap="round"/><path d="M162 100h50" stroke="#f34fdb" stroke-width="6" stroke-linecap="round"/>
          <circle cx="212" cy="100" r="14" fill="none" stroke="#f34fdb" stroke-width="2"/><circle cx="212" cy="100" r="8" fill="#f34fdb" stroke="#f5f5fa" stroke-width="2"/>
          <path d="m216 104 3 31 7-9 11 9 5-6-12-8 11-4Z" fill="#f5f5fa" stroke="#202431" stroke-width="2"/>
          <text x="181" y="148" class="svg-small">50 %</text>
          <text x="58" y="187" class="svg-label" text-anchor="middle">jsdom</text><text x="210" y="187" class="svg-label bright" text-anchor="middle">Browser</text>
        </svg>
        <div class="comparison-copy"><span>Synthetische Events</span><b>Klicks, Drags und Fokus</b></div>
      </section>
      <section v-click="2">
        <h2>Sichtbares Ergebnis</h2>
        <svg viewBox="0 0 280 196" role="img" aria-label="DOM-Ausgabe im Vergleich zu gerenderter Oberfläche und Bildvergleich, schematisch dargestellt">
          <rect x="3" y="66" width="95" height="80" rx="6" fill="#272c3b" stroke="#737e97"/>
          <g class="svg-code"><text x="11" y="89">&lt;dialog&gt;</text><text x="18" y="109">&lt;button&gt;</text><text x="11" y="131">&lt;/dialog&gt;</text></g>
          <path d="M104 103h20m-8-8 8 8-8 8" class="arrow"/>
          <rect x="151" y="30" width="118" height="119" rx="6" fill="#353d53" stroke="#919bb2"/>
          <rect x="135" y="48" width="118" height="119" rx="6" class="window"/>
          <path d="M135 70h118" class="window-rule"/>
          <circle cx="146" cy="59" r="3" fill="#f38ba8"/><circle cx="157" cy="59" r="3" fill="#f9e2af"/><circle cx="168" cy="59" r="3" fill="#a6e3a1"/>
          <text x="145" y="91" class="svg-small">Einstellungen</text>
          <rect x="146" y="103" width="53" height="6" rx="3" fill="#737e97"/><rect x="146" y="117" width="35" height="6" rx="3" fill="#737e97"/>
          <rect x="209" y="101" width="31" height="26" rx="3" fill="none" stroke="#f34fdb" stroke-width="2" stroke-dasharray="4 3"/>
          <path d="m214 121 7-10 6 7 4-4 5 7" fill="none" stroke="#89b4fa" stroke-width="2"/>
          <rect x="192" y="140" width="49" height="17" rx="3" fill="#f34fdb"/><text x="216" y="152" fill="#202431" style="font-size: 8px" text-anchor="middle">Speichern</text>
          <text x="51" y="187" class="svg-label" text-anchor="middle">jsdom</text><text x="202" y="187" class="svg-label bright" text-anchor="middle">Browser</text>
        </svg>
        <div class="comparison-copy"><span>DOM-Ausgabe, kein Layout</span><b>Layout, Bildvergleich, DevTools</b></div>
      </section>
    </div>
    <div class="accessibility-note"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="6" r="1"/><path d="m5 9 7 2 7-2m-7 2v4m0-2-4 6m4-6 4 6"/></svg><span>Accessibility: auch Kontrast und Tastatur im Browser prüfen</span></div>
    <div class="benchmark"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="14" r="8"/><path d="M12 6V2m-3 0h6m-3 8v5l3 2m4-10 2-2"/></svg><span>Reka-Suite: 10,75 s → 12,10 s</span><b>+13 % Laufzeit</b></div>
    <div class="benchmark-context">Lokale Messung · 19.08.2026 · Median aus 3 Läufen · 87 Testpaare + 2 Browser-Harness-Dateien · Kein allgemeiner Faktor.</div>
  </div>
</template>

<style scoped>
.browser-comparison { margin-top: 12px; }
.comparison-columns { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.comparison-columns section { min-width: 0; }
.comparison-columns section + section { border-left: 1px solid #50596c; padding-left: 18px; }
.comparison-columns h2 { color: #f34fdb; font-size: 23px; font-weight: 650; line-height: 1.2; margin: 0 0 8px; white-space: nowrap; }
.comparison-columns svg { width: 100%; height: 155px; overflow: visible; }
.window { fill: #30384c; stroke: #a6adc0; stroke-width: 1.4; }
.window-rule { stroke: #737e97; }
.arrow { fill: none; stroke: #b8c0d3; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.svg-small { font-size: 10px; fill: #e6e9f2; }
.svg-code { font: 9px monospace; fill: #b8c0d3; }
.svg-label { font-size: 13px; fill: #a6adc0; }
.bright { fill: #e6e9f2; font-weight: 600; }
.comparison-copy { display: grid; gap: 5px; margin-top: 8px; font-size: 16px; line-height: 1.35; }
.comparison-copy span { color: #a6adc0; }
.comparison-copy b { font-size: 16px; color: #e6e9f2; font-weight: 600; }
.accessibility-note, .benchmark { display: flex; align-items: center; gap: 13px; }
.accessibility-note { margin-top: 15px; color: #b8c0d3; font-size: 17px; }
.accessibility-note svg, .benchmark svg { width: 23px; height: 23px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.benchmark { margin-top: 10px; padding-top: 10px; border-top: 1px solid #50596c; font-size: 18px; }
.benchmark b { background: #f9e2af; color: #202431; font-size: 16px; font-weight: 650; padding: 3px 12px; border-radius: 20px; }
.benchmark-context { color: #a6adc0; font-size: 10px; margin-top: 8px; }
</style>
