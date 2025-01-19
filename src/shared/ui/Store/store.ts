import { persist, subscribeWithSelector } from "zustand/middleware";
import { createStore as create } from "zustand/vanilla";
import { ServiceData } from "#shared/utils/types/ServiceDataType";

/**
 *
 */
export const createStore = (storageName: string) => {
  return create(
    subscribeWithSelector(
      persist(
        (set) => ({
          userName: "",
          tgName: "",
          serviceName: "",
          services: [],

          setUserName: (userName: string) => set({ userName }),
          setTgName: (tgName: string) => set({ tgName }),
          setServiceName: (serviceName: string) => set({ serviceName }),
          setServices: (service: ServiceData) =>
            set((state) => ({
              services: [...state.services, service],
            })),
        }),
        {
          name: storageName,
          getStorage: () => localStorage,
        }
      )
    )
  );
};
