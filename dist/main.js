/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/chatBot.js":
/*!************************!*\
  !*** ./src/chatBot.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initialize: () => (/* binding */ initialize)\n/* harmony export */ });\nconst chatUrl = \"http://127.0.0.1:11434/api/chat\";\n\nasync function getResponse(question, callback) {\n  const body = {\n    model: \"qwen:0.5b\",\n    messages: [\n      {\n        role: \"user\",\n        content: question,\n      },\n    ],\n    stream: true,\n  };\n\n  const response = await fetch(chatUrl, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\",\n    },\n    body: JSON.stringify(body),\n  });\n\n  async function readStream(data) {\n    const decode = new TextDecoder(\"utf-8\");\n    const reader = data.body.getReader();\n    let result = \"\";\n\n    while (true) {\n      const { value, done } = await reader.read();\n      if (done) {\n        break;\n      }\n      const text = decode.decode(value);\n      const parts = text.split(\"\\n\");\n      for (let i = 0; i < parts.length; i++) {\n        if (parts[i] === \"\") {\n          continue;\n        }\n\n        try {\n          const json = JSON.parse(parts[i]);\n          result += json[\"message\"][\"content\"];\n          callback(result);\n        } catch {\n          console.log(\"Error: \" + parts[i]);\n        }\n      }\n    }\n  }\n\n  await readStream(response);\n}\n\nfunction sendMessage() {\n  const question = document.querySelector(\".chat-input\").value;\n\n  getResponse(question, console.log);\n}\n\ndocument.querySelector(\".send-msg\").addEventListener(\"click\", sendMessage);\n\n\nfunction initialize() {\n  sendMessage();\n  getResponse(\"Hello\", console.log);\n}\n\n//# sourceURL=webpack://calmify/./src/chatBot.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chatBot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatBot */ \"./src/chatBot.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  (0,_chatBot__WEBPACK_IMPORTED_MODULE_0__.initialize)();\n});\n\n//# sourceURL=webpack://calmify/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;