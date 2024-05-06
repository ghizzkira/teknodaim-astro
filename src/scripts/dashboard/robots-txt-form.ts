const formRobotsEl = document.getElementById("form-robots-txt")

if (formRobotsEl) {
  formRobotsEl.addEventListener("submit", async function (event) {
    event.preventDefault()

    const robotsTxt = document.getElementById("robots_txt").value

    const keyValues = {
      key: "robots_txt",
      value: JSON.stringify({ robots_txt: robotsTxt }),
    }
    await fetch("/api/setting/upsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyValues),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          document.dispatchEvent(
            new CustomEvent("showNotification", {
              detail: {
                message: "somthing error went updating robots.txt",
                type: "warning",
              },
            }),
          )
        } else {
          document.dispatchEvent(
            new CustomEvent("showNotification", {
              detail: {
                message: "robots.txt has been updated",
                type: "success",
              }, // success, warning, danger
            }),
          )
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        document.dispatchEvent(
          new CustomEvent("showNotification", {
            detail: {
              message: "something error went updating robots.txt",
              type: "warning",
            },
          }),
        )
      })
  })
}
