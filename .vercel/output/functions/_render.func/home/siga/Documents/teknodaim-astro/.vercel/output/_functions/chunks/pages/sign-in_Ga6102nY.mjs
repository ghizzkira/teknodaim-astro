import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, k as renderComponent, u as unescapeHTML, n as Fragment, o as defineScriptVars, l as renderSlot, s as spreadAttributes, i as addAttribute } from '../astro_DaTDU6UM.mjs';
import { g as getSession, a as authConfig } from './__MLL9IRBw.mjs';
import 'clsx';
import { c as cn, b as buttonVariants, I as Icon, L as Logo, B as Button } from './index_DtbYcEGt.mjs';
/* empty css                          */

const $$Astro$3 = createAstro();
const $$Auth = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Auth;
  const { authConfig: authConfig$1 = authConfig } = Astro2.props;
  let session = await getSession(Astro2.request, authConfig$1);
  return renderTemplate`${maybeRenderHead()}<div> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(Astro2.slots.render("default", [session]))}` })} </div>`;
}, "/home/siga/Documents/teknodaim-astro/node_modules/.pnpm/auth-astro@4.1.1_@auth+core@0.18.6_astro@4.6.1_next@14.2.1_react-dom@18.2.0_react@18.2.0/node_modules/auth-astro/src/components/Auth.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro();
const $$SignIn$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SignIn$1;
  const key = Math.random().toString(36).slice(2, 11);
  const { provider, options, authParams, ...attrs } = Astro2.props;
  attrs.class = `signin-${key} ${attrs.class ?? ""}`;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", "<button", "> ", " </button>  <script>(function(){", "\n	document\n		.querySelector(`.signin-${key}`)\n		?.addEventListener('click', () => signIn(provider, options, authParams))\n})();<\/script>"], ["", "<button", "> ", " </button>  <script>(function(){", "\n	document\n		.querySelector(\\`.signin-\\${key}\\`)\n		?.addEventListener('click', () => signIn(provider, options, authParams))\n})();<\/script>"])), maybeRenderHead(), spreadAttributes(attrs), renderSlot($$result, $$slots["default"]), defineScriptVars({ provider, options, authParams, key }));
}, "/home/siga/Documents/teknodaim-astro/node_modules/.pnpm/auth-astro@4.1.1_@auth+core@0.18.6_astro@4.6.1_next@14.2.1_react-dom@18.2.0_react@18.2.0/node_modules/auth-astro/src/components/SignIn.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$SignOut = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SignOut;
  const key = Math.random().toString(36).slice(2, 11);
  const { params, ...attrs } = Astro2.props;
  attrs.class = `signout-${key} ${attrs.class ?? ""}`;
  return renderTemplate(_a || (_a = __template(["", "<button", "> ", " </button>  <script>(function(){", "\n	document.querySelector(`.signout-${key}`)?.addEventListener('click', () => signOut(params))\n})();<\/script>"], ["", "<button", "> ", " </button>  <script>(function(){", "\n	document.querySelector(\\`.signout-\\${key}\\`)?.addEventListener('click', () => signOut(params))\n})();<\/script>"])), maybeRenderHead(), spreadAttributes(attrs), renderSlot($$result, $$slots["default"]), defineScriptVars({ params, key }));
}, "/home/siga/Documents/teknodaim-astro/node_modules/.pnpm/auth-astro@4.1.1_@auth+core@0.18.6_astro@4.6.1_next@14.2.1_react-dom@18.2.0_react@18.2.0/node_modules/auth-astro/src/components/SignOut.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$SignIn = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SignIn;
  const session = await getSession(Astro2.request);
  if (session) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${maybeRenderHead()}<div class="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-r from-main/30 to-main/70 px-4 md:px-10 xl:px-20"> <div class="absolute top-4 flex w-full justify-between px-4 md:top-8 md:px-10 xl:px-20"> <a aria-label="Back to Home" href="/"${addAttribute(cn(buttonVariants({ variant: "ghost" }), "bg-background"), "class")}> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon.ChevronLeft", Icon.ChevronLeft, { "aria-label": "Back to Home", "class": "mr-2 h-4 w-4" })}
Back to Home
` })} </a> <!-- <LanguageSwitcher /> --> </div> <div class="mx-auto flex w-full flex-col justify-center space-y-6 rounded-lg bg-background p-5 shadow-md sm:w-[350px] md:ml-0 md:mr-auto md:p-10"> <a aria-label="Back to Home" href="/" class="block self-center"> ${renderComponent($$result, "Logo", Logo, {})} </a> <div class="flex flex-col space-y-2 text-center"> <h1 class="text-3xl font-bold">Welcome back</h1> </div> ${renderComponent($$result, "Button", Button, { "asChild": true, "variant": "outline" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SignIn", $$SignIn$1, { "provider": "google", "class": cn(
    buttonVariants({ variant: "outline" }),
    "outline-none p-2 rounded-md font-500 w-full bg-dark"
  ) }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon.GoogleColored", Icon.GoogleColored, { "className": "mr-3" })}
Login with Google
` })} ` })} </div> </div>`;
}, "/home/siga/Documents/teknodaim-astro/src/pages/auth/sign-in.astro", void 0);

const $$file = "/home/siga/Documents/teknodaim-astro/src/pages/auth/sign-in.astro";
const $$url = "/auth/sign-in";

export { $$SignIn as default, $$file as file, prerender, $$url as url };
