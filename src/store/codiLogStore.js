

import create from 'zustand';

const useCodiLogStore = create((set) => ({
    codiLogLists: [],
    allCodiLogLists: [],
    setCodiLogLists: (codiLogs) => set({ codiLogList: codiLogs }),
    setAllCodiLogLists: (allCodiLogs) => set({ allCodiLogList: allCodiLogs }),
}));


export { useCodiLogStore };
