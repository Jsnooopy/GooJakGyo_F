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
                            <v-btn type="submit" color="primary" block>등록</v-btn>
                        </v-form>
                    </v-card-text>
    
                </v-card>
                
            </v-col>

        </v-row>

    </v-container>
</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
            name: "",
            email: "",
            password: "",
        }
    },
    methods:{
        async memberCreate(){
            const data = {
                name: this.name,
                email: this.email,
                password: this.password,
                
            }
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, data);
            this.$router.push("/");
        }
    }
}


</script>