<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

type Scenario = 'blocked-button' | 'missing-pointer-capture' | 'fixed-preview-width' | 'unscrollable-bag' | 'low-contrast-notice'
const props = defineProps<{ scenario: Scenario; title: string }>()
const showResult = ref(false)
const bagCount = ref(0)
const bagOpen = ref(false)
const removed = ref(false)
const narrow = ref(false)
const position = ref({ x: 50, y: 45 })
const feedback = ref('')
const preview = ref<HTMLElement | null>(null)
const isCustomizer = computed(() => props.scenario === 'missing-pointer-capture' || props.scenario === 'fixed-preview-width')

function reset() {
  showResult.value = false
  bagCount.value = 0
  bagOpen.value = false
  removed.value = false
  narrow.value = false
  position.value = { x: 50, y: 45 }
  feedback.value = ''
}
function addToBag() {
  if (props.scenario === 'blocked-button') feedback.value = 'Die Dekoration fängt den Klick ab.'
  else bagCount.value += 1
}
async function resizeAndMove() {
  narrow.value = true
  await nextTick()
  position.value = props.scenario === 'fixed-preview-width' ? { x: 53, y: 60 } : { x: 75, y: 60 }
}
function movePrint(event: PointerEvent) {
  if (props.scenario === 'missing-pointer-capture' || event.buttons !== 1 || !preview.value) return
  const bounds = preview.value.getBoundingClientRect()
  position.value = {
    x: Math.round(Math.max(20, Math.min(80, ((event.clientX - bounds.left) / bounds.width) * 100))),
    y: Math.round(Math.max(25, Math.min(75, ((event.clientY - bounds.top) / bounds.height) * 100))),
  }
}
</script>

<template>
  <section class="shop-demo">
    <header class="slide-header">
      <h1>{{ title }}</h1>
      <button @click="reset">Demo neu laden</button>
      <button :aria-pressed="showResult" @click="showResult = !showResult">{{ showResult ? 'Zurück zum Shop' : 'JSDOM-Ergebnis zeigen' }}</button>
    </header>
    <div class="stage">
      <div v-if="showResult" class="result"><img :src="`/shop/demo-results/${scenario}.png`" alt="Aufgezeichneter JSDOM-Test bei aktivem Demo-Defekt: bestanden. Kein Live-Testlauf." /></div>
      <div v-else class="shop">
        <nav><strong>Claw &amp; Chew</strong><span>Shop&nbsp;&nbsp; About</span><button aria-label="Open bag" @click="bagOpen = !bagOpen">Bag ({{ bagCount }})</button></nav>

        <main v-if="isCustomizer" class="customizer-page">
          <div><p class="eyebrow">Make it yours</p><h2>Claw club tee</h2><p class="muted">Drag your little friend onto the shirt.</p></div>
          <div ref="preview" class="preview" :class="{ narrow }">
            <div class="tee">T</div>
            <button class="mascot" aria-label="Move mascot print" :style="{ left: `${position.x}%`, top: `${position.y}%` }" @pointerdown="($event.currentTarget as HTMLElement).setPointerCapture($event.pointerId)" @pointermove="movePrint"><img src="/shop/plush-card-actual.png" alt="" draggable="false" /></button>
          </div>
          <div class="customizer-actions"><button @click="resizeAndMove">Resize preview and drag to 75%, 60%</button><output>Position: {{ position.x }}%, {{ position.y }}%</output></div>
        </main>

        <main v-else-if="scenario === 'low-contrast-notice'" class="checkout">
          <p class="eyebrow">Checkout</p><h2>Your details</h2>
          <label>Email <input value="alex@example.com" /></label><label>Address <input value="Tacon Street 12" /></label>
          <p class="demo-notice">This is a demo shop. No payment, shipping, or emails.</p><button class="primary">Continue</button>
        </main>

        <main v-else class="catalog">
          <div class="product-image"><img src="/shop/plush-card-actual.png" alt="The little claw plush" /></div>
          <article><p class="eyebrow">Small claws. Real clicks.</p><h2>The little claw plush</h2><p class="price">€28.00</p><p class="muted">Soft, stubborn, and ready for your desk.</p>
            <div class="product-action"><button class="primary" aria-label="Add The little claw plush to bag" @click="addToBag">Add to bag <span>＋</span></button><span v-if="scenario === 'blocked-button'" class="blocker" aria-hidden="true" @click="addToBag" /></div><p class="feedback" role="status">{{ feedback }}</p>
          </article>
        </main>

        <aside v-if="bagOpen" class="bag" aria-label="Shopping bag"><header><h2>Your bag</h2><button aria-label="Close bag" @click="bagOpen = false">×</button></header>
          <div class="bag-items" :class="{ clipped: scenario === 'unscrollable-bag' }"><div v-for="size in ['XS', 'S', 'M', 'L', 'XL']" :key="size"><span>Claw club tee</span><small>Size {{ size }}</small></div><div v-if="!removed"><span>Tiny claws stickers</span><button @click="removed = true">Remove</button></div></div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.shop-demo{height:100%;display:flex;flex-direction:column;padding:10px 12px 32px;box-sizing:border-box;color:#f3f0e8}.slide-header{display:flex;align-items:center;gap:10px;margin-bottom:10px}.slide-header h1{margin:0 auto 0 0;font-size:20px;line-height:1.2}button{font:inherit;color:inherit;cursor:pointer}.slide-header button{white-space:nowrap;border:1px solid currentColor;border-radius:5px;padding:6px 8px;background:transparent;font-size:12px}button:focus-visible{outline:3px solid var(--brand-primary,#ff6bed);outline-offset:3px}.stage{position:relative;flex:1;min-height:0;overflow:hidden;background:#f4eee3;border-radius:3px}.result{position:absolute;inset:0;display:grid;place-items:center;background:#202635}.result img{width:100%;height:100%;object-fit:contain}.shop{position:relative;height:100%;overflow:hidden;color:#25211b;background:#f4eee3;font-family:Inter,ui-sans-serif,sans-serif}nav{height:62px;display:flex;align-items:center;gap:42px;padding:0 42px;border-bottom:1px solid #d8cdbd;background:#fffaf1}nav strong{margin-right:auto;font-family:Georgia,serif;font-size:24px}nav span{color:#655f57;font-size:13px}nav button{border:1px solid #332d26;border-radius:999px;padding:8px 14px;background:transparent;font-size:12px}.catalog{height:calc(100% - 62px);display:grid;grid-template-columns:1.12fr .88fr;align-items:center;gap:62px;padding:32px 90px;box-sizing:border-box}.product-image{position:relative;height:100%;min-height:0;display:grid;place-items:center;overflow:hidden;border-radius:22px;background:#dec7ab}.product-image img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 28%}.catalog article{max-width:390px}.eyebrow{margin:0 0 10px;color:#8b6341;text-transform:uppercase;letter-spacing:.14em;font-size:11px;font-weight:700}h2{margin:0;font-family:Georgia,serif;font-size:32px;line-height:1.05}.price{margin:18px 0;font-size:19px}.muted{color:#716a61;font-size:14px;line-height:1.5}.product-action{position:relative;margin-top:25px}.primary{width:100%;border:0;border-radius:999px;padding:13px 18px;color:#fffaf1;background:#2c2925;font-weight:700}.primary span{float:right}.blocker{position:absolute;inset:0;z-index:2;cursor:not-allowed}.feedback{min-height:20px;color:#a84e38;font-size:12px}.bag{position:absolute;z-index:4;top:0;right:0;width:360px;height:100%;padding:24px;box-sizing:border-box;background:#fffaf1;box-shadow:-18px 0 40px #31281d33}.bag header{display:flex;justify-content:space-between;align-items:center}.bag header h2{font-size:25px}.bag header button{border:0;background:none;font-size:27px}.bag-items{max-height:240px;overflow-y:auto;margin-top:25px;border-block:1px solid #d8cdbd}.bag-items.clipped{overflow:hidden}.bag-items>div{min-height:58px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e3d9ca;font-size:13px}.bag-items small{color:#766d63}.bag-items button{border:0;background:none;text-decoration:underline}.customizer-page{height:calc(100% - 62px);display:grid;grid-template-columns:.7fr 1.3fr;grid-template-rows:1fr auto;align-items:center;gap:20px 50px;padding:30px 75px;box-sizing:border-box}.preview{position:relative;justify-self:center;width:400px;max-width:100%;height:330px;overflow:hidden;border-radius:18px;background:#dbcbb7;transition:width .25s}.preview.narrow{width:280px}.tee{position:absolute;inset:35px 80px;display:grid;place-items:center;border-radius:45px 45px 16px 16px;color:#b5aa9c;background:#f8f5ef;font-size:70px}.mascot{position:absolute;width:58px;height:58px;padding:0;border:3px solid #fff;border-radius:50%;overflow:hidden;transform:translate(-50%,-50%);touch-action:none;background:#dec7ab}.mascot img{width:100%;height:100%;object-fit:cover}.customizer-actions{grid-column:2;display:flex;align-items:center;justify-content:center;gap:18px}.customizer-actions button{border:0;border-radius:999px;padding:10px 16px;color:#fff;background:#2c2925;font-size:12px}.customizer-actions output{font-size:13px}.checkout{width:460px;margin:50px auto}.checkout label{display:grid;gap:5px;margin:15px 0;font-size:12px}.checkout input{padding:10px;border:1px solid #bfb2a1;border-radius:5px;background:#fff}.demo-notice{color:#ddd5ca;font-size:12px}
</style>
