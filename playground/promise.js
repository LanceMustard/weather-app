const somePromise = (username) => {
  console.log('somePromise', username);
  return new Promise((resolve, reject) => {
    resolve(`It worked ${username}`);
    // reject(`It did not work ${username}`);
  });
};

somePromise('Lance').then((message) => {
  console.log(message);
}, (error) => {
  console.log('Error:', error);
});