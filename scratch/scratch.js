'use strict'

const timeoutPromise = new Promise((resolve, reject) => {
  const rand = Boolean(Math.round(Math.random()));
  setTimeout(function () {
    if (rand) {
      resolve('Heads!');
    } else {
      reject('Tails!');
    }
  }, 1000);
});
function coinFlip(delay) {
  return new Promise((resolve, reject) => {
    const rand = Boolean(Math.round(Math.random()));
    setTimeout(function () {
      if (rand) {
        resolve('Heads!');
      } else {
        reject('Tails!');
      }
    }, delay);
  });
}
timeoutPromise
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });

  coinFlip(500)
    .then(res => {
      console.log(1, res);
      return coinFlip(500);
    })
    .then(res => {
      console.log(2, res);
      return coinFlip(500);
    })
    .then(res => {
      console.log(3, res);
      return 'You Win!';
    })
    .then(res => {
      console.log(4, res);
    })
    .catch(err => {
      console.error(err);
    });
