let r, g, b;
let buttons = [];
     
function setup(){
    createCanvas(400, 400)
    changeColor()
    
    // Cria botões para cada classificação de cor
    coresList.forEach(cor => {
        buttons.push(createButton(cor))
    })

    // Adiciona evento de enviar dados no botão
    buttons.forEach(button => {
        button.mousePressed(sendToFirebase)
    })    

    let mudarCorButton = createButton('Mudar Cor')
    mudarCorButton.mousePressed(changeColor)

    let exportButton = createButton('Exportar JSON')
    exportButton.mousePressed(exportToJsonFile)
}

function changeColor(){
    r = floor(random(256))
    g = floor(random(256))
    b = floor(random(256))
    background(r, g, b)
}

function sendToFirebase(){ 
    let firebaseColors = database.ref('colors')
    let data = {
        'r': r,
        'g': g,
        'b': b,
        'label': this.html()
    }
    firebaseColors.push(data, error => {
        if(error)
            console.log(`Oops, something went wrong - ${error}`)
        else 
            console.log(`Data saved successfully - ${data.label} - (${data.r}, ${data.g}, ${data.b})`)
    })
    changeColor()
}

function exportToJsonFile(){
    getFromFirebase().then(cores => {
        saveJSON(cores, 'CoresDataset.json')
    })
}