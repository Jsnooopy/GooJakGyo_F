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
                            <v-select
                              v-model="role"
                              :items="[
                                { value: 'MENTOR', title: '멘토' },
                                { value: 'MENTEE', title: '멘티' }
                              ]"
                              label="역할 선택"
                              required
                            />
                            <v-select
                              v-model="selectedKeywords"
                              :items="keywordOptions"
                              label="관심 분야 선택 (중복 선택 가능)"
                              item-title="name"
                              item-value="id"
                              multiple
                              chips
                              clearable
                              required
                            />
                            <v-btn type="submit" color="primary" block>등록</v-btn>
                        </v-form>
                    </v-card-text>
    
                </v-card>
                
            </v-col>

        </v-row>

    </v-container>
</template>

<script>
import api from "@/api/axios";
import { jwtDecode } from 'jwt-decode';


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
      role: "",
      selectedKeywords: [],

      keywordOptions: [
        { id: 1, name: "VLSI·컴퓨터" },
        { id: 2, name: "반도체·디스플레이·재료" },
        { id: 3, name: "마이크로파·광파" },
        { id: 4, name: "바이오" },
        { id: 5, name: "전력·제어" },
        { id: 6, name: "인공지능·신호처리" },
        { id: 7, name: "통신·네트워크" },
      ]
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
            role: this.role,
            keywordIds: this.selectedKeywords,
        }
        
        const response = await api.post('/member/oauth/create', oauthData);

        const accessToken = response.data.accessToken;
        const memberId = response.data.memberId;
        const role = jwtDecode(accessToken).role;
        const email = jwtDecode(accessToken).sub;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("memberId", memberId);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
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