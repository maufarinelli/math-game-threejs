// @ts-nocheck

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

class sessionStorageMock {
  store = {};
  setItem = (key, val) => (this.store[key] = val);
  getItem = (key) => this.store[key];
  removeItem = (key) => {
    delete this.store[key];
  };
  clear = () => (this.store = {});
}

Object.defineProperty(window, "sessionStorage", {
  value: new sessionStorageMock(),
});
