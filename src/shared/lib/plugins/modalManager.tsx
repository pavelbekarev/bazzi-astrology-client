/* eslint-disable no-restricted-imports */
import React from "react";
import ReactDOM from "react-dom/client";
import { ModalWindowComponent } from "#features/ModalWindow/index";
import { ModalWindowAdminPage } from "#features/ModalWindow/ui/ModalWindowAdminPage";
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
    closeModalButton: "[data-js-close-modal]",
  };

  selector: any;

  isModalWindowOpen: boolean;

  ignoreCloseModalWindow: boolean;

  info: ServiceData[] | undefined;

  buttonMode: string;

  submitBtnType: string;

  /**
   * Менеджер модальных окон
   * @param selector элемент, при взаимодействии с которым будет всплывать модальное окно
   * @param info информация, необходимая для отображения в модальном окне
   * @returns
   */
  constructor({
    selector,
    info,
  }: { selector?: any; info?: any; mode?: string } = {}) {
    this.ignoreCloseModalWindow = false;
    this.selector = selector;
    this.info = info;
    this.isModalWindowOpen = false;
    this.buttonMode = "";
    this.submitBtnType = "";

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
      Здесь происходит отслеживание клика по кнопке "Подробнее"/"Редактировать",
      но при условии, что эта кнопка находится в узле [data-js-service-wrapper]

    */
    // const wrapper = document.querySelector(this.selectors.serviceWrapper);

    // if (wrapper) {
    //   wrapper.addEventListener("click", (event: { target: any }) => {
    //     const target = (event.target as HTMLElement).closest(this.selector);

    //     if (target) {
    //       console.debug(target);
    //       this.submitBtnType = target.id;
    //       this.ignoreCloseModalWindow = true;

    //       const attr = getAttr(this.selector);
    //       const key = target.getAttribute(attr);

    //       this.openModalWindow(key);
    //       this.isModalWindowOpen = true;

    //       setTimeout(() => {
    //         this.ignoreCloseModalWindow = false;
    //       }, 100);
    //     }
    //   });
    // }

    const rootNode = document.getElementById("root");
    rootNode.addEventListener("click", (event: { target: any }) => {
      console.debug(event.target.id);
      switch (event.target.id) {
        case "moreDetailsBtn":
          this.submitBtnType = event.target.id;
          this.ignoreCloseModalWindow = true;
          var attr = getAttr(this.selector);
          var key = event.target.getAttribute(attr);
          this.openModalWindow(key, "moreDetails");
          this.isModalWindowOpen = true;
          setTimeout(() => {
            this.ignoreCloseModalWindow = false;
          }, 100);
          break;

        case "editBtn":
          this.submitBtnType = event.target.id;
          this.ignoreCloseModalWindow = true;
          attr = getAttr(this.selector);
          key = event.target.getAttribute(attr);
          this.openModalWindow(key, "edit");
          this.isModalWindowOpen = true;
          setTimeout(() => {
            this.ignoreCloseModalWindow = false;
          }, 100);
          break;

        case "createServiceBtn":
          this.submitBtnType = event.target.id;
          this.ignoreCloseModalWindow = true;
          attr = getAttr(this.selector);
          key = event.target.getAttribute(attr);
          this.openModalWindow(key, "createService");
          this.isModalWindowOpen = true;
          setTimeout(() => {
            this.ignoreCloseModalWindow = false;
          }, 100);
          break;
      }

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

      const closeByButton = (event.target as HTMLElement).closest(
        this.selectors.closeModalButton
      );

      if (closeByButton) {
        closeByButton.classList.add("closeButton");
        this.closeModalWindow();
        this.isModalWindowOpen = false;
      }

      /**
       * Здесь я хотел сделать отслеживание отдельной кнопки добавления услуги
       */
      const createServiceNode = document.querySelector(this.selector);
      if (createServiceNode.id === "createServiceBtn")
        console.debug(createServiceNode);
    });

    /**
     * Отслеживание наведения курсора на кнопку закрытия модального окна
     */
    rootNode.addEventListener("mouseover", (event) => {
      const closeByButton = (event.target as HTMLElement).closest(
        this.selectors.closeModalButton
      );

      if (closeByButton) {
        closeByButton.classList.add("hovered");
        console.debug("hovered on close button");
      }
    });

    /**
     * Отслеживание прекращения наведения курсора на кнопку закрытия модального окна
     */
    rootNode.addEventListener("mouseout", (event) => {
      const closeByButton = (event.target as HTMLElement).closest(
        this.selectors.closeModalButton
      );

      if (closeByButton) {
        closeByButton.classList.remove("hovered");
        console.debug("mouse out from close button");
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

  private openModalWindow(key: any, operation: string) {
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
        this.renderModalWindow(root, { info: targetValue }, operation);
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

  private renderModalWindow(target: HTMLElement, info: any, operation: string) {
    const root = ReactDOM.createRoot(target);

    switch (operation) {
      case "moreDetails":
        root.render(<ModalWindowComponent info={[info]} />);
        break;

      case "edit":
        root.render(<ModalWindowAdminPage operation={operation} />);
        break;

      case "createService":
        root.render(<ModalWindowAdminPage operation={operation} />);
        return;

      default:
        break;
    }
  }
}
