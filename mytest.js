
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hoàn thành sau 2 giây");
    }, 2000);
});

promise.then((message) => {
    console.log(message); // In ra: Hoàn thành sau 2 giây
});
