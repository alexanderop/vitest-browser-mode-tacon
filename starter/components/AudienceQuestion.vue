<template>
  <div class="audience-question">
    <p>Hand hoch</p>
    <h1><slot /></h1>
  </div>
</template>

<style scoped>
.audience-question {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.audience-question p {
  color: var(--brand-accent);
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px;
}
.audience-question h1 {
  font-size: 42px;
  line-height: 1.3;
  font-weight: 700;
  margin: 0;
  text-wrap: balance;
}
</style>
