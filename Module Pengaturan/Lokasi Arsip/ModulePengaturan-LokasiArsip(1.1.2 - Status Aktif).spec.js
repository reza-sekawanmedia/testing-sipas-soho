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
    let contains1 = nama_lokasi + ' (' + kode_lokasi + ')';
    let nama_lokasi_nonaktif = 'Kabinet Dokumen ' + name_lokasi();
    let kode_lokasi_nonaktif = nama_lokasi_nonaktif.split('Kabinet Dokumen')[1];
    let contains2 = nama_lokasi_nonaktif + ' (' + kode_lokasi_nonaktif + ')';

    it('1.1.2 => Lokasi Arsip Status Aktif', function() {
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

            // Kelola Surat > Agenda Surat Masuk Eks
        cy.contains('Kelola Surat').click();
        cy.get('#menuitem-1083-textEl').click();

            // Tambah (Buat) Surat
        cy.get('.x-btn-icon-el').eq(16).click();
        cy.wait(1000);
        cy.get('.x-form-arrow-trigger').eq(9).click({multiple:true, force:true});
        cy.contains(contains1).should('have.text', contains1).click();
        cy.wait(1500);
        cy.get('.x-form-text').eq(43).should('have.value', nama_lokasi);
        cy.get('.x-tool').eq(7).click();

            // Menu Pengaturan => Lokasi Arsip
        cy.get('#button-1096-btnIconEl').click();
        cy.get('#menuitem-1119-textEl').click();


            // Tambah Lokasi Arsip tidak aktif
        cy.get('#sipas_com_button_add-1143-btnIconEl').click();
        cy.get('.x-form-required-field').eq(0).type(nama_lokasi_nonaktif).should('have.value', nama_lokasi_nonaktif);
        cy.get('.x-form-required-field').eq(1).type(kode_lokasi_nonaktif).should('have.value', kode_lokasi_nonaktif);
        cy.get('.x-form-checkbox').click();
        cy.get('.x-form-type-checkbox').should('not.have.class', 'x-form-cb-checked');
        cy.wait(500);
        cy.get('.x-btn-primary').eq(2).click();
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Berhasil menyimpan data.');
        cy.get('#button-1005-btnIconEl').click();
        cy.get('.x-trigger-noedit').eq(0).click();
        cy.get('.x-boundlist-item').eq(2).should('have.text', 'Tidak Aktif').click();
        cy.contains(nama_lokasi_nonaktif).should('have.text', nama_lokasi_nonaktif);
        cy.get('.x-grid-cell-last').should('contain', kode_lokasi_nonaktif);
        cy.get('.x-trigger-noedit').eq(0).click();
        cy.get('.x-boundlist-item').eq(1).should('have.text', 'Aktif').click();
        cy.get('.x-grid-cell-inner').should('not.have.text', nama_lokasi_nonaktif);
        cy.get('.x-grid-cell-last').should('not.have.text', kode_lokasi_nonaktif);

            // Kelola Surat > Agenda Surat Masuk Eks
        cy.contains('Kelola Surat').click();
        cy.get('#menuitem-1083-textEl').click();

            // Tambah (Buat) Surat + Assertion Nonaktif
        cy.get('.x-btn-icon-el').eq(16).click();
        cy.wait(1000);
        cy.get('.x-form-arrow-trigger').eq(9).click({multiple:true, force:true});
        cy.contains(contains1).should('not.have.text', contains2);
        cy.contains(contains1).should('have.text', contains1).click();
        cy.wait(1500);
        cy.get('.x-form-text').eq(43).should('have.value', nama_lokasi);
        cy.get('.x-form-text').eq(43).should('not.have.value', nama_lokasi_nonaktif);
        cy.get('.x-tool').eq(7).click();
    })
})
