/* eslint-disable no-restricted-imports */
import React from "react";
import ReactDOM from "react-dom/client";

import { StoreService } from "#shared/lib/services/StoreService";
import { getAttr } from "#shared/utils/getAttr";
import { ServiceData } from "#shared/utils/types/ServiceDataType";
import { services } from "#widgets/ServicesApp/api/mockData";
import { getServices, postService } from "../api";
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

  services: any;

  storeService: StoreService;

  button: any;

  private mode: string;

  flag: boolean;

  constructor({ mode }) {
    this.flag = false;

    this.storeService = StoreService.getInstance("mainStorage");

    this.selector = document.querySelector(this.selectors.serviceWrapper);
    this.button = document.querySelector(this.selectors.serviceItemButton);
    this.mode = mode;

    this.init();
  }

  private async init() {
    try {
      await this.fetchServices();
      console.debug("Services fetched:", this.services);

      this.flag = this.services && this.services.length > 0;

      if (!this.flag) {
        console.debug("here");
        await postService({ data: services });
      }

      if (this.storeService.getServiceList().length === 0)
        this.services.forEach((item: ServiceData) => {
          console.debug("2");
          this.storeService.updateStore("setServiceList", item);
        });

      console.debug(this.storeService.getServiceList());

      if (this.selector && this.flag) {
        this.renderServices({ info: this.services }, this.selector);
        this.bindEvents();
      }
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  }

  async fetchServices() {
    try {
      const response = await getServices();
      this.services = response.data; // Сохраняем данные
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  private renderServices({ info }, target) {
    const root = ReactDOM.createRoot(target);

    root.render(<ServiceList services={info} mode={this.mode} />);
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
