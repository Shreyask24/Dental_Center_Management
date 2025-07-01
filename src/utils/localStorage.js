export const initLocalStorage = (data) => {
    for (const key in data) {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(data[key]));
            console.log(data)
        }
    }
};

export const getData = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
};

export const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const removeData = (key) => {
    localStorage.removeItem(key);
};
