export function replaceSlashes(url: string) {
    if (!url) return ''
    return url.replace(/\//g, '\\')
}
export function capitalizeFirstLetter(str: string) {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1);
}
