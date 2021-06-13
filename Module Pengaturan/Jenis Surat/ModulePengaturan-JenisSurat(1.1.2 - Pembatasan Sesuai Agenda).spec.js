describe('Jenis Surat', () => {
    function name_jenis() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    let nama_jenis = name_jenis();
    let kode_jenis1 = nama_jenis.split('')[0];
    let kode_jenis2 = nama_jenis.split('')[1];
    let should_k1 = kode_jenis1 + kode_jenis2;
    let contains1 = nama_jenis + ' (' + should_k1 + ')';
    let dari = 'CV ' + name_jenis();
    it('1.1.2 => Jenis Surat Pembatasan Sesuai Agenda', function(){
          // Login
        cy.visit('https://sipaslab.sekawanmedia.co.id/playground/sipas-sewa/webapp/src/');
        cy.get('#textfield-1018-inputEl').clear();
        cy.get('#textfield-1018-inputEl').type('admin');
        cy.get('#textfield-1019-inputEl').clear();
        cy.get('#textfield-1019-inputEl').type('demosoho-admin');
        cy.get('#button-1024-btnIconEl').click();
       
            // Menu Pengaturan => Jenis Surat
        cy.get('#button-1096-btnIconEl').click();
        cy.get('#menuitem-1115-textEl').click();

            // Tambah Jenis Surat Masuk
        cy.get('#sipas_com_button_add-1150-btnIconEl').click();
        cy.get('#textfield-1178-inputEl').type(nama_jenis).should('have.value', nama_jenis);
        cy.get('#textfield-1179-inputEl').type(kode_jenis1 + kode_jenis2).should('have.value', kode_jenis1 + kode_jenis2);
        cy.get('#checkboxfield-1184-inputEl').click();
        cy.get('#sipas_com_button_save-1211-btnIconEl').click();
        cy.get('#button-1005-btnIconEl').click();

            // Assertion Tambah Jenis Surat Masuk
        cy.contains(nama_jenis).should('have.text', nama_jenis);
        cy.get('.x-grid-cell-gridcolumn-1136').should('contain', should_k1);

            // Kelola Surat > Agenda Surat Masuk Eks
        cy.contains('Kelola Surat').click();
        cy.get('#menuitem-1083-textEl').click();
        cy.wait(2000);
            // Tambah Surat Masuk Eks
        cy.get('.x-btn-icon-el').eq(18).click();
        cy.get('.x-form-arrow-trigger').eq(4).click({multiple:true, force:true});
        cy.contains(contains1).should('have.value', contains1).click();
        
    })
})


