import React from 'react';

const UseContext = React.createContext()

export const UseProvider = UseContext.Provider;
export const UseConsumer = UseContext.Consumer;

export default UseContext