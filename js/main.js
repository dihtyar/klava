// console.log('Fired');
const text = `Таким образом реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации дальнейших направлений развития. Идейные соображения высшего порядка, а также сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании направлений прогрессивного развития. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности требуют от нас анализа дальнейших направлений развития. С другой стороны укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании дальнейших направлений развития.
Таким образом новая модель организационной деятельности позволяет выполнять важные задания по разработке дальнейших направлений развития. Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а также рамки и место обучения кадров позволяет оценить значение форм развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности способствует подготовки и реализации новых предложений.
Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям. С другой стороны постоянный количественный рост и сфера нашей активности играет важную роль в формировании системы обучения кадров, соответствует насущным потребностям.`;

const inputElement = document.querySelector('#input');
const textExampleElement = document.querySelector('#textExample');
// console.log(inputElement, textExampleElement);
// inputElement.value = 'Это новая строка';

const lines = getLines(text);

let letterId = 1;
update();

inputElement.addEventListener('keydown', function(event){
    // console.log('Fired');
    // console.log(event);
    const currentLetter = getCurrentLetter();
    if (event.key === currentLetter.label) {
        letterId = letterId + 1;
        update();
    }
    // console.log(event.key);
});

// console.log(lines);

// Принимает длинную строку, возвращает массив строк со служебной информацией
// Accepts a long string, returns an array of strings with utility information
function getLines (text) {
    // console.log('Fired', text);
    const lines = []; 
    // let line = '';
    let line = [];
    let idCounter = 0;
    for(const letter of text){
        // console.log(letter);
        idCounter = idCounter + 1; 
        line.push({
            id: idCounter,
            label: letter,
            success: true
        });
        // line = line + letter;
        if (line.length >= 70 || letter === '\n') {
            lines.push(line);
            line = []; 
        }
    }

    if (line.length > 0) {
        lines.push(line); 
    }

    return lines;

}
// getLines(text);
// Принимает строку с объектами со служебной информацией и возвращает html - структуру
// Accepts a string with objects with service information and returns an html structure 
function lineToHtml (line){
    // <div class="line">
    //     <span class="done"> На переднем плане, прямо перед</span> 
    //     <span class="hint">н</span>ами, расположен был дворик, где стоял
    // </div>

    const divElement = document.createElement('div');
    divElement.classList.add('line');

    for (const letter of line) {
        const spanElement = document.createElement('span');
        spanElement.textContent = letter.label;

        divElement.append(spanElement);

        if (letterId > letter.id) {
            spanElement.classList.add('done');
        }

    }

    return divElement;
    // console.log(divElement);

}

// Возвращает актуальній номер строки
// Returns the current line number
function getCurrentLineNumber () {
    for (let i = 0; i < lines.length; i++){
        for (const letter of lines[i]) {
            if(letter.id === letterId){
                return i;
            }
        }
    }
}

// Функция обновления 3-х отображаемых актуальных строк
// Function of updating 3 displayed actual lines
function update () {
    const currentLineNumber = getCurrentLineNumber();
    textExampleElement.innerHTML = '';

    // for (const line of lines) {
    //     const html = lineToHTML(line);
    //     textExampleElement.append(html);
    // }
    for (let i = 0; i < lines.length; i++){
        const html = lineToHtml(lines[i]);
        // console.log(html);
        textExampleElement.append(html);
        if (i < currentLineNumber || i > currentLineNumber + 2) {
            html.classList.add('hidden');
        }
    }
}

// Возвращает объект символа ожидаемый програмой
// Returns the character object expected by the program
function getCurrentLetter () {
    for (const line of lines) {
        for (const letter of line) {
            if (letterId === letter.id) {
                return letter;
            }
        }
    }
}



