// class DataObjectTracker {
//     constructor(dataObject, callback) {
//         this.callback = callback;
//         this.proxy = this._createProxy(dataObject);
//     }

//     _createProxy(obj) {
//         return new Proxy(obj, {
//             set: (target, prop, value) => {
//                 const oldValue = target[prop];
//                 const success = Reflect.set(target, prop, value);

//                 if (success && oldValue !== value) {
//                     this.callback({
//                         property: prop,
//                         oldValue: oldValue,
//                         newValue: value,
//                     });
//                 }

//                 return success;
//             }
//         });
//     }

//     getTrackedObject() {
//         return this.proxy;
//     }
// }


class DataObjectTracker {
    constructor(dataObject, callback) {
        this.callback = callback;
        return this._createProxy(dataObject);  // Return the proxy directly
    }

    _createProxy(obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                    // Skip proxying HTML elements
                    if (obj[prop] instanceof HTMLElement) {
                        continue;
                    }
                    // Recursively apply proxy for nested objects
                    obj[prop] = this._createProxy(obj[prop]);
                } else if (typeof obj[prop] === 'function') {
                    // Bind functions to their original context to avoid illegal invocation errors
                    obj[prop] = obj[prop].bind(obj);
                }
            }
        }

        return new Proxy(obj, {
            set: (target, prop, value) => {
                const oldValue = target[prop];
                const success = Reflect.set(target, prop, value);

                if (success && oldValue !== value) {
                    this.callback({
                        property: prop,
                        oldValue: oldValue,
                        newValue: value,
                        parent: target
                    });
                }

                return success;
            }
        });
    }
}