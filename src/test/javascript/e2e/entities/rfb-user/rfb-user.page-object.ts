import { element, by, ElementFinder } from 'protractor';

export class RfbUserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-rfb-user div table .btn-danger'));
  title = element.all(by.css('jhi-rfb-user div h2#page-heading span')).first();
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

export class RfbUserUpdatePage {
  pageTitle = element(by.id('jhi-rfb-user-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  usernameInput = element(by.id('field_username'));

  homeLocationSelect = element(by.id('field_homeLocation'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setUsernameInput(username: string): Promise<void> {
    await this.usernameInput.sendKeys(username);
  }

  async getUsernameInput(): Promise<string> {
    return await this.usernameInput.getAttribute('value');
  }

  async homeLocationSelectLastOption(): Promise<void> {
    await this.homeLocationSelect.all(by.tagName('option')).last().click();
  }

  async homeLocationSelectOption(option: string): Promise<void> {
    await this.homeLocationSelect.sendKeys(option);
  }

  getHomeLocationSelect(): ElementFinder {
    return this.homeLocationSelect;
  }

  async getHomeLocationSelectedOption(): Promise<string> {
    return await this.homeLocationSelect.element(by.css('option:checked')).getText();
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

export class RfbUserDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rfbUser-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rfbUser'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
