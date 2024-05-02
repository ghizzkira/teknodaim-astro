export function showToast(type: string, message: string) {
  // Membuat event baru
  const event = new CustomEvent("show-toast", {
    detail: {
      type: type,
      message: message,
    },
  })

  // Mengirim event
  window.dispatchEvent(event)
}
