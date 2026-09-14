<template>
  <section class="talk-title">
    <img
      class="talk-title__art"
      src="/shop/browser-mode-cover.png"
      alt="Hamcrab-Plüschtier vor dem Claw & Chew Shop im Browser, mit Mauszeiger am Add-to-bag-Button und Vitest Browser Mode Badge."
    />
    <div class="talk-title__copy">
      <h1>Frontend-Testing<br><span>neu gedacht</span></h1>
      <p class="talk-title__subtitle">Black-Box-Strategie mit<br>Vitest Browser Mode</p>
      <p class="talk-title__thesis">KI schreibt Tests.<br>Wir definieren, was <strong>grün</strong> bedeutet.</p>
    </div>
    <footer>
      <strong>Alexander Opalic</strong>
      <span>Developer bei Otto Payments</span>
    </footer>
  </section>
</template>

<style scoped>
.talk-title {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #202431;
  color: #f4f5f8;
  font-family: inherit;
}
.talk-title__art {
  position: absolute;
  width: 490px;
  height: 490px;
  right: 8px;
  top: 8px;
  object-fit: contain;
  mask-image: linear-gradient(to right, transparent, #000 12%);
}
.talk-title__copy {
  position: absolute;
  top: 90px;
  left: 48px;
  z-index: 1;
}
.talk-title h1 {
  margin: 0;
  font-size: 51px;
  line-height: 1.13;
  font-weight: 750;
  letter-spacing: -1.7px;
}
.talk-title h1 span { color: #b9df70; }
.talk-title__subtitle {
  margin: 25px 0 0;
  font-size: 23px;
  line-height: 1.4;
  font-weight: 500;
  color: #e0e4ec;
  opacity: 1;
}
.talk-title__thesis {
  margin: 27px 0 0;
  color: #c3c8d3;
  font-size: 18px;
  line-height: 1.5;
}
.talk-title__thesis strong { color: #b9df70; font-weight: 600; }
.talk-title footer {
  position: absolute;
  left: 48px;
  right: 48px;
  bottom: 29px;
  padding-top: 17px;
  border-top: 1px solid #ffffff20;
  display: flex;
  align-items: baseline;
  gap: 15px;
  font-size: 15px;
}
.talk-title footer strong { color: #f4f5f8; font-weight: 600; }
.talk-title footer span { color: #aeb5c2; font-size: 13px; }
</style>
