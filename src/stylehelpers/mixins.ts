import { css } from 'styled-components';

/**
 * Mixin um zwischen zwei Breakpoints Pixelwerte fließend in Abhängigkeit des Viewports zu skalieren
 * @param  {String} cssProp CSS Propterty {String}
 * @param  {String} minxPxValue minimaler Pixelwert
 * @param  {String} maxPxValue maximaler Pixelwert
 * @param  {String} minViewportWidth minimaler Viewport, untere Grenze
 * @param  {String} maxViewportWidth maximaler Viewport, obere Grenze
 * @param  {boolean} noMobileMQ Name ist Programm
 * @param  {boolean} usePixel Pixel statt REM
 * @param  {boolean} important Name ist Programm
 * @return {String}
 * @example
 *         ${vwMinMax('font-size', 18, 22, 320, 1920)};
 */
export const vwMinMax = (
    cssProp,
    minPxValue,
    maxPxValue,
    minViewport,
    maxViewport,
    noMobileMQ = false,
    usePixel,
    important
) => {
    const vwOrVh = cssProp === 'top' || cssProp === 'bottom' ? 'vh' : 'vw';
    const widthOrHeight =
        cssProp === 'top' || cssProp === 'bottom' ? 'height' : 'width';
    const viewportIncrease = maxViewport - minViewport;

    const minMax = (min, max) => {
        const increase = max - min;
        return `
            calc(${(increase / viewportIncrease) * 100}${vwOrVh} + ${
            min - (increase / viewportIncrease) * minViewport
        }px)
        `;
    };

    let maxValue = usePixel ? `${maxPxValue}px` : remCalc(maxPxValue);
    let minValue = usePixel ? `${minPxValue}px` : remCalc(minPxValue);
    let minMaxValue = minMax(minPxValue, maxPxValue);

    // Wenn es multiple Werte sind, ggf. für padding etc.
    if (Array.isArray(minPxValue) && Array.isArray(maxPxValue)) {
        maxValue = usePixel
            ? maxPxValue.map(value => `${value}px`).join(' ')
            : maxPxValue.map(value => remCalc(value)).join(' ');

        minValue = usePixel
            ? minPxValue.map(value => `${value}px`).join(' ')
            : minPxValue.map(value => remCalc(value)).join(' ');

        minMaxValue = minPxValue
            .map((value, index) => minMax(value, maxPxValue[index]))
            .join(' ');
    }

    const mobileMQ = !noMobileMQ
        ? `${cssProp}: ${minValue}${important ? ' !important' : ''};`
        : '';

    return `

       ${mobileMQ};

        @media (min-${widthOrHeight}: ${remCalc(minViewport)}) {
            ${cssProp}: ${minMaxValue}${important ? ' !important' : ''};
        }

        @media (min-${widthOrHeight}: ${remCalc(maxViewport)}) {
            ${cssProp}: ${maxValue}${important ? ' !important' : ''};
        }
    `;
};

/**
 * Mixin um Pixel zu REM zu konvertieren
 * @param  {Array} values Beliebige Anzahl von Zahlen
 * @return {String}
 * @example
 *     padding: ${remCalc(5, 20, 0)}; ===> padding: 0.3125rem 1.25rem 0;
 */
export const remCalc = (...values) =>
    values
        .map(value => {
            const numVal = parseInt(value, 10);

            return numVal === 0 ? '0' : `${numVal / 16}rem`;
        })
        .join(' ');

/**
 * Format a given telephone number into a more readable representation
 * @param {string} tel The telephone number to format ("004971196880810")
 *
 * @example formatTel('004971196880810') => '+49 (0) 711 968 808 10'
 */
export const formatTel = tel =>
    (([t]) => `+${t[1]} (0) ${t[2]} ${t[3]} ${t[4]} ${t[5]}`)([
        ...tel.matchAll(/^00(\d{2})(\d{3})(\d{3})(\d{3})(\d+)/g),
    ]);
