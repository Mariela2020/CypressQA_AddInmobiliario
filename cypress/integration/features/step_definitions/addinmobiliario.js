import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"

 const d = new Date
 const date = [d.getDate(),
   d.getMonth() + 1,
   d.getFullYear()].join('-') 
  
  const date1 = [d.getFullYear(),
    [(d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1)],
    [(d.getDate() < 9 ? '0' : '') + d.getDate()]].join('-')   

   const hora = [d.getHours(),
    d.getMinutes(),
    d.getSeconds()].join(':')

Given('El usuario se encuentra en la página de AddInmobiliario', () =>{
   
    cy.visit('https://www.addinmobiliario.cl/')
    cy.title().should('eq','AddInmobiliario') 
    
  });

  And('Debe iniciar cuenta con credenciales de valida',()=>{

    cy.get('#ctl00_ContentPlaceHolder1_Ctrllogin_Login1_UserName').type('mariela.hurtado@toctoc.com')
    cy.get('#ctl00_ContentPlaceHolder1_Ctrllogin_Login1_Password').type('pruebaadd',{sensitive: true})
    cy.get('#ctl00_ContentPlaceHolder1_Ctrllogin_Login1_LoginButton').click()
    cy.get('#ctl00_cabecera1_lblUsuario').should('be.visible').and('contain','Mariela Hurtado')
  
});

And('Comparar el valor de la UF', ()=>{

    cy.get('#ctl00_cabecera1_lblvaloruf').then(function($valorelem){

        const valoruftxt= $valorelem.text()
        cy.log(valoruftxt) 
  
        cy.fixture('valorUF.json').then((dataUF) => {
          var dat = dataUF.fecha
          cy.log(dat)
          cy.log(date1)

          if (dat==date1)
            {
              cy.log('Ya se registro el valor UF')
              //return
            }
          else
            {
              cy.log('opcion else')
              cy.request('https://api.sbif.cl/api-sbifv3/recursos_api/uf?apikey=44eb9df2ec197fddf46057acc05f1b2f15e5c75b&formato=json').as('respuestaUF')
              cy.get('@respuestaUF').then((response) => {
                var valor = response.body.UFs[0].Valor
                cy.log(valor)
                var fecha = response.body.UFs[0].Fecha
                cy.log(fecha)
                var someArr = { uf : (valor),
                             fecha : (fecha) };
                cy.writeFile('cypress/fixtures/valorUF.json', someArr);
              })
            } 
          
            var valoruf = dataUF.uf
            cy.log(valoruf)  
  
          if (valoruftxt==valoruf)
            {
             cy.log('El Valor UF obtenido es igual al Valor UF esperado')
            }
          else
            {
             cy.writeFile('diferencia.txt', '\n\nValor UF Obtenido: ' + valoruftxt + '/ Total Resumen Esperado: ' + valoruf + ' ' + date + '  ' + hora, { flag: 'a+' })
            }          
        })
  
      })
  
})

And('Hace click sobre el menú gestión venta - Cotizaciones - Crear Cotizaciones',()=>{
    
    //cy.get('#ctl00_Ctrlmenu_ASPxMenu1_DXI2_P').click()
    //cy.get('#ctl00_Ctrlmenu_ASPxMenu1_DXI2i2_T').click()
    //cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div/div[2]/table/tbody/tr/td[2]/div[11]/table/tbody/tr/td/table/tbody/tr[1]/td/a').click()
  
    cy.get('#ctl00_Ctrlmenu_btnCrearCotizacion').click()  
  })

When('Cuando el usuario ingresa el Rut del Cliente', ()=>{

    cy.get('#ctl00_ContentPlaceHolder1_txtRut').type('77119483-4')
    cy.get('#ctl00_ContentPlaceHolder1_txtApellidoPaterno').click()

})  

And('Selecciona el Inmueble, Estacionamiento y Bodega', ()=>{

    cy.get('#imgVivienda').click()

   // cy.get('input[type="checkbox"]')
    cy.get('input[name="viviendas"]')
      .each(($elem, index) => {
    if (index === 1) {
      cy.wrap($elem).click();
      }
    })

    cy.wait(1000)
   /* cy.get('input[name="otrasviviendas"]')
      .each(($elem1, index) => {
    if (index === 1) {
      cy.wrap($elem1).click();
      }
    })

    cy.wait(1000)*/
   // cy.get('#ctl00_ContentPlaceHolder1_dropTipoInmueble').select('Bodega')
   // cy.get('#ctl00_ContentPlaceHolder1_dropNivel').select('1')
   // cy.get('#cbo43145').click()
   cy.get('#cbo43187').click()
 
})

And('Aplica Descuento', ()=>{
 
  
 //  cy.get('#ctl00_ContentPlaceHolder1_btnEditar').should('be.visible').and('be.enabled')
 // cy.xpath('//*[@id="ctl00_ContentPlaceHolder1_btnEditar"]').click()
 //cy.get('#ctl00_ContentPlaceHolder1_btnEditar').click()
 //cy.wait(1000)
 //cy.get('#ctl00_ContentPlaceHolder1_PopupVerDetalle_CIF-1').check()
 //cy.get('#txtdescuentoUF43188').type('20')
 //cy.get('.btnAceptar').click()

 //cy.get('#ctl00_ContentPlaceHolder1_btnEditar')
 //cy.xpath('//tr[2]/td[4]/span/input').check()
 //cy.xpath('//tr[2]/td[4]/input').type('20')
 //cy.get('#txtdescuentoUF43188').type('10')


 //cy.get('#ctl00_ContentPlaceHolder1_PopupVerDetalle_CIF-1').should('be.visible').click()

 // cy.get('#ctl00_ContentPlaceHolder1_btnEditar').click()
 // cy.get('#ctl00_ContentPlaceHolder1_PopupVerDetalle_PWC-1').should('be.visible')
 // cy.get('#ctl00_ContentPlaceHolder1_PopupVerDetalle_CIF-1').click()
 // cy.get('#ctl00_ContentPlaceHolder1_PopupVerDetalle_PWH-1T').type('20')
 
 
  //cy.get('#ctl00_ContentPlaceHolder1_PopupVerDetalle_CIF-1').click()
  //cy.get('#ctl00_ContentPlaceHolder1_PopupVerDetalle_CIF-1').type('10')


})
And('Selecciona el financiamiento y medio de llegada', ()=>{

  cy.get('#ctl00_ContentPlaceHolder1_gvBienes_DXDataRow0 > :nth-child(1)').should('be.visible').and('contain','Departamento')
  cy.get('#ctl00_ContentPlaceHolder1_txtconceptoPie_rb_uf').check()
  cy.get('#ctl00_ContentPlaceHolder1_txtconceptoPie').type('30')
  
  if (cy.get('#ctl00_ContentPlaceHolder1_btnCalcularDividendo').should('be.visible'))
    {
      cy.get('#ctl00_ContentPlaceHolder1_btnCalcularDividendo').click()
    }
  else
    {
      cy.get('#imgSimulacionDividendo').click()
      cy.get('#ctl00_ContentPlaceHolder1_btnCalcularDividendo').click()  
    }
  
  cy.get('#ctl00_ContentPlaceHolder1_gvDividendo_DXTDGScol6 > table > tbody > tr > td', {timeout:5000}).should('be.visible')

  if(cy.get('#ctl00_ContentPlaceHolder1_CheckLlegada_0').should('be.visible'))
    {
      cy.get('#ctl00_ContentPlaceHolder1_CheckLlegada_0').check()
    }
  else
    {
      cy.get('#imgOtros').click()
      cy.get('#ctl00_ContentPlaceHolder1_CheckLlegada_0', {timeout:5000}).check()
    }
  
})

And('Hace click al botón Guardar', ()=>{

  cy.wait(2000)
  const btn_guardar = Cypress.$("#ctl00_ContentPlaceHolder1_btnGuardarCotizacion")
  cy.get(btn_guardar).should('exist').and('not.be.disabled')
  cy.get(btn_guardar).invoke('width').should('be.greaterThan', 0)
  cy.get(btn_guardar).invoke('height').should('be.greaterThan', 0)
  cy.get(btn_guardar).as('guardarbtn')
  cy.get('@guardarbtn', {timeout:10000}).click({force: true})

  //const btn_guardar = Cypress.$('#ctl00_ContentPlaceHolder1_btnGuardarCotizacion') 
  //cy.wrap(btn_guardar)
   // .should('not.have.class', 'active')
   // .click()
    ///.wait(2000)
    ///.should('have.class', 'active')
 
})

Then('Se debe redireccionar al Detalle de la cotización y la crea', ()=>{

    cy.get(':nth-child(2) > .cs699B7B81', {timeout:10000}).should('be.visible')
    //cy.get(':nth-child(2) > .cs699B7B81').should('be.visible')
    cy.url().should('include', 'https://www.addinmobiliario.cl/Cotizacion/vistaprevia.aspx')
    cy.get('#ctl00_ContentPlaceHolder1_Button2').click()
    
})