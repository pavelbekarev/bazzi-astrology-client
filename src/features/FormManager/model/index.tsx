/* eslint-disable no-restricted-imports */
import React from "react";
import ReactDOM from "react-dom/client";
import { FormManagerConfig } from "#features/FormManager/config/types/FormManagerConfigType";
import { StoreService } from "#shared/lib/services/StoreService";
import { getAttr } from "#shared/utils/getAttr";
import { configAdvance } from "../config/constants";
import { checkFormOnValidation } from "../lib/checkValidation";
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
    document.addEventListener("DOMContentLoaded", () => {
      this.bindEvents();
    });
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

    if (e.submitter.closest(this.selectors.form)) {
      const submitButtonNode = document.querySelector(
        this.selectors.submitButton
      );
      const value = JSON.parse(
        submitButtonNode.getAttribute(getAttr(this.selectors.submitButton))
      );

      if (submitButtonNode) {
        if (checkFormOnValidation(value)) {
          const { userName, tgName, serviceName } = value;

          /* TODO: вместо ручного сбора вызывать функцию this.grabEntries(); */
          const formData = new FormData();
          formData.append("userName", userName);
          formData.append("tgName", tgName);
          formData.append("serviceName", serviceName);
        }
      } else {
        return;
      }
    } else {
      return;
    }
  }

  // TODO: сбор информации с точек входа
  private grabEntries(entries) {}

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

  private throwValidationError(target: HTMLElement) {
    target.classList.add("validationError");
  }

  private bindEvents() {
    document.addEventListener("submit", (e) => this.handleSubmitForm(e));
  }
}
