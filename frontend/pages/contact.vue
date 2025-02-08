<script setup lang="ts">
import TextInput from "~/components/pages/contact/TextInput.vue";
import Gender from "~/components/pages/contact/Gender.vue";
import SubmitButton from "~/components/pages/contact/SubmitButton.vue";
import CardLayout from "~/components/layouts/CardLayout.vue";

const name = ref<string>("");
const email = ref<string>("");
const gender = ref<number | null>(null);
const formErrors = ref<{ [key: string]: string }>({});

const handleSubmit = (event: MouseEvent) => {
  event.preventDefault();

  formErrors.value = {};
  if (name.value === "") {
    formErrors.value.name = "お名前を入力してください。";
  }

  if (email.value === "") {
    formErrors.value.email = "メールアドレスを入力してください。";
  }

  // 性別フィールドのチェック
  if (gender.value === null) {
    formErrors.value.gender = "性別を選択してください。";
  }

  if (Object.keys(formErrors.value).length > 0) {
    console.log("エラーがあります:", formErrors.value);
    return;
  }

  console.log("送信成功");
};
</script>

<template>
  <CardLayout>
    <!-- ヘッダー -->
    <template #header> お問い合わせ登録 </template>

    <!-- ボディ -->
    <template #body>
      <form novalidate>
        <div class="form-item">
          <TextInput
            label="お名前を入力してください必須"
            uniqueId="name"
            v-model:name="name"
            :required="true"
            :error="formErrors.name"
          />
        </div>
        <div class="form-item">
          <TextInput
            label="返信先のメールアドレスを入力してください"
            uniqueId="email"
            v-model:name="email"
            :required="true"
            :error="formErrors.email"
          />
        </div>
        <div class="form-item">
          <Gender
            label="性別を教えて下さい"
            v-model:gender="gender"
            :required="true"
            :error="formErrors.gender"
          />
        </div>
        <div class="submit-button">
          <SubmitButton @click="handleSubmit" />
        </div>
      </form>
    </template>
  </CardLayout>
</template>

<style scoped>
.main {
  padding: 60px 0 100px;
}
.flex {
  display: flex;
  justify-content: center;
}
.container {
  width: 760px;
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
.form-item {
  padding: 22px 24px 24px;
}
.submit-button {
  text-align: center;
}
</style>
