let data = [], labels = []
let database;
let totalCores;

function preload(){
    database = firebase.database()    
}

function setup(){
    totalCores = coresList.length
    getFromFirebase().then(results => {
        results.forEach(row => {
            data.push([
                row.r / 255,
                row.g / 255,
                row.b / 255
            ])
            labels.push(coresList.indexOf(row.label))
        });
        something(data, labels)    
    })
}

function something(data, labels){    
    const xs = tf.tensor2d(data)
    const labelsTensor = tf.tensor1d(labels, 'int32')
    const ys = tf.oneHot(labelsTensor, totalCores)
    labelsTensor.dispose()

    xs.print()
    ys.print()

    const model = tf.sequential()

    const hiddenLayer = tf.layers.dense({
        units: 16,
        activation: 'sigmoid',
        inputShape: [3]
    })

    const outputLayer = tf.layers.dense({
        units: totalCores,
        activation: 'softmax'
    })

    model.add(hiddenLayer)
    model.add(outputLayer)

    model.compile({
        loss: 'categoricalCrossentropy',
        optimizer: tf.train.sgd(0.2)
    })

    async function train(){
        for(let i = 0; i < 10; i++){
            const response = await model.fit(xs, ys, {
                epochs: 1000
            })
            console.log(`Err rate: ${response.history.loss[0]}`)
        }
    }

    train().then(() => {
        console.log('training complete!')
        const test = tf.tensor2d([
            [0.854902 , 0.6705883, 0.7372549],
            [0.1019608, 0.8470588, 0.6078432],
            [0.0941176, 0.1098039, 0.2078431]
        ])
        model.predict(test).print()
    })
}

function getFromFirebase(){
    return database
    .ref("/colors/")
    .once("value")
    .then(snapshot => Object.values(snapshot.val()));
}

function draw(){

}