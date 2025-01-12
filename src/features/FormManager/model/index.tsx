import { FormManagerConfig } from "#shared/utils/types/FormManagerConfigType";

/**
 * Класс для генерации формы
 */
export class FormManager {
  selectors = {
    submitButton: "[data-js-submit-button]",
  };

  config: FormManagerConfig;

  constructor({ config }: { config: FormManagerConfig }) {
    this.config = config;

    this.bindEvents();
  }

  private bindEvents() {}
}
