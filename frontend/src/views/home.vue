<script>
import calendar from "../components/calendar.vue"
import axios from "axios";
import { mapState } from "pinia";
import { useCounterStore } from "@/stores/counter";
import Pollution from "@/components/Pollution.vue";
export default {
    components: {
        calendar,
        Pollution,
  },
    data: () => ({
      output: "",
      pm10: null,
      pm25: null,
      schedule: [
        {
          title: '12-09~12-16',
          value: '보강기간',

        },
        {
          title: '12-17~12-23',
          value: '기말고사 기간',

        },
        {
          title: '12-20~12-27',
          value: '성적입력 기간',

        },
        {
          title: '12-24',
          value: '동계방학 및 계절학기 개강',

        },
      ],
      notification: [
      
      ],

    }),
    computed:{
      ...mapState(useCounterStore,['count'])
    },
    methods:{

      outputUpdata()
      {
        this.output="미세먼지 : ";
        if (this.pm10 <= 30) {
          this.output+="좋음😀";
        } else if (this.pm10 > 30 && this.pm10 <= 80) {
          this.output+="보통😐";
        } else {
          this.output+="나쁨😡";
        }
        this.output+=" / 초미세먼지 : ";
        //pm25는 초미세먼지 수치
        if (this.pm25 <= 15) {
          this.output+="좋음😀";
        } else if (this.pm25 > 15 && this.pm25 <= 35) {
            this.output+="보통😐";
        } else {
            this.output+="나쁨😡";
        }
      },

      handlePollution(pm10, pm25) {
      // 자식 컴포넌트에서 받은 데이터를 처리
      this.pm10 = pm10;
      this.pm25 = pm25;
      console.log(`PM10: ${pm10}, PM2.5: ${pm25}`);
      this.outputUpdata();
    },

  },
  
  created(){
      axios.get('http://localhost:3000/crawling')
      .then(contacts =>{
        const data = contacts.data;
        console.log(data);
        for(let i = 0; i<data.length; i++)
        {
          console.log(data[i]);
          this.notification.push(data[i]);
        }
        console.log(this.notification)
      
      })
      console.log(this.notification)
    }
  
}

</script>

<template>

<div class="schedule">
    <h2 align:left>학사일정</h2>
    <v-list lines="one" class="border">
        <v-list-item
            v-for="n in schedule"
            :key="n"
            :title="n.title"
            :subtitle="n.value"
        ></v-list-item>
</v-list>
</div>

<div class="notification">
    <h2>학사공지</h2>
    <v-list lines="one" class="border">
        <v-list-item
            v-for="n in notification"
            :key="n"
            :title="n.title"
            :subtitle="n.value"
        ></v-list-item>
</v-list>
</div>

<div class ="calendar">
    <calendar/>
</div>

<div class = "Lecture">
  <v-card><h2>신청한 강의 개수 : {{ count }}</h2></v-card>
</div> 


<div class ="pollution">
    <Pollution @Pollution="handlePollution" />
    <input type="text" v-model = "output" readonly/>
</div>

</template>
<style>
.border {
  border: 1px solid black;
  border-radius: 4px;
}
.schedule{
    position: absolute;
    top: 100px;
    left: 500px;
    width: 400px;
    height: 250px;
    visibility: visible;
}

.notification{
    position: absolute;
    top: 100px;
    left: 1000px;
    width: 400px;
    height: 400px;
    visibility: visible;
}
.calendar{
    position: absolute;
    top: 400px;
    left: 500px;

    visibility: visible;
}
.Lecture{
  position: absolute;
    top: 400px;
    left: 1000px;
    width: 400px;
    height: 400px;
    visibility: visible;
}

.pollution{
  position: absolute;
    top: 600px;
    left: 1000px;
    width: 400px;
    height: 400px;
    visibility: visible;
}

input{
        width: 345px;
        height: 65px;
        padding: 0 20px;
        border: 1px solid black;
        border-radius: 30px;
    }

</style>