function usesCallback(callback) {
    return setTimeout(() => {
        return callback(null, 1, 2, 3);
    }, 1000);
}

usesCallback((error, ...data) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(...data);
});

function promisify(func) {
    return (...arguments) => {
        return new Promise((resolve, reject) => {
            return func(...arguments, (error, data) => {
                if (error) {
                    return reject(error);
                } 
                return resolve(data);
            });
        });
    };
}

const promisified = promisify(usesCallback);

promisified()
  .then((...data) => {
    console.log(...data);
  })
  .catch((error) => {
    console.error(error);
  });