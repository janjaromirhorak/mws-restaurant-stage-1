startServiceWorker = () => {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('./service-worker.js', {scope: './'}).then(() => {
            console.log('Service worker registered.');
        }).catch((err) => {
            console.error(err);
        })
    } else {
        console.warn('Service Worker is not supported in this browser.');
    }
}

startServiceWorker();
