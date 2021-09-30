<template>
  <v-container grid-list-lg pl-0 pr-0>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <text-field />
        <br>
        <radius />
        <br>
        <button-view/>
      </v-flex>
      <v-flex xs12 sm6>
        <h3 class="my-2">Available Properties</h3>
        <p>
          <i class="red--text">location</i> {<i class="primary--text">Object</i>}
          <ul>
            <li><i class="red--text">lat</i> {<i class="primary--text">number</i>} ==> Latitude</li>
            <li><i class="red--text">lng</i> {<i class="primary--text">number</i>} ==> Longitude</li>
            <li><i class="red--text">radius</i> {<i class="primary--text">number</i>} ==> Radius Circle</li>
          </ul>
        </p>
        <p><i class="red--text">className</i> {<i class="primary--text">String</i>} ==> Set of css class. ex: "main color"</p>
        <p><i class="red--text">readonly</i> {<i class="primary--text">Boolean</i>} ==> The field is readonly</p>
        <p><i class="red--text">disabled</i> {<i class="primary--text">Boolean</i>} ==> The field is disabled</p>
        <p><i class="red--text">rules</i> {<i class="primary--text">Array of Func()</i>} ==> Set of input rules</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';
import TextField from '../../../components/documentations/locationPicker/TextField';
import Radius from '../../../components/documentations/locationPicker/Radius';
import ButtonView from '../../../components/documentations/locationPicker/ButtonView';
Vue.component('text-field', TextField);
Vue.component('radius', Radius);
Vue.component('button-view', ButtonView);

export default {
  
};
</script>