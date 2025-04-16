<template>
  <div class="flex">
    <div class="container">
      <div class="card">
        <!-- ヘッダー部分 -->
        <div class="card-header">
          <slot name="header"></slot>
        </div>
        <!-- ボディ部分 -->
        <div class="card-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.container {
  width: 600px;
  background-color: #fff;
}
.card {
}
.card-header {
  padding: 0.75rem 1.25rem;
  background-color: aliceblue;
  border: solid 1px #f3f3f3;
}
.card-body {
  padding: 1.25rem;
}
</style>
