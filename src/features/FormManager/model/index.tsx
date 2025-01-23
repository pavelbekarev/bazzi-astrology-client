/* eslint-disable no-restricted-imports */
import React from "react";
import ReactDOM from "react-dom/client";
import { FormManagerConfig } from "#features/FormManager/config/types/FormManagerConfigType";
import { StoreService } from "#shared/lib/services/StoreService";
import { getAttr } from "#shared/utils/getAttr";
import { createBooking } from "../api";
import { configAdvance } from "../config/constants";

import { BookService } from "../ui/BookService";

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

  entries: any;

  constructor({ storeService }: { storeService: StoreService }) {
    this.storeService = storeService;

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
    this.generateFormManager({
      config: configAdvance,
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
    const form = document.querySelector(this.selectors.form);

    if (form) {
      const inputs = form.querySelectorAll("input, select");
      console.debug(inputs);
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

    if (target === null) {
      console.error("Необходимо выбрать где разместить форму");
      return;
    }
    const root = ReactDOM.createRoot(target);

    root.render(
      <BookService
        config={{
          info: { entries: this.entries },
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

  private throwSuccessMessage() {}

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
    let errorNode = target.parentElement?.querySelector(".error-message");
    if (errorNode) errorNode.remove();

    // Создаем новый узел с сообщением об ошибке
    errorNode = document.createElement("div");
    errorNode.className = "error-message";
    errorNode.textContent = errorMessage;

    target.parentElement?.appendChild(errorNode);
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
        }
      }
    });

    return isValid;
  };
}
