export default function mcTimer (callback, interval, defaultStatus = 0) {
  const running = {
    current: defaultStatus,
  };
  const hd = {
    current: null
  };

  const tryNext = (next) => {
    if (running.current) {
      callback(() => {
        next && next();
        hd.current = setTimeout(tryNext, interval);
      });
    } else {
      clearTimeout(hd.current);
    }
  };

  const pause = () => {
    running.current = false;
    clearTimeout(hd.current);
  };
  const start = () => {
    if (running.current) {
      pause();
    }
    running.current = true;
    tryNext();
  }; 
  return {
    dispose(){
      running.current = false;
      clearTimeout(hd.current);
    },
    pause,
    start
  };

}



// // define a mixin object
// var myMixin = {
//   created: function () {
//     this.hello()
//   },
//   methods: {
//     hello: function () {
//       console.log('hello from mixin!')
//     }
//   }
// }

// // define a component that uses this mixin
// var Component = Vue.extend({
//   mixins: [myMixin]
// })
