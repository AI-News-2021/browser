const safeAwait = async <T>(promise: Promise<T>): Promise<any[] | T[]> => {
    try {
        const data = await promise
        return [data, null]
    } catch (e) {
        return [null, e]
    }
}

export default safeAwait