<script setup lang="ts">
interface ScreenshotImage {
  src: string
  alt: string
}

const {
  expectedLabel = 'Sollbild',
  actualLabel = 'Istbild',
  diffLabel = 'Diff',
} = defineProps<{
  label: string
  expected: ScreenshotImage
  actual: ScreenshotImage
  diff: ScreenshotImage
  expectedLabel?: string
  actualLabel?: string
  diffLabel?: string
}>()
</script>

<template>
  <section class="screenshot-comparison" :aria-label="label">
    <figure class="screenshot-comparison__panel screenshot-comparison__panel--expected">
      <figcaption>{{ expectedLabel }}</figcaption>
      <div class="screenshot-comparison__image-frame">
        <img :src="expected.src" :alt="expected.alt">
      </div>
    </figure>

    <figure class="screenshot-comparison__panel screenshot-comparison__panel--actual">
      <figcaption>{{ actualLabel }}</figcaption>
      <div class="screenshot-comparison__image-frame">
        <img :src="actual.src" :alt="actual.alt">
      </div>
    </figure>

    <figure class="screenshot-comparison__panel screenshot-comparison__panel--diff">
      <figcaption>{{ diffLabel }}</figcaption>
      <div class="screenshot-comparison__image-frame">
        <img :src="diff.src" :alt="diff.alt">
      </div>
    </figure>
  </section>
</template>

<style scoped>
.screenshot-comparison {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
}

.screenshot-comparison__panel {
  overflow: hidden;
  margin: 0;
  border: 1px solid color-mix(in srgb, var(--brand-border), transparent 35%);
  border-radius: 16px;
  background: color-mix(in srgb, var(--brand-card), transparent 10%);
  box-shadow: 0 14px 36px rgb(0 0 0 / 18%);
}

.screenshot-comparison__panel figcaption {
  padding: 12px 18px;
  border-bottom: 1px solid rgb(255 255 255 / 8%);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-align: left;
}

.screenshot-comparison__panel--expected figcaption {
  color: color-mix(in srgb, var(--brand-text), transparent 18%);
}

.screenshot-comparison__panel--actual figcaption {
  color: var(--brand-accent);
}

.screenshot-comparison__panel--diff {
  border-color: var(--brand-accent);
  box-shadow: 0 14px 40px rgb(0 0 0 / 22%), 0 0 24px color-mix(in srgb, var(--brand-accent), transparent 78%);
}

.screenshot-comparison__panel--diff figcaption {
  background: color-mix(in srgb, var(--brand-accent), transparent 88%);
  color: var(--brand-accent);
}

.screenshot-comparison__image-frame {
  display: grid;
  place-items: center;
  min-height: 390px;
  padding: 18px;
  background:
    linear-gradient(45deg, rgb(255 255 255 / 2%) 25%, transparent 25%, transparent 75%, rgb(255 255 255 / 2%) 75%),
    linear-gradient(45deg, rgb(255 255 255 / 2%) 25%, transparent 25%, transparent 75%, rgb(255 255 255 / 2%) 75%);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
}

.screenshot-comparison img {
  display: block;
  width: 100%;
  height: 350px;
  object-fit: contain;
}

@media (max-width: 800px) {
  .screenshot-comparison {
    grid-template-columns: 1fr;
  }

  .screenshot-comparison__image-frame {
    min-height: 240px;
  }

  .screenshot-comparison img {
    height: 210px;
  }
}
</style>
