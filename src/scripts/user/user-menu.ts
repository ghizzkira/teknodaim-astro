document.addEventListener("DOMContentLoaded", async () => {
  let session
  await fetch("/api/auth/session")
    .then((response) => response.json())
    .then((data) => {
      if (data?.user) {
        session = data
      } else {
        session = null
      }
    })
  const userMenuWrapper = document.getElementById("user-menu-wrapper")

  const popoverTrigger = document.createElement("button")
  popoverTrigger.id = "popoverTrigger"
  popoverTrigger.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-label="Profile" class="h-[19px] w-[19px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" d="M0 0h24v24H0z"></path>
  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
</svg>`
  popoverTrigger.setAttribute("popovertarget", "mypopover")

  popoverTrigger.setAttribute("popovertargetaction", "toggle")
  popoverTrigger.style.cursor = "pointer"

  const popoverContent = document.createElement("div")
  popoverContent.id = "mypopover"
  popoverContent.setAttribute("popover", "")
  popoverContent.style.inset = "unset"
  popoverContent.style.top = "60px"
  popoverContent.style.right = "10px"
  const profileLink = document.createElement("a")
  profileLink.id = "profileLink"
  profileLink.href = "#"
  profileLink.textContent = "Profile"
  profileLink.className = "popover-link"

  const settingLink = document.createElement("a")
  settingLink.id = "settingLink"
  settingLink.href = "#"
  settingLink.textContent = "Setting"
  settingLink.className = "popover-link"

  const dashboardLink = document.createElement("a")
  dashboardLink.id = "dashboardLink"
  dashboardLink.href = "#"
  dashboardLink.style.display = "none"
  dashboardLink.textContent = "Dashboard"
  dashboardLink.className = "popover-link"

  const logoutButton = document.createElement("button")
  logoutButton.id = "logoutButton"
  logoutButton.style.display = "none"
  logoutButton.textContent = "Logout"
  logoutButton.className = "popover-link"
  const popoverContentContainer = document.createElement("div")
  popoverContentContainer.className =
    "flex items-center gap-2 flex-col shadow-md p-4 rounded-md"
  // Menambahkan elemen ke popoverContent
  popoverContentContainer.appendChild(profileLink)
  popoverContentContainer.appendChild(settingLink)
  popoverContentContainer.appendChild(dashboardLink)
  popoverContentContainer.appendChild(logoutButton)
  popoverContent.appendChild(popoverContentContainer)

  if (session && session.user) {
    if (userMenuWrapper) {
      userMenuWrapper.appendChild(popoverTrigger)
      userMenuWrapper.appendChild(popoverContent)
    }
    profileLink.href = "/user/" + session.user.username
    settingLink.href = "/setting/user/profile"
    if (session.user.role.includes("admin" || "author")) {
      dashboardLink.style.display = "block"
      dashboardLink.href = "/dashboard"
    }
    logoutButton.style.display = "block"
    logoutButton.addEventListener("click", async (ev) => {
      await fetch("/api/auth/logout", { method: "POST" })
        .then((response) => {
          if (response.ok) {
            window.location.reload()
            return response.json()
          } else {
            throw new Error("Logout failed")
          }
        })
        .catch((error) => {
          console.error("Logout error:", error)
        })
    })
  } else {
    const authModal = document.createElement("button")
    authModal.id = "authModal"

    authModal.className = "px-4 py-2 bg-primary rounded-md text-white"
    authModal.textContent = "Login"
    if (userMenuWrapper) {
      userMenuWrapper.innerHTML = `
            <button id="trigger-login" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground list-none overflow-hidden max-md:rounded-full max-md:p-2 max-md:hover:bg-muted/20 md:rounded-md" role="button">
                <div role="button" aria-label="Profile" class="flex lg:hidden">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-label="Profile" class="h-[19px] w-[19px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                </div>
                <div role="button" aria-label="Login" class="hidden items-center bg-main px-3 py-2 font-bold text-white lg:flex">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-label="Login" class="mr-2 h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
                    </svg>
                    <span>Login</span>
                </div>
            </button>
            <dialog id="auth-modal" class="rounded-md bg-background p-3 text-left shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-h-[90vh] sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0"><div class="bottom-[unset] top-[50vh] gap-0 text-center"><div class="flex w-full"><div class="ml-auto h-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"><svg id="trigger-close" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg><span class="sr-only">Close</span></div></div><div class="pointer-events-auto"><h1 class="tracking-tight text-[24px] font-bold">Login</h1><div class="pointer-events-auto relative mt-4 w-full text-center"><div class="overflow-auto"><p>Welcome, Use your Google account to login.</p><div class="mt-4 flex items-center justify-center"><a href="/auth/login/google" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"><svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" class="mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>Login with Google</a></div></div></div></div></div></dialog>
        `
      const triggerLogin = document.getElementById("trigger-login")
      const modalEl = document.getElementById("auth-modal")
      const triggerCloseModal = document.getElementById("trigger-close")
      if (triggerLogin) {
        triggerLogin.addEventListener("click", (ev) => {
          if (modalEl) modalEl.showModal()
        })
      }
      if (triggerCloseModal) {
        triggerCloseModal.addEventListener("click", () => {
          if (modalEl) modalEl.close()
        })
      }
    }
  }
})
