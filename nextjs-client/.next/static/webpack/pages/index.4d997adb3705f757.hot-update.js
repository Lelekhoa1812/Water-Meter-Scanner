"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/Home.module.css */ \"./styles/Home.module.css\");\n/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3__);\n// frontend nextjs-client/pages/index.js\n\nvar _s = $RefreshSig$();\n\n // For setting the title and meta information\n\nfunction Home() {\n    _s();\n    const [fileName, setFileName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [result, setResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    // Don't implement wave effect\n    // useEffect(() => {\n    //   const canvas = document.getElementById('waveCanvas');\n    //   const ctx = canvas.getContext('2d');\n    //   canvas.width = window.innerWidth;\n    //   canvas.height = window.innerHeight;\n    //   let waveOffset = 0;\n    //   const wave = () => {\n    //     ctx.clearRect(0, 0, canvas.width, canvas.height);\n    //     ctx.fillStyle = '#0077be';\n    //     ctx.beginPath();\n    //     for (let x = 0; x < canvas.width; x++) {\n    //       const y =\n    //         Math.sin((x + waveOffset) * 0.05) * 10 +\n    //         Math.sin((x + waveOffset) * 0.1) * 5 +\n    //         20;\n    //       ctx.lineTo(x, canvas.height - y);\n    //     }\n    //     ctx.lineTo(canvas.width, canvas.height);\n    //     ctx.lineTo(0, canvas.height);\n    //     ctx.closePath();\n    //     ctx.fill();\n    //     waveOffset += 2;\n    //     requestAnimationFrame(wave);\n    //   };\n    //   wave();\n    //   const handleResize = () => {\n    //     canvas.width = window.innerWidth;\n    //     canvas.height = window.innerHeight;\n    //   };\n    //   window.addEventListener('resize', handleResize);\n    //   return () => {\n    //     window.removeEventListener('resize', handleResize);\n    //   };\n    // }, []);\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        setError('');\n        setResult(null);\n        setIsLoading(true);\n        try {\n            const response = await fetch('/api/extract', {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify({\n                    fileName\n                })\n            });\n            if (!response.ok) {\n                throw new Error('Failed to fetch OCR data');\n            }\n            const data = await response.json();\n            setResult(data);\n        } catch (err) {\n            setError(\"Error: \".concat(err.message, \". Please check the file name or try again later.\"));\n        } finally{\n            setIsLoading(false);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Water Meter OCR\"\n                    }, void 0, false, {\n                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                        lineNumber: 85,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"website icon\",\n                        type: \"png\",\n                        href: \"imgsrc/logo.png\"\n                    }, void 0, false, {\n                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                        lineNumber: 86,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                lineNumber: 84,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().container),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().background)\n                    }, void 0, false, {\n                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                        lineNumber: 90,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().overlay),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                src: \"/imgsrc/logo.png\",\n                                alt: \"Water Meter OCR Logo\",\n                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().logo),\n                                width: \"40%\"\n                            }, void 0, false, {\n                                fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                lineNumber: 92,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().title),\n                                children: \"Water Meter OCR\"\n                            }, void 0, false, {\n                                fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                lineNumber: 98,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                                onSubmit: handleSubmit,\n                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().form),\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                        type: \"text\",\n                                        placeholder: \"Enter file name\",\n                                        value: fileName,\n                                        onChange: (e)=>setFileName(e.target.value),\n                                        required: true,\n                                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().input)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                        lineNumber: 100,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        type: \"submit\",\n                                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().button),\n                                        children: \"Extract Data\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                        lineNumber: 108,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                lineNumber: 99,\n                                columnNumber: 11\n                            }, this),\n                            isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().spinnerContainer),\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().spinner)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                        lineNumber: 115,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: \"Image is being processed...\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                        lineNumber: 116,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                lineNumber: 114,\n                                columnNumber: 13\n                            }, this),\n                            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().error),\n                                children: error\n                            }, void 0, false, {\n                                fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                lineNumber: 120,\n                                columnNumber: 21\n                            }, this),\n                            result && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().result),\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                        children: \"Results\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                        lineNumber: 124,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: [\n                                            \"File Name: \",\n                                            result.fileName\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                        lineNumber: 125,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: [\n                                            \"Values: \",\n                                            result.values\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                        lineNumber: 126,\n                                        columnNumber: 15\n                                    }, this),\n                                    result.missingFields.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().missing),\n                                        children: [\n                                            \"Missing values at fields: \",\n                                            result.missingFields.join(', ')\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                        lineNumber: 128,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                                lineNumber: 123,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                        lineNumber: 91,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/khoale/Downloads/water-meter-ocr/nextjs-client/pages/index.js\",\n                lineNumber: 89,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(Home, \"3ORMkJBTcfuPqlEKGtpwB/KS+w4=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FBV2hDLGlGQUF1Qjs7a0RBQ3JDLDhEQUFDK0I7d0NBQUlDLFdBQVdoQyx3RUFBYzs7Ozs7O2tEQUM5Qiw4REFBQ3FEO2tEQUFFOzs7Ozs7Ozs7Ozs7NEJBSU4vQyx1QkFBUyw4REFBQytDO2dDQUFFckIsV0FBV2hDLHNFQUFZOzBDQUFHTTs7Ozs7OzRCQUV0Q0Ysd0JBQ0MsOERBQUMyQjtnQ0FBSUMsV0FBV2hDLHVFQUFhOztrREFDM0IsOERBQUNzRDtrREFBRzs7Ozs7O2tEQUNKLDhEQUFDRDs7NENBQUU7NENBQVlqRCxPQUFPRixRQUFROzs7Ozs7O2tEQUM5Qiw4REFBQ21EOzs0Q0FBRTs0Q0FBU2pELE9BQU9tRCxNQUFNOzs7Ozs7O29DQUN4Qm5ELE9BQU9vRCxhQUFhLENBQUNDLE1BQU0sR0FBRyxtQkFDN0IsOERBQUNKO3dDQUFFckIsV0FBV2hDLHdFQUFjOzs0Q0FBRTs0Q0FDREksT0FBT29ELGFBQWEsQ0FBQ0csSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTdkU7R0FwSXdCMUQ7S0FBQUEiLCJzb3VyY2VzIjpbIi9Vc2Vycy9raG9hbGUvRG93bmxvYWRzL3dhdGVyLW1ldGVyLW9jci9uZXh0anMtY2xpZW50L3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGZyb250ZW5kIG5leHRqcy1jbGllbnQvcGFnZXMvaW5kZXguanNcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnOyAvLyBGb3Igc2V0dGluZyB0aGUgdGl0bGUgYW5kIG1ldGEgaW5mb3JtYXRpb25cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzL0hvbWUubW9kdWxlLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IFtmaWxlTmFtZSwgc2V0RmlsZU5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbcmVzdWx0LCBzZXRSZXN1bHRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIERvbid0IGltcGxlbWVudCB3YXZlIGVmZmVjdFxuICAvLyB1c2VFZmZlY3QoKCkgPT4ge1xuICAvLyAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3YXZlQ2FudmFzJyk7XG4gIC8vICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgLy8gICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgLy8gICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gIC8vICAgbGV0IHdhdmVPZmZzZXQgPSAwO1xuICAvLyAgIGNvbnN0IHdhdmUgPSAoKSA9PiB7XG4gIC8vICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgLy8gICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwNzdiZSc7XG4gIC8vICAgICBjdHguYmVnaW5QYXRoKCk7XG4gIC8vICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNhbnZhcy53aWR0aDsgeCsrKSB7XG4gIC8vICAgICAgIGNvbnN0IHkgPVxuICAvLyAgICAgICAgIE1hdGguc2luKCh4ICsgd2F2ZU9mZnNldCkgKiAwLjA1KSAqIDEwICtcbiAgLy8gICAgICAgICBNYXRoLnNpbigoeCArIHdhdmVPZmZzZXQpICogMC4xKSAqIDUgK1xuICAvLyAgICAgICAgIDIwO1xuICAvLyAgICAgICBjdHgubGluZVRvKHgsIGNhbnZhcy5oZWlnaHQgLSB5KTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIGN0eC5saW5lVG8oY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgLy8gICAgIGN0eC5saW5lVG8oMCwgY2FudmFzLmhlaWdodCk7XG4gIC8vICAgICBjdHguY2xvc2VQYXRoKCk7XG4gIC8vICAgICBjdHguZmlsbCgpO1xuXG4gIC8vICAgICB3YXZlT2Zmc2V0ICs9IDI7XG4gIC8vICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUod2F2ZSk7XG4gIC8vICAgfTtcbiAgLy8gICB3YXZlKCk7XG5cbiAgLy8gICBjb25zdCBoYW5kbGVSZXNpemUgPSAoKSA9PiB7XG4gIC8vICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgLy8gICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIC8vICAgfTtcbiAgLy8gICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlUmVzaXplKTtcblxuICAvLyAgIHJldHVybiAoKSA9PiB7XG4gIC8vICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlUmVzaXplKTtcbiAgLy8gICB9O1xuICAvLyB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0RXJyb3IoJycpO1xuICAgIHNldFJlc3VsdChudWxsKTtcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9leHRyYWN0Jywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZmlsZU5hbWUgfSksXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBPQ1IgZGF0YScpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgc2V0UmVzdWx0KGRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0RXJyb3IoXG4gICAgICAgIGBFcnJvcjogJHtlcnIubWVzc2FnZX0uIFBsZWFzZSBjaGVjayB0aGUgZmlsZSBuYW1lIG9yIHRyeSBhZ2FpbiBsYXRlci5gXG4gICAgICApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPldhdGVyIE1ldGVyIE9DUjwvdGl0bGU+XG4gICAgICAgIDxsaW5rIHJlbD1cIndlYnNpdGUgaWNvblwiIHR5cGU9XCJwbmdcIiBocmVmPVwiaW1nc3JjL2xvZ28ucG5nXCIgLz5cblxuICAgICAgPC9IZWFkPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJhY2tncm91bmR9PjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm92ZXJsYXl9PlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi9pbWdzcmMvbG9nby5wbmdcIlxuICAgICAgICAgICAgYWx0PVwiV2F0ZXIgTWV0ZXIgT0NSIExvZ29cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMubG9nb31cbiAgICAgICAgICAgIHdpZHRoPVwiNDAlXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9e3N0eWxlcy50aXRsZX0+V2F0ZXIgTWV0ZXIgT0NSPC9oMT5cbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSBjbGFzc05hbWU9e3N0eWxlcy5mb3JtfT5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgZmlsZSBuYW1lXCJcbiAgICAgICAgICAgICAgdmFsdWU9e2ZpbGVOYW1lfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZpbGVOYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPXtzdHlsZXMuYnV0dG9ufT5cbiAgICAgICAgICAgICAgRXh0cmFjdCBEYXRhXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgICB7aXNMb2FkaW5nICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc3Bpbm5lckNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc3Bpbm5lcn0+PC9kaXY+XG4gICAgICAgICAgICAgIDxwPkltYWdlIGlzIGJlaW5nIHByb2Nlc3NlZC4uLjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7ZXJyb3IgJiYgPHAgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3J9PntlcnJvcn08L3A+fVxuXG4gICAgICAgICAge3Jlc3VsdCAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJlc3VsdH0+XG4gICAgICAgICAgICAgIDxoMj5SZXN1bHRzPC9oMj5cbiAgICAgICAgICAgICAgPHA+RmlsZSBOYW1lOiB7cmVzdWx0LmZpbGVOYW1lfTwvcD5cbiAgICAgICAgICAgICAgPHA+VmFsdWVzOiB7cmVzdWx0LnZhbHVlc308L3A+XG4gICAgICAgICAgICAgIHtyZXN1bHQubWlzc2luZ0ZpZWxkcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5taXNzaW5nfT5cbiAgICAgICAgICAgICAgICAgIE1pc3NpbmcgdmFsdWVzIGF0IGZpZWxkczoge3Jlc3VsdC5taXNzaW5nRmllbGRzLmpvaW4oJywgJyl9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkhlYWQiLCJzdHlsZXMiLCJIb21lIiwiZmlsZU5hbWUiLCJzZXRGaWxlTmFtZSIsInJlc3VsdCIsInNldFJlc3VsdCIsImVycm9yIiwic2V0RXJyb3IiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJFcnJvciIsImRhdGEiLCJqc29uIiwiZXJyIiwibWVzc2FnZSIsInRpdGxlIiwibGluayIsInJlbCIsInR5cGUiLCJocmVmIiwiZGl2IiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwiYmFja2dyb3VuZCIsIm92ZXJsYXkiLCJpbWciLCJzcmMiLCJhbHQiLCJsb2dvIiwid2lkdGgiLCJoMSIsImZvcm0iLCJvblN1Ym1pdCIsImlucHV0IiwicGxhY2Vob2xkZXIiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwicmVxdWlyZWQiLCJidXR0b24iLCJzcGlubmVyQ29udGFpbmVyIiwic3Bpbm5lciIsInAiLCJoMiIsInZhbHVlcyIsIm1pc3NpbmdGaWVsZHMiLCJsZW5ndGgiLCJtaXNzaW5nIiwiam9pbiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n"));

/***/ })

});