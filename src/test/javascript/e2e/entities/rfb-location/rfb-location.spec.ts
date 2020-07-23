import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RfbLocationComponentsPage, RfbLocationDeleteDialog, RfbLocationUpdatePage } from './rfb-location.page-object';

const expect = chai.expect;

describe('RfbLocation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rfbLocationComponentsPage: RfbLocationComponentsPage;
  let rfbLocationUpdatePage: RfbLocationUpdatePage;
  let rfbLocationDeleteDialog: RfbLocationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RfbLocations', async () => {
    await navBarPage.goToEntity('rfb-location');
    rfbLocationComponentsPage = new RfbLocationComponentsPage();
    await browser.wait(ec.visibilityOf(rfbLocationComponentsPage.title), 5000);
    expect(await rfbLocationComponentsPage.getTitle()).to.eq('Rfb Locations');
    await browser.wait(
      ec.or(ec.visibilityOf(rfbLocationComponentsPage.entities), ec.visibilityOf(rfbLocationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RfbLocation page', async () => {
    await rfbLocationComponentsPage.clickOnCreateButton();
    rfbLocationUpdatePage = new RfbLocationUpdatePage();
    expect(await rfbLocationUpdatePage.getPageTitle()).to.eq('Create or edit a Rfb Location');
    await rfbLocationUpdatePage.cancel();
  });

  it('should create and save RfbLocations', async () => {
    const nbButtonsBeforeCreate = await rfbLocationComponentsPage.countDeleteButtons();

    await rfbLocationComponentsPage.clickOnCreateButton();

    await promise.all([rfbLocationUpdatePage.setLocationNameInput('locationName'), rfbLocationUpdatePage.setRunDayOfWeekInput('5')]);

    expect(await rfbLocationUpdatePage.getLocationNameInput()).to.eq(
      'locationName',
      'Expected LocationName value to be equals to locationName'
    );
    expect(await rfbLocationUpdatePage.getRunDayOfWeekInput()).to.eq('5', 'Expected runDayOfWeek value to be equals to 5');

    await rfbLocationUpdatePage.save();
    expect(await rfbLocationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rfbLocationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RfbLocation', async () => {
    const nbButtonsBeforeDelete = await rfbLocationComponentsPage.countDeleteButtons();
    await rfbLocationComponentsPage.clickOnLastDeleteButton();

    rfbLocationDeleteDialog = new RfbLocationDeleteDialog();
    expect(await rfbLocationDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Rfb Location?');
    await rfbLocationDeleteDialog.clickOnConfirmButton();

    expect(await rfbLocationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
