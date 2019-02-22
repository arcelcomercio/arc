export const FormatClassName = styles => {
    let aux;
    if (!Array.isArray(styles) && typeof styles == 'object') {
        aux = {};
        Object.values(styles).forEach((item, index) => {
            aux[Object.keys(styles)[index]] = item.join(' ')
        })
    } else if (Array.isArray(styles) && typeof styles == 'object') {
        aux = styles.join(' ');
    }
    return aux;
}