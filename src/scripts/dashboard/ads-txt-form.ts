const formAdsEl = document.getElementById("form-ads-txt")

if (formAdsEl) {
  formAdsEl.addEventListener("submit", async function (event) {
    event.preventDefault()

    const adsTxt = document.getElementById("ads_txt").value

    const keyValues = {
      key: "ads_txt",
      value: JSON.stringify({ ads_txt: adsTxt }),
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
                message: "somthing error went updating ads.txt",
                type: "warning",
              },
            }),
          )
        } else {
          document.dispatchEvent(
            new CustomEvent("showNotification", {
              detail: {
                message: "ads.txt has been updated",
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
              message: "something error went updating ads.txt",
              type: "warning",
            },
          }),
        )
      })
  })
}
