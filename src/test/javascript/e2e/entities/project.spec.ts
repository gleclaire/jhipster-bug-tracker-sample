import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Project e2e test', () => {

    let navBarPage: NavBarPage;
    let projectDialogPage: ProjectDialogPage;
    let projectComponentsPage: ProjectComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Projects', () => {
        navBarPage.goToEntity('project');
        projectComponentsPage = new ProjectComponentsPage();
        expect(projectComponentsPage.getTitle())
            .toMatch(/bugTrackerApp.project.home.title/);

    });

    it('should load create Project dialog', () => {
        projectComponentsPage.clickOnCreateButton();
        projectDialogPage = new ProjectDialogPage();
        expect(projectDialogPage.getModalTitle())
            .toMatch(/bugTrackerApp.project.home.createOrEditLabel/);
        projectDialogPage.close();
    });

    it('should create and save Projects', () => {
        projectComponentsPage.clickOnCreateButton();
        projectDialogPage.setNameInput('name');
        expect(projectDialogPage.getNameInput()).toMatch('name');
        projectDialogPage.save();
        expect(projectDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProjectComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-project div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProjectDialogPage {
    modalTitle = element(by.css('h4#myProjectLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
