import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(localStorage.getItem('count') ? Number(localStorage.getItem('count')) : 0)

  // 상태가 변경될 때마다 localStorage에 저장
  watch(count, (newCount) => {
    localStorage.setItem('count', newCount)
  })

  function CountLecture(){
    this.count++
  }

  function CancelLecture(){
    this.count--
  }

  return { count, CountLecture, CancelLecture }
})
