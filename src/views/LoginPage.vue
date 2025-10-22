<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="4" md="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">로그인</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="doLogin">
                            <v-text-field 
                              label="email"
                              v-model="email"
                              type="email"
                              :rules="[ v => !!v || '이메일을 입력해 주세요.',
                                v => /.+@.+\..+/.test(v) || '유효한 이메일을 입력하세요'
                              ]"
                              required
                            >
                            </v-text-field> 
                            <v-text-field 
                              label="password"
                              v-model="password"
                              type="password"
                              :rules="[ v => !!v || '비밀번호를 입력해 주세요.']"
                              required
                            >
                            </v-text-field>
                            <v-btn type="submit" color="primary" block>로그인</v-btn>
                        </v-form>
                        <br>
                        <v-row>
                            <v-col cols="4" class="d-flex justify-center">
                                <img
                                    src="@/assets/google_login.png"
                                    style="max-height:40px; width:auto;"
                                    @click="googleLogin()"
                                />
                            </v-col>
                            <v-col cols="4" class="d-flex justify-center">
                                <img
                                    src="@/assets/kakao_login.png"
                                    style="max-height:40px; width:auto;"
                                    @click="kakaoLogin()"
                                />
                            </v-col>
                            <v-col cols="4" class="d-flex justify-center">
                                <img
                                    src="@/assets/naver_login.png"
                                    style="max-height:40px; width:auto;"
                                    @click="NaverLogin()"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
    
                </v-card>
                
            </v-col>

        </v-row>

    </v-container>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default{
    data(){
        return{
            email: "",
            password: "",

            googleUrl: "https://accounts.google.com/o/oauth2/auth",
            googleClientId: "275892464379-0897g4rs9e98kvc31aq30tc45p3ccs6h.apps.googleusercontent.com",
            googleRedirectUrl: "http://localhost:3000/oauth/google/redirect",
            // openid는 요청하지 않아도 기본적으로 제공. email과 profile은 요청시 제공.
            googleScope: "openid email profile",

            kakaoUrl: "https://kauth.kakao.com/oauth/authorize",
            kakaoClientId: "692dee49bd3515403bcd15898fe6e876",
            kakaoRedirectUrl: "http://localhost:3000/oauth/kakao/redirect",

            naverUrl: "https://nid.naver.com/oauth2.0/authorize",
            naverClientId: "nyaUy9FUblddJrTj01sJ",
            naverRedirectUrl: "http://localhost:3000/oauth/naver/redirect",
        }
    },
    methods:{
        async doLogin(){
            const loginData = {
                email:this.email,
                password:this.password
            }
            const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/doLogin`, loginData);
            const token = response.data.token;
            const role = jwtDecode(token).role;
            const email = jwtDecode(token).sub;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("email", email);

            alert("로그인에 성공하였습니다!");
            window.location.href="/";
        },
        googleLogin(){
            const auth_uri = `${this.googleUrl}?client_id=${this.googleClientId}&redirect_uri=${this.googleRedirectUrl}&response_type=code&scope=${this.googleScope}`;
            window.location.href = auth_uri;
        },
        kakaoLogin(){
            const auth_uri = `${this.kakaoUrl}?client_id=${this.kakaoClientId}&redirect_uri=${this.kakaoRedirectUrl}&response_type=code`;
            window.location.href = auth_uri;
        },
        NaverLogin(){
            const auth_uri = `${this.naverUrl}?client_id=${this.naverClientId}&redirect_uri=${this.naverRedirectUrl}&response_type=code`;
            window.location.href = auth_uri;
        }
    }
}


</script>