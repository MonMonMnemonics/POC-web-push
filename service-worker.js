self.addEventListener("push", (event) => {
    const payload = event.data?.text() ?? "no payload";
    event.waitUntil(
      self.registration.showNotification("ServiceWorker TEST", {
        body: payload,
      })
    );
  });