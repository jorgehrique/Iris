const trainingData = tf.tensor2d([
    [1, 1, 1],
    [1, 0, 0],
    [0, 1, 1],
    [0, 1, 0],
    [0, 0, 0]
])

const trainingLabels = tf.tensor2d([
    [1],
    [1],
    [1],
    [1],
    [0]
])

const model = tf.sequential()

const hiddenLayer = tf.layers.dense({
    units: 4,
    activation: 'sigmoid',
    inputShape: [3]
})

const outputLayer = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
})

model.add(hiddenLayer)
model.add(outputLayer)

model.compile({
    loss: tf.losses.meanSquaredError,
    optimizer: tf.train.sgd(0.1)
})

const inputs = tf.tensor2d([
    [0, 1, 1],
    [0, 0, 0]
])

async function train(){
    for(let i = 0; i < 20; i++){
        const response = await model.fit(trainingData, trainingLabels, {
            epochs: 200
        })
        console.log(`Error Rate: ${response.history.loss[0]}`)
    }
}

train().then(() => {
    console.log('training complete')
    model.predict(inputs).print()
})