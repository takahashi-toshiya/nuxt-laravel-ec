<script setup lang="ts">
import Gender from "~/components/pages/contact/Gender.vue";
import Button from "~/components/common/Button.vue";
import CardLayout from "~/components/layouts/CardLayout.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useForm } from "vee-validate";
import { useLoadingStore } from "~/store/loadingStore";
import TextField from "~/components/pages/contact/TextField.vue";

const loadingStore = useLoadingStore();

const schema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, { message: "お名前は必須です" })
      .max(50, { message: "お名前は50文字以内で入力してください" })
      .regex(/^[^\s].*[^\s]$|^[^\s]$/, {
        message: "お名前の前後に空白は使用できません",
      }),
    email: z
      .string()
      .min(1, { message: "メールアドレスは必須です" })
      .email({ message: "正しいメールアドレスを入力してください" })
      .max(255, { message: "メールアドレスは255文字以内で入力してください" }),
    gender: z
      .number({ message: "性別を選択してください" })
      .min(0, { message: "性別を選択してください" })
      .max(1, { message: "正しい性別を選択してください" }),
  })
);

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    email: "",
    gender: undefined,
  },
});
const [name, nameProps] = defineField("name");
const [email, emailProps] = defineField("email");
const [gender, genderProps] = defineField("gender");

const handleSendForm = handleSubmit(async (values) => {
  await loadingStore.withLoading(async () => {
    // 実際のAPI呼び出しの代わりにdelay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    console.log("送信成功");
  }, "送信中...");
});
</script>

<template>
  <CardLayout>
    <!-- ヘッダー -->
    <template #header> お問い合わせ登録 </template>

    <!-- ボディ -->
    <template #body>
      <form novalidate>
        <div class="form-item">
          <TextField
            label="お名前を入力してください必須"
            uniqueId="name"
            v-model="name"
            :required="true"
            :error="errors.name"
          />
        </div>
        <div class="form-item">
          <TextField
            label="返信先のメールアドレスを入力してください"
            uniqueId="email"
            v-model="email"
            :required="true"
            :error="errors.email"
          />
        </div>
        <div class="form-item">
          <Gender
            label="性別を教えて下さい"
            v-model="gender"
            :required="true"
            :error="errors.gender"
          />
        </div>
        <div class="submit-button">
          <Button
            label="送信する"
            color="blue"
            @button-click="handleSendForm"
          />
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
