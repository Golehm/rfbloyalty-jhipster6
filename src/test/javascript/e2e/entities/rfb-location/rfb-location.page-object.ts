import { element, by, ElementFinder } from 'protractor';

export class RfbLocationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-rfb-location div table .btn-danger'));
  title = element.all(by.css('jhi-rfb-location div h2#page-heading span')).first();
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

export class RfbLocationUpdatePage {
  pageTitle = element(by.id('jhi-rfb-location-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  locationNameInput = element(by.id('field_locationName'));
  runDayOfWeekInput = element(by.id('field_runDayOfWeek'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setLocationNameInput(locationName: string): Promise<void> {
    await this.locationNameInput.sendKeys(locationName);
  }

  async getLocationNameInput(): Promise<string> {
    return await this.locationNameInput.getAttribute('value');
  }

  async setRunDayOfWeekInput(runDayOfWeek: string): Promise<void> {
    await this.runDayOfWeekInput.sendKeys(runDayOfWeek);
  }

  async getRunDayOfWeekInput(): Promise<string> {
    return await this.runDayOfWeekInput.getAttribute('value');
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

export class RfbLocationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rfbLocation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rfbLocation'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
