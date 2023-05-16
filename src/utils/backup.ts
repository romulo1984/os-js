const whiteList = ['Math', 'Number', 'Object', 'Boolean', 'Array', 'console']
const blackList = Object
    .getOwnPropertyNames(window)
    .filter(function (x) {
        return whiteList.indexOf(x) === -1 && !/^[^a-zA-Z]|\W/.test(x)
    })

const listLen = blackList.length
const blankList = (new Array(listLen+1)).fill(undefined)

function runFunction(){
    'use-strict'
    blackList.push.apply(blackList, arguments)
    blackList[blackList.length - 1] = '"use-strict";' + arguments[arguments.length-1]

    const newFunc = Function.apply(
        Function,
        blackList
    )

    blackList.length = listLen

    return newFunc.bind.apply(newFunc, blackList)
}