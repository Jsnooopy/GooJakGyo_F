<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="4" md="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">회원가입</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="memberCreate">
                            <v-text-field 
                              label="이름"
                              v-model="name"
                              :rules="[ v => !!v || '이름은 필수입니다.',
                                v => (v && v.length >= 2) || '이름은 최소 2자 이상이어야 합니다.'
                              ]"
                              required
                            >
                            </v-text-field>
                            <v-text-field 
                              label="email"
                              v-model="email"
                              type="email"
                              :rules="[ v => !!v || '이메일은 필수입니다.',
                                v => /.+@.+\..+/.test(v) || '유효한 이메일을 입력하세요'
                              ]"
                              required
                            >
                            </v-text-field> 
                            <v-text-field 
                              label="password"
                              v-model="password"
                              type="password"
                              :rules="[ v => !!v || '비밀번호는 필수입니다.',
                                v => (v && v.length >= 6) || '비밀번호는 최소 6자 이상이어야 합니다.'
                              ]"
                              required
                            >
                            </v-text-field>
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
import api from '@/api/axios';
export default{
    data(){
        return{
            name: "",
            email: "",
            password: "",
            univName: "",
            major: "",
            studentId: "",
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
    methods:{
        async memberCreate(){
            const data = {
                name: this.name,
                email: this.email,
                password: this.password,
                univName: this.univName,
                major: this.major,
                studentId: this.studentId,
                role: this.role,
                keywordIds: this.selectedKeywords,
            }
            await api.post('/member/create', data);
            alert("회원가입이 완료되었습니다!");
            this.$router.push("/");
        }
    }
}


</script>