<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      items: [
        {
          title: '홈',
          value: 'Home',
          to: '/',
        },
        {
          title: '수강신청',
          value: 'Application_for_classes',
          to: '/application_for_classes',
        },
        {
          title: '신청한 강의',
          value: 'applied lecture',
          to: '/applied_lecture',
        },
        {
          title: '신청취소',
          value: 'Cancellation',
          to: '/cancel',
        },
        {
          title: '시스템관리',
          value: 'management',
          to: '/management',
        },
      ],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<template>
<v-layout>
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>수강신청시스템</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list>
          <v-list-item v-for="item in items" :key = "item.value" :href = "item.to">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <RouterView />
      </v-main>
    </v-layout>

</template>
