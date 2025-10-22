<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="4" md="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">회원가입</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="memberCreate">
                            <v-text-field 
                              label="학교"
                              v-model="univName"
                              required
                            >
                            </v-text-field>
                            <v-text-field 
                              label="전공"
                              v-model="major"
                              required
                            >
                            </v-text-field>
                            <v-text-field 
                              label="학번"
                              v-model="studentId"
                              required
                            >
                            </v-text-field>
                            <v-btn type="submit" color="primary" block>등록</v-btn>
                        </v-form>
                    </v-card-text>
    
                </v-card>
                
            </v-col>

        </v-row>

    </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      socialId: "",
      email: "",
      name: "",
      socialType: "",
      univName: "",
      studentId: "",
      major: "",
    };
  },
  created() {
    const info = JSON.parse(sessionStorage.getItem("socialInfo"));
    if (!info) {
      alert("소셜 로그인 정보가 없습니다.");
      window.location.href = "/";
    } else {
      this.socialId = info.socialId;
      this.email = info.email;
      this.name = info.name;
      this.socialType = info.socialType;
    }
  },
  methods: {
    async memberCreate() {
      try {
        const oauthData = {
            socialId: this.socialId,
            email: this.email,
            name: this.name,
            socialType: this.socialType,
            univName: this.univName,
            studentId: this.studentId,
            major: this.major,
        }
        
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/oauth/create`, oauthData);

        const token = response.data.token;
        localStorage.setItem("token", token);
        sessionStorage.removeItem("socialInfo");

        alert("회원가입이 완료되었습니다!");
        window.location.href = "/";
      } catch (err) {
        console.error("회원가입 실패:", err);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    },
  },
};
</script>