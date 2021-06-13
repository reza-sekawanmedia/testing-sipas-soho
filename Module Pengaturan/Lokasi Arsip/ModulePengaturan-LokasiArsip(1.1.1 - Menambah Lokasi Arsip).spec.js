describe('Lokasi Arsip', () => {
    function name_lokasi() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    let nama_lokasi = 'Kabinet Dokumen ' + name_lokasi();
    let kode_lokasi = nama_lokasi.split('Kabinet Dokumen')[1];
    let nama_lokasi_tdk = 'Kabinet Dokumen ' + name_lokasi();
    let nama_lokasi_tdk2 = 'Kabinet Dokumen ' + name_lokasi();

    it('1.1.1 => Lokasi Arsip Menambah Lokasi Arsip', function() {

                // Login
            cy.visit('https://sipaslab.sekawanmedia.co.id/playground/sipas-sewa/webapp/src/');
            cy.get('#textfield-1018-inputEl').clear();
            cy.get('#textfield-1018-inputEl').type('admin');
            cy.get('#textfield-1019-inputEl').clear();
            cy.get('#textfield-1019-inputEl').type('demosoho-admin');
            cy.get('#button-1024-btnIconEl').click();
        
                // Menu Pengaturan => Lokasi Arsip
            cy.get('#button-1096-btnIconEl').click();
            cy.get('#menuitem-1119-textEl').click();
            
                // Assertions Popup Window
            cy.get('#sipas_com_button_add-1143-btnIconEl').click();
            cy.wait(500);
            cy.get('.x-window').eq(1).should('have.class', 'x-window');
            cy.get('#textfield-1169-labelEl').should('have.text', 'Nama Lokasi:*');
            cy.get('#textfield-1169-inputEl').should('have.value', '').and('have.text', '');
            cy.get('#textfield-1170-labelEl').should('have.text', 'Kode Lokasi:*');
            cy.get('#textfield-1170-inputEl').should('have.value', '').and('have.text', '');
            cy.get('.x-form-type-checkbox').should('have.class', 'x-form-cb-checked');

                // Tambah Lokasi Arsip
            cy.get('.x-form-required-field').eq(0).type(nama_lokasi).should('have.value', nama_lokasi);
            cy.get('.x-form-required-field').eq(1).type(kode_lokasi).should('have.value', kode_lokasi);
            cy.get('.x-btn-primary').eq(1).click();
            cy.get('#button-1005-btnIconEl').click();
            cy.contains(nama_lokasi).should('have.text', nama_lokasi);
            cy.get('.x-grid-cell-inner').eq(2).should('have.text', kode_lokasi); // spreadsheet 629 (solved)
            
                // Tambah Lokasi Arsip (Diisi tidak lengkap)
            cy.get('#sipas_com_button_add-1143-btnIconEl').click();
            cy.wait(500);
            cy.get('.x-form-required-field').eq(0).type(nama_lokasi_tdk).should('have.value', nama_lokasi_tdk);
            cy.get('#checkboxfield-1186-inputEl').click();
            cy.get('.x-btn-primary').eq(1).click();
            cy.get('.x-window').eq(0).should('have.class', 'x-window');
            cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Silahkan lengkapi kolom berwarna merah pada form');
            cy.get('#button-1005-btnIconEl').click();
            cy.get('.x-window').eq(1).should('have.class', 'x-window');
            cy.get('#tool-1194-toolEl').click();

                // Tambah Lokasi Arsip (Memakai Kode arsip yg sudah ada)
            cy.get('#sipas_com_button_add-1143-btnIconEl').click();
            cy.wait(500);
            cy.get('.x-form-required-field').eq(0).type(nama_lokasi_tdk2).should('have.value', nama_lokasi_tdk2);
            cy.get('.x-form-required-field').eq(1).type(kode_lokasi).should('have.value', kode_lokasi);
            cy.get('.x-btn-primary').eq(1).click();
            cy.get('.x-window').eq(0).should('have.class', 'x-window');
            cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Server error'); // seharusnya "kode sudah dipakai"
            cy.get('#button-1005').click();
            cy.get('.x-window').eq(3).should('have.class', 'x-window');
            
    });
});
