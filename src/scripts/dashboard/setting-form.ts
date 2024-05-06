const formSettingEl = document.getElementById("form-settings")

if (formSettingEl) {
  let inputs = formSettingEl.querySelectorAll("input, textarea")

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (input.type === "email" && input.validity.typeMismatch) {
        input.setCustomValidity("Harap masukkan alamat email yang valid.")
      } else if (input.name === "whatsappNumber" && !input.validity.valid) {
        input.setCustomValidity("Harap masukkan nomor telepon yang valid.")
      } else if (
        [
          "facebookUsername",
          "twitterUsername",
          "instagramUsername",
          "tiktokUsername",
          "pinterestUsername",
        ].includes(input.name) &&
        input.validity.patternMismatch
      ) {
        input.setCustomValidity("Harap masukkan username yang valid.")
      } else if (
        ["whatsappChannel", "youtubeChannel"].includes(input.name) &&
        input.validity.patternMismatch
      ) {
        input.setCustomValidity("Harap masukkan nama channel yang valid.")
      } else {
        input.setCustomValidity("")
      }
      input.reportValidity()
    })
  })
  formSettingEl.addEventListener("submit", async function (event) {
    event.preventDefault()
    if (!formSettingEl.checkValidity()) {
      formSettingEl.reportValidity()
      return
    }
    let formData = new FormData(formSettingEl)
    let settings = Object.fromEntries(formData.entries())

    const keyValues = {
      key: "settings",
      value: JSON.stringify({ ...settings }),
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
              },
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
