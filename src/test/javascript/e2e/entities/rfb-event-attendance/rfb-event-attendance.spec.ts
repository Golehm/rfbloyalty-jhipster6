import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  RfbEventAttendanceComponentsPage,
  RfbEventAttendanceDeleteDialog,
  RfbEventAttendanceUpdatePage,
} from './rfb-event-attendance.page-object';

const expect = chai.expect;

describe('RfbEventAttendance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rfbEventAttendanceComponentsPage: RfbEventAttendanceComponentsPage;
  let rfbEventAttendanceUpdatePage: RfbEventAttendanceUpdatePage;
  let rfbEventAttendanceDeleteDialog: RfbEventAttendanceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RfbEventAttendances', async () => {
    await navBarPage.goToEntity('rfb-event-attendance');
    rfbEventAttendanceComponentsPage = new RfbEventAttendanceComponentsPage();
    await browser.wait(ec.visibilityOf(rfbEventAttendanceComponentsPage.title), 5000);
    expect(await rfbEventAttendanceComponentsPage.getTitle()).to.eq('Event Attendances');
    await browser.wait(
      ec.or(ec.visibilityOf(rfbEventAttendanceComponentsPage.entities), ec.visibilityOf(rfbEventAttendanceComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RfbEventAttendance page', async () => {
    await rfbEventAttendanceComponentsPage.clickOnCreateButton();
    rfbEventAttendanceUpdatePage = new RfbEventAttendanceUpdatePage();
    expect(await rfbEventAttendanceUpdatePage.getPageTitle()).to.eq('Create or edit a Event Attendance');
    await rfbEventAttendanceUpdatePage.cancel();
  });

  it('should create and save RfbEventAttendances', async () => {
    const nbButtonsBeforeCreate = await rfbEventAttendanceComponentsPage.countDeleteButtons();

    await rfbEventAttendanceComponentsPage.clickOnCreateButton();

    await promise.all([
      rfbEventAttendanceUpdatePage.setAttendanceDateInput('2000-12-31'),
      rfbEventAttendanceUpdatePage.rfbUserSelectLastOption(),
      rfbEventAttendanceUpdatePage.rfbEventSelectLastOption(),
    ]);

    expect(await rfbEventAttendanceUpdatePage.getAttendanceDateInput()).to.eq(
      '2000-12-31',
      'Expected attendanceDate value to be equals to 2000-12-31'
    );

    await rfbEventAttendanceUpdatePage.save();
    expect(await rfbEventAttendanceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rfbEventAttendanceComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RfbEventAttendance', async () => {
    const nbButtonsBeforeDelete = await rfbEventAttendanceComponentsPage.countDeleteButtons();
    await rfbEventAttendanceComponentsPage.clickOnLastDeleteButton();

    rfbEventAttendanceDeleteDialog = new RfbEventAttendanceDeleteDialog();
    expect(await rfbEventAttendanceDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Event Attendance?');
    await rfbEventAttendanceDeleteDialog.clickOnConfirmButton();

    expect(await rfbEventAttendanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
