export const validityThemeLocalStorage = () => {
    const storageValue = localStorage.getItem("theme")
    if (storageValue) {
        return JSON.parse(storageValue)
    } else return
}
