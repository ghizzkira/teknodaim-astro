document.addEventListener("DOMContentLoaded", function () {
  const queryInput = document.getElementById("query")
  const queryError = document.getElementById("queryError")
  const queryList = document.getElementById("queryList")
  const submitButton = document.getElementById("submitButton")

  let stringArray = settings?.queries ? settings.queries : []
  updateQueryList()

  function updateQueryList() {
    queryList.innerHTML = ""
    stringArray.forEach((item, index) => {
      const li = document.createElement("li")
      li.className = "items-center flex"
      li.innerHTML = `
                  ${item}
                  <span class="ml-1 flex items-center" aria-label="Delete Query">
                      <button class="w-4 w-4 deleteButton" data-index="${index}">
                          <svg class="deleteIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path d="M0 0h24v24H0z" fill="none"/>
                              <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59L5 6.41l5.59 5.59-5.59 5.59L6.41 19l5.59-5.59 5.59 5.59L19 17.59l-5.59-5.59L19 6.41z"/>
                          </svg>
                      </button>
                  </span>
              `
      queryList.appendChild(li)
    })
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault()
      const inputValue = queryInput.value.trim()
      if (inputValue.length > 1) {
        stringArray.push(inputValue)
        updateQueryList()
        queryInput.value = ""
        queryError.style.display = "none"
      } else {
        queryError.style.display = "block"
      }
    }
  }

  function handleDeleteClick(event) {
    const button = event.target.closest("button.deleteButton")
    if (button) {
      const index = parseInt(button.getAttribute("data-index"))
      stringArray.splice(index, 1)
      updateQueryList()
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (stringArray.length === 0) {
      queryError.style.display = "block"
    } else {
      const data = {
        key: "filter_post",
        value: JSON.stringify({ queries: stringArray }),
      }

      fetch("/api/setting/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          document.dispatchEvent(
            new CustomEvent("showNotification", {
              detail: {
                message: "somthing error went updating filter post",
                type: "warning",
              },
            }),
          )
          throw new Error("Network response was not ok.")
        })
        .then((data) => {
          document.dispatchEvent(
            new CustomEvent("showNotification", {
              detail: {
                message: "Filter post has been updated",
                type: "success",
              },
            }),
          )
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error)
          document.dispatchEvent(
            new CustomEvent("showNotification", {
              detail: {
                message: "There was a problem with the fetch operation",
                type: "warning",
              },
            }),
          )
        })
    }
  }

  queryInput.addEventListener("keydown", handleKeyDown)
  queryList.addEventListener("click", handleDeleteClick)
  submitButton.addEventListener("click", handleSubmit)
})
