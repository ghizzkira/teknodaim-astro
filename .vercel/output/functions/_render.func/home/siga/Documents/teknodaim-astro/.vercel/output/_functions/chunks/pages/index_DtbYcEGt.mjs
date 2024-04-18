import { e as createAstro, f as createComponent, r as renderTemplate, j as renderHead, k as renderComponent, l as renderSlot, i as addAttribute, m as maybeRenderHead } from '../astro_DaTDU6UM.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import React__default from 'react';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import { FacebookEmbed, XEmbed } from 'react-social-media-embed';
/* empty css                          */
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BiCheckSquare, BiChevronsLeft, BiChevronsRight, BiListOl, BiMovie, BiNews, BiStar, BiTrophy, BiTv } from 'react-icons/bi';
import { FaAndroid, FaApple, FaAppleAlt, FaCoffee, FaEnvelope, FaFacebook, FaStarHalfAlt, FaInstagram, FaLinkedinIn, FaLinux, FaPinterestP, FaPlaystation, FaPlusSquare, FaRedditAlien, FaTelegramPlane, FaTiktok, FaXbox, FaWhatsapp, FaWindows, FaYoutube } from 'react-icons/fa';
import { FaBolt, FaXTwitter } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { ImBook } from 'react-icons/im';
import { IoGameController } from 'react-icons/io5';
import { LuChevronDown, LuCircle, LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuLoader2, LuText, LuTrash } from 'react-icons/lu';
import { MdAccessTime, MdAccountCircle, MdOutlineAdd, MdOutlineAdsClick, MdAnalytics, MdOutlineArrowBack, MdOutlineArrowDownward, MdOutlineArrowUpward, MdOutlineArrowForward, MdOutlineArticle, MdOutlineBalance, MdOutlineBrokenImage, MdOutlineCalendarMonth, MdCategory, MdOutlineCheck, MdChevronLeft, MdChevronRight, MdClose, MdCode, MdOutlineComment, MdContentCopy, MdOutlineCreditCard, MdCurrencyExchange, MdDarkMode, MdDashboard, MdDeveloperBoard, MdDiamond, MdDiscount, MdDownload, MdOutlineDelete, MdOutlineEditNote, MdOutlineEdit, MdFolder, MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatQuote, MdFormatStrikethrough, MdFormatUnderlined, MdHelpOutline, MdOutlineHome, MdHorizontalRule, MdImage, MdOutlineKeyboardArrowDown, MdLightMode, MdOutlineLink, MdLocationOn, MdLock, MdLogin, MdLogout, MdOutlinePermMedia, MdOutlineMenu, MdOutlineMoreVert, MdOutlineMoreHoriz, MdPerson, MdOutlineRefresh, MdOutlineSave, MdOutlineSettings, MdOutlineSearch, MdStore, MdAddShoppingCart, MdSmartphone, MdOutlineTableChart, MdOutlineTopic, MdTrendingUp, MdUpdate, MdOutlineFileUpload, MdSupervisedUserCircle, MdOutlineViewSidebar, MdOutlineVisibility, MdOutlineVisibilityOff, MdVpnKey } from 'react-icons/md';
import { SiNintendoswitch } from 'react-icons/si';
import dayjs from 'dayjs';
import 'dayjs/plugin/localizedFormat.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
/* empty css                          */

const Logo = () => {
  return /* @__PURE__ */ jsx("span", { className: "relative inline-block h-[23px] w-[120px]", children: /* @__PURE__ */ jsx(
    "img",
    {
      loading: "eager",
      sizes: "(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw",
      alt: "Teknodaim",
      src: "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp"
    }
  ) });
};

const IndonesiaFlag = (props) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      zoomAndPan: "magnify",
      viewBox: "0 0 30 30.000001",
      preserveAspectRatio: "xMidYMid meet",
      version: "1.0",
      children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsx("clipPath", { id: "id1", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M 2.128906 5.222656 L 27.53125 5.222656 L 27.53125 15 L 2.128906 15 Z M 2.128906 5.222656 ",
              clipRule: "nonzero"
            }
          ) }),
          /* @__PURE__ */ jsx("clipPath", { id: "id2", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M 2.128906 14 L 27.53125 14 L 27.53125 23.371094 L 2.128906 23.371094 Z M 2.128906 14 ",
              clipRule: "nonzero"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#id1)", children: /* @__PURE__ */ jsx(
          "path",
          {
            fill: "rgb(86.268616%, 12.159729%, 14.898682%)",
            d: "M 24.703125 5.222656 L 4.957031 5.222656 C 3.398438 5.222656 2.132812 6.472656 2.132812 8.015625 L 2.132812 14.296875 L 27.523438 14.296875 L 27.523438 8.015625 C 27.523438 6.472656 26.261719 5.222656 24.703125 5.222656 Z M 24.703125 5.222656 ",
            fillOpacity: "1",
            fillRule: "nonzero"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#id2)", children: /* @__PURE__ */ jsx(
          "path",
          {
            fill: "rgb(93.328857%, 93.328857%, 93.328857%)",
            d: "M 27.523438 20.578125 C 27.523438 22.121094 26.261719 23.371094 24.703125 23.371094 L 4.957031 23.371094 C 3.398438 23.371094 2.132812 22.121094 2.132812 20.578125 L 2.132812 14.296875 L 27.523438 14.296875 Z M 27.523438 20.578125 ",
            fillOpacity: "1",
            fillRule: "nonzero"
          }
        ) })
      ]
    }
  );
};
const USAFlag = (props) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "svg",
    {
      ...props,
      id: "Layer_1",
      version: "1.1",
      viewBox: "0 0 55.2 38.4",
      x: "0px",
      xmlSpace: "preserve",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      y: "0px",
      children: /* @__PURE__ */ jsxs(
        "g",
        {
          style: {
            border: "0px solid rgb(229, 231, 235)",
            boxSizing: "border-box",
            borderColor: "hsl(214.3 31.8% 91.4%)"
          },
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "st0",
                d: "M3.03,0h49.13c1.67,0,3.03,1.36,3.03,3.03v32.33c0,1.67-1.36,3.03-3.03,3.03H3.03C1.36,38.4,0,37.04,0,35.37 V3.03C0,1.36,1.36,0,3.03,0L3.03,0z",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(178, 34, 52)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "st1",
                d: "M0.02,2.73h55.17c0.01,0.1,0.02,0.2,0.02,0.31v2.94H0V3.03C0,2.93,0.01,2.83,0.02,2.73L0.02,2.73z M55.2,8.67 v3.24H0V8.67H55.2L55.2,8.67z M55.2,14.61v3.24H0v-3.24H55.2L55.2,14.61z M55.2,20.55v3.24H0v-3.24H55.2L55.2,20.55z M55.2,26.49 v3.24H0v-3.24H55.2L55.2,26.49z M55.2,32.43v2.93c0,0.1-0.01,0.21-0.02,0.31H0.02C0.01,35.58,0,35.47,0,35.37v-2.93H55.2 L55.2,32.43z",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "st2",
                d: "M20.8,0v20.68H0V3.03C0,1.36,1.36,0,3.03,0H20.8L20.8,0L20.8,0z",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(60, 59, 110)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "1.23,2.86 1.92,5.01 0.1,3.68 2.36,3.68 0.53,5.01 1.23,2.86",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "1.23,7.02 1.92,9.17 0.1,7.84 2.36,7.84 0.53,9.17 1.23,7.02",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "1.23,11.18 1.92,13.33 0.1,12 2.36,12 0.53,13.33 1.23,11.18",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "1.23,15.34 1.92,17.49 0.1,16.16 2.36,16.16 0.53,17.49 1.23,15.34",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "3.67,0.78 4.37,2.93 2.54,1.6 4.81,1.6 2.97,2.93 3.67,0.78",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "3.67,4.94 4.37,7.09 2.54,5.76 4.81,5.76 2.97,7.09 3.67,4.94",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "3.67,9.1 4.37,11.25 2.54,9.92 4.81,9.92 2.97,11.25 3.67,9.1",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "3.67,13.26 4.37,15.41 2.54,14.08 4.81,14.08 2.97,15.41 3.67,13.26",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "3.67,17.42 4.37,19.57 2.54,18.24 4.81,18.24 2.97,19.57 3.67,17.42",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "6.12,2.86 6.82,5.01 4.99,3.68 7.25,3.68 5.42,5.01 6.12,2.86",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "6.12,7.02 6.82,9.17 4.99,7.84 7.25,7.84 5.42,9.17 6.12,7.02",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "6.12,11.18 6.82,13.33 4.99,12 7.25,12 5.42,13.33 6.12,11.18",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "6.12,15.34 6.82,17.49 4.99,16.16 7.25,16.16 5.42,17.49 6.12,15.34",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "8.57,0.78 9.26,2.93 7.44,1.6 9.7,1.6 7.87,2.93 8.57,0.78",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "8.57,4.94 9.26,7.09 7.44,5.76 9.7,5.76 7.87,7.09 8.57,4.94",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "8.57,9.1 9.26,11.25 7.44,9.92 9.7,9.92 7.87,11.25 8.57,9.1",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "8.57,13.26 9.26,15.41 7.44,14.08 9.7,14.08 7.87,15.41 8.57,13.26",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "8.57,17.42 9.26,19.57 7.44,18.24 9.7,18.24 7.87,19.57 8.57,17.42",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "11.01,2.86 11.71,5.01 9.88,3.68 12.14,3.68 10.31,5.01 11.01,2.86",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "11.01,7.02 11.71,9.17 9.88,7.84 12.14,7.84 10.31,9.17 11.01,7.02",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "11.01,11.18 11.71,13.33 9.88,12 12.14,12 10.31,13.33 11.01,11.18",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "11.01,15.34 11.71,17.49 9.88,16.16 12.14,16.16 10.31,17.49 11.01,15.34",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "13.46,0.78 14.16,2.93 12.33,1.6 14.59,1.6 12.76,2.93 13.46,0.78",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "13.46,4.94 14.16,7.09 12.33,5.76 14.59,5.76 12.76,7.09 13.46,4.94",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "13.46,9.1 14.16,11.25 12.33,9.92 14.59,9.92 12.76,11.25 13.46,9.1",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "13.46,13.26 14.16,15.41 12.33,14.08 14.59,14.08 12.76,15.41 13.46,13.26",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "13.46,17.42 14.16,19.57 12.33,18.24 14.59,18.24 12.76,19.57 13.46,17.42",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "15.9,2.86 16.6,5.01 14.77,3.68 17.03,3.68 15.21,5.01 15.9,2.86",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "15.9,7.02 16.6,9.17 14.77,7.84 17.03,7.84 15.21,9.17 15.9,7.02",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "15.9,11.18 16.6,13.33 14.77,12 17.03,12 15.21,13.33 15.9,11.18",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "15.9,15.34 16.6,17.49 14.77,16.16 17.03,16.16 15.21,17.49 15.9,15.34",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "18.35,0.78 19.05,2.93 17.22,1.6 19.48,1.6 17.65,2.93 18.35,0.78",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "18.35,4.94 19.05,7.09 17.22,5.76 19.48,5.76 17.65,7.09 18.35,4.94",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "18.35,9.1 19.05,11.25 17.22,9.92 19.48,9.92 17.65,11.25 18.35,9.1",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "18.35,13.26 19.05,15.41 17.22,14.08 19.48,14.08 17.65,15.41 18.35,13.26",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                className: "st1",
                points: "18.35,17.42 19.05,19.57 17.22,18.24 19.48,18.24 17.65,19.57 18.35,17.42",
                style: {
                  border: "0px solid rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  borderColor: "hsl(214.3 31.8% 91.4%)",
                  fill: "rgb(255, 255, 255)"
                }
              }
            )
          ]
        }
      )
    }
  ) });
};

const LampIcon = (props) => {
  const { className } = props;
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      "aria-hidden": "true",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          clipRule: "evenodd",
          d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
          fillRule: "evenodd"
        }
      )
    }
  );
};
const VerifiedIcon = (props) => {
  const { className } = props;
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      "aria-hidden": "true",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx("path", { d: "M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z" })
    }
  );
};

const Icon = {
  AccessTime: MdAccessTime,
  Account: MdAccountCircle,
  Add: MdOutlineAdd,
  Ads: MdOutlineAdsClick,
  Analytics: MdAnalytics,
  Android: FaAndroid,
  Apple: FaApple,
  AppleAlt: FaAppleAlt,
  ArrowBack: MdOutlineArrowBack,
  ArrowDown: MdOutlineArrowDownward,
  ArrowUp: MdOutlineArrowUpward,
  ArrowForward: MdOutlineArrowForward,
  Article: MdOutlineArticle,
  Balance: MdOutlineBalance,
  Book: ImBook,
  Bolt: FaBolt,
  BrokenImage: MdOutlineBrokenImage,
  Calendar: MdOutlineCalendarMonth,
  Category: MdCategory,
  Check: MdOutlineCheck,
  CheckSquare: BiCheckSquare,
  ChevronLeft: MdChevronLeft,
  ChevronsLeft: BiChevronsLeft,
  ChevronRight: MdChevronRight,
  ChevronsRight: BiChevronsRight,
  ChevronDown: LuChevronDown,
  Circle: LuCircle,
  Close: MdClose,
  Code: MdCode,
  Coffe: FaCoffee,
  Comment: MdOutlineComment,
  Copy: MdContentCopy,
  CreditCard: MdOutlineCreditCard,
  Currency: MdCurrencyExchange,
  Dark: MdDarkMode,
  Dashboard: MdDashboard,
  Developer: MdDeveloperBoard,
  Diamond: MdDiamond,
  Discount: MdDiscount,
  Download: MdDownload,
  Delete: MdOutlineDelete,
  EditNote: MdOutlineEditNote,
  Edit: MdOutlineEdit,
  Email: FaEnvelope,
  USAFlag,
  Facebook: FaFacebook,
  Folder: MdFolder,
  FormatBold: MdFormatBold,
  FormatItalic: MdFormatItalic,
  FormatListBulleted: MdFormatListBulleted,
  FormatListNumbered: MdFormatListNumbered,
  FormatQuote: MdFormatQuote,
  FormatStrikethrough: MdFormatStrikethrough,
  FormatUnderlined: MdFormatUnderlined,
  Game: IoGameController,
  GoogleColored: FcGoogle,
  HalfStar: FaStarHalfAlt,
  H1: LuHeading1,
  H2: LuHeading2,
  H3: LuHeading3,
  H4: LuHeading4,
  H5: LuHeading5,
  Help: MdHelpOutline,
  Home: MdOutlineHome,
  HorizontalRule: MdHorizontalRule,
  Image: MdImage,
  IndonesiaFlag,
  Instagram: FaInstagram,
  KeyboardArrowDown: MdOutlineKeyboardArrowDown,
  Lamp: LampIcon,
  Light: MdLightMode,
  Link: MdOutlineLink,
  Linkedin: FaLinkedinIn,
  Linux: FaLinux,
  ListOl: BiListOl,
  Location: MdLocationOn,
  Lock: MdLock,
  Login: MdLogin,
  Logout: MdLogout,
  Media: MdOutlinePermMedia,
  Menu: MdOutlineMenu,
  MoreVert: MdOutlineMoreVert,
  MoreHorizontal: MdOutlineMoreHoriz,
  Moon: MdDarkMode,
  Movie: BiMovie,
  News: BiNews,
  NintendoSwitch: SiNintendoswitch,
  Person: MdPerson,
  Pinterest: FaPinterestP,
  PlayStation: FaPlaystation,
  PlusSquare: FaPlusSquare,
  Reddit: FaRedditAlien,
  Refresh: MdOutlineRefresh,
  Save: MdOutlineSave,
  Settings: MdOutlineSettings,
  Search: MdOutlineSearch,
  Shop: MdStore,
  ShoppingCart: MdAddShoppingCart,
  SignIn: MdLogin,
  SignOut: MdLogout,
  Spinner: LuLoader2,
  Smartphone: MdSmartphone,
  Star: BiStar,
  Sun: MdLightMode,
  Table: MdOutlineTableChart,
  Telegram: FaTelegramPlane,
  Text: LuText,
  Tiktok: FaTiktok,
  Topic: MdOutlineTopic,
  Trash: LuTrash,
  Trending: MdTrendingUp,
  Trophy: BiTrophy,
  TV: BiTv,
  Twitter: FaXTwitter,
  Update: MdUpdate,
  Upload: MdOutlineFileUpload,
  UploadFile: MdOutlineFileUpload,
  User: MdPerson,
  Users: MdSupervisedUserCircle,
  Verified: VerifiedIcon,
  ViewSidebar: MdOutlineViewSidebar,
  Visibility: MdOutlineVisibility,
  VisibilityOff: MdOutlineVisibilityOff,
  VpnKey: MdVpnKey,
  Xbox: FaXbox,
  WhatsApp: FaWhatsapp,
  Windows: FaWindows,
  Youtube: FaYoutube
};

function cn(...props) {
  return twMerge(clsx(props));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        danger: "bg-danger text-danger-foreground hover:bg-danger/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  (props, ref) => {
    const {
      children,
      className,
      variant,
      loading = false,
      size,
      asChild = false,
      ...rest
    } = props;
    const Comp = asChild ? Slot : "button";
    if (loading) {
      return /* @__PURE__ */ jsxs(
        Comp,
        {
          className: cn(buttonVariants({ variant, size, className })),
          disabled: true,
          ref,
          ...rest,
          children: [
            /* @__PURE__ */ jsx(Icon.Spinner, { className: "mr-2 h-4 w-4" }),
            children
          ]
        }
      );
    } else {
      return /* @__PURE__ */ jsx(
        Comp,
        {
          className: cn(buttonVariants({ variant, size, className })),
          ref,
          ...rest,
          children
        }
      );
    }
  }
);

const FacebookEmbedWrapper = FacebookEmbed;

const TwitterEmbed = ({ children }) => {
  const regex = /^https?:\/\/twitter\.com\/\w+\/status\/(\d+).*$/;
  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child?.props?.href?.match(regex)) {
      const { href } = child.props;
      const match = href.match(regex);
      if (match?.[1]) {
        return /* @__PURE__ */ jsx("span", { className: "flex justify-center", children: /* @__PURE__ */ jsx(XEmbed, { url: href }) });
      }
      return;
    }
    return;
  });
  return /* @__PURE__ */ jsx(Fragment, { children: modifiedChildren });
};
const TwitterEmbedFromTipTap = (props) => {
  const { tweetUrl } = props;
  const regex = /^https?:\/\/twitter\.com\/\w+\/status\/(\d+).*$/;
  const match = tweetUrl?.match(regex);
  if (match) {
    return /* @__PURE__ */ jsx("span", { className: "flex justify-center", children: /* @__PURE__ */ jsx(XEmbed, { url: tweetUrl }) });
  }
  return;
};

const YoutubeEmbed = LiteYouTubeEmbed;

const htmlToReactParser = Parser();
const processNodeDefinitions = ProcessNodeDefinitions();
const ParseContent = (props) => {
  const { htmlInput, title } = props;
  const processingInstructions = [
    {
      shouldProcessNode: function(node) {
        return node.name && node.name === "a";
      },
      processNode: function(node, children, index) {
        const regexId = new RegExp(Object.assign({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, {})?.NEXT_PUBLIC_WP_DOMAIN ?? "");
        const regexEn = new RegExp(
          Object.assign({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, {})?.NEXT_PUBLIC_WP_EN_SUBDOMAIN ?? ""
        );
        return /* @__PURE__ */ jsx(
          "a",
          {
            href: node.attribs?.href?.replace(regexId, Object.assign({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, {})?.NEXT_PUBLIC_DOMAIN ?? "")?.replace(
              regexEn,
              Object.assign({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, {})?.NEXT_PUBLIC_EN_SUBDOMAIN ?? ""
            ) ?? "#",
            children
          },
          index + title + "a"
        );
      }
    },
    {
      shouldProcessNode: function(node) {
        return node.name && node.name === "img";
      },
      processNode: function(node, index) {
        const str = node.attribs?.style;
        const regex = /width: (\d+px);|width:(\d+px);/;
        const match = str?.match(regex);
        if (node?.attribs?.height && node?.attribs?.width) {
          return /* @__PURE__ */ jsx("span", { className: "relative block w-full", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: cn(
                node.attribs?.class,
                match?.[1] ? `!w-[${match[1]}]` : "!w-full"
              ),
              src: node.attribs?.src ?? "",
              alt: title,
              style: match?.[1] ? { width: `${match[1]}` } : void 0,
              width: node.attribs?.width ? parseInt(node.attribs?.width) : 300,
              height: node.attribs?.height ? parseInt(node.attribs?.height) : 300,
              sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 600px"
            }
          ) }, index + title + "img");
        }
        return /* @__PURE__ */ jsx("span", { className: "relative block w-full", children: /* @__PURE__ */ jsx(
          "img",
          {
            className: cn(node.attribs?.class, "!w-full"),
            src: node.attribs?.src ?? "",
            alt: title,
            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
          }
        ) }, index + title + "img");
      }
    },
    {
      shouldProcessNode: function(node) {
        return node.name && node.name === "iframe";
      },
      processNode: function(node, index) {
        if (node.attribs) {
          node.attribs.style = void 0;
        }
        if (node.attribs?.src?.includes("youtube.com/embed")) {
          const arr = node.attribs?.src?.split(
            /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm
          );
          return /* @__PURE__ */ jsx(
            YoutubeEmbed,
            {
              title: node.attribs?.title ?? title,
              id: arr[3] ?? arr[0],
              wrapperClass: "yt-lite"
            },
            index + title + "iframe"
          );
        }
        return /* @__PURE__ */ jsx(
          "iframe",
          {
            title,
            ...node.attribs
          },
          index + title + "iframe"
        );
      }
    },
    {
      shouldProcessNode: function(node) {
        return node.name && node.name === "react-x-twitter";
      },
      processNode: function(node) {
        return /* @__PURE__ */ jsx(TwitterEmbedFromTipTap, { tweetUrl: node.attribs?.tweeturl });
      }
    },
    {
      shouldProcessNode: function(node) {
        return node.name && node.name === "react-facebook";
      },
      processNode: function(node) {
        return /* @__PURE__ */ jsx(
          FacebookEmbedWrapper,
          {
            placeholderDisabled: true,
            url: node.attribs?.facebookurl
          }
        );
      }
    },
    {
      shouldProcessNode: function(node) {
        return node.name && node.name === "react-button";
      },
      processNode: function(node, children) {
        return /* @__PURE__ */ jsx(Button, { type: "button", variant: node.attribs?.variant, children });
      }
    },
    {
      shouldProcessNode: function(node) {
        return node.name && node.name === "blockquote";
      },
      processNode: function(node, children, index) {
        if (node.attribs) {
          node.attribs.style = void 0;
        }
        if (node.attribs?.class?.includes("twitter-tweet")) {
          return /* @__PURE__ */ jsx(TwitterEmbed, { children }, index + title + "blockquote");
        }
        return /* @__PURE__ */ jsx(
          "blockquote",
          {
            style: { width: "auto", margin: "auto" },
            className: node.attribs?.class,
            children
          },
          index + title + "blockquote"
        );
      }
    },
    // {
    //   shouldProcessNode: function (node: Node) {
    //     return node.name && node.name === "script"
    //   },
    //   processNode: function (node: Node, index: number) {
    //     if (node.attribs) {
    //       node.attribs.style = undefined
    //     }
    //     return <Script key={index + title + "script"} {...node.attribs} />
    //   },
    // },
    {
      shouldProcessNode: function() {
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode
    }
  ];
  return htmlToReactParser.parseWithInstructions(
    htmlInput,
    () => true,
    processingInstructions
  );
};

const Skeleton = (props) => {
  const { className, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...rest
    }
  );
};

const PlaceholderPostCard = () => {
  return /* @__PURE__ */ jsx("div", { className: "mb-[30px] flex grow border-separate flex-row rounded-lg lg:flex-col", children: /* @__PURE__ */ jsxs("div", { className: "relative flex w-full flex-row justify-between lg:justify-start", children: [
    /* @__PURE__ */ jsx("div", { className: "order-2 md:order-1", children: /* @__PURE__ */ jsx(Skeleton, { className: "relative aspect-[4/3] h-auto w-[125px] md:w-[220px] lg:w-[270px]" }) }),
    /* @__PURE__ */ jsxs("div", { className: "order-1 mr-3 flex w-[calc(100%-125px)] flex-col md:order-2 md:ml-[30px] md:mr-[unset] md:w-[calc(100%-220px)] lg:w-[calc(100%-270px)]", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "mb-4 h-[40px] w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-[20px] w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-[20px] w-full" })
    ] })
  ] }) });
};

const QUERY_WP_ALL_POSTS = `
query AllPosts($language: LanguageCodeFilterEnum = ID) {
  posts(
    first: 10
    where: {language: $language, orderby: {field: DATE, order: DESC}}
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        postId
        title
        slug
        uri
      }
    }
  }
}
`;
const QUERY_WP_ALL_POSTS_LOAD_MORE = `
query AllPosts($after: String, $language: LanguageCodeFilterEnum = ALL) {
  posts(first: 10, after: $after, where: {language: $language}) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        postId
        title
        seo {
          readingTime
          title
          schema {
            raw
          }
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          cornerstone
          focuskw
          opengraphDescription
          opengraphPublishedTime
          opengraphModifiedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
        }
        slug
        uri
      }
    }
  }
}
`;
const QUERY_WP_POST_BY_SLUG = `
query PostBySlug($slug: ID = "") {
  post(idType: SLUG, id: $slug) {
    author {
      node {
        avatar {
          height
          url
          width
        }
        id
        name
        slug
      }
    }
    id
    language {
      slug
    }
    seo {
      readingTime
      title
      schema {
        raw
      }
      metaDesc
      metaKeywords
      metaRobotsNofollow
      metaRobotsNoindex
      opengraphAuthor
      cornerstone
      focuskw
      opengraphDescription
      opengraphPublishedTime
      opengraphModifiedTime
      opengraphPublisher
      opengraphSiteName
      opengraphTitle
      opengraphType
      opengraphUrl
    }
    categories {
      edges {
        node {
          categoryId
          id
          name
          slug
          children {
            nodes {
              id
              slug
              name
            }
          }
          parent {
            node {
              id
            }
          }
        }
      }
    }
    tags {
      edges {
        node {
          tagId
          id
          name
          slug
        }
      }
    }
    content
    date
    excerpt
    featuredImage {
      node {
        altText
        caption
        sourceUrl
        srcSet
        sizes
        id
      }
    }
    modified
    postId
    title
    slug
    uri
    translations {
      id
      language {
        slug
      }
      slug
      categories {
        edges {
          node {
            categoryId
            id
            name
            slug
            children {
              nodes {
                id
                slug
                name
              }
            }
            parent {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
}
`;
const QUERY_WP_POSTS_BY_CATEGORY_ID = `
query PostsByCategoryId($after: String, $categoryId: [ID] = "") {
  posts(
    where: {categoryIn: $categoryId, orderby: {field: DATE, order: DESC}}
    after: $after
    first: 10
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        tags {
          edges {
            node {
              tagId
              id
              name
              slug
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            id
            sizes
            sourceUrl
            srcSet
          }
        }
        modified
        postId
        title
        slug
        uri
      }
    }
  }
}`;
const QUERY_WP_POSTS_BY_CATEGORY_SLUG = `
query PostsByCategoryId($categoryId: String, $after: String, $notIn: [ID] = "") {
  posts(
    where: {categoryName: $categoryId, notIn: $notIn}
    after: $after
    first: 4
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        tags {
          edges {
            node {
              tagId
              id
              name
              slug
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            id
            sizes
            sourceUrl
            srcSet
          }
        }
        modified
        title
        slug
        uri
      }
    }
  }
}
`;
const QUERY_WP_POSTS_BY_TAG_SLUG = `
  query PostsByTagSlug($id: ID!, $after: String ) {
  tag(id:$id,idType: SLUG) {
     posts(after: $after, first: 10) {
       pageInfo {
         endCursor
         hasNextPage
       }
      edges {
        node {
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
              uri
            }
          }
          id
          categories {
            edges {
              node {
                categoryId
                id
                name
                slug
                parent {
                  node {
                    id
                  }
                }
              }
            }
          }
          
          date
          excerpt
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          modified
          postId
          title
          slug
          uri
        }
      }
    }
  }
}
`;
const QUERY_WP_POSTS_BY_TAG_ID = `
query PostsByTagSlug($id: ID!, $after: String) {
  tag(id: $id, idType: ID) {
    posts(after: $after, first: 10, where: {orderby: {field: DATE, order: DESC}}) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
              uri
            }
          }
          id
          categories {
            edges {
              node {
                categoryId
                id
                name
                slug
                parent {
                  node {
                    id
                  }
                }
              }
            }
          }
          date
          excerpt
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          modified
          postId
          title
          slug
          uri
        }
      }
    }
  }
}`;
const QUERY_WP_POSTS_BY_AUTHOR_SLUG = `
query PostByAuthorSlug($slug: String, $after: String, $language: LanguageCodeFilterEnum = ID) {
  posts(
    where: {authorName: $slug, language: $language, orderby: {field: DATE, order: DESC}}
    first: 10
    after: $after
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        date
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        excerpt
        featuredImage {
          node {
            altText
            caption
            id
            sizes
            sourceUrl
            srcSet
          }
        }
        id
        modified
        postId
        slug
        uri
        title
      }
    }
  }
}
`;

const wpHttp = async (query, variables) => {
  const defaultConfig = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  };
  const url = new URL("https://media.teknodaim.com/graphql");
  try {
    const res = await fetch(url.toString(), defaultConfig);
    if (!res.ok) {
      console.error(url);
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return [data, null];
  } catch (err) {
    console.error(url.href, err);
    return [null, err];
  }
};

const QUERY_WP_USERS_BY_SLUG = `
  query AuthorId($slug: ID!){
    user(id: $slug,idType: SLUG) {
          avatar {
            height
            width
            url
          }
          description
          id
          name
          seo {
            title
            schema {
              raw
            }
            metaDesc
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphDescription
            opengraphTitle
            social {
              facebook
              instagram
              linkedIn
              twitter
              youTube
              pinterest
            }
          }
          roles {
            nodes {
              name
            }
          }
          slug
        
    }
  }
`;

async function wpGetUserBySlugAction(slug) {
  const [res, err] = await wpHttp(
    QUERY_WP_USERS_BY_SLUG,
    {
      slug
    }
  );
  if (err) {
    console.log(err);
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      user: null
    };
  }
  return {
    err: null,
    user: res?.data?.user
  };
}
function wpUpdateUserAvatar(avatar) {
  return {
    ...avatar,
    url: avatar.url?.replace("http://", "https://")
  };
}

async function wpGetAllPostsAction(language = "ID") {
  const [res, err] = await wpHttp(QUERY_WP_ALL_POSTS, {
    language
  });
  if (err) {
    console.log(err);
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null
    };
  }
  let posts = [];
  if (res) {
    posts = res?.data?.posts?.edges.map(
      ({ node = {} }) => node
    );
  }
  return {
    err: null,
    posts: posts?.map(wpMapPostData),
    pageInfo: res?.data?.posts?.pageInfo
  };
}
async function wpGetAllPostsLoadMoreAction(after = "", language = "ID") {
  const [res, err] = await wpHttp(
    QUERY_WP_ALL_POSTS_LOAD_MORE,
    {
      after,
      language
    }
  );
  if (err) {
    console.log(err);
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null
    };
  }
  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node
  );
  return {
    err: null,
    posts: posts.map(wpMapPostData),
    pageInfo: res?.data.posts.pageInfo
  };
}
async function wpGetPostBySlugAction(slug) {
  const [res, err] = await wpHttp(QUERY_WP_POST_BY_SLUG, {
    slug
  });
  if (err) {
    console.log(err);
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      post: null,
      other_lang_post: null
    };
  }
  if (res?.error) {
    return {
      err: res?.error.message,
      post: null,
      other_lang_post: null
    };
  }
  if (!res?.data?.post) {
    return {
      err: "something wrong",
      post: null,
      other_lang_post: null
    };
  }
  const post = wpMapPostData(res.data.post);
  const translations = post?.translations;
  return { err: null, post, other_lang_post: translations ?? null };
}
async function wpGetPostsByAuthorSlugAction(slug, after = "", language = "ID") {
  const [res, err] = await wpHttp(
    QUERY_WP_POSTS_BY_AUTHOR_SLUG,
    {
      slug,
      after,
      language
    }
  );
  if (err) {
    console.log(err);
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null
    };
  }
  const postsData = res?.data.posts.edges.map(
    ({ node = {} }) => node
  );
  let posts;
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData);
  }
  return {
    err: null,
    posts,
    pageInfo: res?.data.posts.pageInfo
  };
}
async function wpGetPostsByCategorySlugAction(categoryId, after = "", language = "ID", notIn = "") {
  const [res, err] = await wpHttp(
    QUERY_WP_POSTS_BY_CATEGORY_SLUG,
    {
      categoryId,
      after,
      language,
      notIn
    }
  );
  if (err) {
    console.log(err);
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null
    };
  }
  const postsData = res?.data?.posts.edges.map(
    ({ node = {} }) => node
  );
  let posts;
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData);
  }
  return {
    err: null,
    posts,
    pageInfo: res?.data?.posts.pageInfo
  };
}
async function wpGetPostsByCategoryIdAction(categoryId, after = "", language = "ID") {
  const [res, err] = await wpHttp(
    QUERY_WP_POSTS_BY_CATEGORY_ID,
    {
      categoryId,
      after,
      language
    }
  );
  if (err) {
    console.log(err);
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null
    };
  }
  const postsData = res?.data.posts.edges.map(
    ({ node = {} }) => node
  );
  let posts;
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData);
  }
  return {
    err: null,
    posts,
    pageInfo: res?.data.posts.pageInfo
  };
}
async function wpGetPostsByTagSlugAction(id, after = "") {
  const [res, err] = await wpHttp(
    QUERY_WP_POSTS_BY_TAG_SLUG,
    { id, after }
  );
  if (err) {
    console.log(err);
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null
    };
  }
  const postsData = res?.data.tag.posts.edges.map(
    ({ node = {} }) => node
  );
  let posts;
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData);
  }
  return {
    err: null,
    posts,
    pageInfo: res?.data.tag.posts.pageInfo
  };
}
async function wpGetPostsByTagIdAction(id, after = "") {
  const [res, err] = await wpHttp(
    QUERY_WP_POSTS_BY_TAG_ID,
    { id, after }
  );
  if (err) {
    console.log(err);
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null
    };
  }
  const postsData = res?.data.tag.posts.edges.map(
    ({ node = {} }) => node
  );
  let posts;
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData);
  }
  return {
    err: null,
    posts,
    pageInfo: res?.data.tag.posts.pageInfo
  };
}
function wpMapPostData(post) {
  let authorNode;
  let categoriesNode;
  let featuredImageNode;
  let tagsNode;
  let contentNode;
  let translationsNode;
  if (post.author) {
    authorNode = {
      ...post.author.node
    };
  }
  if (post.author?.avatar && authorNode) {
    authorNode.avatar = wpUpdateUserAvatar(post.author.avatar);
  }
  if (post.categories) {
    categoriesNode = post.categories.edges?.map(({ node }) => {
      return {
        ...node
      };
    });
  }
  if (post.translations?.[0]) {
    const translationsNodes = post.translations[0];
    translationsNode = {
      ...translationsNodes,
      categories: translationsNodes.categories.edges?.map(({ node }) => {
        return {
          ...node
        };
      })
    };
  }
  if (post.tags) {
    tagsNode = post.tags.edges?.map(({ node }) => {
      return {
        ...node
      };
    });
  }
  if (post.content) {
    contentNode = post.content;
    const regexImg = new RegExp(
      `https://${{"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.DOMAIN ?? ""}/wp-content`,
      "g"
    );
    contentNode = contentNode.replace(
      regexImg,
      `https://media.${{"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.DOMAIN ?? ""}/wp-content`
    );
  }
  if (post.featuredImage) {
    featuredImageNode = post.featuredImage.node;
  }
  const data = {
    ...post
  };
  if (authorNode) {
    data.author = authorNode;
  }
  if (contentNode) {
    data.content = contentNode;
  }
  if (tagsNode) {
    data.tags = tagsNode;
  }
  if (categoriesNode) {
    data.categories = categoriesNode;
  }
  if (featuredImageNode) {
    data.featuredImage = featuredImageNode;
  }
  if (translationsNode) {
    data.translations = translationsNode;
  }
  return data;
}

const splitUriWP = (uri, slug) => {
  let newString = uri;
  const globalUri = new RegExp(
    `https://${{"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.WP_EN_SUBDOMAIN}/`,
    "g"
  );
  if (newString.includes(
    `https://${{"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.WP_EN_SUBDOMAIN}` ?? "en.teknodaim.com"
  )) {
    newString = newString.replace(globalUri ?? "/", "/");
  }
  const regex = /^\/(\w+)(\/.*)$/;
  const match = newString.match(regex);
  const newUri = match?.[1] && match[1].length > 0 ? `/${match[1]}/${slug}` : newString;
  return newUri;
};
function wpPrimaryCategorySlug(category) {
  const isPrimary = category?.find(({ parent }) => {
    return parent === null;
  });
  let primaryCategory;
  if (isPrimary) {
    primaryCategory = isPrimary;
    return { primaryCategory };
  } else {
    primaryCategory = category[0];
    return { primaryCategory };
  }
}
function wpAuthorPathBySlug(slug) {
  return `/author/${slug}`;
}
function wpTagPathBySlug(slug) {
  return `/tag/${slug}`;
}

const formatDateFromNow = (data, locale) => {
  dayjs.extend(relativeTime);
  const format = dayjs(data).fromNow();
  return translateTimeAgo(format, locale);
};
function translateTimeAgo(timeAgo, locale) {
  if (locale === "id") {
    if (timeAgo.includes("a few seconds ago")) {
      return `Beberapa saat yang lalu`;
    } else if (timeAgo.includes("a minute ago")) {
      return `Beberapa saat yang lalu`;
    } else if (timeAgo.includes("an hour ago")) {
      return `Satu jam yang lalu`;
    } else if (timeAgo.includes("a day ago")) {
      return `Satu hari yang lalu`;
    } else if (timeAgo.includes("a month ago")) {
      return `Satu bulan yang lalu`;
    } else if (timeAgo.includes("a year ago")) {
      return `Satu tahun yang lalu`;
    } else if (timeAgo.includes("minutes")) {
      const time = timeAgo.match(/\d+/);
      const minutes = time && parseInt(time[0]);
      return minutes ? `Beberapa saat yang lalu` : timeAgo;
    } else if (timeAgo.includes("hours")) {
      const time = timeAgo.match(/\d+/);
      const hours = time && parseInt(time[0]);
      return hours ? `${hours} jam yang lalu` : timeAgo;
    } else if (timeAgo.includes("days")) {
      const time = timeAgo.match(/\d+/);
      const days = time && parseInt(time[0]);
      return days ? `${days} hari yang lalu` : timeAgo;
    } else if (timeAgo.includes("months")) {
      const time = timeAgo.match(/\d+/);
      const monts = time && parseInt(time[0]);
      return monts ? `${monts} bulan yang lalu` : timeAgo;
    } else if (timeAgo.includes("years")) {
      const time = timeAgo.match(/\d+/);
      const years = time && parseInt(time[0]);
      return years ? `${years} tahun yang lalu` : timeAgo;
    } else {
      return timeAgo;
    }
  } else {
    return timeAgo;
  }
}

const BadgeIcon = (props) => {
  const { name, slug, className } = props;
  switch (name) {
    case "Tips":
      return /* @__PURE__ */ jsx("div", { className: "group", children: /* @__PURE__ */ jsx("a", { "aria-label": "Tips", className: "block", href: slug, children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `bg-tips text-tips-foreground transition-transform hover:-translate-y-[5px] ${className}`,
          children: /* @__PURE__ */ jsx(
            Icon.Coffe,
            {
              "aria-label": "Tips",
              className: "h-full w-full text-inherit"
            }
          )
        }
      ) }) });
    case "Berita":
      return /* @__PURE__ */ jsx("div", { className: "group", children: /* @__PURE__ */ jsx("a", { "aria-label": "News", className: "block", href: slug, children: /* @__PURE__ */ jsx(
        "span",
        {
          className: `bg-news text-news-foreground transition-transform hover:-translate-y-[5px] ${className}`,
          children: /* @__PURE__ */ jsx(
            Icon.News,
            {
              "aria-label": "News",
              className: "h-full w-full text-inherit"
            }
          )
        }
      ) }) });
    case "Game":
      return /* @__PURE__ */ jsx("div", { className: "group", children: /* @__PURE__ */ jsx("a", { "aria-label": "Game", className: "block", href: slug, children: /* @__PURE__ */ jsx(
        "span",
        {
          className: `bg-game text-game-foreground transition-transform hover:-translate-y-[5px] ${className}`,
          children: /* @__PURE__ */ jsx(
            Icon.Game,
            {
              "aria-label": "Game",
              className: "h-full w-full text-inherit"
            }
          )
        }
      ) }) });
    default:
      return null;
  }
};

const WpPostView = (props) => {
  return /* @__PURE__ */ jsx(Fragment, {});
};

const WpPostCard = React.memo(
  (props) => {
    const {
      src,
      alt,
      uri,
      slug,
      excerpt,
      title,
      authorName,
      authorUri,
      authorAvatarUrl,
      date,
      locale,
      categoryName,
      categoryUri,
      type = "horizontal"
    } = props;
    const stylesIcons = `md:right-unset absolute right-[5px] top-[5px] z-[5] h-[32px] w-[32px] rounded-full p-1.5 text-[13px] leading-[32px] md:left-[-10px] md:top-[-10px] md:h-[44px] md:w-[44px] md:p-3 md:text-[26px] md:leading-[44px]`;
    if (type === "vertical") {
      return /* @__PURE__ */ jsxs("article", { className: "mb-[40px] flex grow border-separate flex-row rounded-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "" }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex w-full flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] h-auto w-full", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                role: "link",
                href: uri,
                "aria-label": `Go To ${title} Page`,
                className: "relative block h-full w-full",
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    sizes: "(max-width: 768px) 80vw, 60vw",
                    src,
                    alt: `Image ${alt}`,
                    className: "!h-full !w-full overflow-hidden rounded-lg object-cover"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              BadgeIcon,
              {
                name: categoryName,
                slug: categoryUri,
                className: stylesIcons
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                role: "link",
                "aria-label": categoryName,
                className: "absolute bottom-0 left-0 block bg-main px-1 py-0.5 text-white",
                href: categoryUri,
                children: categoryName
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-[15px] flex flex-col", children: [
            /* @__PURE__ */ jsx("a", { role: "link", "aria-label": `Go To ${title} Page`, href: uri, children: /* @__PURE__ */ jsx("h2", { className: "line-clamp-3 text-[25px] font-bold leading-[1.35] hover:text-primary md:text-[1.55em] md:leading-8", children: title }) }),
            /* @__PURE__ */ jsx("div", { className: "flex-column mt-2.5 flex", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
              authorName && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "hidden flex-row items-center md:flex", children: [
                authorAvatarUrl && /* @__PURE__ */ jsx("div", { className: "relative h-[20px] w-[20px]", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: authorAvatarUrl,
                    className: "overflow-hidden rounded-full object-cover",
                    alt: authorName,
                    sizes: "(max-width: 768px) 20px, 50px"
                  }
                ) }),
                /* @__PURE__ */ jsx("a", { role: "link", "aria-label": authorName, href: authorUri, children: /* @__PURE__ */ jsx("h3", { className: "ml-2 text-[12px]", children: authorName }) })
              ] }) }),
              date && /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(
                  Icon.AccessTime,
                  {
                    "aria-label": "Date",
                    className: "h-3 w-3 text-foreground/80 md:ml-2"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "time",
                  {
                    className: "pl-[5px] text-xs text-foreground/80",
                    dateTime: date,
                    suppressHydrationWarning: true,
                    children: formatDateFromNow(date, locale)
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                WpPostView,
                {
                  className: "ml-2 flex items-center",
                  post_slug: slug
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "text-muted-900 mb-[30px] hidden text-[15px] md:my-2.5 md:line-clamp-4",
                dangerouslySetInnerHTML: { __html: excerpt }
              }
            )
          ] })
        ] })
      ] });
    }
    return /* @__PURE__ */ jsx("article", { className: "mb-[30px] flex grow border-separate flex-row rounded-lg lg:flex-col", children: /* @__PURE__ */ jsxs("div", { className: "relative flex w-full flex-row justify-between lg:justify-start", children: [
      /* @__PURE__ */ jsx("div", { className: "order-2 md:order-1", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] h-auto w-[125px] md:w-[220px] lg:w-[270px]", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: uri,
            role: "link",
            "aria-label": `Go To ${title} Page`,
            className: "relative block h-full w-full",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src,
                alt: `Image ${alt}`,
                className: "!h-full !w-full overflow-hidden rounded-lg object-cover"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          BadgeIcon,
          {
            name: categoryName,
            slug: categoryUri,
            className: stylesIcons
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "order-1 mr-3 flex flex-col md:order-2 md:ml-[30px] md:mr-[unset]", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(
          "a",
          {
            role: "link",
            "aria-label": categoryName,
            href: categoryUri,
            className: "text-[12px] font-bold text-main",
            children: categoryName
          }
        ) }),
        /* @__PURE__ */ jsxs("a", { role: "link", "aria-label": title, href: uri, children: [
          /* @__PURE__ */ jsx("h2", { className: "line-clamp-4 text-[18px] font-bold leading-[20px] hover:text-primary md:text-xl md:leading-[27px] lg:text-2xl", children: title }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "text-muted-900 hidden text-[15px] md:my-2.5 md:line-clamp-2 lg:line-clamp-4",
              dangerouslySetInnerHTML: { __html: excerpt }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center  max-md:mt-[10px]", children: [
          authorName && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "hidden flex-row items-center md:flex", children: [
            authorAvatarUrl && /* @__PURE__ */ jsx("div", { className: "relative h-[20px] w-[20px]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: authorAvatarUrl,
                className: "overflow-hidden rounded-full object-cover",
                alt: authorName,
                sizes: "(max-width: 768px) 20px, 50px"
              }
            ) }),
            /* @__PURE__ */ jsx("a", { role: "link", "aria-label": authorName, href: authorUri, children: /* @__PURE__ */ jsx("h3", { className: "ml-2 text-[12px]", children: authorName }) })
          ] }) }),
          date && /* @__PURE__ */ jsxs("div", { className: "flex items-center md:ml-2", children: [
            /* @__PURE__ */ jsx(
              Icon.AccessTime,
              {
                "aria-label": "Date",
                className: "h-3 w-3 text-foreground/80"
              }
            ),
            /* @__PURE__ */ jsx(
              "time",
              {
                className: "pl-[5px] text-xs text-foreground/80",
                dateTime: date,
                suppressHydrationWarning: true,
                children: formatDateFromNow(date, locale)
              }
            )
          ] }),
          /* @__PURE__ */ jsx(WpPostView, { className: "ml-2 flex items-center", post_slug: slug })
        ] })
      ] })
    ] }) });
  }
);

const InfiniteScrollWpPostsAuthor = (props) => {
  const { id, posts, pageInfo, filteredQueries, language } = props;
  const loadMoreRef = React.useRef(null);
  const [page, setPage] = React.useState(pageInfo);
  const [list, setList] = React.useState(posts);
  const handleObserver = React.useCallback(
    async (entries) => {
      const [target] = entries;
      if (target?.isIntersecting && page.hasNextPage == true) {
        const data = await wpGetPostsByAuthorSlugAction(
          id,
          page.endCursor,
          language.toLocaleUpperCase()
        );
        setList((list2) => [...list2, ...data.posts]);
        setPage(data.pageInfo);
      }
    },
    [id, language, page.endCursor, page.hasNextPage]
  );
  React.useEffect(() => {
    const lmRef = loadMoreRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "-500px 0px 0px 0px",
      threshold: 0
    });
    if (loadMoreRef.current)
      observer.observe(loadMoreRef.current);
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef);
      }
    };
  }, [handleObserver, posts]);
  return /* @__PURE__ */ jsxs("div", { children: [
    list.map((post, index) => {
      const newUri = splitUriWP(post.uri, post.slug);
      const { primaryCategory } = wpPrimaryCategorySlug(post.categories);
      const isWordIncluded = filteredQueries?.some(
        (word) => post.title.toLowerCase().includes(word.toLowerCase())
      );
      if (isWordIncluded === true) {
        return null;
      }
      if ((index + 1) % 5 === 0) {
        return /* @__PURE__ */ jsx(
          WpPostCard,
          {
            type: "vertical",
            locale: language,
            src: post.featuredImage?.sourceUrl,
            alt: post.featuredImage?.altText,
            slug: post.slug,
            uri: newUri,
            title: post.title,
            excerpt: post.excerpt,
            authorName: post.author.name,
            authorAvatarUrl: post.author.avatar.url,
            authorUri: `/author/${post.author.slug}`,
            date: post.date,
            categoryName: primaryCategory?.name,
            categoryUri: `/${primaryCategory?.slug}`
          },
          post.id
        );
      } else {
        return /* @__PURE__ */ jsx(
          WpPostCard,
          {
            type: "horizontal",
            locale: language,
            src: post.featuredImage?.sourceUrl,
            alt: post.featuredImage?.altText,
            slug: post.slug,
            uri: newUri,
            title: post.title,
            excerpt: post.excerpt,
            authorName: post.author.name,
            authorAvatarUrl: post.author.avatar.url,
            authorUri: `/author/${post.author.slug}`,
            date: post.date,
            categoryName: primaryCategory?.name,
            categoryUri: `/${primaryCategory?.slug}`
          },
          post.id
        );
      }
    }),
    page.hasNextPage && /* @__PURE__ */ jsxs("div", { ref: loadMoreRef, children: [
      /* @__PURE__ */ jsx(PlaceholderPostCard, {}),
      /* @__PURE__ */ jsx(PlaceholderPostCard, {})
    ] })
  ] });
};

const WpListPost = (props) => {
  const { posts, locale, filteredQueries } = props;
  return /* @__PURE__ */ jsx("div", { children: posts.map((post, index) => {
    const newUri = splitUriWP(post.uri, post.slug);
    const { primaryCategory } = wpPrimaryCategorySlug(post.categories);
    const isWordIncluded = filteredQueries?.some(
      (word) => post.title.toLowerCase().includes(word.toLowerCase())
    );
    if (isWordIncluded === true) {
      return null;
    }
    if ((index + 1) % 5 === 0) {
      return /* @__PURE__ */ jsx(
        WpPostCard,
        {
          type: "vertical",
          locale,
          src: post.featuredImage?.sourceUrl,
          alt: post.featuredImage?.altText,
          slug: post.slug,
          uri: newUri,
          title: post.title,
          excerpt: post.excerpt,
          authorName: post.author.name,
          authorAvatarUrl: post.author.avatar.url,
          authorUri: `/author/${post.author.slug}`,
          date: post.date,
          categoryName: primaryCategory?.name,
          categoryUri: `/${primaryCategory?.slug}`
        },
        post.id
      );
    } else {
      return /* @__PURE__ */ jsx(
        WpPostCard,
        {
          type: "horizontal",
          locale,
          src: post.featuredImage?.sourceUrl,
          alt: post.featuredImage?.altText,
          slug: post.slug,
          uri: newUri,
          title: post.title,
          excerpt: post.excerpt,
          authorName: post.author.name,
          authorAvatarUrl: post.author.avatar.url,
          authorUri: `/author/${post.author.slug}`,
          date: post.date,
          categoryName: primaryCategory?.name,
          categoryUri: `/${primaryCategory?.slug}`
        },
        post.id
      );
    }
  }) });
};

const CheckboxSidebar = () => {
  return null;
};

const Footer = (props) => {
  const { address, site_title, className } = props;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: `${className} relative mt-12 flex flex-col border border-t border-border bg-background/70`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 w-full md:mb-0 md:w-5/12 lg:mr-3", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                "aria-label": "Go To Homepage",
                className: "self-center pl-4",
                href: "/",
                children: /* @__PURE__ */ jsx(Logo, {})
              }
            ),
            /* @__PURE__ */ jsxs("ul", { className: "mt-8 flex flex-col space-y-2 font-medium text-foreground/80", children: [
              /* @__PURE__ */ jsxs("li", { className: "inline-flex", children: [
                /* @__PURE__ */ jsx(Icon.Location, { "aria-label": "Location", className: "mr-2 h-6 w-6" }),
                /* @__PURE__ */ jsx("span", { children: address ?? "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "inline-flex", children: [
                /* @__PURE__ */ jsx(
                  Icon.WhatsApp,
                  {
                    "aria-label": `Send Whatsapp to ${"6283822727338"}`,
                    className: "mr-2 h-4 w-4"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    "aria-label": `Send Whatsapp to ${"6283822727338"}`,
                    href: `https://api.whatsapp.com/send?phone=${"6283822727338"}`,
                    children: /* @__PURE__ */ jsx("span", { children: `+${"6283822727338"}` })
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full md:w-7/12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-6", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("ul", { className: "space-y-2 font-medium text-foreground/80" }) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("ul", { className: "space-y-2 font-medium text-foreground/80" }) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex min-h-[60px] border border-t border-border", children: /* @__PURE__ */ jsx("div", { className: "w-full self-center pl-4", children: `© ${currentYear} ${site_title ?? "Teknodaim"}` }) })
      ]
    }
  );
};

const SideNav = (props) => {
  const {
    isMain,
    // menuSideBarAll,
    // menuSideBarByLang,
    // menuSideBarShopAll,
    // menuSideBarShopByLang,
    type = "default",
    toggleSideNav
  } = props;
  const stylesIcons = "inline-block text-base mr-2";
  return /* @__PURE__ */ jsxs("nav", { className: "relative flex w-full flex-col", children: [
    type === "video" && /* @__PURE__ */ jsxs("div", { className: "mb-5 flex px-4", children: [
      /* @__PURE__ */ jsx("div", { className: "mr-1 px-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          "aria-label": "Open Menu",
          variant: "ghost",
          size: "icon",
          className: "cursor-pointer p-1",
          onClick: toggleSideNav,
          children: /* @__PURE__ */ jsx(Icon.Menu, { "aria-label": "Open Menu", className: "h-[28px] w-[28px]" })
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex w-full flex-row flex-wrap items-center justify-start pl-0 pr-0", children: /* @__PURE__ */ jsx("h2", { className: "m-0 p-0 text-4xl font-bold leading-none", children: /* @__PURE__ */ jsx("a", { "aria-label": "Go To Homepage", href: "/", children: /* @__PURE__ */ jsx("div", { className: "relative h-[23px] w-[119px]", children: /* @__PURE__ */ jsx(
        "img",
        {
          sizes: "(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw",
          alt: "Teknodaim",
          src: "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp"
        }
      ) }) }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start space-y-3 border-b border-border p-4" }),
    /* @__PURE__ */ jsxs("ul", { className: "flex flex-col space-y-3 border-b border-border p-4", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          role: "link",
          "aria-label": "Go To Download Page",
          href: "/download",
          className: "flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2",
          children: /* @__PURE__ */ jsxs("p", { className: "inline-flex items-center font-bold hover:text-primary", children: [
            /* @__PURE__ */ jsx(
              Icon.Download,
              {
                "aria-label": "Go To Download Page",
                className: stylesIcons
              }
            ),
            "Download"
          ] })
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          role: "link",
          "aria-label": "Go To Video Page",
          href: "/video",
          className: "flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2",
          children: /* @__PURE__ */ jsxs("p", { className: "inline-flex items-center font-bold hover:text-primary", children: [
            /* @__PURE__ */ jsx(
              Icon.Youtube,
              {
                "aria-label": "Go To Video Page",
                className: stylesIcons
              }
            ),
            "Video"
          ] })
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          role: "link",
          "aria-label": "Go To Shop Page",
          href: "/shop",
          className: "flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2",
          children: /* @__PURE__ */ jsxs("p", { className: "inline-flex items-center font-bold hover:text-primary", children: [
            /* @__PURE__ */ jsx(Icon.Shop, { "aria-label": "Go To Shop Page", className: stylesIcons }),
            "Shop"
          ] })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "flex flex-col space-y-3 border-b border-muted p-4", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          "aria-label": "About Us",
          href: "/about",
          role: "link",
          className: "flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2",
          children: /* @__PURE__ */ jsx("p", { className: "inline-flex items-center font-bold hover:text-primary", children: "About Us" })
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          "aria-label": "Contact",
          href: "/contact",
          role: "link",
          className: "flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2",
          children: /* @__PURE__ */ jsx("p", { className: "inline-flex items-center font-bold hover:text-primary", children: "Contact" })
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          "aria-label": "Privacy",
          href: "/privacy",
          role: "link",
          className: "flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2",
          children: /* @__PURE__ */ jsx("p", { className: "inline-flex items-center font-bold hover:text-primary", children: "Privacy Policy" })
        }
      ) })
    ] })
  ] });
};

const TopNav = (props) => {
  const {
    headerType = "default",
    locale,
    buttonMenu,
    facebook_username,
    instagram_username,
    tiktok_username,
    twitter_username,
    whatsapp_channel,
    youtube_channel
  } = props;
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 z-[10] mx-auto flex h-16 w-full max-w-full items-center bg-background pl-[60px] shadow-md", children: [
    buttonMenu && /* @__PURE__ */ jsx(Fragment, { children: buttonMenu }),
    /* @__PURE__ */ jsx("div", { className: "ml-auto mr-auto grow", children: /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-row flex-nowrap items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center md:w-[250px]", children: /* @__PURE__ */ jsx("h2", { className: "m-0 p-0 text-4xl font-bold leading-none", children: /* @__PURE__ */ jsx("a", { "aria-label": "Go To Homepage", href: "/", children: /* @__PURE__ */ jsx(Logo, {}) }) }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "ml-auto md:ml-0 lg:w-[40%] xl:w-[50%]",
            headerType === "shorts" ? "hidden md:block" : "block"
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "grow-1 ml-2 flex flex-row space-x-2 pr-2 md:ml-auto",
            headerType === "shorts" ? "hidden md:block" : "block"
          ),
          children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-1", children: [
            facebook_username && /* @__PURE__ */ jsx(
              Button,
              {
                "aria-label": "Facebook",
                className: "hidden p-1 lg:flex",
                variant: "ghost",
                size: "icon",
                asChild: true,
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    "aria-label": "Facebook",
                    href: `https://www.facebook.com/${facebook_username}`,
                    target: "_blank",
                    children: /* @__PURE__ */ jsx(
                      Icon.Facebook,
                      {
                        className: "h-[19px] w-[19px]",
                        "aria-label": "Facebook"
                      }
                    )
                  }
                )
              }
            ),
            twitter_username && /* @__PURE__ */ jsx(
              Button,
              {
                "aria-label": "Twitter",
                className: "hidden p-1 lg:flex",
                variant: "ghost",
                size: "icon",
                asChild: true,
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    "aria-label": "Twitter",
                    href: `https://www.twitter.com/${twitter_username}`,
                    target: "_blank",
                    children: /* @__PURE__ */ jsx(
                      Icon.Twitter,
                      {
                        className: "h-[19px] w-[19px]",
                        "aria-label": "Twitter"
                      }
                    )
                  }
                )
              }
            ),
            instagram_username && /* @__PURE__ */ jsx(
              Button,
              {
                "aria-label": "Instagram",
                className: "hidden p-1 lg:flex",
                variant: "ghost",
                size: "icon",
                asChild: true,
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `https://www.instagram.com/${instagram_username}`,
                    target: "_blank",
                    children: /* @__PURE__ */ jsx(
                      Icon.Instagram,
                      {
                        className: "h-[19px] w-[19px]",
                        "aria-label": "Instagram"
                      }
                    )
                  }
                )
              }
            ),
            tiktok_username && /* @__PURE__ */ jsx(
              Button,
              {
                "aria-label": "Tiktok",
                className: "hidden p-1 lg:flex",
                variant: "ghost",
                size: "icon",
                asChild: true,
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    "aria-label": "Tiktok",
                    href: `https://tiktok.com/${tiktok_username}`,
                    target: "_blank",
                    children: /* @__PURE__ */ jsx(
                      Icon.Tiktok,
                      {
                        className: "h-[19px] w-[19px]",
                        "aria-label": "Tiktok"
                      }
                    )
                  }
                )
              }
            ),
            whatsapp_channel && /* @__PURE__ */ jsx(
              Button,
              {
                "aria-label": "WhatsApp Channel",
                className: "hidden p-1 lg:flex",
                variant: "ghost",
                size: "icon",
                asChild: true,
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    "aria-label": "WhatsApp Channel",
                    href: `https://whatsapp.com/${whatsapp_channel}`,
                    target: "_blank",
                    children: /* @__PURE__ */ jsx(
                      Icon.WhatsApp,
                      {
                        className: "h-[19px] w-[19px]",
                        "aria-label": "WhatsApp Channel"
                      }
                    )
                  }
                )
              }
            ),
            youtube_channel && /* @__PURE__ */ jsx(
              Button,
              {
                "aria-label": "Youtube",
                className: "hidden p-1 lg:flex",
                variant: "ghost",
                size: "icon",
                asChild: true,
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    "aria-label": "Youtube",
                    href: `https://www.youtube.com/${youtube_channel}`,
                    target: "_blank",
                    children: /* @__PURE__ */ jsx(
                      Icon.Youtube,
                      {
                        className: "h-[19px] w-[19px]",
                        "aria-label": "Youtube"
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex items-center" }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
              React.Suspense,
              {
                fallback: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-5 rounded-full" })
              }
            ) })
          ] })
        }
      )
    ] }) }) })
  ] });
};

const MainContainer = (props) => {
  const {
    locale,
    headerType = "default",
    // menus,
    // menusByLang,
    settings,
    // menusFooterAll,
    // menusFooterByLang,
    children,
    type = "default"
  } = props;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(CheckboxSidebar, {}),
    /* @__PURE__ */ jsx(
      TopNav,
      {
        headerType,
        locale,
        facebook_username: settings?.facebook_username,
        twitter_username: settings?.twitter_username,
        instagram_username: settings?.instagram_username,
        tiktok_username: settings?.tiktok_username,
        whatsapp_channel: settings?.whatsapp_channel,
        youtube_channel: settings?.youtube_channel,
        buttonMenu: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: "openSidebarMenu",
            className: "sidebarIconToggle fixed left-4 top-6 z-20 box-border h-6 w-6 cursor-pointer transition-all duration-300",
            children: [
              /* @__PURE__ */ jsx("span", { className: "spinner diagonal part-1 bg-foreground" }),
              /* @__PURE__ */ jsx("span", { className: "spinner horizontal bg-foreground" }),
              /* @__PURE__ */ jsx("span", { className: "spinner diagonal part-2 bg-foreground" })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        className: "openSidebarMenu peer/menu hidden transition-all duration-300",
        id: "openSidebarMenu"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        id: "sidebarMenu",
        className: cn(
          "duration-250 fixed left-0 top-16 z-[5] h-full w-[250px] transform border-r border-border bg-background pt-3 transition-transform ease-in-out ",
          type === "default" && "-translate-x-full peer-checked/menu:translate-x-0 md:translate-x-0 peer-checked/menu:md:-translate-x-full",
          type === "video" && "z-[9] -translate-x-full peer-checked/menu:translate-x-0 min-[1330px]:translate-x-0 peer-checked/menu:min-[1330px]:-translate-x-full",
          type === "shorts" && "-translate-x-full peer-checked/menu:translate-x-0"
        ),
        children: /* @__PURE__ */ jsx(
          SideNav,
          {
            isMain: true
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        id: "center",
        className: cn(
          "fade-up-element mx-auto block h-full",
          type === "default" && "md:pl-[250px] peer-checked/menu:md:pl-0",
          type === "video" && "min-[1330px]:pl-[250px] peer-checked/menu:min-[1330px]:pl-0",
          type === "video" ? "mt-[64px]" : type === "shorts" ? "mt-0 md:mt-20" : "mt-[64px]"
        ),
        children
      }
    ),
    type !== "shorts" && /* @__PURE__ */ jsx(
      Footer,
      {
        className: type === "default" ? "md:pl-[250px] peer-checked/menu:md:pl-0" : type === "video" ? "min-[1330px]:pl-[250px] peer-checked/menu:min-[1330px]:pl-0" : void 0,
        site_title: settings?.site_title,
        support_email: settings?.support_email
      }
    )
  ] });
};

const $$Astro$5 = createAstro();
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title = "Astro" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${renderHead()}</head> <body class="antialiased font-400 font-sans"> ${renderComponent($$result, "MainContainer", MainContainer, {}, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })} </body></html>`;
}, "/home/siga/Documents/teknodaim-astro/src/layouts/MainLayout.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$4 = createAstro();
function getStaticPaths$3() {
  return [{ params: { slug: void 0 } }];
}
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$4;
  const { slug } = Astro2.params;
  const { user } = await wpGetUserBySlugAction(slug);
  const { posts, pageInfo } = await wpGetPostsByAuthorSlugAction(
    slug,
    "",
    "ID"
  );
  const listPost = posts?.slice(0, posts?.length - 1);
  const infinitePosts = posts?.slice(posts?.length - 1, posts?.length);
  const postJsonLdString = user?.seo?.schema?.raw;
  const regexId = new RegExp({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_WP_DOMAIN, "g");
  const regexEn = new RegExp({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_WP_EN_SUBDOMAIN, "g");
  const postJsonLd = postJsonLdString?.replace(regexId, {"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_DOMAIN)?.replace(regexEn, {"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_EN_SUBDOMAIN);
  const parsedDescription = ParseContent({
    htmlInput: user?.description,
    title: user?.name
  });
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate`  ${postJsonLd && renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="application/ld+json"', "></script>"])), addAttribute({ __html: postJsonLd }, "dangerouslySetInnerHTML"))}${maybeRenderHead()}<section class="fade-up-element flex w-full flex-col pt-5"> <section class="mx-auto flex w-full flex-col md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] lg:flex-row lg:px-4 min-[1200px]:max-w-[1170px]"> <!-- {
        adsBelowHeader &&
          adsBelowHeader.length > 0 &&
          adsBelowHeader.map((ad) => {
            return <Ad ad={ad} key={ad.id} />
          })
      } --> <div class="order-2 flex w-full flex-col px-4 lg:order-1 lg:w-8/12"> <div class="mb-10 flex w-full flex-col px-4"> <div class="space-y-1 text-center md:text-left"> <h2 class="text-[30px] font-bold">${"About"}</h2> <span class="block text-[19px] leading-[1.5]"> ${parsedDescription} </span> </div> </div> <div class="mb-[25px] border-l-[3px] border-l-main px-3"> <h2 class="text-[18px] font-bold leading-[36px] text-main">
Articles
</h2> </div> ${listPost && renderTemplate`${renderComponent($$result2, "WpListPost", WpListPost, { "locale": "ID", "posts": listPost })}`} ${infinitePosts && pageInfo && renderTemplate`${renderComponent($$result2, "InfiniteScrollWpPostsAuthor", InfiniteScrollWpPostsAuthor, { "posts": infinitePosts, "id": slug, "pageInfo": pageInfo, "language": "ID", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/wp/infinite-scroll-wp-posts-author", "client:component-export": "default" })}`} </div> <aside class="order-1 mb-[30px] w-full bg-muted px-4 lg:order-2 lg:block lg:w-4/12"> <div class="sticky top-[60px] py-4"> <div class="mx-auto max-w-[340px]"> <div class="mb-[30px] flex flex-col items-center"> <div class="relative mb-4 h-32 w-32 shrink-0 overflow-hidden rounded-full bg-gray-300"> <img class="!h-32 !w-32"${addAttribute(user.name, "alt")}${addAttribute(user?.avatar.url, "src")}> </div> <h1 class="text-xl font-bold">${user?.name}</h1> </div> <div class="flex flex-col space-y-[30px]"> <!-- {
                userData?.company && (
                  <div>
                    <h2 class="mb-[10px] text-[20px] font-bold">Company</h2>
                    <p class="text-foreground">{userData?.company}</p>
                  </div>
                )
              } --> <!-- {
                (facebook ?? hidePostsData) && (
                  <div>
                    <h2 class="mb-[10px] text-[20px] font-bold">Follow</h2>
                    <ul>
                      {facebook && (
                        <li class="mb-2">
                          <NextLink
                            aria-label="Open Facebook"
                            class="flex items-center gap-2"
                            href={facebook}
                          >
                            <span>
                              <Icon.Facebook aria-label="Facebook" />
                            </span>
                            <p class="text-foreground">Facebook</p>
                          </NextLink>
                        </li>
                      )}
                      {hidePostsData && (
                        <li class="mb-2">
                          <NextLink
                            aria-label="Open Twitter"
                            class="flex items-center gap-2"
                            href={hidePostsData}
                          >
                            <Icon.Twitter aria-label="Twitter" />
                            <p class="text-foreground">X</p>
                          </NextLink>
                        </li>
                      )}
                    </ul>
                  </div>
                )
              } --> <!-- {
                userData?.education && userData?.education_link && (
                  <div>
                    <h2 class="mb-[10px] text-[20px] font-bold">Education</h2>
                    <NextLink
                      aria-label={\`Open \${userData?.education}\`}
                      href={userData?.education_link}
                    >
                      <p class="text-foreground">{userData?.education}</p>
                    </NextLink>
                  </div>
                )
              }
              {
                userData?.user_expertises?.length &&
                  userData?.user_expertises?.length > 0 && (
                    <div>
                      <h2 class="mb-[10px] text-[20px] font-bold">Expertise</h2>
                      <ul class="flex max-w-sm flex-wrap gap-3">
                        {userData?.user_expertises?.map((expert) => {
                          return (
                            <li
                              key={expert.id}
                              class="relative select-none rounded-lg bg-gray-100 px-2 py-1 hover:shadow hover:outline hover:outline-main md:text-lg"
                            >
                              <NextLink
                                aria-label={\`Open \${expert.title}\`}
                                href={expert.link ?? "/"}
                              >
                                {expert.title}
                              </NextLink>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
              } --> </div> </div> </div> </aside> </section> </section> ` })}`;
}, "/home/siga/Documents/teknodaim-astro/src/pages/author/[slug]/index.astro", void 0);
const $$file$4 = "/home/siga/Documents/teknodaim-astro/src/pages/author/[slug]/index.astro";
const $$url$4 = "/author/[slug]";

const index$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$4,
  file: $$file$4,
  getStaticPaths: getStaticPaths$3,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const InfiniteScrollWpPostsTag = (props) => {
  const { id, posts, language, filteredQueries, pageInfo } = props;
  const loadMoreRef = React.useRef(null);
  const [page, setPage] = React.useState(pageInfo);
  const [list, setList] = React.useState(posts);
  const handleObserver = React.useCallback(
    async (entries) => {
      const [target] = entries;
      if (target?.isIntersecting && page.hasNextPage == true) {
        const data = await wpGetPostsByTagSlugAction(
          id,
          page.endCursor
        );
        setList((list2) => [...list2, ...data.posts]);
        setPage(data.pageInfo);
      }
    },
    [id, page.endCursor, page.hasNextPage]
  );
  React.useEffect(() => {
    const lmRef = loadMoreRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "-500px 0px 0px 0px",
      threshold: 0
    });
    if (loadMoreRef.current)
      observer.observe(loadMoreRef.current);
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef);
      }
    };
  }, [handleObserver, posts]);
  return /* @__PURE__ */ jsxs("div", { children: [
    list.map((post, index) => {
      const newUri = splitUriWP(post.uri, post.slug);
      const { primaryCategory } = wpPrimaryCategorySlug(post.categories);
      const isWordIncluded = filteredQueries?.some(
        (word) => post.title.toLowerCase().includes(word.toLowerCase())
      );
      if (isWordIncluded === true) {
        return null;
      }
      if ((index + 1) % 5 === 0) {
        return /* @__PURE__ */ jsx(
          WpPostCard,
          {
            type: "vertical",
            locale: language,
            src: post.featuredImage?.sourceUrl,
            alt: post.featuredImage?.altText,
            slug: post.slug,
            uri: newUri,
            title: post.title,
            excerpt: post.excerpt,
            authorName: post.author.name,
            authorAvatarUrl: post.author.avatar.url,
            authorUri: `/author/${post.author.slug}`,
            date: post.date,
            categoryName: primaryCategory?.name,
            categoryUri: `/${primaryCategory?.slug}`
          },
          post.id
        );
      } else {
        return /* @__PURE__ */ jsx(
          WpPostCard,
          {
            type: "horizontal",
            locale: language,
            src: post.featuredImage?.sourceUrl,
            alt: post.featuredImage?.altText,
            slug: post.slug,
            uri: newUri,
            title: post.title,
            excerpt: post.excerpt,
            authorName: post.author.name,
            authorAvatarUrl: post.author.avatar.url,
            authorUri: `/author/${post.author.slug}`,
            date: post.date,
            categoryName: primaryCategory?.name,
            categoryUri: `/${primaryCategory?.slug}`
          },
          post.id
        );
      }
    }),
    page.hasNextPage && /* @__PURE__ */ jsxs("div", { ref: loadMoreRef, children: [
      /* @__PURE__ */ jsx(PlaceholderPostCard, {}),
      /* @__PURE__ */ jsx(PlaceholderPostCard, {})
    ] })
  ] });
};

const QUERY_WP_TAG_BY_SLUG = `
query TagBySlug($slug: [String] = "") {
  tags(where: {slug: $slug, language: ALL}, first: 1) {
    edges {
      node {
        description
        id
        name
        language {
          slug
        }
        uri
        seo {
          
          title
          schema {
            raw
          }
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          cornerstone
          focuskw
          opengraphDescription
          opengraphPublishedTime
          opengraphModifiedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
        }
        slug
        translations {
          description
          id
          language {
            slug
          }
          name
          uri
          slug
        }
      }
    }
  }
}
`;

async function wpGetTagBySlugAction(slug) {
  const [res, err] = await wpHttp(
    QUERY_WP_TAG_BY_SLUG,
    {
      slug
    }
  );
  if (err) {
    console.log(err);
    return {
      tag: null,
      other_lang_tag: null,
      err: err instanceof Error ? err.message : "An error occurred"
    };
  }
  if (res?.data.tags.edges.length === 0) {
    return {
      tag: null,
      other_lang_tag: null,
      err: "Something Error"
    };
  }
  const tag = res?.data?.tags.edges.map(
    ({ node = {} }) => node
  )[0];
  const translations = tag?.translations?.[0];
  return {
    tag,
    other_lang_tag: translations ?? null,
    err: null
  };
}

const $$Astro$3 = createAstro();
function getStaticPaths$2() {
  return [{ params: { tag_slug: void 0 } }];
}
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$3;
  const { tag_slug } = Astro2.params;
  const { tag: main_tag, other_lang_tag } = await wpGetTagBySlugAction(tag_slug);
  let tag = main_tag;
  const postJsonLdString = tag?.seo?.schema?.raw;
  const regexId = new RegExp({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_WP_DOMAIN, "g");
  const regexEn = new RegExp({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_WP_EN_SUBDOMAIN, "g");
  postJsonLdString?.replace(regexId, {"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_DOMAIN)?.replace(regexEn, {"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_EN_SUBDOMAIN);
  const { posts, pageInfo } = await wpGetPostsByTagIdAction(tag.id);
  const listPost = posts?.slice(0, posts?.length - 1);
  const infinitePosts = posts?.slice(posts?.length - 1, posts?.length);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<section class="fade-up-element flex w-full flex-col"> <div class="relative mb-10 flex flex-col bg-gradient-to-r from-main to-main/80 py-10"> <div class="absolute top-1 ml-4"> <!-- {
          adsBelowHeader &&
            adsBelowHeader.length > 0 &&
            adsBelowHeader.map((ad) => {
              return <Ad ad={ad} key={ad.id} />
            })
        } --> <!-- <Breadcrumb
          class="text-background"
          separator={(
            <Icon.ChevronRight
              aria-label="Breadcrumb"
              class="text-background"
            />
          )}
        >
          <BreadcrumbItem bold>
            <BreadcrumbLink class="text-background" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem currentPage>
            <BreadcrumbLink class="text-background" href={\`/\${tag?.slug}\`}>
              {tag?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb> --> </div> <div class="self-center"> <h1 class="text-2xl text-background">${tag?.name}</h1> </div> </div> <div class="mx-auto flex w-full flex-row md:mx-auto md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]"> <div class="flex w-full flex-col px-4 lg:w-8/12"> ${listPost && renderTemplate`${renderComponent($$result2, "WpListPost", WpListPost, { "locale": "ID", "posts": listPost })}`} ${infinitePosts && pageInfo && renderTemplate`${renderComponent($$result2, "InfiniteScrollWpPostsTag", InfiniteScrollWpPostsTag, { "posts": infinitePosts, "id": tag?.slug, "language": "ID", "pageInfo": pageInfo })}`} </div> <aside class="hidden w-4/12 px-4 lg:block"> <div class="sticky top-8 rounded-xl border border-border p-4"> <div class="mb-4"> <h4 class="text-transparent"> <span class="after:absolute after:left-1/2 after:top-[40px] after:ml-[-25px] after:h-[3px] after:w-[50px] after:border after:border-main after:bg-main">
Trending
</span> </h4> </div> <!-- {
            trendingPosts?.map((post) => {
              const isWordIncluded = queriesFilter?.queries?.some((word) =>
                post.title.toLowerCase().includes(word.toLowerCase()),
              )
              if (isWordIncluded === true) {
                return null
              }
              return (
                <WpPostCardSide
                  key={post.id}
                  src={post.thumbnail}
                  alt={post.title}
                  uri={\`/\${post.primary_category_slug}/\${post.slug}\`}
                  title={post.title}
                />
              )
            })
          } --> </div> </aside> </div> </section> ` })}`;
}, "/home/siga/Documents/teknodaim-astro/src/pages/tag/[tag_slug]/index.astro", void 0);
const $$file$3 = "/home/siga/Documents/teknodaim-astro/src/pages/tag/[tag_slug]/index.astro";
const $$url$3 = "/tag/[tag_slug]";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$3,
  file: $$file$3,
  getStaticPaths: getStaticPaths$2,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const WpPostBody = (props) => {
  const { children, className } = props;
  const postRef = React.useRef(null);
  React.useEffect(() => {
    const post = postRef.current;
    if (post) {
      const toc = post.querySelector(".ez-toc-title-container");
      if (toc) {
        const clickHandler = () => {
          toc.classList.toggle("open-list");
        };
        toc.addEventListener("click", clickHandler);
        return () => {
          toc.removeEventListener("click", clickHandler);
        };
      }
    }
  }, []);
  return /* @__PURE__ */ jsx("section", { className, ref: postRef, children });
};

const WpPostInfo = (props) => {
  const { authorName, authorAvatarUrl, authorSlug, locale, date } = props;
  return /* @__PURE__ */ jsx("div", { className: "flex-column flex", children: /* @__PURE__ */ jsx("div", { className: "my-2 flex flex-row items-center gap-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
    authorAvatarUrl && /* @__PURE__ */ jsx("div", { className: "relative mr-[15px] h-[40px] w-[40px]", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: authorAvatarUrl,
        className: "overflow-hidden rounded-full",
        alt: authorName,
        sizes: "(max-width: 768px) 50px, 50px"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("a", { "aria-label": authorName, href: wpAuthorPathBySlug(authorSlug), children: /* @__PURE__ */ jsx("h2", { className: "text-base text-primary", children: authorName }) }),
      date && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "time",
        {
          className: "text-foreground-700 text-[14p]",
          dateTime: date,
          suppressHydrationWarning: true,
          children: formatDateFromNow(date, locale)
        }
      ) })
    ] })
  ] }) }) });
};

const WpPostContent = React.memo(
  (props) => {
    const {
      isMain,
      postData,
      // adsSingleArticleAbove,
      // adsSingleArticleBelow,
      // adsSingleArticleInline,
      firstContent,
      secondContent,
      locale,
      relatedPosts
      // gadgets,
    } = props;
    const {
      title,
      authorName,
      authorUrl,
      authorImg,
      categories,
      excerpt,
      featuredImageCaption,
      featuredImageUrl,
      featuredImageAlt,
      date,
      slug,
      tags
    } = postData;
    const { primaryCategory } = wpPrimaryCategorySlug(
      categories
    );
    const primaryData = primaryCategory;
    const stylesIcons = `z-[5] block md:h-[44px] md:w-[44px] rounded-full p-1.5 md:p-2 text-[13px] md:text-[26px] w-[32px] h-[32px] leading-[32px] md:leading-[44px]`;
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("article", { id: postData?.slug, className: "article-divider px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "space-x-2", children: categories?.map((category, i) => {
          if (i < 2) {
            return /* @__PURE__ */ jsx(
              Button,
              {
                "aria-label": `Open ${category.name}`,
                asChild: true,
                className: cn(
                  "mb-2 h-auto rounded-full bg-muted !px-[9px] !py-[5px] uppercase text-foreground transition-all duration-300 ease-in-out hover:bg-main hover:text-white"
                ),
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    "aria-label": `Open ${category.name}`,
                    className: "text-[11px] leading-[1]",
                    href: `/${category.slug}`,
                    children: category.name
                  }
                )
              },
              category.name
            );
          }
          return;
        }) }),
        /* @__PURE__ */ jsx(
          BadgeIcon,
          {
            name: primaryData?.name,
            slug: `/${primaryData?.slug}`,
            className: stylesIcons
          }
        )
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mb-[10px] mt-4 line-clamp-none text-[1.8em] font-bold leading-[1.2] md:border-none md:text-[40px] md:leading-[43px]", children: title }),
      /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between", children: [
        /* @__PURE__ */ jsx(
          WpPostInfo,
          {
            authorName,
            authorSlug: authorUrl,
            date,
            locale,
            authorAvatarUrl: authorImg
          }
        ),
        /* @__PURE__ */ jsx(WpPostView, { className: "ml-2 flex items-center", post_slug: slug })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "text-muted-900 mb-[25px] text-[18px] leading-[1.5em] lg:text-[22px]",
          dangerouslySetInnerHTML: { __html: excerpt }
        }
      ),
      featuredImageUrl && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "relative aspect-video w-full", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: featuredImageUrl,
            className: "max-w-auto relative aspect-video w-full overflow-hidden rounded-xl object-cover",
            alt: featuredImageAlt
          }
        ) }),
        featuredImageCaption && /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-center text-xs italic text-foreground",
            dangerouslySetInnerHTML: { __html: featuredImageCaption }
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-[10px] flex flex-col", children: /* @__PURE__ */ jsx(WpPostBody, { className: "wp-body w-full", children: /* @__PURE__ */ jsxs(React.Fragment, { children: [
        firstContent,
        secondContent
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "my-6 flex flex-wrap gap-3", id: "tag", children: tags?.map((tag) => {
        return /* @__PURE__ */ jsx(
          Button,
          {
            "aria-label": `Open ${tag.name}`,
            asChild: true,
            className: cn(
              "h-auto rounded-md bg-main !px-[9px] !py-[5px] text-[11px] uppercase text-info-foreground hover:bg-main"
            ),
            children: /* @__PURE__ */ jsx(
              "a",
              {
                "aria-label": `Open ${tag.name}`,
                href: wpTagPathBySlug(tag.slug),
                children: tag.name
              }
            )
          },
          tag.slug
        );
      }) }),
      /* @__PURE__ */ jsx("section", { className: "mb-20", children: isMain === true && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("h2", { className: "border-primary-400 border-b-4 text-primary", children: "Related Posts" }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-[repeat(1,1fr)] gap-4 md:grid-cols-2", children: relatedPosts?.slice(0, 4).map((post) => {
          return /* @__PURE__ */ jsx(
            "article",
            {
              className: "border-b-2 border-border",
              children: /* @__PURE__ */ jsx(
                "a",
                {
                  "aria-label": post.title,
                  href: splitUriWP(post.uri, post.slug),
                  children: /* @__PURE__ */ jsx("p", { className: "font-semibold hover:text-primary", children: post.title })
                }
              )
            },
            post.title
          );
        }) })
      ] }) })
    ] }) });
  }
);

const splitReactNodes = (elements) => {
  const splitIndex = Math.ceil(elements.length / 2);
  return {
    firstContent: elements.slice(0, splitIndex),
    secondContent: elements.slice(splitIndex)
  };
};

const $$Astro$2 = createAstro();
function getStaticPaths$1() {
  return [{ params: { categorySlug: void 0, slug: void 0 } }];
}
const prerender = false;
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  const { categorySlug, slug } = Astro2.params;
  await wpGetAllPostsAction("ID");
  const { post: main_post, other_lang_post } = await wpGetPostBySlugAction(
    slug
  );
  let post = main_post;
  const regexId = new RegExp({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_WP_DOMAIN, "g");
  const regexEn = new RegExp({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_WP_EN_SUBDOMAIN, "g");
  const postJsonLdString = post?.seo?.schema?.raw;
  postJsonLdString?.replace(regexId, {"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_DOMAIN)?.replace(regexEn, {"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_EN_SUBDOMAIN);
  let postData;
  if (post) {
    postData = {
      id: post.id,
      postId: post.postId,
      content: post.content,
      excerpt: post.excerpt,
      title: post.title,
      authorName: post.author.name,
      authorUrl: post.author.slug,
      authorImg: post.author.avatar.url,
      categories: post.categories,
      featuredImageUrl: post.featuredImage.sourceUrl,
      featuredImageAlt: post.featuredImage.altText,
      featuredImageCaption: post.featuredImage.caption,
      date: post.date,
      slug: post.slug,
      tags: post.tags
    };
  }
  const parsedContent = ParseContent({
    htmlInput: post?.content,
    title: post?.title
  });
  const { firstContent, secondContent } = splitReactNodes(
    React__default.Children.toArray(parsedContent)
  );
  const { posts: categoryPosts } = await wpGetPostsByCategorySlugAction(
    categorySlug,
    "",
    "ID",
    post.id
  );
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="mx-auto flex w-full pt-5 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]"> <!-- <React.Suspense>
      {
        adsBelowHeader &&
          adsBelowHeader.length > 0 &&
          adsBelowHeader.map((ad) => {
            return <Ad ad={ad} key={ad.id} />
          })
      }
    </React.Suspense> --> </div> <div class="fade-up-element mx-auto flex w-full pt-5 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]"> <section class="w-full lg:w-8/12"> ${postData && renderTemplate`${renderComponent($$result2, "WpPostContent", WpPostContent, { "isMain": true, "relatedPosts": categoryPosts, "postData": postData, "firstContent": firstContent, "secondContent": secondContent, "locale": "ID" })}`} <!-- {
        posts && post && (
          <InfiniteScrollWpSinglePost
            posts={posts}
            post={post}
            locale={"ID"}
            adsBelowHeader={[]}
            adsSingleArticleAbove={[]}
            adsSingleArticleBelow={[]}
            adsSingleArticleInline={[]}
            adsSingleArticlePopUp={[]}
          />
        )
      } --> </section> <aside class="hidden w-4/12 px-4 lg:block"> <div class="sticky top-4 rounded-xl border border-border p-4"> <div class="relative mb-4"> <div class="block text-center after:absolute after:bottom-[-3px] after:left-1/2 after:right-[auto] after:top-[auto] after:ml-[-25px] after:h-[3px] after:w-[50px] after:border after:border-main after:bg-main"> <span class="block h-[36px] text-main">Trending</span> </div> </div> <!-- <React.Suspense>
          {
            trendingPosts?.map((post) => {
              return (
                <WpPostCardSide
                  key={post.id}
                  src={post.thumbnail}
                  alt={post.title}
                  uri={\`/\${post.primary_category_slug}/\${post.slug}\`}
                  title={post.title}
                />
              )
            })
          }
        </React.Suspense> --> </div> </aside> </div> ` })}`;
}, "/home/siga/Documents/teknodaim-astro/src/pages/[categorySlug]/[slug]/index.astro", void 0);
const $$file$2 = "/home/siga/Documents/teknodaim-astro/src/pages/[categorySlug]/[slug]/index.astro";
const $$url$2 = "/[categorySlug]/[slug]";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$2,
  file: $$file$2,
  getStaticPaths: getStaticPaths$1,
  prerender,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const InfiniteScrollWpPostsCategory = (props) => {
  const { id, posts, pageInfo, filteredQueries, language } = props;
  const loadMoreRef = React.useRef(null);
  const [page, setPage] = React.useState(pageInfo);
  const [list, setList] = React.useState(posts);
  const handleObserver = React.useCallback(
    async (entries) => {
      const [target] = entries;
      if (target?.isIntersecting && page.hasNextPage == true) {
        const data = await wpGetPostsByCategorySlugAction(
          id,
          page.endCursor,
          language.toLocaleUpperCase()
        );
        setList((list2) => [...list2, ...data.posts]);
        setPage(data.pageInfo);
      }
    },
    [id, language, page.endCursor, page.hasNextPage]
  );
  React.useEffect(() => {
    const lmRef = loadMoreRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      // viewport
      rootMargin: "-500px 0px 0px 0px",
      threshold: 0
    });
    if (loadMoreRef.current)
      observer.observe(loadMoreRef.current);
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef);
      }
    };
  }, [handleObserver, posts]);
  return /* @__PURE__ */ jsxs("div", { children: [
    list.map((post, index) => {
      const newUri = splitUriWP(post.uri, post.slug);
      const { primaryCategory } = wpPrimaryCategorySlug(post.categories);
      const isWordIncluded = filteredQueries?.some(
        (word) => post.title.toLowerCase().includes(word.toLowerCase())
      );
      if (isWordIncluded === true) {
        return null;
      }
      if ((index + 1) % 5 === 0) {
        return /* @__PURE__ */ jsx(
          WpPostCard,
          {
            type: "vertical",
            locale: language,
            src: post.featuredImage?.sourceUrl,
            alt: post.featuredImage?.altText,
            slug: post.slug,
            uri: newUri,
            title: post.title,
            excerpt: post.excerpt,
            authorName: post.author.name,
            authorAvatarUrl: post.author.avatar.url,
            authorUri: `/author/${post.author.slug}`,
            date: post.date,
            categoryName: primaryCategory?.name,
            categoryUri: `/${primaryCategory?.slug}`
          },
          post.id
        );
      } else {
        return /* @__PURE__ */ jsx(
          WpPostCard,
          {
            type: "horizontal",
            locale: language,
            src: post.featuredImage?.sourceUrl,
            alt: post.featuredImage?.altText,
            slug: post.slug,
            uri: newUri,
            title: post.title,
            excerpt: post.excerpt,
            authorName: post.author.name,
            authorAvatarUrl: post.author.avatar.url,
            authorUri: `/author/${post.author.slug}`,
            date: post.date,
            categoryName: primaryCategory?.name,
            categoryUri: `/${primaryCategory?.slug}`
          },
          post.id
        );
      }
    }),
    page.hasNextPage && /* @__PURE__ */ jsxs("div", { ref: loadMoreRef, children: [
      /* @__PURE__ */ jsx(PlaceholderPostCard, {}),
      /* @__PURE__ */ jsx(PlaceholderPostCard, {})
    ] })
  ] });
};

const QUERY_WP_CATEGORY_BY_SLUG = `
query CategoryBySlug($language: LanguageCodeFilterEnum = ALL, $slug: [String] = "") {
  categories(first: 1, where: {language: $language, slug: $slug}) {
    edges {
      node {
        categoryId
        description
        id
        name
        language {
          slug
        }
        seo {
          title
          schema {
            raw
          }
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          cornerstone
          focuskw
          opengraphDescription
          opengraphPublishedTime
          opengraphModifiedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
        }
        slug
        children {
          nodes {
            uri
            taxonomyName
            name
            slug
          }
        }
        translations {
          categoryId
          description
          id
          name
          language {
            slug
          }
          slug
          children {
            nodes {
              uri
              taxonomyName
              name
              slug
            }
          }
        }
      }
    }
  }
}
`;

async function wpGetCategoryBySlugAction(slug) {
  const [res, err] = await wpHttp(QUERY_WP_CATEGORY_BY_SLUG, {
    slug
  });
  if (err) {
    console.log(err);
    return {
      category: null,
      other_lang_category: null,
      err: err instanceof Error ? err.message : "An error occurred"
    };
  }
  if (res?.data.categories.edges.length === 0) {
    return {
      category: null,
      other_lang_category: null,
      err: "Something Error"
    };
  }
  const category = res?.data?.categories.edges.map(
    ({ node = {} }) => node
  )[0];
  const translations = category?.translations[0];
  return {
    category,
    other_lang_category: translations ?? null,
    err: null
  };
}

const $$Astro$1 = createAstro();
function getStaticPaths() {
  return [{ params: { categorySlug: void 0, slug: void 0 } }];
}
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const { categorySlug } = Astro2.params;
  const { category: main_category, other_lang_category } = await wpGetCategoryBySlugAction(categorySlug);
  let category = main_category;
  const categoryJsonLdString = category?.seo?.schema?.raw;
  const regexId = new RegExp({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_WP_DOMAIN, "g");
  const regexEn = new RegExp({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_WP_EN_SUBDOMAIN, "g");
  categoryJsonLdString?.replace(regexId, {"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_DOMAIN)?.replace(regexEn, {"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.NEXT_PUBLIC_EN_SUBDOMAIN);
  const { posts, pageInfo } = await wpGetPostsByCategoryIdAction(
    category.id,
    "",
    "ID"
  );
  const listPost = posts?.slice(0, posts?.length - 1);
  const infinitePosts = posts?.slice(posts?.length - 1, posts?.length);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<section class="fade-up-element mt-5 flex w-full flex-col"> <div${addAttribute(cn(
    "relative flex flex-col bg-gradient-to-r from-main/90 to-main py-10"
  ), "class")}> <div class="absolute top-1 ml-4"> <!-- <Breadcrumb
          separator={(
            <Icon.ChevronRight
              aria-label="Breadcrumb"
              class="text-[12px] text-background"
            />
          )}
        >
          <BreadcrumbItem>
            <BreadcrumbLink class="text-[12px] text-background" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem currentPage>
            <BreadcrumbLink class="text-[12px] text-background">
              {category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb> --> </div> <div class="self-center"> <h1 class="text-[36px] font-bold text-background"> ${category?.name} </h1> </div> </div> <!-- {
      adsBelowHeader &&
        adsBelowHeader.length > 0 &&
        adsBelowHeader.map((ad) => {
          return <Ad ad={ad} key={ad.id} />
        })
    } --> <!-- {
      filtered_featured_posts && filtered_featured_posts.length > 3 && (
        <div class="fade-up-element mx-auto flex w-full flex-col px-4 py-5 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
          <div class="mb-[30px]">
            <WpListPostFeatured
              locale={locale}
              posts={filtered_featured_posts}
            />
          </div>
        </div>
      )
    } --> <div class="mx-auto mt-5 flex w-full flex-row md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] lg:mx-auto lg:px-4 min-[1200px]:max-w-[1170px]"> <div class="flex w-full flex-col px-4 lg:w-8/12"> ${listPost && renderTemplate`${renderComponent($$result2, "WpListPost", WpListPost, { "locale": "ID", "posts": listPost })}`} ${infinitePosts && category && pageInfo && renderTemplate`${renderComponent($$result2, "InfiniteScrollWpPostsCategory", InfiniteScrollWpPostsCategory, { "posts": infinitePosts, "id": category.slug, "pageInfo": pageInfo, "language": "ID", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/wp/infinite-scroll-wp-posts-category", "client:component-export": "default" })}`} </div> <aside class="hidden w-4/12 px-4 lg:block"> <div class="sticky top-4 rounded-xl border border-border p-4"> <div class="relative mb-4"> <h4 class="block text-center after:absolute after:bottom-[-3px] after:left-1/2 after:right-[auto] after:top-[auto] after:ml-[-25px] after:h-[3px] after:w-[50px] after:border after:border-main after:bg-main"> <span class="block h-[36px] text-main">Trending</span> </h4> </div> <!-- {
            trendingPosts?.map((post) => {
              const isWordIncluded = queriesFilter?.queries?.some((word) =>
                post.title.toLowerCase().includes(word.toLowerCase()),
              )
              if (isWordIncluded === true) {
                return null
              }
              return (
                <WpPostCardSide
                  key={post.id}
                  src={post.thumbnail}
                  alt={post.title}
                  uri={\`/\${post.primary_category_slug}/\${post.slug}\`}
                  title={post.title}
                />
              )
            })
          } --> </div> </aside> </div> </section> ` })}`;
}, "/home/siga/Documents/teknodaim-astro/src/pages/[categorySlug]/index.astro", void 0);
const $$file$1 = "/home/siga/Documents/teknodaim-astro/src/pages/[categorySlug]/index.astro";
const $$url$1 = "/[categorySlug]";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  getStaticPaths,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const InfiniteScrollWpPost = (props) => {
  const { posts, pageInfo, language, filteredQueries } = props;
  const loadMoreRef = React.useRef(null);
  const [page, setPage] = React.useState(
    pageInfo ? pageInfo : { endCursor: "", hasNextPage: true, offsetPagination: { total: 10 } }
  );
  const [list, setList] = React.useState(
    posts ? posts : []
  );
  const handleObserver = React.useCallback(
    async (entries) => {
      const [target] = entries;
      if (target?.isIntersecting && page.hasNextPage == true) {
        const data = await wpGetAllPostsLoadMoreAction(
          page.endCursor,
          language.toLocaleUpperCase()
        );
        setList((list2) => [...list2, ...data.posts]);
        setPage(data.pageInfo);
      }
    },
    [language, page.endCursor, page.hasNextPage]
  );
  React.useEffect(() => {
    const lmRef = loadMoreRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      // viewport
      rootMargin: "-500px 0px 0px 0px",
      threshold: 0
    });
    if (loadMoreRef.current)
      observer.observe(loadMoreRef.current);
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef);
      }
    };
  }, [handleObserver, posts]);
  return /* @__PURE__ */ jsxs("div", { children: [
    list.map((post, index) => {
      const newUri = splitUriWP(post.uri, post.slug);
      const { primaryCategory } = wpPrimaryCategorySlug(post.categories);
      const isWordIncluded = filteredQueries?.some(
        (word) => post.title.toLowerCase().includes(word.toLowerCase())
      );
      if (isWordIncluded === true) {
        return null;
      }
      if ((index + 1) % 5 === 0) {
        return /* @__PURE__ */ jsx(
          WpPostCard,
          {
            type: "vertical",
            locale: language,
            src: post.featuredImage?.sourceUrl,
            alt: post.featuredImage?.altText,
            uri: newUri,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            authorName: post.author.name,
            authorAvatarUrl: post.author.avatar.url,
            authorUri: `/author/${post.author.slug}`,
            date: post.date,
            categoryUri: `/${primaryCategory?.slug}`,
            categoryName: primaryCategory?.name
          },
          post.id
        );
      } else {
        return /* @__PURE__ */ jsx(
          WpPostCard,
          {
            type: "horizontal",
            locale: language,
            src: post.featuredImage?.sourceUrl,
            alt: post.featuredImage?.altText,
            slug: post.slug,
            uri: newUri,
            title: post.title,
            excerpt: post.excerpt,
            authorName: post.author.name,
            authorAvatarUrl: post.author.avatar.url,
            authorUri: `/author/${post.author.slug}`,
            date: post.date,
            categoryName: primaryCategory?.name,
            categoryUri: `/${primaryCategory?.slug}`
          },
          post.id
        );
      }
    }),
    page.hasNextPage && /* @__PURE__ */ jsxs("div", { ref: loadMoreRef, children: [
      /* @__PURE__ */ jsx(PlaceholderPostCard, {}),
      /* @__PURE__ */ jsx(PlaceholderPostCard, {})
    ] })
  ] });
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { posts, pageInfo } = await wpGetAllPostsAction("ID");
  return renderTemplate(_a || (_a = __template(['<!-- <script> --><!--   import { trpc } from "@/utils" --><!----><!--   const publicValue = document.getElementById( --><!--     "public-greeting-value", --><!--   ) as HTMLElement --><!--   const privateValue = document.getElementById( --><!--     "private-greeting-value", --><!--   ) as HTMLElement --><!----><!--   try { --><!--     const dataPrivate = await trpc.example.private.query() --><!--     privateValue.innerHTML = dataPrivate --><!--   } catch (error) { --><!--     const dataPublic = await trpc.example.public.query() --><!--     publicValue.innerText = dataPublic --><!--   } --><!-- <\/script> -->', ""])), renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-center min-h-screen"> <div class="w-15em"> <!-- <Auth>
        {
          !user ? (
            <div class="space-y-4">
              <a href="/login/google">Sign in with Google</a>
            </div>
          ) : (
            <div class="space-y-4">
              <p
                class="text-center text-xl font-600"
                id="private-greeting-value"
              />
              <form method="post" action="/api/logout">
                <button>Sign out</button>
              </form>
            </div>
          )
        }
      </Auth> --> </div> <div class="mx-auto flex w-full flex-row md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]"> <div class="flex w-full flex-col px-4 lg:w-8/12"> <div class="mb-[25px] border-l-[3px] border-l-main px-3"> <div class="text-[18px] font-bold leading-[36px] text-main">
Teknodaim Latest
</div> </div> ${renderComponent($$result2, "InfiniteScrollWpPost", InfiniteScrollWpPost, { "language": "id", "posts": posts, "pageInfo": pageInfo, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/wp/infinite-scroll-wp-posts", "client:component-export": "default" })} </div> <aside class="hidden w-4/12 lg:block"> <div class="sticky top-4 rounded-xl border border-border p-4"> <div class="relative mb-4"> <div class="block text-center after:absolute after:bottom-[-3px] after:left-1/2 after:right-[auto] after:top-[auto] after:ml-[-25px] after:h-[3px] after:w-[50px] after:border after:border-main after:bg-main"> <span class="block h-[36px] text-main">Trending</span> </div> </div> <!-- {
            trendingPosts?.map((post) => {
              const isWordIncluded = queriesFilter?.queries?.some((word) =>
                post.title.toLowerCase().includes(word.toLowerCase()),
              )
              if (isWordIncluded === true) {
                return null
              }
              return (
                <WpPostCardSide
                  key={post.id}
                  src={post.thumbnail}
                  alt={post.title}
                  uri={\`/\${post.primary_category_slug}/\${post.slug}\`}
                  title={post.title}
                />
              )
            })
          } --> </div> </aside> </div> </div> ` }));
}, "/home/siga/Documents/teknodaim-astro/src/pages/index.astro", void 0);

const $$file = "/home/siga/Documents/teknodaim-astro/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { Button as B, Icon as I, Logo as L, index$3 as a, buttonVariants as b, cn as c, index$2 as d, index$1 as e, index as f, index$4 as i };
