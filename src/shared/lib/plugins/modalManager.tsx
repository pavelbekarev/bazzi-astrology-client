import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ModalWindowComponent } from "#features/ModalWindow/index";
import { getAttr } from "#shared/utils/getAttr";
import { ServiceData } from "#shared/utils/types/ServiceDataType";

/**
 * Менеджер управления модальными окнами
 */
export class ModalManager {
  static instance = null;

  selectors = {
    serviceWrapper: "[data-js-service-wrapper]",
    modalWindowInstance: "[data-js-modal-window]",
    modalWindowPrice: "[data-js-price]",
  };

  selector: any;

  isModalWindowOpen: boolean;

  ignoreCloseModalWindow: boolean;

  info: ServiceData[] | undefined;

  constructor({ selector, info }: { selector?: any; info?: any } = {}) {
    if (ModalManager.instance) {
      return ModalManager.instance;
    }

    this.ignoreCloseModalWindow = false;
    this.selector = selector;
    this.info = info;
    this.isModalWindowOpen = false;

    if (!selector) {
      console.error("Нет кнопки с необходимым атрибутом");
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
    /* 
      Клик по кнопке "Подробнее" для открытия модального окна 
    */
    const wrapper = document.querySelector(this.selectors.serviceWrapper);

    if (wrapper) {
      wrapper.addEventListener("click", (event: { target: any }) => {
        const target = (event.target as HTMLElement).closest(this.selector);

        if (target) {
          this.ignoreCloseModalWindow = true;

          const attr = getAttr(this.selector);
          const key = target.getAttribute(attr);

          this.openModalWindow(key);
          this.isModalWindowOpen = true;

          setTimeout(() => {
            this.ignoreCloseModalWindow = false;
          }, 100);
        }
      });
    }

    const rootNode = document.getElementById("root");
    rootNode.addEventListener("click", (event: { target: any }) => {
      if (this.ignoreCloseModalWindow) {
        return;
      }
      const target = (event.target as HTMLElement).closest(
        this.selectors.modalWindowInstance
      );
      if (!target) {
        this.closeModalWindow();
        this.isModalWindowOpen = false;
      }
    });
  }

  private closeModalWindow() {
    const modalInstance = document.getElementById("modalInstance");
    if (modalInstance) modalInstance.remove();
  }

  private createModalWindowNode() {
    if (!document.getElementById("modalInstance")) {
      const modalInstance = document.createElement("div");
      modalInstance.setAttribute("id", "modalInstance");
      modalInstance.classList.add("modalInstance");

      const body = document.getElementById("root");
      body.appendChild(modalInstance);
    } else return;
  }

  private openModalWindow(key: any) {
    this.createModalWindowNode();
    if (this.info) {
      const targetValue = this.info[key];

      // если targetValue не найден
      if (!targetValue) {
        // TODO: выводить модальное окно с ошибкой (услуга не найдена)
        console.error("Услуга не найдена");
      }

      // выводим модальное окно с информацией об услуге
      const root = document.getElementById("modalInstance");
      if (root) {
        this.renderModalWindow(root, { info: targetValue });
      } else {
        console.warn("Элемент с id 'root' не найден");
      }

      const modalWindowNode = document.getElementById("modalWindow");
      if (modalWindowNode) {
        modalWindowNode.classList.add("modalWindow--active");
      }
    } else {
      console.warn(
        "Не был передан массив с информацией. Модальное окно не может быть открыто"
      );
    }
  }

  private renderModalWindow(target: HTMLElement, info: any) {
    const root = ReactDOM.createRoot(target);
    root.render(<ModalWindowComponent info={[info]} />);
  }
}
