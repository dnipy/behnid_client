export async function regSw () {
  if ('serviceWorker' in navigator) {
    console.log('ssss')
    const reg = await navigator.serviceWorker.register('/workers/push-notif.js');
    console.log ('service config is', {reg});
    return reg; 
  }
  throw Error ('serviceworker not supported');
}


export async function subscribe (serviceWorkerReg : ServiceWorkerRegistration) {
    await serviceWorkerReg.pushManager.getSubscription()
        .then(function(subscription) {
        // If a subscription was found, return it.
        if (subscription) {
            return subscription;
        }
        
        // Otherwise, subscribe the user (userVisibleOnly allows to specify
        // that we don't plan to send notifications that don't have a
        // visible effect for the user).
        return serviceWorkerReg.pushManager.subscribe({
            userVisibleOnly: true
        });
        }).then(async(subscription)=>{

            console.log ({subscription});
            if (subscription === null) {
                subscription = await serviceWorkerReg.pushManager.subscribe ({
                    userVisibleOnly: true,
                    applicationServerKey: 'BHvpZKlLjdn8NqwHD5QOW2PUya580SUmiTyewT-bV__sfpjznRgNjrAKhXvYrOWIsSSabF0C7cM0SLctypU4RZk',
                }); 
            }
        })
  }