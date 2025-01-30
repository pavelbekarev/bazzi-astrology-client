/* eslint-disable no-restricted-imports */
import React from "react";
import ReactDOM from "react-dom/client";
import { ApiClient } from "#features/FormManager/api/ApiClient";
import {
  configViewService,
  configEditService,
  validationRulesForBookingService,
  configCreateService,
} from "#features/FormManager/config/constants";
import { FormManagerConfig } from "#features/FormManager/config/types/FormManagerConfigType";
import { BookService } from "#features/FormManager/ui/FormContainer";
import { StoreService } from "#shared/lib/services/StoreService";
import { getAttr } from "#shared/utils/getAttr";

/**
 * Класс для генерации формы
 */
export class FormManager {
  selectors = {
    formContainer: "[data-js-form-container]",
    submitButton: "[data-js-submit-button]",
    form: "[data-js-form]",
    userName: "[data-js-user-name]",
    tgName: "[data-js-tg-name]",
    serviceName: "[data-js-service-name]",
  };

  storeService: StoreService;

  private config: FormManagerConfig;

  private operation: string;

  private entries: any;

  private apiEndPoint: string;

  constructor({
    storeService,
    operation,
  }: {
    storeService: StoreService;
    operation?: string;
  }) {
    this.storeService = storeService;
    this.operation = operation;
    this.apiEndPoint = "";
    console.debug(operation, "operation");

    this.initFormManager();
    this.bindEvents();
  }

  /**
   * Инициализация менеджера формы
   */
  private initFormManager() {
    const formContainer = document.querySelector(this.selectors.formContainer);

    // TODO: пока так, в перспективе сделать передачу customConfig по дефолту, если нет конфиг не указан
    configViewService.info.entries.map((item) => {
      console.debug(item);
      if (item.type === "select") {
        item.options = this.storeService
          .getServiceList()
          .map((item) => item.name);
        console.debug(item.options);
      }

      if (item.name === "name") item.name = "userName";
    });

    if (!this.operation) this.config = configViewService;
    if (this.operation === "edit") this.config = configEditService;
    if (this.operation === "createService") this.config = configCreateService;

    this.generateFormManager({
      config: this.config,
      target: formContainer as HTMLElement,
    });
  }

  private handleSubmitForm(e: any) {
    e.preventDefault();

    const submitButtonNode = document.querySelector(
      this.selectors.submitButton
    );

    const value = JSON.parse(
      submitButtonNode.getAttribute(getAttr(this.selectors.submitButton))
    );

    if (submitButtonNode) {
      if (this.checkFormOnValidation(value)) {
        const info = this.grabEntries(value);

        (async () => {
          ApiClient.getInstance({
            method: this.config.method,
            apiEndPoint: this.config.apiEndPoint,
            info: info,
          })
            .makeRequest()
            .then((res) => {
              this.clearValues();
              this.throwSuccessMessage();
              console.debug("Успешно выполнено");
            })
            .catch((e) =>
              console.error("произошла ошибка при отправлении формы", e)
            );
        })();
      }
    }
  }

  private clearValues() {
    const form = document.querySelector(this.selectors.formContainer);

    if (form) {
      const inputs = form.querySelectorAll("input, select");

      inputs.forEach((input) => {
        if (
          input instanceof HTMLInputElement ||
          input instanceof HTMLTextAreaElement
        ) {
          input.value = "";
        }
      });
    }
  }

  // TODO: сбор информации с точек входа
  private grabEntries(value) {
    const result = {};

    const fields = Object.keys(value);
    fields.forEach((item) => {
      console.debug(item, value[item]);
      result[item] = value[item];
    });

    return result;
  }

  /**
   * Генерация формы
   */
  private generateFormManager({
    config,
    target,
  }: {
    config: FormManagerConfig;
    target: HTMLElement;
  }) {
    const { info } = config;
    this.entries = info.entries;
    console.debug(this.entries);

    if (target === null) {
      console.error("Необходимо выбрать где разместить форму");
      return;
    }
    const root = ReactDOM.createRoot(target);

    if (!this.operation)
      root.render(
        <BookService
          extraClasses={["formManager__bookService__userTitle"]}
          config={{
            info: { title: "Записаться на разбор", entries: this.entries },
          }}
        />
      );

    if (this.operation === "edit")
      root.render(
        <BookService
          extraClasses={["modalWindow__title"]}
          config={{
            info: {
              title: "Редактировать услугу",
              entries: this.entries,
            },
          }}
        />
      );

    if (this.operation === "createService")
      root.render(
        <BookService
          extraClasses={["modalWindow__title"]}
          config={{
            info: {
              title: "Добавить услугу",
              entries: this.entries,
            },
          }}
        />
      );
  }

  private bindEvents() {
    document.addEventListener("submit", (e) => this.handleSubmitForm(e));
  }

  private throwSuccessMessage() {
    const formContainer = document.querySelector(this.selectors.formContainer);
    const successNode = document.createElement("div");
    successNode.classList.add("successMessage");
    successNode.textContent = "Ваша заявка успешно отправлена";

    formContainer.appendChild(successNode);

    setTimeout(() => {
      successNode.classList.add("successMessage--visible");
    }, 10);

    setTimeout(() => {
      successNode.classList.remove("successMessage--visible");
      successNode.remove();
    }, 2000);
  }

  private throwValidationError = (
    target: HTMLElement,
    errorMessage: string
  ) => {
    if (!target) return;

    target.classList.add("validationError");

    // Удаляем предыдущие ошибки
    let errorNode = target.parentElement?.querySelector(".errorMessage");
    if (errorNode) errorNode.remove();

    // Создаем новый узел с сообщением об ошибке
    errorNode = document.createElement("div");
    errorNode.className = "errorMessage";
    errorNode.textContent = errorMessage;

    document.querySelector(this.selectors.formContainer).appendChild(errorNode);

    setTimeout(() => {
      errorNode.classList.add("errorMessage--visible");
    }, 10);

    setTimeout(() => {
      errorNode.classList.remove("errorMessage--visible");
      errorNode.remove();
    }, 2000);
  };

  private checkFormOnValidation = (info: Record<string, any>): boolean => {
    let isValid = true;

    Object.keys(info).forEach((field) => {
      const fieldValue = info[field];
      const validate = validationRulesForBookingService[field];

      if (validate) {
        const validationResult = validate(fieldValue);
        if (validationResult !== true) {
          console.error(`Ошибка в поле "${field}": ${validationResult}`);
          const fieldNode = document.querySelector(`[data-js-${field}]`);
          this.throwValidationError(fieldNode as HTMLElement, validationResult);
          isValid = false;
        }
      }
    });

    return isValid;
  };
}
