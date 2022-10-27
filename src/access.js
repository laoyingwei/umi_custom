


export default (initialState) => {
    const permission = initialState && initialState.permission || []
    return {
        ...initialState,
        permission,

    }
}