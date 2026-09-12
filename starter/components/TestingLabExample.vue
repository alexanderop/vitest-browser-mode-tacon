<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    example: 'blocked-button' | 'unscrollable-bag' | 'fixed-preview-width' | 'hydration-mismatch'
  }>(),
  { example: 'blocked-button' },
)

const broken = ref(false)
const count = ref(0)
const removed = ref(false)
const reached = ref(false)
const narrow = ref(false)
const printPosition = ref('50%, 45%')
const productButton = ref<HTMLButtonElement | null>(null)
const preview = ref<HTMLElement | null>(null)
const originalWidth = ref(0)
const previewWidth = ref(400)
const position = ref({ x: 50, y: 45 })
const bag = ref<HTMLElement | null>(null)
const lastItem = ref<HTMLElement | null>(null)
const products = ['Little claw plush', 'Claw club tee', 'A little pinch mug', 'Tiny claws stickers']
const serverProducts = computed(() => (broken.value ? ['Claw club tee'] : products))

const copy = {
  'blocked-button': {
    topic: 'Hit testing',
    title: 'Could your customer click it?',
    failure: 'The decoration caught the pointer. The button received no click.',
  },
  'unscrollable-bag': {
    topic: 'Layout and scrolling',
    title: 'Can the customer reach the last item?',
    failure: 'The bag cannot scroll. The remove button remains clipped.',
  },
  'hydration-mismatch': {
    topic: 'Application integration',
    title: 'Do server HTML and client render agree?',
    failure: 'Mismatch: one server product, four client products.',
  },
  'fixed-preview-width': {
    topic: 'Responsive geometry',
    title: 'Does the drag use the resized preview?',
    failure: 'The calculation still uses 400 px. The print lands at 53%, 60%.',
  },
} as const

const current = computed(() => copy[props.example])
const feedback = ref('Working version. Try the interaction.')

function setBroken(value: boolean) {
  broken.value = value
  count.value = 0
  removed.value = false
  reached.value = false
  narrow.value = false
  printPosition.value = '50%, 45%'
  position.value = { x: 50, y: 45 }
  previewWidth.value = 400
  feedback.value = value ? 'Defect applied. Try the interaction.' : 'Working version. Try the interaction.'
  if (bag.value) bag.value.scrollTop = 0
}

function addItem() {
  count.value += 1
  feedback.value = 'The button received a click and added an item.'
}

function blockedPointer() {
  feedback.value = current.value.failure
}

function directDomClick() {
  productButton.value?.click()
}

function observeScroll() {
  if (!bag.value || !lastItem.value) return
  const container = bag.value.getBoundingClientRect()
  const item = lastItem.value.getBoundingClientRect()
  reached.value = item.top >= container.top && item.bottom <= container.bottom
}

async function resizePreview() {
  if (!preview.value) return
  if (!narrow.value) originalWidth.value = preview.value.getBoundingClientRect().width
  narrow.value = true
  await nextTick()
  previewWidth.value = preview.value.offsetWidth
  feedback.value = `Measured preview width: ${previewWidth.value} px. Drag the mascot.`
}

function movePrint(clientX: number, clientY: number) {
  if (!preview.value) return
  const rect = preview.value.getBoundingClientRect()
  const width = broken.value && narrow.value ? originalWidth.value : rect.width
  const x = Math.max(0, Math.min(100, (clientX - rect.left) / width * 100))
  const y = Math.max(0, Math.min(100, (clientY - rect.top) / rect.height * 100))
  position.value = { x, y }
  // Normalize subpixel noise before rounding percentages for the audience.
  printPosition.value = `${Math.round(Number(x.toFixed(3)))}%, ${Math.round(Number(y.toFixed(3)))}%`
  feedback.value = broken.value && narrow.value ? current.value.failure : 'Position calculated from the current browser geometry.'
}

function runDrag() {
  if (!preview.value) return
  const rect = preview.value.getBoundingClientRect()
  movePrint(rect.left + rect.width * 0.75, rect.top + rect.height * 0.6)
}

function startDrag(event: PointerEvent) {
  if (event.currentTarget instanceof HTMLElement) event.currentTarget.setPointerCapture(event.pointerId)
}

function drag(event: PointerEvent) {
  if (event.buttons === 1) movePrint(event.clientX, event.clientY)
}
</script>

<template>
  <section class="lab-example" :aria-labelledby="`lab-title-${example}`">
    <header>
      <div>
        <small>Claw &amp; Chew / Testing Lab</small>
        <h2 :id="`lab-title-${example}`">{{ current.title }}</h2>
      </div>
      <span :class="{ broken }">{{ broken ? 'Defect applied' : 'Working' }}</span>
    </header>

    <div class="version-switch" role="group" aria-label="Source version">
      <button :aria-pressed="!broken" @click="setBroken(false)">Working</button>
      <button :aria-pressed="broken" @click="setBroken(true)">Introduce defect</button>
    </div>

    <div v-if="example === 'blocked-button'" class="blocked-demo">
      <div class="product">
        <img src="/shop/plush-card-actual.png" alt="The little claw plush" />
        <div><small>Small claws. Real clicks.</small><strong>The little claw plush</strong><span>€28.00</span></div>
      </div>
      <div class="button-stack">
        <button ref="productButton" class="primary" @click="addItem">Add plush to demo bag</button>
        <span v-if="broken" class="decoration" aria-hidden="true" @click="blockedPointer" />
      </div>
      <output aria-label="Demo bag count">{{ count }} items in demo bag</output>
      <button class="secondary" @click="directDomClick">Dispatch a direct DOM click</button>
    </div>

    <div v-else-if="example === 'unscrollable-bag'" class="scroll-demo">
      <p>Scroll inside the bag to reach the last item.</p>
      <div ref="bag" class="bag" :class="{ clipped: broken }" @scroll="observeScroll">
        <div v-for="size in ['XS', 'S', 'M', 'L', 'XL']" :key="size" class="bag-row">
          <span>Claw club tee</span><small>Size {{ size }}</small>
        </div>
        <div v-if="!removed" ref="lastItem" class="bag-row last-item">
          <span>Tiny claws stickers</span><button class="secondary" @click="removed = true">Remove</button>
        </div>
      </div>
      <output>{{ removed ? 'Stickers removed.' : reached ? 'The last item is reachable.' : 'The last item is below the visible area.' }}</output>
    </div>

    <div v-else-if="example === 'fixed-preview-width'" class="resize-demo">
      <div ref="preview" class="preview" :class="{ narrow }">
        <div class="shirt" aria-hidden="true">T</div>
        <img src="/shop/plush-card-actual.png" alt="Mascot print" draggable="false" :style="{ left: `${position.x}%`, top: `${position.y}%` }" @pointerdown.prevent="startDrag" @pointermove="drag" />
      </div>
      <div class="resize-actions">
        <button class="secondary" @click="resizePreview">Resize preview</button>
        <button class="primary" @click="runDrag">Calculate at 75%, 60%</button>
      </div>
      <output>Preview: {{ previewWidth }} px · Position: {{ printPosition }}</output>
    </div>

    <div v-else class="hydration-demo">
      <section><h3>Server HTML</h3><span v-for="product in serverProducts" :key="product">{{ product }}</span></section>
      <section><h3>Client expects</h3><span v-for="product in products" :key="product">{{ product }}</span></section>
    </div>

    <p class="feedback" role="status">{{ feedback }}</p>
  </section>
</template>

<style scoped>
.lab-example { color:#f1f0ec; background:#141414; border:1px solid #45443f; border-radius:1rem; padding:1.25rem; box-shadow:0 1.2rem 3rem #0006; }
header { display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; }
header small,.product small { color:#c8b396; text-transform:uppercase; letter-spacing:.1em; font-size:.58rem; }
h2 { margin:.3rem 0 0; font-size:1.42rem; line-height:1.1; }
header>span { white-space:nowrap; color:#bce4c2; background:#25392a; border-radius:.35rem; padding:.32rem .5rem; font-size:.62rem; }
header>span.broken { color:#ffbeb0; background:#442b27; }
.version-switch { display:flex; gap:.3rem; margin:1rem 0; padding:.28rem; background:#20201f; border-radius:.5rem; }
.version-switch button { flex:1; padding:.55rem; border:0; border-radius:.35rem; font-size:.7rem; }
.version-switch button[aria-pressed='true'] { color:#171614; background:#e0c8a9; }
.product { display:flex; align-items:center; gap:.8rem; margin-bottom:.8rem; }
.product img { width:5rem; height:4.2rem; object-fit:cover; object-position:center 28%; border-radius:.5rem; }
.product div { display:grid; gap:.15rem; }
.product strong { font-size:.88rem; }
.product span { color:#b7b5ae; font-size:.72rem; }
.button-stack { position:relative; }
.primary { width:100%; padding:.72rem; color:#171614; background:#e0c8a9; border:0; border-radius:.4rem; font-weight:650; }
.decoration { position:absolute; inset:0; z-index:2; border:2px dashed #efb296; border-radius:.4rem; cursor:not-allowed; background:repeating-linear-gradient(135deg,#c0694a55 0,#c0694a55 9px,#c0694a22 9px,#c0694a22 18px); }
output { display:block; margin:.7rem 0; text-align:center; color:#ddceb9; font-size:.72rem; }
.secondary { padding:.48rem .65rem; border:1px solid #626057; border-radius:.35rem; background:#292927; font-size:.67rem; }
.feedback { min-height:1.2rem; margin:.75rem 0 0; color:#d7c6af; font-size:.68rem; line-height:1.35; }
.scroll-demo>p { color:#b7b5ae; font-size:.7rem; }
.bag { height:10rem; overflow-y:auto; border:1px solid #555249; border-radius:.5rem; }
.bag.clipped { overflow-y:hidden; }
.bag-row { min-height:3.2rem; display:flex; justify-content:space-between; align-items:center; padding:.6rem; border-bottom:1px solid #383735; font-size:.7rem; }
.last-item { background:#29261f; }
.hydration-demo { display:grid; grid-template-columns:1fr 1fr; gap:.6rem; }
.hydration-demo section { display:grid; align-content:start; gap:.28rem; padding:.7rem; background:#20201f; border-radius:.5rem; }
.hydration-demo h3 { margin:0 0 .3rem; font-size:.76rem; }
.hydration-demo span { color:#b7b5ae; font-size:.62rem; }
.resize-demo { display:grid; justify-items:center; gap:.65rem; }
.preview { position:relative; width:400px; height:160px; overflow:hidden; border:1px solid #555249; border-radius:.6rem; background:#20201f; }
.preview.narrow { width:280px; }
.shirt { position:absolute; inset:1rem 22%; display:grid; place-items:center; color:#444; background:#ddd2bf; border-radius:1rem 1rem .4rem .4rem; font-size:3rem; }
.preview img { position:absolute; width:2.4rem; height:2.4rem; object-fit:cover; border-radius:50%; transform:translate(-50%,-50%); touch-action:none; cursor:grab; }
.preview img.moved { left:75%; top:60%; }
.preview img.wrong { left:53%; top:60%; }
.resize-actions { display:flex; gap:.5rem; width:100%; }
.resize-actions .primary { flex:1; width:auto; }
</style>
