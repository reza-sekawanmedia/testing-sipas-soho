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
    let nama_jenis_tidak_diisi = name_jenis();
    let nama_jenis_isi = name_jenis();
    let kode_jenis3 = nama_jenis_isi.split('')[0];
    let kode_jenis4 = nama_jenis_isi.split('')[1];
    let should_k2 = kode_jenis3 + kode_jenis4;

    it('1.1.1 => JenisSurat, Simpan Jenis', function() {
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
        
            // Tambah Jenis
        cy.get('#sipas_com_button_add-1150-btnIconEl').click();
        cy.get('#textfield-1178-inputEl').type(nama_jenis).should('have.value', nama_jenis);
        cy.wait(1000);
        cy.get('#textfield-1179-inputEl').type(kode_jenis1 + kode_jenis2).should('have.value', kode_jenis1 + kode_jenis2);
        cy.wait(1000);
        cy.get('#sipas_com_button_save-1211-btnIconEl').click();
        cy.wait(1000);
        cy.get('#button-1005-btnIconEl').click();
        cy.wait(1000);

            // Assertion Tambah Jenis 
        cy.contains(nama_jenis).should('have.text', nama_jenis);
        cy.get('.x-grid-cell-gridcolumn-1136').should('contain', should_k1);

            // Tambah Jenis (diisi tidak lengkap)
        cy.get('#sipas_com_button_add-1150-btnIconEl').click();
        cy.get('#textfield-1217-inputEl').type(nama_jenis_tidak_diisi).should('have.value', nama_jenis_tidak_diisi);
        cy.wait(1000);
        cy.get('#sipas_com_button_save-1250-btnIconEl').click();
        cy.wait(1000);
        cy.get('#button-1005-btnIconEl').click();
        cy.wait(1000);
        
            // Tambah Jenis (kode sama dengan yang lain)
        cy.get('#tool-1253-toolEl').click()
        cy.wait(1000);
        cy.get('#sipas_com_button_add-1150-btnIconEl').click();
        cy.wait(1000);
        cy.get('#textfield-1256-inputEl').type(nama_jenis_tidak_diisi).should('have.value', nama_jenis_tidak_diisi);
        cy.wait(1000);
        cy.get('#textfield-1257-inputEl').type(kode_jenis1 + kode_jenis2).should('have.value', kode_jenis1 + kode_jenis2);
        cy.wait(1000);
        cy.get('#sipas_com_button_save-1289-btnIconEl').click();
        cy.wait(1000);
        cy.get('#button-1005-btnIconEl').click();
        cy.wait(1000);
        cy.get('#tool-1292-toolEl').click();

            // Tambah Jenis (isi semua kolom)
        cy.get('#sipas_com_button_add-1150-btnIconEl').click();
        cy.wait(1000);
        cy.get('#textfield-1295-inputEl').type(nama_jenis_isi).should('have.value', nama_jenis_isi);
        cy.wait(1000);
        cy.get('#textfield-1296-inputEl').type(kode_jenis3 + kode_jenis4).should('have.value', kode_jenis3 + kode_jenis4)
        cy.wait(1000);
        cy.get('#checkboxfield-1301-inputEl').click();
        cy.wait(1000);
        cy.get('#checkboxfield-1302-inputEl').click();
        cy.wait(1000);
        cy.get('#checkboxfield-1303-inputEl').click();
        cy.wait(1000);
        cy.get('#fieldset-1304-legendChk-inputEl').click();
        cy.wait(1000);
        cy.get('#checkboxfield-1312-inputEl').click();
        cy.wait(1000);
        cy.get('#checkboxfield-1313-inputEl').click();
        cy.wait(1000);
        cy.get('#checkboxfield-1314-inputEl').click();
        cy.wait(1000);
        cy.get('#checkboxfield-1315-inputEl').click();
        cy.wait(1000);
        cy.get('#checkboxfield-1319-inputEl').click();
        cy.wait(1000);
        cy.get('#sipas_com_button_save-1328-btnIconEl').click();
        cy.wait(1000);
        cy.get('#button-1005-btnIconEl').click();

            // Assertion Tambah Jenis (kolom diisi semua)
        cy.contains(nama_jenis_isi).should('have.text', nama_jenis_isi);
        cy.get('.x-grid-cell-gridcolumn-1136').should('contain', should_k2);
        
    })
})