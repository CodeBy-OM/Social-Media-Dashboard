class LocalStorage {
  static setItem(key, value) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static getItem(key) {
    if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(key);
      try {
        return item ? JSON.parse(item) : null;
      } catch {
        return item;
      }
    }
    return null;
  }

  static removeItem(key) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  static clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }
}

export default LocalStorage;