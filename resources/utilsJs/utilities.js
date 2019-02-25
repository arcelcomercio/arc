export const FormatClassName = styles => {
    let aux;
    if (!Array.isArray(styles) && typeof styles == 'object') {
        aux = {};
        Object.values(styles).forEach((item, index) => {
            if (!Array.isArray(item)) {
                aux[Object.keys(styles)[index]] = item
            } else
                aux[Object.keys(styles)[index]] = item.join(' ')
        })
    } else if (Array.isArray(styles) && typeof styles == 'object')
        aux = styles.join(' ');
    return aux;
}