<script>
import axios from 'axios'
export default {
    data: () => ({
      rules: [
        value => !!value || '해당란은 필수입니다.',
      ],
      lectureId:null,
      title:"",
      introduction:"",
      professor:"",
    }),

    methods:{
        itemCreate(){ //강의item생성
            const item = {
            lectureId: this.lectureId, //강의코드
            title: this.title, // 강의제목
            introduction:this.introduction,
            professor: this.professor, //대표교수
        };
            return item
        },

        LectureCreat(){
            const item=this.itemCreate()
        this.$socket.emit('Creat', item);
        },
        LectureUpdata(){
            const item=this.itemCreate()
            this.$socket.emit('Updata', item);
        },
        LectureDelete(){
            const item=this.lectureId
            this.$socket.emit('Delete', item);
        }
    },
    mounted() {

    this.$socket.on("Alert", (data) => {
        alert(data);
    });
    this.$socket.on("Create", (data) =>{
        console.log(data.lectureId, data.title,data.introduction, data.professor);
        axios.post('http://localhost:3000/lectureList',{
            lectureId: data.lectureId, //강의코드
            title: data.title, // 강의제목
            introduction:data.introduction,
            professor: data.professor, //대표교수
        })
    });

    this.$socket.on("Updata", (data) =>{
        console.log(data.lectureId, data.title, data.introduction, data.professor);
        axios.put(`http://localhost:3000/lectureList/${data.lectureId}`,{
            lectureId: data.lectureId, //강의코드
            title: data.title, // 강의제목
            introduction:data.introduction,
            professor: data.professor, //대표교수
        })
    });

    this.$socket.on("Delete", (data) =>{
        axios.delete(`http://localhost:3000/lectureList/${data}`)
    });
  },
}

</script>

<template>

  <div class="creat">
    <v-card>
        <v-card-title class="d-flex align-center">
            <h4>강의추가</h4>
        </v-card-title>
    <v-text-field
      :rules="rules"
      hide-details="auto"
      hint="숫자로 입력해야합니다."
      v-model="lectureId"
      label="강의번호"
    ></v-text-field>
    <v-text-field
      :rules="rules"
      hide-details="auto"
      v-model="title"
      label="강의명"></v-text-field>
    <v-text-field 
      :rules="rules"
      hide-details="auto"
      v-model="introduction"
      label="강의소개"></v-text-field>
    <v-text-field
      :rules="rules"
      hide-details="auto"
      v-model="professor"
      label="대표교수"></v-text-field>
      <v-btn @click = "LectureCreat()">
        강의추가
      </v-btn>
    </v-card>
  </div>

  <div class="Updata">
    <v-card>
        <v-card-title class="d-flex align-center">
            <h4>강의 수정</h4>
        </v-card-title>
    <v-text-field
      :rules="rules"
      hide-details="auto"
      hint="숫자로 입력해야합니다."
      v-model="lectureId"
      label="강의번호"
    ></v-text-field>
    <v-text-field
      :rules="rules"
      hide-details="auto"
      v-model="title"
      label="강의명"></v-text-field>
    <v-text-field 
      :rules="rules"
      hide-details="auto"
      v-model="introduction"
      label="강의소개"></v-text-field>
    <v-text-field
      :rules="rules"
      hide-details="auto"
      v-model="professor"
      label="대표교수"></v-text-field>
      <v-btn @click = "LectureUpdata()">
        강의수정
      </v-btn>
    </v-card>
  </div>
  <div class="Delete">
    <v-card>
        <v-card-title class="d-flex align-center">
            <h4>강의 삭제</h4>
        </v-card-title>
    <v-text-field
      :rules="rules"
      hide-details="auto"
      hint="숫자로 입력해야합니다."
      v-model="lectureId"
      label="강의번호"
    ></v-text-field>
      <v-btn @click = "LectureDelete()">
        강의삭제
      </v-btn>
    </v-card>
  </div>

</template>
<style>
.creat{
    position: absolute;
    top: 100px;
    left: 500px;
    width: 400px;
    height: 400px;
    visibility: visible;
}
.Updata{
    position: absolute;
    top: 100px;
    left: 1000px;
    width: 400px;
    height: 400px;
    visibility: visible;
}

.Delete{
    position: absolute;
    top: 500px;
    left: 500px;
    width: 400px;
    height: 400px;
    visibility: visible;
}
</style>