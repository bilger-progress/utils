function usesCallback(arguments, callback) {
    return setTimeout(() => {
        return callback(null, arguments);
        // return callback(new Error("Error"), null);
    }, 1000);
}

usesCallback(1, (error, data) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(data);
});

function promisify(func) {
    return (arguments) => {
        return new Promise((resolve, reject) => {
            return func(arguments, (error, data) => {
                if (error) {
                    return reject(error);
                } 
                return resolve(data);
            });
        });
    };
}

const promisified = promisify(usesCallback);

promisified(2)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });