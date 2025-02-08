<script setup lang="ts">
import LoginButton from "@/components/common/LoginButton.vue";
import CardLayout from "@/components/layouts/CardLayout.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { login } from "@/api/auth";
import { getLoginUser } from "@/api/user";
import FormField from "@/components/pages/login/FormField.vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const router = useRouter();

const schema = toTypedSchema(
  z.object({
    email: z.string().min(1, { message: "Field is required" }),
    password: z.string().min(1, { message: "Field is required" }),
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

const loginClick = handleSubmit(async (values) => {
  try {
    await login(values);

    const loginUser = await getLoginUser();

    // Piniaにセット
    await userStore.setUser({
      id: loginUser.id,
      name: loginUser.name,
    });

    await router.push("/");
  } catch (error) {
    loginError.value = "ログイン情報が誤っています";
  }
});
</script>

<!--学習を進めるため一旦レイアウトは無視-->
<template>
  <CardLayout>
    <template v-slot:header>ログイン</template>
    <template v-slot:body>
      <div class="form-container">
        <form @submit.prevent="loginClick">
          <FormField
            id="email"
            label="メールアドレス"
            v-model="email"
            placeholder="メールアドレスを入力"
            :errorMessage="errors.email"
            v-bind="emailProps"
          />
          <FormField
            id="password"
            label="パスワード"
            v-model="password"
            placeholder="パスワードを入力"
            :errorMessage="errors.password"
            v-bind="passwordProps"
          />
          <p v-if="loginError">{{ loginError }}</p>
          <div class="login-button">
            <LoginButton label="ログイン" color="blue" />
          </div>
        </form>
      </div>
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
