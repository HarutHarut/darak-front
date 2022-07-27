import Vue from "vue";

import {
  ValidationObserver,
  ValidationProvider,
  extend
} from "vee-validate";
// import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// localize("en", en);

extend('confirmation', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
