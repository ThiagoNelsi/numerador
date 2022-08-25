const input = document.getElementById('input');
const output = document.getElementById('output');
const copyAlert = document.getElementById('copy-alert');

function leftPad(value, totalWidth) {
    const length = totalWidth - value.toString().length + 1;
    return Array(length).join(' ') + value;
};

function numerar() {
    const lines = input.value.split('\n');

    const width = String(lines.length).length;

    const numeredLines = lines.map((line, index) => {
        const lineNumber = leftPad(index + 1, width);
        return `${lineNumber}  ${line}`;
    })

    const text = numeredLines.join('\n');

    output.value = text;
}

function fallbackCopy() {
    output.select();
    document.execCommand('copy');
};

function copy() {
    // fallback
    if (!navigator.clipboard) {
        fallbackCopy();
        return;
    }
    navigator.clipboard.writeText(output.value)
        .then(() => {
            copyAlert.style.top = '20px';
            setTimeout(() => {
                copyAlert.style.top = '-100px';
            }, 2000);
        })
        .catch(fallbackCopy);
}