<template>
    <v-app-bar app dark>
        <v-container>
            <v-row align="center">
                <v-col class="d-flex justify-start">
                    <v-btn :to="{path:'/member/list'}">회원목록</v-btn>
                    <v-btn :to="{path:'/groupchatting/list'}">채팅방목록</v-btn>
                </v-col>
                <v-col class="text-center">
                    <v-btn :to="{path: '/'}">구작교</v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn v-if="isLogin" :to="{path:'/my/chat/page'}" >MyChatPage</v-btn>
                    <v-btn v-if="!isLogin" :to="{path:'/member/create'}">회원가입</v-btn>
                    <v-btn v-if="!isLogin" :to="{path:'/login'}">로그인</v-btn>
                    <v-btn v-if="isLogin" @click="doLogout">로그아웃</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import api from "@/api/axios";

export default{
    data(){
        return {
            isLogin: false,
        };
    },
    async created(){
       const accessToken = localStorage.getItem("accessToken");

       if(accessToken){
            this.isLogin = true;
        }
    },
    methods:{
        async doLogout() {
            try {
                const memberId = localStorage.getItem("memberId");

                await api.post('/member/logout', {memberId}, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}});

                localStorage.clear();

                this.isLogin = false;
                window.location.href = "/";
            } catch (error) {
                console.error("로그아웃 실패:", error);
            }
        },
    }
}
</script>