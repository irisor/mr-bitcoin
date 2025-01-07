export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

interface EntityId {
    _id: string
}

function query<T>(entityType: string, delay = 500): Promise<T[]> {
    if (!entityType) return Promise.resolve([])
    const entities: T[] = JSON.parse(localStorage.getItem(entityType) as string) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

async function get<T extends EntityId>(entityType: string, entityId: string): Promise<T> {
    return query<T>(entityType).then((entities: T[]) => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

async function post<T extends EntityId>(entityType: string, newEntity: T) {
    newEntity._id = _makeId()
    return query<T>(entityType).then((entities: T[]) => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

async function put<T extends EntityId>(entityType: string, updatedEntity: T) {
    return query<T>(entityType).then((entities: T[]) => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        const entityToUpdate = {...entities[idx], ...updatedEntity}
        entities.splice(idx, 1, entityToUpdate)
        _save(entityType, entities)
        return entityToUpdate
    })
}

async function remove<T extends EntityId>(entityType: string, entityId: string): Promise<T> {
    return query<T>(entityType).then((entities: T[]) => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        const entity: T = entities[idx]
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
        return entity
    })
}

// Private functions

function _save<T extends EntityId>(entityType: string, entities: T[]) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}