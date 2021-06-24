const d = new Date
  const date = [d.getDate(),
    d.getMonth() + 1,
    d.getFullYear()].join('-') 

  const hora = [d.getHours(),
    d.getMinutes(),
    d.getSeconds()].join(':')

describe('LLamado a la API', function(){
  
  it('Verifica el registro de la UF', function(){

    cy.readFile('cypress/fixtures/dataUF1.json').then((data1) =>{
      var dat = data1.fecha
      cy.log(dat)
      //expect(dat).to.equal(d)
      if (dat==date)
        {
          cy.log('Ya se registro el Valor UF')
          return
        }
      else
        {
          cy.log('opcion else')
          cy.request(`https://mindicador.cl/api/uf/${date}`).as('respuestaUF')
          cy.get('@respuestaUF').then((response) => {
            var value = response.body.serie.map(e => e.valor).toString();
            //var value1 = Math.round (value)
            var someArr = { uf : (value),
                            fecha : (date) };
            cy.writeFile('cypress/fixtures/dataUF1.json', someArr);
            cy.writeFile('registroUF.txt', '\nUF: ' + value + ' ' + date + '  ' + hora, {flag:'a+'})
          })

     
    
        } 

      })    
  

  })

})