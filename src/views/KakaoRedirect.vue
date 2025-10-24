<template>
    <div>
        카카오 로그인 진행중...
    </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export default {
  async created() {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      await this.sendCodeToServer(code);
    } else {
      alert("로그인 코드가 존재하지 않습니다.");
      window.location.href = "/";
    }
  },

  methods: {
    async sendCodeToServer(code) {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/member/kakao/doLogin`,
          { code }
        );

        const data = response.data;
        const token = data.token;

        // case 1: 기존 회원 → 바로 로그인
        if (token) {
          const role = jwtDecode(token).role;
          const email = jwtDecode(token).sub;
          
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("email", email);
          window.location.href = "/"; // 메인 페이지로 이동
        }

        // case 2: 신규 회원 → 추가 정보 입력 페이지로 이동
        else if (data.status === "NEED_OAUTH_CREATE") {
          // sessionStorage에 일시 저장 (새로고침해도 유지되게)
          sessionStorage.setItem("socialInfo", JSON.stringify(data));

          // 추가 정보 입력 페이지로 이동
          window.location.href = "/oauth/create";
        }

        // case 3: 예외 처리
        else {
          alert("로그인 처리 중 알 수 없는 오류가 발생했습니다.");
          window.location.href = "/";
        }

      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        alert("카카오 로그인 중 오류가 발생했습니다.");
        window.location.href = "/";
      }
    },
  },
};
</script>