<template>
  <v-container grid-list-lg fluid>
    <v-layout align-center row wrap justify-center class="card-dashboard-container mb-3">
      <v-flex xs12 sm3 v-for="(card, i) in cards" :key="i">
        <v-card class="mx-auto elevation-soft-grey" max-width="400">
          <v-card-text class="font-weight-bold">
            <v-layout row>
              <v-flex xs9>
                <h5 class="subheading grey--text text--darken-2 mb-2">{{card.title || "Untitled"}}</h5>
                <h4 class="display-1">{{card.data || 0}}</h4>
              </v-flex>
              <v-flex xs3>
                <v-icon large :color="card.color || ''" class="py-2">
                  {{card.icon || ""}}
                </v-icon>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-center row wrap justify-center class="card-dashboard-container">
      <v-flex xs12 md4>
        <v-card class="mx-auto elevation-soft-grey" style="height: 472px;" v-loading="isLoadingUsers">
          <v-card-title class="pb-0">
            <div>
              <div class="subheading grey--text text--darken-2">
                Hello, {{ user.firstName || '' }} {{ user.lastName || '' }}
              </div>
              <div class="headline">{{ $moment().format("dddd, Do") }}</div>
              <div class="grey--text text--darken-2">{{ $moment().format("MMMM YYYY") }}</div>
            </div>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-divider light></v-divider>
          </v-card-text>
          <div v-bar>
            <div>
              <v-list two-line class="users-list pr-3" v-if="!isLoadingUsers">
                <template v-for="(user, index) in loginUsers">
                  <v-subheader v-if="user.header" :key="index">
                    {{ user.header }}
                  </v-subheader>

                  <v-divider
                    v-else-if="user.divider"
                    :key="index"
                    :inset="user.inset"
                  ></v-divider>

                  <v-list-tile v-else :key="index" avatar>
                    <v-list-tile-avatar>
                      <img :src="user.image" v-if="user.useImage">
                      <g-avatar :value="user.avatar" v-else />
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="user.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="user.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 md8>
        <v-card class="mx-auto elevation-soft-grey" style="height: 472px;" v-loading="isLoadingChart">
          <v-card-title class="grey--text text--darken-2 pb-0">
            Weekly Login
          </v-card-title>
          <v-card-text>
            <div class="chart-containter d-block">
              <line-chart :chartdata="users" :options="chartOptions" :styles="styles" v-if="!isLoadingChart"/>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { 
  getWeeklyLogin,
  getTodayLogin,
  getCountUsers,
  getCountRoles,
  getCountFeeds,
  getCountAssets 
} from "../../api/dashboard";
import data from '../../components/documentations/dataTable/codeSamples/ServerSide';
import LineChart from "../../components/helpers/charts/LineChart"

export default {
  components: { LineChart },
  data() {
    return {
      isLoadingChart: true,
      isLoadingUsers: true,
      cards: [
        {
          key: "box-1",
          title: "Active Users",
          icon: "mdi-account-group-outline",
          data: 0,
          color: "secondary"
        },
        {
          key: "box-2",
          title: "Active Roles",
          icon: "mdi-account-lock-outline",
          data: 0,
          color: "teal accent-3"
        },
        {
          key: "box-3",
          title: "Active Feeds",
          icon: "mdi-text-box-outline",
          data: 0,
          color: "deep-purple accent-2"
        },
        {
          key: "box-4",
          title: "Total Files",
          icon: "mdi-file-multiple-outline",
          data: 0,
          color: "blue accent-2"
        },
      ],
      loginUsers: [{ header: 'Recent Login' }],
      users: {
        labels: ['January', 'February', 'March'],
        datasets: [
          {
            label: 'Login users',
            backgroundColor: 'transparent',
            borderColor: '#5962b5',
            data: [25, 15, 20]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      styles: {
        height: '400px'
      }
    }
  },
  computed: mapGetters({
    user: "user/profile"
  }),
  mounted() {
    this.countUsers();
    this.countRoles();
    this.countFeeds();
    this.countAssets();
    this.weeklyLogin();
    this.todayLogin();
  },
  methods: {
    countUsers() {
      getCountUsers()
        .then(res => {
          const found = this.cards.find(card => card.key == 'box-1')
          found.data = res.data.data
        })
        .catch(e => this.notifyErrors(e));
    },
    countRoles() {
      getCountRoles()
        .then(res => {
          const found = this.cards.find(card => card.key == 'box-2')
          found.data = res.data.data
        })
        .catch(e => this.notifyErrors(e));
    },
    countFeeds() {
      getCountFeeds()
        .then(res => {
          const found = this.cards.find(card => card.key == 'box-3')
          found.data = res.data.data
        })
        .catch(e => this.notifyErrors(e));
    },
    countAssets() {
      getCountAssets()
        .then(res => {
          const found = this.cards.find(card => card.key == 'box-4')
          found.data = res.data.data
        })
        .catch(e => this.notifyErrors(e));
    },
    todayLogin() {
      getTodayLogin()
        .then(res => {
          const userData = []
          res.data.data
            .forEach(data => {
              const timeMoment = this.$moment(data.createdAt);
              const time = this.timeZone(timeMoment, 'H:mm z');
              userData.push({ divider: true, inset: true });
              userData.push({
                useImage: data.useImage,
                image: data.image,
                avatar: data.avatar,
                name: data.firstName + ' ' + data.lastName,
                subtitle: `<span class='text--primary'>${time}</span> &mdash; ${data.ip}`
              });
            });
          this.loginUsers = [...this.loginUsers, ...userData.reverse()];
          this.isLoadingUsers = false;
        })
        .catch(e => this.notifyErrors(e));
    },
    weeklyLogin() {
      getWeeklyLogin()
        .then(res => {
          this.users.labels = [];
          this.users.datasets[0].data = [];
          res.data.data
            .forEach(data => {
              this.users.labels.push(data.value);
              this.users.datasets[0].data.push(data.total);
            });
          this.isLoadingChart = false;
        })
        .catch(e => this.notifyErrors(e));
    }
  }
}
</script>