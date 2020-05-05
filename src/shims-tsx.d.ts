import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

// 3. Declare augmentation for Vue
import App = firebase.app.App;

declare module 'vue/types/vue' {

  interface Vue {
    $fire: App;
  }
}
