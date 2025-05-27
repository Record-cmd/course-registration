<script>
import { ref } from 'vue'
import axios from 'axios'
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "@/stores/counter";

export default {

  data: () => ({
      page : ref(1),
      items: [

      ],
      
    }),
    methods:{
      Sigh(LectureId,Title,Professor){
        const item = {
        lectureId: LectureId, //강의코드
        title: Title, // 강의제목
        professor: Professor, //대표교수
      };
        //console.log(this.input);//input디버깅 확인용
        this.$socket.emit('Check', item);
      },

      ...mapActions(useCounterStore,['CountLecture']),
    },

    mounted() {

      this.$socket.on("Alert", (data) => {
        alert(data);
      });
      this.$socket.on("sign", (data) =>{
        this.CountLecture()
        console.log(data.lectureId, data.title, data.professor);
        axios.post('http://localhost:3000/lecture',{
          lectureId: data.lectureId, //강의코드
          title: data.title, // 강의제목
          professor: data.professor, //대표교수
        })
        })
    },
    computed:{
      ...mapState(useCounterStore,['count'])

    },
    created(){
      axios.get('http://localhost:3000/lectureList')
      .then(contacts =>{
        const data = contacts.data;
        for(let i = 0; i<data.length; i++)
        {
          this.items.push(data[i]);
        }
        console.log(this.items);
      })
    }

  }


</script>

<template>
<div class = "Lecture">
  <v-data-iterator :items="items" :items-per-page=items.length>
    <template v-slot:default="{ items }">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.raw.lectureId"
          cols="12"
          md="12"
          sm="12"
        >
          <v-card>
            <v-card-title class="d-flex align-center">
              <h4>{{ item.raw.title }}</h4>
            </v-card-title>
            <v-card-text> 강의코드 : {{ item.raw.lectureId }}</v-card-text>
            <v-card-text> {{ item.raw.introduction }} </v-card-text>
            <v-card-text> 대표교수: {{ item.raw.professor }} </v-card-text>
            <v-divider></v-divider>
            <v-btn @click = "Sigh(item.raw.lectureId,item.raw.title,item.raw.professor)">
            신청
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
  <div class = "LectureCount">
  <v-card><h2>신청한 강의 개수 : {{ count }}</h2></v-card>
  </div> 
</div>

</template>

<style scoped>
.Lecture{
    position: absolute;
    top: 100px;
    left: 500px;
    width: 596px;
    height: 250px;
    visibility: visible;
}

.LectureCount{
    position: absolute;
    top: 100px;
    left: 700px;
    width: 596px;
    height: 250px;
    visibility: visible;
}
</style>