<template>
  <section class="migration-overview">
    <h1>So habe ich die Reka-UI-Tests portiert</h1>
    <svg viewBox="0 0 1000 400" role="img" aria-labelledby="reka-port-title reka-port-description">
      <title id="reka-port-title">Überblick über die Reka-UI-Migration</title>
      <desc id="reka-port-description">Von 97 jsdom-Testdateien bekommen 87 über Migration und unabhängiges Review Browser-Mode-Gegenstücke. Zehn Dateien ohne DOM wechseln direkt nach Node. Erkenntnisse aus dem Review werden als Projektwissen in AGENTS.md und Prompts gespeichert. Der nächste Agent liest und nutzt diese verbesserte Anleitung für den nächsten Port. Die jsdom-Originale bleiben zum Vergleich erhalten.</desc>
      <defs>
        <marker id="reka-arrow" viewBox="0 0 14 14" refX="11" refY="7" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 2 2 L 11 7 L 2 12" fill="none" stroke="context-stroke" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </marker>
      </defs>

      <g class="wires">
        <path d="M 185 114 Q 225 109 267 114" marker-end="url(#reka-arrow)" />
        <path d="M 451 113 Q 488 116 528 111" marker-end="url(#reka-arrow)" />
        <path d="M 715 114 Q 752 109 790 115" marker-end="url(#reka-arrow)" />
        <path class="node-wire" d="M 93 169 Q 87 215 94 249" marker-end="url(#reka-arrow)" />
        <path class="feedback-wire" d="M 623 168 Q 628 219 623 249" marker-end="url(#reka-arrow)" />
        <path class="feedback-wire" d="M 450 322 Q 358 333 363 174" marker-end="url(#reka-arrow)" />
      </g>

      <g class="box original">
        <path d="M 8 62 L 183 59 L 186 168 L 6 171 Z" />
        <path class="echo" d="M 10 65 L 180 61 L 183 170 L 9 168 Z" />
        <text x="96" y="107" class="primary">97 Dateien</text>
        <text x="96" y="139">jsdom</text>
      </g>
      <g class="box port">
        <path d="M 277 61 L 449 64 L 451 171 L 274 168 Z" />
        <path class="echo" d="M 279 64 L 452 61 L 448 168 L 277 172 Z" />
        <text x="363" y="107" class="primary">Agent portiert</text>
        <text x="363" y="139">eine Datei</text>
      </g>
      <g class="box review">
        <path d="M 539 63 L 714 60 L 712 171 L 537 168 Z" />
        <path class="echo" d="M 536 65 L 710 63 L 716 169 L 540 172 Z" />
        <text x="625" y="107" class="primary">Zweiter Agent</text>
        <text x="625" y="139">prüft den Port</text>
      </g>
      <g class="box browser">
        <path d="M 801 62 L 989 60 L 993 168 L 799 172 Z" />
        <path class="echo" d="M 803 65 L 993 63 L 989 171 L 802 169 Z" />
        <text x="896" y="107" class="primary">87 Dateien</text>
        <text x="896" y="139">Browser Mode</text>
      </g>
      <g class="box node">
        <path d="M 8 278 L 182 275 L 185 364 L 5 366 Z" />
        <path class="echo" d="M 10 275 L 185 279 L 181 367 L 8 363 Z" />
        <text x="96" y="321" class="primary">10 Dateien</text>
        <text x="96" y="352">Node</text>
      </g>
      <g class="box instructions">
        <path d="M 458 279 L 793 275 L 795 365 L 456 368 Z" />
        <path class="echo" d="M 455 277 L 795 279 L 792 368 L 460 365 Z" />
        <text x="625" y="321" class="primary">Projekt-Memory</text>
        <text x="625" y="352" class="memory-files">AGENTS.md + Prompts</text>
      </g>

      <g class="icons" aria-hidden="true">
        <g transform="translate(96 61)" class="icon original-icon">
          <circle r="22" />
          <path d="M -9 -13 L 4 -13 L 11 -6 L 10 13 L -10 12 Z M 4 -13 L 4 -6 L 11 -6 M -5 0 L 5 0 M -5 5 L 4 5" />
        </g>
        <g transform="translate(363 62)" class="icon agent-icon">
          <circle r="22" />
          <path d="M -8 -8 L -16 0 L -8 8 M 8 -8 L 16 0 L 8 8 M 4 -13 L -4 13" />
        </g>
        <g transform="translate(625 62)" class="icon agent-icon">
          <circle r="22" />
          <path d="M 7 -4 A 10 10 0 1 1 -13 -4 A 10 10 0 1 1 7 -4 M 5 4 L 15 14 M -8 -4 L -4 0 L 2 -7" />
        </g>
        <g transform="translate(896 61)" class="icon runtime-icon">
          <circle r="22" />
          <path d="M -15 -11 L 15 -12 L 14 12 L -15 11 Z M -15 -4 L 14 -4 M -10 -8 L -9 -8 M -5 -8 L -4 -8" />
        </g>
        <g transform="translate(96 277)" class="icon runtime-icon">
          <circle r="22" />
          <path d="M -15 -11 L 15 -12 L 14 12 L -15 11 Z M -9 -5 L -3 0 L -9 5 M 2 5 L 9 5" />
        </g>
        <g transform="translate(625 277)" class="icon agent-icon">
          <circle r="22" />
          <path d="M 0 -9 Q -7 -14 -15 -10 L -14 11 Q -7 7 0 12 Q 7 7 14 10 L 15 -11 Q 7 -14 0 -9 L 0 12 M -10 -4 L -5 -3 M 5 -3 L 10 -4" />
        </g>
      </g>

      <g class="annotations">
        <text x="228" y="42" text-anchor="middle">87 mit DOM</text>
        <text x="111" y="223" class="node-label">10 ohne DOM</text>
        <text x="638" y="218" class="feedback-label">Erkenntnisse</text>
        <text x="337" y="354" text-anchor="middle" class="feedback-label">nächster Agent</text>
        <text x="337" y="379" text-anchor="middle" class="feedback-label">liest &amp; nutzt es</text>
        <text x="896" y="209" text-anchor="middle">Tests + Vergleich</text>
      </g>
    </svg>
    <p>Die jsdom-Originale bleiben zum Vergleich erhalten.</p>
  </section>
</template>

<style scoped>
.migration-overview h1 { font-size: 32px; margin: 0 0 16px; }
.migration-overview svg { display: block; width: 100%; overflow: visible; }
.migration-overview svg text { font-family: 'Segoe Print', 'Bradley Hand', cursive; fill: #e9edf5; font-size: 24px; }
.box text { text-anchor: middle; }
.box .memory-files { font-size: 22px; }
.box .primary { font-size: 26px; font-weight: 700; }
.box path { fill: #242c3c; stroke: #c3cddd; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.box .echo { fill: none; opacity: .4; stroke-width: 1; }
.port path, .review path, .instructions path { fill: #302538; stroke: #e6a3d7; }
.browser path, .node path { fill: #203533; stroke: #98d6bb; }
.wires path { fill: none; stroke: #c3cddd; stroke-width: 2.4; stroke-linecap: round; }
.wires .node-wire { stroke: #98d6bb; }
.wires .feedback-wire { stroke: #e6a3d7; }
.icon { color: #c3cddd; }
.agent-icon { color: #e6a3d7; }
.runtime-icon { color: #98d6bb; }
.icon circle { fill: #222938; stroke: currentColor; stroke-width: 1.6; }
.icon path { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.annotations text { font-size: 21px; fill: #b7c1d1; }
.annotations .node-label { fill: #98d6bb; }
.annotations .feedback-label { fill: #e6a3d7; }
.migration-overview p { margin: 8px 0 0; font-size: 21px; color: #c3cddd; }
</style>
