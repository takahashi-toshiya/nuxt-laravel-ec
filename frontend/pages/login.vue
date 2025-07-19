<script setup lang="ts">
import CardLayout from "@/components/layouts/CardLayout.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import FormField from "~/components/common/FormField.vue";
import { useUserStore } from "~/store/userStore";
import FormLayout from "~/components/layouts/FormLayout.vue";
import { getLoginUser } from "~/services/userService";
import { loginService } from "~/services/authService";
import { useLoadingStore } from "~/store/loadingStore";

const userStore = useUserStore();
const router = useRouter();
const loadingStore = useLoadingStore();

const schema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: "メールアドレスは必須です" })
      .email({ message: "正しいメールアドレスを入力してください" })
      .max(255, { message: "メールアドレスは255文字以内で入力してください" }),
    password: z
      .string()
      .min(1, { message: "パスワードは必須です" })
      .min(6, { message: "パスワードは6文字以上で入力してください" })
      .max(255, { message: "パスワードは255文字以内で入力してください" }),
  })
);
const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    password: "",
  },
});
const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");

const loginError = ref<string | null>(null);

const handleLogin = handleSubmit(async (values) => {
  await loadingStore.withLoading(async () => {
    try {
      await loginService(values);

      const loginUser = await getLoginUser();

      // Piniaにセット
      userStore.setUser({
        id: loginUser.id,
        name: loginUser.name,
      });

      await router.push("/");
    } catch (error) {
      loginError.value = "ログイン情報が誤っています";
    }
  }, "ログイン中...");
});
</script>

<template>
  <CardLayout>
    <template v-slot:header>ログイン</template>
    <template v-slot:body>
      <FormLayout
        buttonText="ログイン"
        buttonColor="blue"
        @submit="handleLogin"
      >
        <FormField
          id="email"
          label="メールアドレス"
          v-model="email"
          placeholder="メールアドレスを入力"
          :error-message="errors.email"
          v-bind="emailProps"
        />
        <FormField
          id="password"
          label="パスワード"
          v-model="password"
          placeholder="パスワードを入力"
          :error-message="errors.password"
          v-bind="passwordProps"
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
.login-button {
  display: flex;
  justify-content: center;
}
</style>
