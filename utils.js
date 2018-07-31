const circle = function (array, index) {
    let len = array.length
    let i = index % len
    if (i < 0) {
        i += len
    }
    return array[i]
}

const randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const shuffle = (array) => {
    let i = array.length -1
    while (i > 0) {
        let j = randomInt(0, i+1)
        let t = array[i]
        array[i] = array[j]
        array[j] = t

        i -= 1
    }
    return array
}

const isPrime = function (n) {
    if (n <= 1) {
        return false
    }

    let root = Math.sqrt(n)
    for (let i = 2; i <= root; i += 1) {
        if (n % i === 0) {
            return false
        }
    }

    return true
}

const product = (arr1, arr2) => {
    let list = []
    for (let i = 0; i < arr1.length; i += 1) {
        for (let j = 0; j < arr2.length; j += 1) {
            list.push([arr1[i], arr2[j]])
        }
    }
    return list
}

const inOrder = () => {
    const observers = []
    const apply = (funcs, ...args) => {
        funcs.forEach(func => func(...args))
    }
    let _promise = Promise.resolve()

    return {
        subscribe(func) {
            observers.push(func)
        },
        next(value) {
            _promise =
                _promise.then(() => {
                    return value
                })
                .then((v) => {
                    apply(observers, v)
                })
        },
    }
}

// log
const log = console.log.bind(console)

const tog = (...args) => {
    log(`[${Date.now() / 1000}]:\n`, ...args)
}

// DOM
const e = (selector) => {
    return document.querySelector(selector)
}

const appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
}

const onEvent = (obj) => {
    const _onEvent = (element, selector, eventName, callback) => {
        const action = (event) => {
            const self = event.target
            if (self.matches(selector)) {
                callback.call(self, event)
            }
        }
        element.addEventListener(eventName, action)
    }

    _onEvent(
        obj.element,
        obj.selector,
        obj.eventName,
        obj.callback,
    )
}

const ajax = function(request) {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }

    r.send(request.data)
}

const _get = (object, path, defaultValue) => {
    let obj = object
    for (let propety of path.split('.')) {
        if (obj[propety] === undefined) {
            return defaultValue
        }
        obj = obj[propety]
    }
    return obj
}
