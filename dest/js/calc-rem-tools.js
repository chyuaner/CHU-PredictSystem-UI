// http://tzi.fr/js/snippet/convert-em-in-px
function getRootElementFontSize( ) {
    // Returns a number
    return parseFloat(
        // of the computed font-size, so in px
        getComputedStyle(
            // for the root <html> element
            document.documentElement
        )
        .fontSize
    );
}
function convertRem(value) {
    return value * getRootElementFontSize();
}
