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
    let nama_lokasi2 = 'Kabinet Dokumen ' + name_lokasi();
    let kode_lokasi2 = nama_lokasi2.split('Kabinet Dokumen')[1];
    let contains1 = nama_lokasi2 + ' (' + kode_lokasi2 + ')';

    it('1.1.4 => Lokasi Arsip Menghapus Lokasi Arsip', function(){
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

            // Tambah Lokasi Arsip
        cy.get('#sipas_com_button_add-1143-btnIconEl').click();
        cy.get('.x-form-required-field').eq(0).type(nama_lokasi).should('have.value', nama_lokasi);
        cy.get('.x-form-required-field').eq(1).type(kode_lokasi).should('have.value', kode_lokasi);
        cy.get('.x-btn-primary').eq(1).click();
        cy.wait(500);
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Berhasil menyimpan data.');
        cy.get('#button-1005-btnIconEl').click();
        cy.contains(nama_lokasi).should('have.text', nama_lokasi);
        cy.get('.x-grid-cell-inner').eq(2).should('have.text', kode_lokasi);

            // Hapus Lokasi Arsip
        cy.contains(nama_lokasi).should('have.text', nama_lokasi).click();
        cy.get('.x-btn-icon-el').eq(21).click();
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('.x-btn-icon-el').eq(18).click();
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Berhasil Menghapus Data');
        cy.get('#button-1005-btnIconEl').click();

            // Tambah Lokasi Arsip
        cy.get('#sipas_com_button_add-1143-btnIconEl').click();
        cy.get('.x-form-required-field').eq(0).type(nama_lokasi2).should('have.value', nama_lokasi2);
        cy.get('.x-form-required-field').eq(1).type(kode_lokasi2).should('have.value', kode_lokasi2);
        cy.get('.x-btn-primary').eq(1).click();
        cy.wait(500);
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Berhasil menyimpan data.');
        cy.get('#button-1005-btnIconEl').click();
        cy.contains(nama_lokasi2).should('have.text', nama_lokasi2);
        cy.get('.x-grid-cell-inner').eq(2).should('have.text', kode_lokasi2);

          // Kelola Surat > Agenda Surat Masuk Eks
        cy.contains('Kelola Surat').click();
        cy.get('#menuitem-1084-textEl').click();
        cy.get('.x-fit-item').eq(5).should('have.class', 'x-fit-item');
        cy.get('.x-btn-icon-el').eq(16).click();
        cy.get('.x-form-arrow-trigger').eq(3).click({multiple: true, force: true});
        cy.contains('PT. Semangat Indonesia').should('have.text', 'PT. Semangat Indonesia').click();
        cy.get('.x-form-required-field').eq(0).should('have.value', 'PT. Semangat Indonesia');
        cy.get('.x-form-required-field').eq(1).type('Undangan').should('have.value', 'Undangan');
        cy.get('.x-form-required-field').eq(2).should('have.value', 'PT. Indonesia Bersatu');
        cy.get('.x-form-arrow-trigger').eq(4).click({multiple: true, force: true});
        cy.contains('Edaran (ED)').should('have.text', 'Edaran (ED)').click();
        cy.get('.x-form-required-field').eq(4).should('have.value', 'Edaran');
        cy.get('.x-form-arrow-trigger').eq(9).click({multiple: true, force: true});
        cy.contains(contains1).should('have.text', contains1).click();
        // cy.get('.x-form-required-field').eq(4).should('have.value', nama_lokasi2);
        cy.get('.x-form-field').eq(51).should('have.value', nama_lokasi2);
        cy.get('.x-btn-primary').eq(3).click();
        cy.get('.x-btn-icon-el').eq(28).click();
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Berhasil mengubah data.');
        cy.get('#button-1005-btnIconEl').click();

            // Menu Pengaturan => Lokasi Arsip
        cy.get('#button-1096-btnIconEl').click();
        cy.get('#menuitem-1119-textEl').click();

            // Hapus Lokasi Arsip Surat
        cy.contains(nama_lokasi2).should('have.text', nama_lokasi2).click();
        cy.get('.x-btn-icon-el').eq(31).click();
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('.x-btn-icon-el').eq(28).click();
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Berhasil Menghapus Data');
        cy.get('#button-1005-btnIconEl').click();
        
        // Kelola Surat > Agenda Surat Masuk Eks
        cy.contains('Kelola Surat').click();
        cy.get('#menuitem-1084-textEl').click();
        cy.contains('PT. Semangat Indonesia').should('have.text', 'Tujuan: PT. Semangat Indonesia').click();
        cy.get('.x-form-field').eq(49).should('have.value', nama_lokasi2); //-- SPREADSHEET 670 -- aslinya expectedresult (Datanya kosong) (!solved)
        cy.get('.x-btn-icon-el').eq(45).click();
        cy.get('.x-form-arrow-trigger').eq(9).click({multiple: true, force: true});
        cy.get('.x-boundlist-item').should('not.have.text', nama_lokasi2);
        cy.get('.x-form-field').eq(49).should('not.have.value', nama_lokasi2); 

    })
})