let r, g, b;

let database;

const cores = 
    ['vermelho', 'verde', 'azul', 'preto', 'amarelo',
     'rosa', 'cinza', 'marom', 'laranja'];
     
function setup(){
    createCanvas(100, 100)
    r = floor(random(256))
    g = floor(random(256))
    b = floor(random(256))
    background(r, g, b)
    
    let buttons = []
    
    cores.forEach(cor => {
        buttons.push(createButton(cor))
    })

    buttons.forEach(button => {
        button.mousePressed(sendToFirebase)
    })    

    let mudarCorButton = createButton('Mudar Cor')
    mudarCorButton.mousePressed(changeColor)

    let exportButton = createButton('Exportar JSON')
    exportButton.mousePressed(exportToJsonFile)

    database = firebase.database()   
}

function changeColor(){
    r = floor(random(256))
    g = floor(random(256))
    b = floor(random(256))
    background(r, g, b)
}

function sendToFirebase(){ 
    let colorDataSet = database.ref('colors')
    let data = {
        'r': r,
        'g': g,
        'b': b,
        'label': this.html()
    }
    colorDataSet.push(data, error => {
        if(error)
            console.log(`Oops, something went wrong - ${error}`)
        else 
            console.log(`Data saved successfully - ${data.label} - (${data.r}, ${data.g}, ${data.b})`)
    })
    changeColor()
}

function getFromFirebase(){
    return database
    .ref("/colors/")
    .once("value")
    .then(snapshot => Object.values(snapshot.val()));
}

function exportToJsonFile(){
    getFromFirebase().then(cores => {
        saveJSON(cores, 'CoresDataset.json')
    })
}

function draw(){

}