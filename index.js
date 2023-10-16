function applyTypingEffect(htmlContent, containerId) {
    const container = document.querySelector(`#${containerId}`);
    container.innerHTML = "";

    let i = 0;
    let currentTag = "";
    const typingInterval = setInterval(() => {
        if (i >= htmlContent.length) {
            clearInterval(typingInterval);
        }
        if (htmlContent[i] === "<") {
            const tagEnd = htmlContent.indexOf(">", i) + 1;
            currentTag = htmlContent.slice(i, tagEnd);
            container.insertAdjacentHTML("beforeend", currentTag);
            i = tagEnd;
        } else if (htmlContent[i] === "&") {
            const entityEnd = htmlContent.indexOf(";", i) + 1;
            container.insertAdjacentHTML("beforeend", htmlContent.slice(i, entityEnd));
            i = entityEnd;
        } else {
            const tagContentEl = document.createElement("span");
            tagContentEl.classList.add("tag-content");
            const tagContent = htmlContent.slice(i, htmlContent.indexOf("<", i));
            tagContentEl.innerHTML = tagContent;
            container.lastChild.appendChild(tagContentEl);
            i += tagContent.length;
        }
    }, 20);
}





const code = `///Welcome to my site!
function whoAmI(){
|   return "Nicola Calvio";
}
 
function whatIDo(){
|   return "Full stack Developer";
}
 
console.log(whoAmI() + whatIDo());`;


const container = document.createElement('div');
container.id = "temp";

let lineNumber = 1;
let highlightedLine = '';
let isFunction = false;
let isReturn = false;
let isConsole= false;


let indexFunctionChar = 0;
let indexReturnChar = 0;
let indexConsoleChar = 0;


code.split('\n').forEach(line => {
    highlightedLine = `<span class="line-number">${lineNumber}</span>`;

    for (let i = 0; i < line.length; i++) {
        const char = line.charAt(i);
        const prevChar = line.charAt(i - 1);

        if (char === '/') {
            if (prevChar === '/') {
                highlightedLine += `<span class="comment">${line.substring(i)}</span>`;
                break;
            } else if (prevChar === '*') {
                highlightedLine += `<span class="comment">${line.substring(i)}</span>`;
                break;
            }
        } else if (char === '"') {
            highlightedLine += `<span class="string">${line.substring(i, line.indexOf('"', i + 1) + 1)}</span>`;
            i += line.substring(i, line.indexOf('"', i + 1) + 1).length - 1;
        }else if(char === 'f' || isFunction){
            if(char === 'f'){
                isFunction = (line.substring(i, 8) === "function");
            }
            indexFunctionChar++;
            highlightedLine += `<span class="function">${char}</span>`;
            if(char === 'n' && indexFunctionChar === 8){
                isFunction = false;
                indexFunctionChar = 0;
            }
        }else if(char === 'r' || isReturn){
            if(char === 'r' && indexReturnChar === 0){
                isReturn = (line.substring(i, i+6) === "return");
            }
            indexReturnChar++;
            highlightedLine += `<span class="return">${char}</span>`;
            if(char === 'n' && indexReturnChar === 6){
                isReturn = false;
                indexReturnChar = 0;
            }
        }else if(char === 'c' || isConsole){
            if(char === 'c' && indexConsoleChar === 0){
                isConsole = (line.substring(i, i+7) === "console");
            }
            indexConsoleChar++;
            highlightedLine += `<span class="console">${char}</span>`;
            if(char === 'e' && indexConsoleChar === 7){
                isConsole = false;
                indexConsoleChar = 0;
            }
        } else if (/\W/.test(char)) {
            if (line.substring(i, i + 3) === 'var' || line.substring(i, i + 3) === 'let' || line.substring(i, i + 5) === 'const') {
                highlightedLine += `<span class="keyword">${line.substring(i, i + 5)}</span>`;
                i += 4;
            } else {
                if(char === '(' || char === ')' || char ==='{' || char==='}' || char === '+'){
                    highlightedLine += `<span class="parenthesis">${char}</span>`;
                }else{
                    highlightedLine += `<span class="identifier">${char}</span>`;
                }
            }
        } else {
            highlightedLine += `<span class="identifier">${char}</span>`;
        }
    }
    container.innerHTML += highlightedLine + '\n';
    lineNumber++;
});
document.querySelectorAll('.portfolio_link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.contact').style.display = "none";
        document.querySelector('.portfolio').style.display = "";
    });
});
document.querySelectorAll('.contattami_link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.contact').style.display = "";
        document.querySelector('.portfolio').style.display = "none";
    });
});
applyTypingEffect(container.innerHTML, 'battitura');