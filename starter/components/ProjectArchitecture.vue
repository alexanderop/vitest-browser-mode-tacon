<template>
  <div class="project-architecture">
    <div class="nuxt-frame">
      <div class="nuxt-heading" v-click>
        <span class="framework-mark framework-mark--nuxt">N</span>
        <div>
          <strong>Nuxt</strong>
          <span>die vollständige Anwendung</span>
        </div>
      </div>

      <div class="nuxt-capabilities" v-click>
        <span><i />Routing</span>
        <span><i />Server Rendering</span>
        <span><i />Serverfunktionen</span>
      </div>

      <div class="shop-surface">
        <div class="browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>claw-and-chew.vercel.app</span>
        </div>
        <img src="/shop/storefront.jpg" alt="Startseite des Beispielshops Claw & Chew" />

        <div class="vue-label">
          <span class="framework-mark framework-mark--vue">V</span>
          <div>
            <strong>Vue</strong>
            <span>Komponenten und Interaktionen</span>
          </div>
        </div>

        <div class="vue-capabilities">
          <span>Shop</span>
          <span>Warenkorb</span>
          <span>Checkout</span>
        </div>
      </div>
    </div>

    <p class="test-boundary" v-click>
      Ein Komponententest kann grün sein, obwohl die Anwendung scheitert.
    </p>
  </div>
</template>

<style scoped>
.project-architecture {
  width: 100%;
  margin-top: 1.1rem;
}

.nuxt-frame {
  position: relative;
  height: 22.8rem;
  padding: 1.35rem;
  border: 2px solid color-mix(in srgb, var(--brand-accent), transparent 35%);
  border-radius: 1.35rem;
  background:
    radial-gradient(circle at 15% 18%, color-mix(in srgb, var(--brand-accent), transparent 86%), transparent 35%),
    color-mix(in srgb, var(--brand-card), transparent 45%);
  box-shadow: 0 1.4rem 4rem rgba(0, 0, 0, 0.22);
}

.nuxt-heading {
  position: absolute;
  top: 1.55rem;
  left: 1.7rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.framework-mark {
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  flex: none;
  border: 2px solid currentColor;
  border-radius: 0.7rem;
  font-family: 'Geist Mono', monospace;
  font-size: 1.35rem;
  font-weight: 750;
  line-height: 1;
}

.framework-mark--nuxt {
  color: var(--brand-accent);
}

.framework-mark--vue {
  color: #42b883;
}

.nuxt-heading div,
.vue-label div {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.nuxt-heading strong,
.vue-label strong {
  font-size: 1.55rem;
}

.nuxt-heading span,
.vue-label span {
  margin-top: 0.35rem;
  font-size: 0.8rem;
  opacity: 0.62;
}

.nuxt-capabilities {
  position: absolute;
  left: 1.8rem;
  top: 8rem;
  display: grid;
  gap: 1rem;
  font-size: 1.05rem;
}

.nuxt-capabilities span {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.nuxt-capabilities i {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--brand-accent);
  box-shadow: 0 0 0.8rem color-mix(in srgb, var(--brand-accent), transparent 45%);
}

.shop-surface {
  position: absolute;
  top: 1.35rem;
  right: 1.35rem;
  width: 63%;
  height: calc(100% - 2.7rem);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--brand-text), transparent 83%);
  border-radius: 0.85rem;
  background: #0e0e0e;
  box-shadow: 0 0.8rem 2.8rem rgba(0, 0, 0, 0.42);
}

.browser-bar {
  position: absolute;
  z-index: 3;
  inset: 0 0 auto;
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0 0.75rem;
  gap: 0.38rem;
  background: rgba(17, 20, 29, 0.96);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.browser-bar i {
  width: 0.46rem;
  height: 0.46rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--brand-text), transparent 68%);
}

.browser-bar span {
  margin-inline: auto;
  padding-right: 2.7rem;
  font-family: 'Geist Mono', monospace;
  font-size: 0.56rem;
  opacity: 0.45;
}

.shop-surface img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: brightness(0.66) saturate(0.82);
}

.vue-label {
  position: absolute;
  z-index: 2;
  top: 3.2rem;
  left: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 0.8rem;
  background: rgba(15, 18, 26, 0.88);
  backdrop-filter: blur(10px);
}

.vue-capabilities {
  position: absolute;
  z-index: 2;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  gap: 0.55rem;
}

.vue-capabilities span {
  padding: 0.38rem 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  background: rgba(15, 18, 26, 0.82);
  font-size: 0.7rem;
}

.test-boundary {
  margin: 1rem 0 0;
  text-align: center;
  font-size: 1.32rem;
  font-weight: 600;
  color: var(--brand-text);
}

.test-boundary::before {
  content: '';
  display: inline-block;
  width: 0.55rem;
  height: 0.55rem;
  margin-right: 0.65rem;
  border-radius: 50%;
  background: var(--brand-accent);
  box-shadow: 0 0 1rem color-mix(in srgb, var(--brand-accent), transparent 35%);
  vertical-align: 0.12em;
}
</style>
