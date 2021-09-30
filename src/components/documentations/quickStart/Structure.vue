<template>
  <v-container grid-list-lg pl-0 pr-0>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <h3 class="primary--text">Backend Folder Structure</h3>
        <v-treeview
          v-model="backend.tree"
          :open="open"
          :items="backend.files"
          activatable
          item-key="name"
          open-on-click
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.file">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon>
          </template>
        </v-treeview>
      </v-flex>
      <v-flex xs12 sm6>
        <h3 class="primary--text">Frontend Folder Structure</h3>
        <v-treeview
          v-model="frontend.tree"
          :open="open"
          :items="frontend.files"
          activatable
          item-key="name"
          open-on-click
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.file">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon>
          </template>
        </v-treeview>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      open: ['src'],
      files: {
        docker: 'mdi-docker',
        git: 'mdi-git',
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-code-json',
        md: 'mdi-information',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        vue: 'mdi-vuejs',
        xls: 'mdi-file-excel'
      },
      backend: {
        tree: [],
        files: [
          {
            name: 'deploy',
            children: [
              { name: 'bin' },
              { name: 'dockerfiles' }
            ]
          },
          { 
            name: 'src',
            children: [
              { name: 'config' },
              { name: 'controllers' },
              { 
                name: 'libraries',
                children: [
                  { name: 'auth' },
                  { name: 'country' },
                  { name: 'datatable' },
                  { name: 'mail' },
                  { name: 'upload' }
                ]
              },
              { name: 'middlewares' },
              { name: 'models' },
              { 
                name: 'public',
                children: [
                  { name: 'assets' },
                  { name: 'images' }
                ]
              },
              { name: 'routes' },
              {
                name: 'app.js',
                file: 'js'
              },
            ]
          },
          {
            name: '.dockerignore',
            file: 'docker'
          },
          {
            name: '.gitignore',
            file: 'git'
          },
          {
            name: 'docker-compose-prod.yml',
            file: 'docker'
          },
          {
            name: 'docker-compose.yml',
            file: 'docker'
          },
          {
            name: 'package.json',
            file: 'json'
          },
          {
            name: 'README.md',
            file: 'md'
          }
        ]
      },
      frontend: {
        tree: [],
        files: [
          {
            name: 'deploy',
            children: [
              { name: 'bin' },
              { name: 'dockerfiles' },
              { name: 'nginx' }
            ]
          },
          {
            name: 'public',
            children: [
              { name: 'img' }
            ]
          },
          {
            name: 'src',
            children: [
              { name: 'api' },
              { name: 'assets' },
              { 
                name: 'components',
                children: [
                  { name: 'helpers' },
                  { name: 'navigations' }
                ]
              },
              { 
                name: 'layouts',
                children: [
                  { name: 'parts' }
                ]
              },
              { name: 'plugins' },
              { name: 'router' },
              { name: 'store' },
              { name: 'styles' },
              { 
                name: 'views',
                children: [
                  { name: 'dashboard' },
                  { name: 'roles' },
                  { name: 'users' },
                  { name: 'home', file: 'vue' },
                ]
              },
              {
                name: 'App.vue',
                file: 'vue'
              },
              {
                name: 'main.js',
                file: 'js'
              },
            ]
          },
          {
            name: '.dockerignore',
            file: 'docker'
          },
          {
            name: '.env',
            file: 'txt'
          },
          {
            name: '.gitignore',
            file: 'git'
          },
          {
            name: 'babel.config.js',
            file: 'js'
          },
          {
            name: 'docker-compose-prod.yml',
            file: 'docker'
          },
          {
            name: 'docker-compose.yml',
            file: 'docker'
          },
          {
            name: 'package.json',
            file: 'json'
          },
          {
            name: 'README.md',
            file: 'md'
          }
        ]
      },
    })
  }
</script>