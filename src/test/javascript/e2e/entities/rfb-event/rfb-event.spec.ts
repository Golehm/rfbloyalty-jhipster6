import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RfbEventComponentsPage, RfbEventDeleteDialog, RfbEventUpdatePage } from './rfb-event.page-object';

const expect = chai.expect;

describe('RfbEvent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rfbEventComponentsPage: RfbEventComponentsPage;
  let rfbEventUpdatePage: RfbEventUpdatePage;
  let rfbEventDeleteDialog: RfbEventDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RfbEvents', async () => {
    await navBarPage.goToEntity('rfb-event');
    rfbEventComponentsPage = new RfbEventComponentsPage();
    await browser.wait(ec.visibilityOf(rfbEventComponentsPage.title), 5000);
    expect(await rfbEventComponentsPage.getTitle()).to.eq('Rfb Events');
    await browser.wait(ec.or(ec.visibilityOf(rfbEventComponentsPage.entities), ec.visibilityOf(rfbEventComponentsPage.noResult)), 1000);
  });

  it('should load create RfbEvent page', async () => {
    await rfbEventComponentsPage.clickOnCreateButton();
    rfbEventUpdatePage = new RfbEventUpdatePage();
    expect(await rfbEventUpdatePage.getPageTitle()).to.eq('Create or edit a Rfb Event');
    await rfbEventUpdatePage.cancel();
  });

  it('should create and save RfbEvents', async () => {
    const nbButtonsBeforeCreate = await rfbEventComponentsPage.countDeleteButtons();

    await rfbEventComponentsPage.clickOnCreateButton();

    await promise.all([
      rfbEventUpdatePage.setEventDateInput('2000-12-31'),
      rfbEventUpdatePage.setEventCodeInput('eventCode'),
      rfbEventUpdatePage.rfbLocationSelectLastOption(),
    ]);

    expect(await rfbEventUpdatePage.getEventDateInput()).to.eq('2000-12-31', 'Expected eventDate value to be equals to 2000-12-31');
    expect(await rfbEventUpdatePage.getEventCodeInput()).to.eq('eventCode', 'Expected EventCode value to be equals to eventCode');

    await rfbEventUpdatePage.save();
    expect(await rfbEventUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rfbEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RfbEvent', async () => {
    const nbButtonsBeforeDelete = await rfbEventComponentsPage.countDeleteButtons();
    await rfbEventComponentsPage.clickOnLastDeleteButton();

    rfbEventDeleteDialog = new RfbEventDeleteDialog();
    expect(await rfbEventDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Rfb Event?');
    await rfbEventDeleteDialog.clickOnConfirmButton();

    expect(await rfbEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
