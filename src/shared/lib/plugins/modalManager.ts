import { getAttr } from "#shared/utils/getAttr";
import { ServiceData } from "#shared/utils/types/ServiceData";

/**
 * Менеджер управления модальными окнами
 */
export class ModalManager {
  static instance = null;

  selectors = {
    serviceWrapper: "[data-js-service-wrapper]",
  };

  selector: any;

  info: ServiceData[] | undefined;

  constructor({ selector, info }: { selector?: any; info?: any } = {}) {
    if (ModalManager.instance) {
      return ModalManager.instance;
    }

    this.selector = selector;
    this.info = info;

    if (!selector) {
      console.debug("Нет кнопки с необходимым атрибутом");
    }

    ModalManager.instance = this;
    this.bindEvents();
  }

  static getInstance() {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager();
    }

    return ModalManager.instance;
  }

  private bindEvents() {
    const wrapper = document.querySelector(this.selectors.serviceWrapper);
    if (wrapper) {
      wrapper.addEventListener("click", (event: { target: any }) => {
        const target = (event.target as HTMLElement).closest(this.selector);

        if (target) {
          console.debug(
            "Клик произошел по кнопке `Подробнее!` Пора открывать модальное окно!!!!",
            target
          );
          const attr = getAttr(this.selector);
          const key = target.getAttribute(attr);

          this.openModalWindow(key);
        }
      });
    }
  }

  private openModalWindow(key: any) {
    if (this.info) {
      const targetValue = this.info[key];

      if (!targetValue) {
        // TODO: выводить модальное окно с ошибкой (услуга не найдена)
        console.error("Услуга не найдена");
      }

      //TODO: выводить модальное окно с информацией об услуге
    }
  }
}
