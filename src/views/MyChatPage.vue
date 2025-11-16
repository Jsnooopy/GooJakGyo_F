<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        내 채팅 목록
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>채팅방 이름</th>
                                    <th>읽지 않은 메세지</th>
                                    <th>액션</th>
                                </tr> 
                            </thead>
                            <tbody>
                                <tr v-for="chat in chatList" :key="chat.roomId">
                                    <td>{{chat.roomName}}</td>
                                    <td>{{chat.unReadCount}}</td>
                                    <td>
                                        <v-btn color="primary" @click="enterChatRoom(chat.roomId)">입장</v-btn>
                                        <v-btn color="secondary" :disabled="chat.isGroupChat === 'N'" @click="leaveChatRoom(chat.roomId)" >나가기</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
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
        return {
            chatList: [],
            eventSource: null,
            memberId: null
        }
    },
    async created(){
        this.memberId = localStorage.getItem("memberId");
        const response = await api.get('/chat/my/rooms');
        this.chatList = response.data;

        // SSE 연결
        this.connectSSE();
    },

    beforeUnmount() {
        if(this.eventSource) {
            this.eventSource.close();
        }
    },

    methods: {
        connectSSE() {
            // SSE 구독
            this.eventSource = new EventSource(
                `${process.env.VUE_APP_API_BASE_URL}/api/sse/subscribe/${this.memberId}`
            );

            // SSE 연결 성공시
            this.eventSource.addEventListener("connect", (event) => {
                console.log("SSE connected:", event.data);
            });

            // 새로운 메시지 발생 이벤트
            this.eventSource.addEventListener("new-message", (event) => {
                const {roomId, unReadCount} = JSON.parse(event.data);

                console.log("새 메시지 도착 - roomId: ", roomId, "안 읽은 메시지 개수: ", unReadCount);

                // 해당 채팅방 unreadCount 즉시 증가
                const target = this.chatList.find(r => r.roomId === roomId);
                if (target) {
                    target.unReadCount = unReadCount;
                }
            });

        },

        enterChatRoom(roomId){
            this.$router.push(`/chatpage/${roomId}`);
        },
        async leaveChatRoom(roomId){
            await api.delete(`/chat/room/group/${roomId}/leave`);
            this.chatList = this.chatList.filter(chat => chat.roomId !== roomId);
        }
    },
}
</script>