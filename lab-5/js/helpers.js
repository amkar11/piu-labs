export default function pickColor() {
    const rgbNumbers = [...new Array(3)].map(() =>
        Math.round(Math.random() * 255),
    );
    console.log(rgbNumbers);
    return `rgb(${rgbNumbers.join(', ')})`;
}
