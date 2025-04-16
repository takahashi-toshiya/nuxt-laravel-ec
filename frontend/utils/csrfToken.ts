/*
// メモ化用の変数
let cachedCsrfToken: string | null = null;
let csrfTokenExpiry = 0;

// CSRF トークンを Cookie から取得する関数
export const getCsrfToken = () => {
  // 有効期限が切れていない場合、キャッシュを使用
  if (cachedCsrfToken && Date.now() < csrfTokenExpiry) {
    return cachedCsrfToken;
  }

  // Cookie から CSRF トークンを取得
  const matches = document.cookie.match(new RegExp("XSRF-TOKEN=([^;]+)"));
  const token = matches ? decodeURIComponent(matches[1]) : null;

  // トークンをメモ化（2 時間有効）
  cachedCsrfToken = token;
  csrfTokenExpiry = Date.now() + 2 * 60 * 60 * 1000; // 2 時間後に有効期限切れ

  return token;
};

// CSRF トークンを再取得する関数
export const refreshCsrfToken = async () => {
  await $fetch("http://localhost:8000/sanctum/csrf-cookie", {
    credentials: "include",
  });

  // トークンを再取得してメモ化
  cachedCsrfToken = getCsrfToken();
  csrfTokenExpiry = Date.now() + 2 * 60 * 60 * 1000; // 2 時間後に有効期限切れ
};

// CSRF トークンを初期化する関数（ログアウト後に呼ぶ）
export const resetCsrfToken = () => {
  cachedCsrfToken = null;
  csrfTokenExpiry = 0;
};
*/
