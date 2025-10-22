import { createRouter, createWebHistory } from "vue-router"
import MemberCreate from "@/views/MemberCreate.vue"
import LoginPage from "@/views/LoginPage.vue";
import MemberList from "@/views/MemberList.vue";
import SimpleWebsocket from "@/views/SimpleWebsocket.vue";
import StompChatPage from "@/views/StompChatPage.vue";
import GroupChattingList from "@/views/GroupChattingList.vue";
import MyChatPage from "@/views/MyChatPage.vue";
import GoogleRedirect from "@/views/GoogleRedirect.vue";
import KakaoRedirect from "@/views/KakaoRedirect.vue";
import NaverRedirect from "@/views/NaverRedirect.vue";
import OauthCreate from "@/views/OauthCreate.vue";

const routes = [
    {
        path: '/member/create',
        name: 'MemberCreate',
        component: MemberCreate
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/oauth/google/redirect',
        name: 'GoogleRedirect',
        component: GoogleRedirect
     },
    {
        path: '/oauth/kakao/redirect',
        name: 'KakaoRedirect',
        component: KakaoRedirect
    },
    {
        path: '/oauth/naver/redirect',
        name: 'NaverRedirect',
        component: NaverRedirect
    },
    {
        path: '/oauth/create',
        name: 'OauthCreate',
        component: OauthCreate
    },
    {
        path: '/member/list',
        name: 'MemberList',
        component: MemberList
    },
    {
        path: '/simple/chat',
        name: 'SimpleWebsocket',
        component: SimpleWebsocket
    },
    {
        path: '/chatpage/:roomId',
        name: 'StompChatPage',
        component: StompChatPage
    },
    {
        path: '/groupchatting/list',
        name: 'GroupChattingList',
        component: GroupChattingList
    },
    {
        path: '/my/chat/page',
        name: 'MyChatPage',
        component: MyChatPage
    }

]

const router = createRouter({
    history: createWebHistory(), 
    routes
});

export default router;