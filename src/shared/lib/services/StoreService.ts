import { createStore } from "#shared/ui/Store/store";
import { ServiceData } from "#shared/utils/types/ServiceDataType";

/**
 *
 */
export class StoreService {
  private static instance: StoreService; // Статическое свойство для хранения единственного экземпляра

  private store: any;

  private actionMap: any;

  // Приватный конструктор запрещает создание экземпляров вне класса
  private constructor(storageName: string) {
    this.store = createStore(storageName);

    this.actionMap = {
      setUserName: (userName: string) =>
        this.store.getState().setUserName({ userName }),
      setTgName: (tgName: string) =>
        this.store.getState().setTgName({ tgName }),
      setServiceName: (serviceName: string) =>
        this.store.getState().setServiceName({ serviceName }),
      setServiceList: (service: ServiceData) => {
        console.debug("servicesList", this.getServiceList());
        this.store.getState().setServices(service);
      },
    };
  }

  // Метод для получения единственного экземпляра
  static getInstance(storageName: string = "defaultStorage"): StoreService {
    if (!StoreService.instance) {
      StoreService.instance = new StoreService(storageName);
    }
    return StoreService.instance;
  }

  getServiceList() {
    return this.store.getState().services;
  }

  updateStore(action: string, payload: any) {
    const actionFunction = this.actionMap[action];

    if (actionFunction) {
      actionFunction(payload);
    } else {
      console.warn(`Action ${action} is not defined`);
    }
  }
}
