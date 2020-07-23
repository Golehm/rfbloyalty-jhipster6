import { element, by, ElementFinder } from 'protractor';

export class RfbEventAttendanceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-rfb-event-attendance div table .btn-danger'));
  title = element.all(by.css('jhi-rfb-event-attendance div h2#page-heading span')).first();
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

export class RfbEventAttendanceUpdatePage {
  pageTitle = element(by.id('jhi-rfb-event-attendance-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  attendanceDateInput = element(by.id('field_attendanceDate'));

  rfbUserSelect = element(by.id('field_rfbUser'));
  rfbEventSelect = element(by.id('field_rfbEvent'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setAttendanceDateInput(attendanceDate: string): Promise<void> {
    await this.attendanceDateInput.sendKeys(attendanceDate);
  }

  async getAttendanceDateInput(): Promise<string> {
    return await this.attendanceDateInput.getAttribute('value');
  }

  async rfbUserSelectLastOption(): Promise<void> {
    await this.rfbUserSelect.all(by.tagName('option')).last().click();
  }

  async rfbUserSelectOption(option: string): Promise<void> {
    await this.rfbUserSelect.sendKeys(option);
  }

  getRfbUserSelect(): ElementFinder {
    return this.rfbUserSelect;
  }

  async getRfbUserSelectedOption(): Promise<string> {
    return await this.rfbUserSelect.element(by.css('option:checked')).getText();
  }

  async rfbEventSelectLastOption(): Promise<void> {
    await this.rfbEventSelect.all(by.tagName('option')).last().click();
  }

  async rfbEventSelectOption(option: string): Promise<void> {
    await this.rfbEventSelect.sendKeys(option);
  }

  getRfbEventSelect(): ElementFinder {
    return this.rfbEventSelect;
  }

  async getRfbEventSelectedOption(): Promise<string> {
    return await this.rfbEventSelect.element(by.css('option:checked')).getText();
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

export class RfbEventAttendanceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rfbEventAttendance-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rfbEventAttendance'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
