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
    let ubah_nama_lokasi = 'Kabinet Dokumen ' + name_lokasi();
    let ubah_kode_lokasi = ubah_nama_lokasi.split('Kabinet Dokumen')[1];
    let nama_lokasi_tdk_lengkap = 'Kabinet Dokumen ' + name_lokasi();
    let kode_lokasi_tdk_lengkap = nama_lokasi_tdk_lengkap.split('Kabinet Dokumen')[1];
    let text = 'Kode Lokasi ' + '"' + '' + ubah_kode_lokasi + '"' + ' sudah terpakai.';


    it('1.1.3 => Lokasi Arsip Mengubah Lokasi Arsip', function(){
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
        cy.get('.x-form-required-field').eq(0).type(nama_lokasi).should(($p) => {
                expect($p).to.have.value(nama_lokasi)
        });
        cy.get('.x-form-required-field').eq(1).type(kode_lokasi).should('have.value', kode_lokasi);
        cy.get('.x-btn-primary').eq(1).click();
        cy.wait(500);
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Berhasil menyimpan data.');
        cy.get('#button-1005-btnIconEl').click();
        cy.contains(nama_lokasi).should('have.text', nama_lokasi);
        cy.get('.x-grid-cell-inner').eq(2).should('have.text', kode_lokasi);

            // Ubah Lokasi Arsip
        cy.contains(nama_lokasi).should('have.text', nama_lokasi).click();
        cy.get('.x-btn-button').eq(22).click();

            // Assertions Ubah Data + Simpan Data
        cy.wait(1000);
        cy.get('.x-window').eq(1).should('have.class', 'x-window');
        cy.get('.x-form-required-field').eq(0).should('have.value', nama_lokasi);
        cy.get('.x-form-required-field').eq(1).should('have.value', kode_lokasi);
        cy.get('.x-form-type-checkbox').should('have.class', 'x-form-cb-checked');
        cy.get('.x-form-required-field').eq(1).clear();
        cy.get('.x-form-required-field').eq(1).type(ubah_kode_lokasi).should('have.value', ubah_kode_lokasi);
        cy.get('.x-btn-icon-el').eq(21).click();
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Berhasil mengubah data.');
        cy.get('#button-1005-btnIconEl').click();
        cy.contains(nama_lokasi).should('have.text', nama_lokasi);
        cy.get('.x-grid-cell-inner').eq(2).should('have.text', ubah_kode_lokasi);

            // Assertions Tambah Data + Ubah Data + Simpan Data (kolom required tidak diisi lengkap)
        cy.get('#sipas_com_button_add-1143-btnIconEl').click();
        cy.get('.x-form-required-field').eq(0).type(nama_lokasi_tdk_lengkap).should('have.value', nama_lokasi_tdk_lengkap);
        cy.get('.x-form-required-field').eq(1).type(kode_lokasi_tdk_lengkap).should('have.value', kode_lokasi_tdk_lengkap);
        cy.get('.x-btn-primary').eq(1).click();
        cy.wait(500);
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Berhasil menyimpan data.');
        cy.get('#button-1005-btnIconEl').click();
        cy.contains(nama_lokasi_tdk_lengkap).should('have.text', nama_lokasi_tdk_lengkap);
        cy.get('.x-grid-cell-inner').eq(2).should('have.text', kode_lokasi_tdk_lengkap);
        cy.contains(nama_lokasi_tdk_lengkap).should('have.text', nama_lokasi_tdk_lengkap).click();
        cy.get('.x-btn-button').eq(22).click();
        cy.wait(1000);
        cy.get('.x-window').eq(1).should('have.class', 'x-window');
        cy.get('.x-form-required-field').eq(0).should('have.value', nama_lokasi_tdk_lengkap);
        cy.get('.x-form-required-field').eq(1).should('have.value', kode_lokasi_tdk_lengkap);
        cy.get('.x-form-type-checkbox').should('have.class', 'x-form-cb-checked');
        cy.get('.x-form-required-field').eq(1).clear();
        cy.get('.x-btn-icon-el').eq(21).click();
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', 'Silahkan lengkapi kolom berwarna merah pada form');
        cy.get('#button-1005-btnIconEl').click();
        cy.get('.x-tool').eq(5).click();
        cy.contains(nama_lokasi_tdk_lengkap).should('have.text', nama_lokasi_tdk_lengkap);
        cy.get('.x-grid-cell-inner').eq(2).should('have.text', kode_lokasi_tdk_lengkap);

            // Assertions Ubah Data (menggunakan kode yg sudah dipakai)
        cy.contains(nama_lokasi_tdk_lengkap).should('have.text', nama_lokasi_tdk_lengkap).click();
        cy.get('.x-btn-button').eq(22).click();
        cy.get('.x-window').eq(1).should('have.class', 'x-window');
        cy.get('.x-form-required-field').eq(0).should('have.value', nama_lokasi_tdk_lengkap);
        cy.get('.x-form-required-field').eq(1).should('have.value', kode_lokasi_tdk_lengkap);
        cy.get('.x-form-type-checkbox').should('have.class', 'x-form-cb-checked');
        cy.get('.x-form-required-field').eq(1).clear();
        cy.get('.x-form-required-field').eq(1).type(ubah_kode_lokasi).should('have.value', ubah_kode_lokasi);
        cy.get('.x-btn-icon-el').eq(21).click();
        cy.get('.x-window').eq(0).should('have.class', 'x-window');
        cy.get('#messagebox-1001-displayfield-inputEl').should('have.text', text);
        cy.get('#button-1005-btnIconEl').click();
        cy.get('.x-window').eq(1).should('have.class', 'x-window');
        cy.get('.x-tool').eq(5).click();

    })
})