import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { ModalWindowComponent } from "#features/ModalWindow/index";
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

  private createModalWindowNode() {
    if (!document.getElementById("modalInstance")) {
      const modalInstance = document.createElement("div");
      modalInstance.setAttribute("id", "modalInstance");

      const body = document.getElementById("root");
      body.appendChild(modalInstance);
    } else return;
  }

  private openModalWindow(key: any) {
    this.createModalWindowNode();
    if (this.info) {
      const targetValue = this.info[key];

      if (!targetValue) {
        // TODO: выводить модальное окно с ошибкой (услуга не найдена)
        console.error("Услуга не найдена");
      }

      //TODO: выводить модальное окно с информацией об услуге
      const root = document.getElementById("modalInstance");
      if (root) {
        this.renderModalWindow(root, { info: targetValue });
      } else {
        console.warn("Элемент с id 'root' не найден");
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
