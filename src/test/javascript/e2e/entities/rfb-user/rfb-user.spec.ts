import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RfbUserComponentsPage, RfbUserDeleteDialog, RfbUserUpdatePage } from './rfb-user.page-object';

const expect = chai.expect;

describe('RfbUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rfbUserComponentsPage: RfbUserComponentsPage;
  let rfbUserUpdatePage: RfbUserUpdatePage;
  let rfbUserDeleteDialog: RfbUserDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RfbUsers', async () => {
    await navBarPage.goToEntity('rfb-user');
    rfbUserComponentsPage = new RfbUserComponentsPage();
    await browser.wait(ec.visibilityOf(rfbUserComponentsPage.title), 5000);
    expect(await rfbUserComponentsPage.getTitle()).to.eq('Rfb Users');
    await browser.wait(ec.or(ec.visibilityOf(rfbUserComponentsPage.entities), ec.visibilityOf(rfbUserComponentsPage.noResult)), 1000);
  });

  it('should load create RfbUser page', async () => {
    await rfbUserComponentsPage.clickOnCreateButton();
    rfbUserUpdatePage = new RfbUserUpdatePage();
    expect(await rfbUserUpdatePage.getPageTitle()).to.eq('Create or edit a Rfb User');
    await rfbUserUpdatePage.cancel();
  });

  it('should create and save RfbUsers', async () => {
    const nbButtonsBeforeCreate = await rfbUserComponentsPage.countDeleteButtons();

    await rfbUserComponentsPage.clickOnCreateButton();

    await promise.all([rfbUserUpdatePage.setUsernameInput('username'), rfbUserUpdatePage.homeLocationSelectLastOption()]);

    expect(await rfbUserUpdatePage.getUsernameInput()).to.eq('username', 'Expected Username value to be equals to username');

    await rfbUserUpdatePage.save();
    expect(await rfbUserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rfbUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RfbUser', async () => {
    const nbButtonsBeforeDelete = await rfbUserComponentsPage.countDeleteButtons();
    await rfbUserComponentsPage.clickOnLastDeleteButton();

    rfbUserDeleteDialog = new RfbUserDeleteDialog();
    expect(await rfbUserDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Rfb User?');
    await rfbUserDeleteDialog.clickOnConfirmButton();

    expect(await rfbUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
