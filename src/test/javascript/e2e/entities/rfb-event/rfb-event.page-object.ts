import { element, by, ElementFinder } from 'protractor';

export class RfbEventComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-rfb-event div table .btn-danger'));
  title = element.all(by.css('jhi-rfb-event div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class RfbEventUpdatePage {
  pageTitle = element(by.id('jhi-rfb-event-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  eventDateInput = element(by.id('field_eventDate'));
  eventCodeInput = element(by.id('field_eventCode'));

  rfbLocationSelect = element(by.id('field_rfbLocation'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setEventDateInput(eventDate: string): Promise<void> {
    await this.eventDateInput.sendKeys(eventDate);
  }

  async getEventDateInput(): Promise<string> {
    return await this.eventDateInput.getAttribute('value');
  }

  async setEventCodeInput(eventCode: string): Promise<void> {
    await this.eventCodeInput.sendKeys(eventCode);
  }

  async getEventCodeInput(): Promise<string> {
    return await this.eventCodeInput.getAttribute('value');
  }

  async rfbLocationSelectLastOption(): Promise<void> {
    await this.rfbLocationSelect.all(by.tagName('option')).last().click();
  }

  async rfbLocationSelectOption(option: string): Promise<void> {
    await this.rfbLocationSelect.sendKeys(option);
  }

  getRfbLocationSelect(): ElementFinder {
    return this.rfbLocationSelect;
  }

  async getRfbLocationSelectedOption(): Promise<string> {
    return await this.rfbLocationSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class RfbEventDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rfbEvent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rfbEvent'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
