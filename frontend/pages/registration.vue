<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Form, useForm } from "vee-validate";
import { z } from "zod";
import CardLayout from "~/components/layouts/CardLayout.vue";
import FormField from "~/components/form/FormField.vue";
import FormLayout from "~/components/layouts/FormLayout.vue";

const schema = toTypedSchema(
  z.object({
    name: z.string().min(1, { message: "Field is required" }),
    email: z.string().min(1, { message: "Field is required" }),
    password: z.string().min(1, { message: "Field is required" }),
    passwordConfirmation: z.string().min(1, { message: "Field is required" }),
  })
);
const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  },
});
const [name] = defineField("name");
const [email] = defineField("email");
const [password] = defineField("password");
const [passwordConfirmation] = defineField("passwordConfirmation");

const handleRegistration = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <CardLayout>
    <!-- ヘッダー -->
    <template v-slot:header>新規登録</template>

    <template v-slot:body>
      <FormLayout
        buttonText="新規登録"
        buttonColor="blue"
        @submit="handleRegistration"
      >
        <FormField
          id="name"
          label="名前"
          v-model="name"
          placeholder="名前を入力してください"
          :error-message="errors.name"
        />
        <FormField
          id="email"
          label="メールアドレス"
          v-model="email"
          placeholder="メールアドレスを入力してください"
          :error-message="errors.email"
        />
        <FormField
          id="password"
          label="パスワード"
          v-model="password"
          type="password"
          placeholder="パスワードを入力してください"
          :error-message="errors.password"
        />
        <FormField
          id="passwordConfirmation"
          label="パスワード（確認）"
          v-model="passwordConfirmation"
          type="password"
          placeholder="パスワードを再度入力してください"
          :error-message="errors.passwordConfirmation"
        />
      </FormLayout>
    </template>
  </CardLayout>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
}
.registration-button {
  display: flex;
  justify-content: center;
}
</style>
