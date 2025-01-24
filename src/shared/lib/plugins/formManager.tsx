/* eslint-disable no-restricted-imports */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBooking } from "#features/FormManager/api";
import {
  configAdvance,
  configEditService,
} from "#features/FormManager/config/constants";
import { FormManagerConfig } from "#features/FormManager/config/types/FormManagerConfigType";
import { BookService } from "#features/FormManager/ui/BookService";
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

  config: FormManagerConfig;

  private mode: string;

  entries: any;

  constructor({
    storeService,
    mode,
  }: {
    storeService: StoreService;
    mode: string;
  }) {
    this.storeService = storeService;
    this.mode = mode;

    this.initFormManager();
    this.bindEvents();
  }

  /**
   * Инициализация менеджера формы
   */
  private initFormManager() {
    const formContainer = document.querySelector(this.selectors.formContainer);

    // TODO: пока так, в перспективе сделать передачу customConfig по дефолту, если нет конфиг не указан
    configAdvance.info.entries.map((item) => {
      if (item.type === "select") {
        item.options = this.storeService
          .getServiceList()
          .map((item) => item.name);
        console.debug(item.options);
      }
    });

    if (this.mode === "admin") this.config = configEditService;
    if (this.mode === "user") this.config = configAdvance;

    this.generateFormManager({
      config: this.config,
      target: formContainer as HTMLElement,
    });
  }

  private handleSubmitForm(e: any) {
    e.preventDefault();
    this.clearValidationErrors();

    const submitButtonNode = document.querySelector(
      this.selectors.submitButton
    );

    const value = JSON.parse(
      submitButtonNode.getAttribute(getAttr(this.selectors.submitButton))
    );

    if (submitButtonNode) {
      if (this.checkFormOnValidation(value)) {
        const formData = this.grabEntries(value);

        (async () => {
          await createBooking({ data: formData })
            .then((res) => {
              this.clearValues();
              this.throwSuccessMessage();
              console.debug("Успешно отправлено");
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
      console.debug(inputs);
    }
  }

  // TODO: сбор информации с точек входа
  private grabEntries(value): FormData {
    const formData = new FormData();

    const fields = Object.keys(value);
    fields.forEach((item) => {
      formData.append(item, value[item]);
    });

    return formData;
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

    if (this.mode === "user")
      root.render(
        <BookService
          config={{
            info: { title: "Записаться на разбор", entries: this.entries },
          }}
        />
      );

    if (this.mode === "admin")
      root.render(
        <BookService
          config={{
            info: { title: "Записаться на услугу", entries: this.entries },
          }}
        />
      );
  }

  private bindEvents() {
    document.addEventListener("submit", (e) => this.handleSubmitForm(e));
    document.addEventListener("input", (e) => this.handleFieldInput(e));
  }

  private clearValidationErrors() {
    const errorNodes = document.querySelectorAll(".error-message");
    errorNodes.forEach((node) => node.remove());

    const errorFields = document.querySelectorAll(".validationError");
    errorFields.forEach((field) => field.classList.remove("validationError"));
  }

  private handleFieldInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const fieldName = target.getAttribute("data-js-field");

    if (fieldName) {
      const validationRules = {
        userName: (value: string) =>
          value.length >= 3 ||
          "Имя пользователя должно содержать минимум 3 символа.",
        tgName: (value: string) =>
          value.startsWith("@") || "Имя Telegram должно начинаться с @.",
        serviceName: (value: string) =>
          value !== "" || "Необходимо выбрать услугу.",
      };

      const validate = validationRules[fieldName];
      if (validate) {
        const validationResult = validate(target.value);
        if (validationResult !== true) {
          this.throwValidationError(target as HTMLElement, validationResult);
        } else {
          this.clearFieldValidationError(target as HTMLElement);
          this.throwSuccessMessage();
        }
      }
    }
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
    }, 2000);
  }

  private clearFieldValidationError(target: HTMLElement) {
    target.classList.remove("validationError");
    const errorNode = target.parentElement?.querySelector(".error-message");
    if (errorNode) errorNode.remove();
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
    }, 2000);
  };

  private checkFormOnValidation = (info: Record<string, any>): boolean => {
    const validationRules = {
      name: (value: string) =>
        value.length >= 3 ||
        "Имя пользователя должно содержать минимум 3 символа.",
      tgName: (value: string) =>
        value.startsWith("@") || "Имя Telegram должно начинаться с @.",
      serviceName: (value: string) =>
        value !== "" || "Необходимо выбрать услугу.",
    };

    let isValid = true;

    Object.keys(info).forEach((field) => {
      const fieldValue = info[field];
      const validate = validationRules[field];

      if (validate) {
        const validationResult = validate(fieldValue);
        if (validationResult !== true) {
          console.error(`Ошибка в поле "${field}": ${validationResult}`);
          const fieldNode = document.querySelector(`[data-js-${field}]`);
          this.throwValidationError(fieldNode as HTMLElement, validationResult);
          isValid = false;
        } else {
          console.debug("Успешно!");
        }
      }
    });

    return isValid;
  };
}
