import React from "react";
import ReactDOM from "react-dom/client";

import { getAttr } from "#shared/utils/getAttr";
import { services } from "#widgets/ServicesApp/api/mockData";
import { ServiceList } from "../ui";

/**
 * генерация карточек для сервисов
 */
export class ServiceFactory {
  static instance: any;

  selectors = {
    serviceWrapper: "[data-js-service-wrapper]",
    serviceItemButton: "[data-js-service-item-button]",
    serviceItem: "[data-js-service-item]",
  };

  selector: any;

  button: any;

  constructor() {
    if (ServiceFactory.instance) return ServiceFactory.instance;

    this.selector = document.querySelector(this.selectors.serviceWrapper);
    this.button = document.querySelector(this.selectors.serviceItemButton);

    if (this.selector) {
      ServiceFactory.renderServices({ info: services }, this.selector);
      this.bindEvents();
    }
  }

  static renderServices({ info }, target) {
    const root = ReactDOM.createRoot(target);

    root.render(<ServiceList services={info} />);
  }

  private bindEvents() {
    const wrapper = document.querySelector(this.selectors.serviceWrapper);
    if (wrapper) {
      /* Открытие модального окна с подробной информацией об услуге */
      wrapper.addEventListener("click", (event) => {
        const target = event.target;

        // Проверяем, что клик был по кнопке
        if (target) {
          const attr = getAttr(this.selectors.serviceItemButton).toString();
          const key = target.getAttribute(attr);
          console.debug(key);
        }
      });

      /* Всплытие описания услуги при наведении */
      wrapper.addEventListener("mouseover", (event) => {
        const target = (event.target as HTMLElement).closest(
          this.selectors.serviceItem
        );

        if (target) {
          target.classList.add(
            "servicesApp__serviceWrapper__serviceItem--hovered"
          );
        }
      });

      /* Исчезновение описания услуги при отводе курсора */
      wrapper.addEventListener("mouseout", (event) => {
        const target = (event.target as HTMLElement).closest(
          this.selectors.serviceItem
        );

        if (target) {
          target.classList.remove(
            "servicesApp__serviceWrapper__serviceItem--hovered"
          );
        }
      });
    }
  }
}
