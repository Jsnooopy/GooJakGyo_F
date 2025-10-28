<template>
    <v-container>
        <!-- ✅ 멘토 목록 -->
        <v-row>
            <v-col>
                <v-card>
                <v-card-title class="text-center text-h5">
                    멘토 목록
                </v-card-title>
                <v-card-text>
                    <v-table>
                    <thead>
                        <tr>
                        <th>이름</th>
                        <th>email</th>
                        <th>학교</th>
                        <th>전공</th>
                        <th>채팅</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in mentorList" :key="member.id">
                        <td>
                            <span class="text-primary" style="cursor:pointer"
                                @click="viewProfile(member.id)">
                            {{ member.name }}
                            </span>
                        </td>
                        <td>{{ member.email }}</td>
                        <td>{{ member.univName }}</td>
                        <td>{{ member.major }}</td>
                        <td>
                            <v-btn color="primary" @click="startChat(member.id)">
                            채팅하기
                            </v-btn>
                        </td>
                        </tr>
                    </tbody>
                    </v-table>
                </v-card-text>
                </v-card>
            </v-col>
            </v-row>

            <!-- ✅ 멘티 목록 -->
            <v-row class="mt-8">
            <v-col>
                <v-card>
                <v-card-title class="text-center text-h5">
                    멘티 목록
                </v-card-title>
                <v-card-text>
                    <v-table>
                    <thead>
                        <tr>
                        <th>이름</th>
                        <th>email</th>
                        <th>학교</th>
                        <th>전공</th>
                        <th>채팅</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in menteeList" :key="member.id">
                        <td>
                            <span class="text-primary" style="cursor:pointer"
                                @click="viewProfile(member.id)">
                            {{ member.name }}
                            </span>
                        </td>
                        <td>{{ member.email }}</td>
                        <td>{{ member.univName }}</td>
                        <td>{{ member.major }}</td>

                        <td>
                            <v-btn color="primary" @click="startChat(member.id)">
                            채팅하기
                            </v-btn>
                        </td>
                        </tr>
                    </tbody>
                    </v-table>
                </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- 프로필 카드 다이얼로그 -->
        <v-dialog v-model="profileDialog" max-width="500px">
            <v-card v-if="selectedMember">
                <v-card-title class="text-h6 text-center">
                {{ selectedMember.name }}님의 프로필
                </v-card-title>
                <v-card-text>
                <v-img
                    v-if="selectedMember.profileImageUrl"
                    :src="selectedMember.profileImageUrl"
                    max-width="120"
                    class="mx-auto my-3 rounded-circle"
                />
                <v-list>
                    <v-list-item>학교: {{ selectedMember.univName }}</v-list-item>
                    <v-list-item>전공: {{ selectedMember.major }}</v-list-item>
                    <v-list-item>학번: {{ selectedMember.studentId }}</v-list-item>
                    <v-list-item>
                    <div>관심 키워드:</div>
                    <v-chip
                        v-for="kw in selectedMember.keywords"
                        :key="kw"
                        color="blue"
                        class="ma-1"
                        small
                    >
                        {{ kw }}
                    </v-chip>
                    </v-list-item>
                </v-list>
                </v-card-text>
                <v-card-actions>
                <v-btn color="primary" text @click="profileDialog = false">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
import api from '@/api/axios';
export default{
    data(){
        return {
            mentorList: [],
            menteeList: [],
            profileDialog: false,
            selectedMember: null,
        }
    },
    async created(){
        const mentorResponse = await api.get('/member/list/mentor');
        const menteeResponse = await api.get('/member/list/mentee');

        this.mentorList = mentorResponse.data;
        this.menteeList = menteeResponse.data;
    },
    methods: {
        async startChat(otherMemberId){
            // 기존 채팅방이 있으면 return, 없으면 새로 생성된 roomId return
            const response = await api.post(`/chat/room/private/create?otherMemberId=${otherMemberId}`);
            const roomId = response.data;
            this.$router.push(`/chatpage/${roomId}`);
        },
        async viewProfile(memberId) {
            try {
                const response = await api.get(
                `/member/${memberId}`
                );
                this.selectedMember = response.data;
                this.profileDialog = true;
            } catch (error) {
                console.error("프로필 불러오기 실패:", error);
                alert("프로필 정보를 불러올 수 없습니다.");
            }
        },
    }

}
</script>