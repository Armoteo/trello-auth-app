export const authMiddlewares = () => (next: any) => (action: any) => {
    next(action);
};

export const middlewaresAuth = [authMiddlewares];