type EventBus = {
    [key: string]: ((payload: unknown) => void)[];
};

function createEventEmitter(defaultHandler: ((evName: string, payload: unknown) => void) | null = null) {
    const listenersMap: EventBus = {};

    return {
        on(evName: string, listener: (payload: unknown) => void) {
            listenersMap[evName] = listenersMap[evName] ? [...listenersMap[evName], listener] : [listener];
            return () => listenersMap[evName] = listenersMap[evName].filter(func => func !== listener);
        },
        emit(evName: string, payload: unknown) {
            if (listenersMap[evName]) {
                listenersMap[evName].forEach(listener => listener(payload));
            } else if (defaultHandler) {
                defaultHandler(evName, payload);
            }
        }
    }
}

export const eventBus = createEventEmitter((evName, payload) => _defaultHandler(evName, payload));

export function showSuccessMsg(txt: string) {
    eventBus.emit('user-msg', { txt, type: 'success' })
}

export function showErrorMsg(txt: string) {
    eventBus.emit('user-msg', { txt, type: 'error' })
}

function _defaultHandler(evName: string, payload: unknown) {
    console.groupCollapsed('No handler found')
    console.log(`event - %c${evName}`, 'color: orange')
    console.log(`payload - %c${payload}`, 'color: orange')
    console.groupEnd()
}

// Easy debug from console
window.eventBus = eventBus