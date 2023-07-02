self.addEventListener("push", (event) => {
    const payload = event.data?.text() ? JSON.parse(event.data?.text()) : { msg: "no payload", url: ""};
    event.waitUntil(
      self.registration.showNotification("ServiceWorker TEST", {
        body: payload.msg,
        icon: "/testicon.jpg",
        data: {
          link: payload.url
        }
      }
    )      
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.link)
  );
});  