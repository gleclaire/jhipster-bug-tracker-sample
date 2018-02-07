import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Ticket e2e test', () => {

    let navBarPage: NavBarPage;
    let ticketDialogPage: TicketDialogPage;
    let ticketComponentsPage: TicketComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tickets', () => {
        navBarPage.goToEntity('ticket');
        ticketComponentsPage = new TicketComponentsPage();
        expect(ticketComponentsPage.getTitle())
            .toMatch(/bugTrackerApp.ticket.home.title/);

    });

    it('should load create Ticket dialog', () => {
        ticketComponentsPage.clickOnCreateButton();
        ticketDialogPage = new TicketDialogPage();
        expect(ticketDialogPage.getModalTitle())
            .toMatch(/bugTrackerApp.ticket.home.createOrEditLabel/);
        ticketDialogPage.close();
    });

    it('should create and save Tickets', () => {
        ticketComponentsPage.clickOnCreateButton();
        ticketDialogPage.setTitleInput('title');
        expect(ticketDialogPage.getTitleInput()).toMatch('title');
        ticketDialogPage.setDescriptionInput('description');
        expect(ticketDialogPage.getDescriptionInput()).toMatch('description');
        ticketDialogPage.setDueDateInput('2000-12-31');
        expect(ticketDialogPage.getDueDateInput()).toMatch('2000-12-31');
        ticketDialogPage.getDoneInput().isSelected().then((selected) => {
            if (selected) {
                ticketDialogPage.getDoneInput().click();
                expect(ticketDialogPage.getDoneInput().isSelected()).toBeFalsy();
            } else {
                ticketDialogPage.getDoneInput().click();
                expect(ticketDialogPage.getDoneInput().isSelected()).toBeTruthy();
            }
        });
        ticketDialogPage.projectSelectLastOption();
        ticketDialogPage.assignedToSelectLastOption();
        // ticketDialogPage.labelSelectLastOption();
        ticketDialogPage.save();
        expect(ticketDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TicketComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-ticket div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TicketDialogPage {
    modalTitle = element(by.css('h4#myTicketLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    descriptionInput = element(by.css('input#field_description'));
    dueDateInput = element(by.css('input#field_dueDate'));
    doneInput = element(by.css('input#field_done'));
    projectSelect = element(by.css('select#field_project'));
    assignedToSelect = element(by.css('select#field_assignedTo'));
    labelSelect = element(by.css('select#field_label'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setDueDateInput = function(dueDate) {
        this.dueDateInput.sendKeys(dueDate);
    };

    getDueDateInput = function() {
        return this.dueDateInput.getAttribute('value');
    };

    getDoneInput = function() {
        return this.doneInput;
    };
    projectSelectLastOption = function() {
        this.projectSelect.all(by.tagName('option')).last().click();
    };

    projectSelectOption = function(option) {
        this.projectSelect.sendKeys(option);
    };

    getProjectSelect = function() {
        return this.projectSelect;
    };

    getProjectSelectedOption = function() {
        return this.projectSelect.element(by.css('option:checked')).getText();
    };

    assignedToSelectLastOption = function() {
        this.assignedToSelect.all(by.tagName('option')).last().click();
    };

    assignedToSelectOption = function(option) {
        this.assignedToSelect.sendKeys(option);
    };

    getAssignedToSelect = function() {
        return this.assignedToSelect;
    };

    getAssignedToSelectedOption = function() {
        return this.assignedToSelect.element(by.css('option:checked')).getText();
    };

    labelSelectLastOption = function() {
        this.labelSelect.all(by.tagName('option')).last().click();
    };

    labelSelectOption = function(option) {
        this.labelSelect.sendKeys(option);
    };

    getLabelSelect = function() {
        return this.labelSelect;
    };

    getLabelSelectedOption = function() {
        return this.labelSelect.element(by.css('option:checked')).getText();
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
