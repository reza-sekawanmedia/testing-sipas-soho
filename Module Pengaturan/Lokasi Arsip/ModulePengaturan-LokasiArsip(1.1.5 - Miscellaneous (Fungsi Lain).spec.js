describe('Lokasi Arsip', ()=> {
    it('1.1.5 => Lokasi Arsip Miscellaneous (Fungsi Lain)', function() {
       cy.visit('https://sipaslab.sekawanmedia.co.id/playground/sipas-sewa/webapp/src/');
       cy.get('#textfield-1018-inputEl').clear();
       cy.get('#textfield-1018-inputEl').type('admin');
       cy.get('#textfield-1019-inputEl').clear();
       cy.get('#textfield-1019-inputEl').type('demosoho-admin');
       cy.get('#button-1024-btnIconEl').click();
       // Menu Pengaturan => Lokasi Arsip
       cy.get('#button-1096-btnIconEl').click();
       cy.get('#menuitem-1119-textEl').click();
       // Control Close Panel
       cy.get('.x-panel').eq(5).should('have.class', 'x-panel-default-framed');
       cy.get('.x-tool').eq(1).click();
       cy.get('.x-panel').eq(5).should('not.have.class', 'x-panel-default-framed');
       // Menu Pengaturan => Lokasi Arsip
       cy.get('#button-1096-btnIconEl').click();
       cy.get('#menuitem-1119-textEl').click();
       // Control Maximize Panel
       cy.get('.x-panel').eq(6).should('not.have.class', 'x-window-item')
       cy.get('.x-tool-maximize').eq(0).click();
       cy.get('.x-panel').eq(10).should('have.class', 'x-window-item');
       // Control Restore Panel
       cy.get('.x-tool-restore').eq(0).click();
       cy.get('.x-panel').eq(6).should('not.have.class', 'x-window-item');
        // Control Reload Panel
       cy.get('.x-btn-icon-el').eq(6).click();
       cy.get('.x-mask-msg-text').eq(0).should('not.have.css', 'display', 'none');
       // Sorting
        cy.get('.x-column-header-text').eq(1).click();
        cy.get('.x-column-header-text').eq(1).should('be.visible');
        cy.get('.x-column-header-text').eq(1).click();
        cy.get('.x-column-header-text').eq(1).should('be.visible');
        cy.get('.x-column-header-text').eq(2).click();
        cy.get('.x-column-header-text').eq(2).should('be.visible');
        cy.get('.x-column-header-text').eq(2).click();
        cy.get('.x-column-header-text').eq(2).should('be.visible');
        
        // Filtering
        cy.get('.x-column-header-trigger').eq(0).click({force: true});
        cy.get('.x-column-header-trigger').eq(0).should('be.visible');
    //    cy.get('#gridcolumn-1170-triggerEl').click({force: true});
  
       cy.get('.x-menu-item-link').eq(27).should('have.text', 'Kolom').click();
       cy.get('.x-menu-item-checked').eq(0).should('have.text', 'Nama Lokasi').and('not.have.class', 'x-menu-item-unchecked').click();
       cy.get('.x-menu-item-unchecked').eq(1).should('have.text', 'Nama Lokasi').and('not.have.class', 'x-menu-item-checked').click();
       cy.get('.x-menu-item-checked').eq(1).should('have.text', 'Kode Lokasi').and('not.have.class', 'x-menu-item-unchecked').click();
       cy.get('.x-menu-item-unchecked').eq(1).should('have.text', 'Kode Lokasi').and('not.have.class', 'x-menu-item-checked').click();
       cy.get('.x-menu-item-link').eq(28).should('have.text', 'Saring').click({force: true});
       cy.get('#textfield-1215-inputEl').type('Penting').should('have.value', 'Penting');
       cy.wait(4000)
       cy.get('.x-menu-item-icon').eq(28).click();
    //    cy.get('.x-menu-item-link').eq(28).should('have.text', 'Saring').click();

    
       cy.get('#gridview-1174').click();
       cy.get('#button-1195-btnIconEl').click();
    //    //end
    });
});